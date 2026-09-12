#!/usr/bin/env node

import { execFile, spawn } from "node:child_process";
import { mkdtemp, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = resolve(process.argv[2] || "/home/donnii/Codex");
const only = new Set(process.argv.slice(3));
const chrome = "/usr/bin/google-chrome";
const skip = new Set(["ha-dashboard-hub", "ha-button-card-github-package"]);
const tagOverrides = {
  "ha-fjernvarme-card": "ha-fjernvarme-house-card",
  "ha-home-status-grid-card": "ha-home-status-card",
  "ha-hrv-card": "hrv-card",
};

const dirs = [];
for (const entry of await readdir(root)) {
  if (skip.has(entry) || (only.size && !only.has(entry))) continue;
  const dir = join(root, entry);
  try {
    if (!(await stat(join(dir, ".git"))).isDirectory()) continue;
  } catch {
    continue;
  }
  const files = (await readdir(dir)).filter((name) => name.endsWith("card.js"));
  if (!files.length) continue;
  const preferred = files.find((name) => name === `${entry}.js`) || files.find((name) => !name.includes("list-editor"));
  const source = await readFile(join(dir, preferred), "utf8");
  const tags = [...source.matchAll(/customElements\.define\(["']([^"']+)/g)].map((m) => m[1]);
  const tag = tagOverrides[entry] || tags.find((name) => !/editor|details|popup/.test(name));
  if (tag) dirs.push({ entry, dir, file: preferred, tag });
}

const temp = await mkdtemp(join(tmpdir(), "ha-card-previews-"));
const port = 9229;
const profile = join(temp, "chrome-profile");
const proc = spawn(chrome, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--allow-file-access-from-files",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--window-size=390,6000",
  "--force-device-scale-factor=1",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
for (let i = 0; i < 50; i++) {
  try {
    await fetch(`http://127.0.0.1:${port}/json/version`);
    break;
  } catch {
    await sleep(100);
  }
}

async function cdpPage(url) {
  const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" }).then((r) => r.json());
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const callId = ++id;
    pending.set(callId, { resolve, reject });
    ws.send(JSON.stringify({ id: callId, method, params }));
  });
  return { target, ws, send };
}

const fakeRuntime = String.raw`
window.customCards = [];
window.loadCardHelpers = async () => ({ createCardElement: () => {
  const el = document.createElement('div'); el.className = 'camera-placeholder';
  el.innerHTML = '<div class="camera-art">DEMO CAMERA</div>'; return el;
}});
class HAIcon extends HTMLElement {
  connectedCallback() { if (this.shadowRoot) return; const r=this.attachShadow({mode:'open'}); r.innerHTML='<style>:host{display:inline-flex;width:1em;height:1em;align-items:center;justify-content:center}svg{width:100%;height:100%;fill:currentColor}</style><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 22 12 12 22 2 12Zm0 4.8L6.8 12l5.2 5.2 5.2-5.2Z"/></svg>'; }
}
customElements.define('ha-icon', HAIcon);
customElements.define('ha-card', class extends HTMLElement {});
customElements.define('mwc-button', class extends HTMLElement {});
customElements.define('mwc-icon-button', class extends HTMLElement {});
customElements.define('demo-placeholder-card', class extends HTMLElement { setConfig(){this.innerHTML='<div class="camera-placeholder"><div class="camera-art">DEMO ROBOT</div></div>'} set hass(value){this._hass=value} });
const picture = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#263746"/><stop offset="1" stop-color="#55758b"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><path d="M0 365 180 210l110 95 125-125 170 160 90-74 125 99v85H0Z" fill="#8ca59a" opacity=".72"/><circle cx="635" cy="105" r="50" fill="#f5d58b"/><text x="32" y="55" fill="#fff" opacity=".84" font-family="sans-serif" font-size="28">DEMO</text></svg>');
function valueFor(id) {
  const x=id.toLowerCase();
  if (x.startsWith('person.') || x.startsWith('device_tracker.')) return 'home';
  if (x.startsWith('weather.')) return 'partlycloudy';
  if (x.startsWith('climate.')) return 'heat';
  if (x.startsWith('camera.')) return 'idle';
  if (x.startsWith('vacuum.')) return 'cleaning';
  if (x.startsWith('lawn_mower.')) return 'mowing';
  if (x.startsWith('lock.')) return 'locked';
  if (x.startsWith('alarm_control_panel.')) return 'disarmed';
  if (/binary_sensor|input_boolean|switch/.test(x)) return /door|window|open|alarm|problem|error|leak/.test(x) ? 'off' : 'on';
  if (x.startsWith('calendar.')) return 'on';
  if (x.startsWith('select.') || x.startsWith('input_select.')) return 'Hjemme';
  if (/battery/.test(x)) return '82';
  if (/humidity|fugt/.test(x)) return '47';
  if (/temperature|temp|outdoor/.test(x)) return /outdoor|ude/.test(x) ? '12.8' : '21.4';
  if (/price|cost|pris/.test(x)) return '1.86';
  if (/power|effekt|kw/.test(x)) return '2.4';
  if (/energy|usage|forbrug/.test(x)) return '8.7';
  if (/co2/.test(x)) return '612';
  if (/flow/.test(x)) return '3.2';
  if (/distance|afstand/.test(x)) return '2.7';
  if (/time|tid|uptime/.test(x)) return '18';
  if (/count|problem|alarm/.test(x)) return '0';
  if (/percent|pct|level|opening|valve/.test(x)) return '64';
  return '22.4';
}
function friendly(id) { return id.split('.')[1].replace(/example_/g,'').split('_').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ') || 'Demo'; }
function stateFor(id) {
  const state=valueFor(id); const x=id.toLowerCase();
  const attributes={ friendly_name: friendly(id), unit_of_measurement: /temp/.test(x)?'°C':/humidity/.test(x)?'%':/power|kw/.test(x)?'kW':/energy|usage/.test(x)?'kWh':/price|cost/.test(x)?'kr.':/battery|percent|pct|level/.test(x)?'%':'', device_class: /battery/.test(x)?'battery':/door/.test(x)?'door':/window/.test(x)?'window':undefined, entity_picture: /camera|person|tracker/.test(x)?picture:undefined, battery_level:82, current_temperature:21.4, temperature:22, min_temp:16, max_temp:30, min:16, max:30, step:0.5, target_temp_step:0.5, hvac_action:'heating', humidity:47, icon:'mdi:home-outline', latitude:55.67, longitude:12.57, start_time:new Date(Date.now()+3600000).toISOString(), end_time:new Date(Date.now()+7200000).toISOString(), message:'Demoaftale', location:'Eksempelsted', forecast:[{datetime:new Date().toISOString(),condition:'partlycloudy',temperature:17,templow:10,precipitation_probability:15}] };
  return { entity_id:id, state, attributes, last_changed:new Date(Date.now()-900000).toISOString(), last_updated:new Date().toISOString() };
}
function collect(v,out=new Set()) { if(typeof v==='string' && /^[a-z_]+\.[a-z0-9_]+$/i.test(v)) out.add(v); else if(Array.isArray(v)) v.forEach(x=>collect(x,out)); else if(v&&typeof v==='object') Object.values(v).forEach(x=>collect(x,out)); return out; }
function enrich(config, tag) {
  config={...config};
  if (Array.isArray(config.alerts) && !config.alerts.length) config.alerts=[{entity:'binary_sensor.demo_leak',name:'Alt er i orden',icon:'mdi:shield-check',state:'on'}];
  if (Array.isArray(config.status_items) && !config.status_items.length) config.status_items=[{entity:'sensor.demo_problem_count',name:'Hjemmet',icon:'mdi:home-check'}];
  if (Array.isArray(config.actions) && !config.actions.length) config.actions=[{name:'Genstart',icon:'mdi:restart',service:'homeassistant.restart'}];
  if (tag==='ha-home-status-card') config.preset='home_energy';
  if (tag==='ac-temperature-control-card') config={entity:'climate.demo_living_room'};
  if (tag==='calefa-number-control-card') config={name:'Varmekurve',description:'Neutral demoindstilling',entity:'number.demo_heating_curve',icon:'mdi:tune-variant'};
  if (tag==='ha-robot-fleet-card') config={title:'Robotcenter',robots:[{name:'Rengøringsrobot',entity:'vacuum.demo_robot',battery:'sensor.demo_robot_battery',error:'sensor.demo_robot_error',icon:'mdi:robot-vacuum',card:{type:'custom:demo-placeholder-card'}}]};
  if (tag==='ha-kid-tracker-card') config={...config,title:'Alex',entity:'person.demo_alex',tracker:'device_tracker.demo_watch',image:'',location_name:'sensor.demo_location_name'};
  if (tag==='ha-person-overview-card' && (!Array.isArray(config.persons)||!config.persons.length)) config={...config,title:'Personer',persons:[{name:'Alex',entity:'person.demo_alex'},{name:'Sam',entity:'person.demo_sam'}]};
  return config;
}
window.renderDemo = (tag) => {
  const C=customElements.get(tag); if(!C) throw new Error('Element not registered: '+tag);
  let config = C.getStubConfig ? C.getStubConfig() : {};
  config=enrich(config||{},tag);
  const ids=collect(config); ids.add('binary_sensor.demo_leak'); ids.add('sensor.demo_problem_count');
  const states={}; for(const id of ids) states[id]=stateFor(id);
  const hass={ states, language:'da', locale:{language:'da-DK',number_format:'comma_decimal'}, config:{unit_system:{temperature:'°C'},latitude:55.67,longitude:12.57}, themes:{darkMode:true}, user:{name:'Demo User'}, formatEntityState:(e)=>e.state, formatEntityAttributeValue:(e,k)=>e.attributes[k], callService:async()=>{}, callWS:async(msg)=> msg?.type?.includes('history')?{}:[], fetchWithAuth:fetch, hassUrl:(p)=>p, localize:(k)=>k };
  const el=document.createElement(tag); document.querySelector('#stage').append(el); el.setConfig?.(config); el.hass=hass;
  window.__demo={tag,config,ids:[...ids]};
};
`;

let failures = 0;
for (const item of dirs) {
  console.log(`RENDER ${item.entry} (${item.tag})`);
  const html = join(temp, `${item.entry}.html`);
  const sourceUrl = new URL(`file://${join(item.dir, item.file)}`).href;
  await writeFile(html, `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
  :root{color-scheme:dark;--primary-text-color:#f1f5f9;--secondary-text-color:#aab8c5;--card-background-color:#16212b;--ha-card-background:#16212b;--surface:#16212b;--dashboard-surface:#16212b;--dashboard-surface-soft:#1d2b36;--dashboard-border:rgba(255,255,255,.09);--dashboard-shadow-soft:0 12px 32px rgba(0,0,0,.28);--primary-color:#55b7d9;--info-color:#55b7d9;--success-color:#63c792;--warning-color:#e6b75c;--error-color:#e06d72;--divider-color:rgba(255,255,255,.1)}
  *{box-sizing:border-box}html,body{margin:0;width:390px;min-height:100%;background:#0d151c;color:var(--primary-text-color);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}body{padding:16px}#stage{width:358px}#stage>*,ha-card{display:block;width:100%}.camera-placeholder,.camera-art{width:100%;min-height:190px;border-radius:14px;background:linear-gradient(145deg,#263746,#55758b);display:grid;place-items:center;color:rgba(255,255,255,.7);font-size:12px;letter-spacing:.18em}button{font:inherit}
  </style><div id="stage"></div><script>${fakeRuntime}</script><script type="module">try{await import(${JSON.stringify(sourceUrl)});renderDemo(${JSON.stringify(item.tag)})}catch(e){document.body.innerHTML='<pre id="failure">'+String(e.stack||e)+'</pre>'}</script>`);
  const page = await cdpPage(new URL(`file://${html}`).href);
  await page.send("Page.enable");
  await sleep(900);
  const result = await page.send("Runtime.evaluate", { expression: `(()=>{const f=document.querySelector('#failure');const s=document.querySelector('#stage');if(!s)return {error:f?.textContent||document.body.innerText||'stage missing',x:0,y:0,width:0,height:0};const r=s.getBoundingClientRect();return {error:f?.textContent||'',x:r.x,y:r.y,width:r.width,height:Math.max(1,Math.ceil(s.scrollHeight))}})()`, returnByValue: true });
  const box = result?.result?.value;
  if (!box) {
    console.error(`FAIL ${item.entry}: ${result?.exceptionDetails?.exception?.description || result?.exceptionDetails?.text || "preview page did not return a bounding box"}`);
    failures++;
    page.ws.close();
    await fetch(`http://127.0.0.1:${port}/json/close/${page.target.id}`);
    continue;
  }
  if (box.error || box.height < 20) {
    console.error(`FAIL ${item.entry}: ${box.error || `height ${box.height}`}`);
    failures++;
  } else {
    const shot = await page.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, fromSurface: true, clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 5800), scale: 1 } });
    await execFileAsync("mkdir", ["-p", join(item.dir, "docs")]);
    await writeFile(join(item.dir, "docs", "preview.png"), Buffer.from(shot.data, "base64"));
    console.log(`OK   ${item.entry} ${Math.round(box.width)}x${Math.round(Math.min(box.height,5800))} ${item.tag}`);
  }
  page.ws.close();
  await fetch(`http://127.0.0.1:${port}/json/close/${page.target.id}`);
}
proc.kill("SIGTERM");
process.exitCode = failures ? 1 : 0;
