# Kort-katalog

Ét afsnit pr. kort. `Bruges i` peger på dashboardet fra [dashboards.md](dashboards.md). `Repo` mangler for kort der enten er ældre lokale scripts uden eget repo, eller bevidst ikke er publiceret separat (se bund af siden).

---

### ha-ac-climate-card
**Tag:** `custom:ha-ac-climate-card` · **Version:** 0.4.0 · **Repo:** [MRDonnii/ha-ac-climate-card](https://github.com/MRDonnii/ha-ac-climate-card) · **Bruges i:** energi-overblik

Animeret og interaktiv styring af AC-enheder og varmepumper.

- `title` — tekst, standard "AC & varmepumper"
- `animation` — bool, standard `true`
- `units` — **påkrævet** array, hver `{name, climate, output, input, cop, daily_energy, daily_cost, heat_price, hour_cost, icon}`

---

### ha-agenda-card
**Tag:** `custom:ha-agenda-card` · **Version:** 0.1.0 · **Repo:** [MRDonnii/ha-agenda-card](https://github.com/MRDonnii/ha-agenda-card) · **Bruges i:** ikke fundet i live dashboards

Kompakt oversigt over dagens og morgendagens kalenderaftaler på tværs af flere kalendere.

- `title` — tekst, standard "Aftaler"
- `days` — tal, standard 2 (antal dage frem der vises)
- `calendars` — **påkrævet** ikke-tomt array, hver `{entity, name, color}`

---

### ha-ai-usage-card
**Tag:** `custom:ha-ai-usage-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-ai-usage-card](https://github.com/MRDonnii/ha-ai-usage-card) · **Bruges i:** hjem-overblik

Samlet og animeret overblik over AI-forbrugsgrænser (kvoter, kredit, sessions).

- `title` — tekst, standard "AI-forbrug"
- `subtitle` — tekst, standard "Kvoter og kapacitet samlet ét sted"
- `animation` — bool, standard `true`
- `accounts` — **påkrævet** array, hver `{name, icon, provider, connected, limit_reached, session_remaining, session_reset, weekly_remaining, weekly_reset, plan, credits, extra_spent}`

---

### ha-alarm-center-card
**Tag:** `custom:ha-alarm-center-card` · **Version:** 0.2.2 · **Repo:** [MRDonnii/ha-alarm-center-card](https://github.com/MRDonnii/ha-alarm-center-card) · **Bruges i:** internt — åbnes som popup fra `ha-home-header-card`, ikke som selvstændigt kort i en view

Liste over aktive husalarmer/fejl med mulighed for at snooze til næste dag.

- `title` — tekst, standard "Alarmer & fejl"
- `snooze_entity` — entity-id, standard `input_text.dashboard_alarm_snooze`
- `alerts` — array af alarm-definitioner (leveres typisk af det kort der åbner popuppen)

---

### ha-camera-hub-card
**Tag:** `custom:ha-camera-hub-card` · **Version:** 0.6.0 · **Repo:** [MRDonnii/ha-camera-hub-card](https://github.com/MRDonnii/ha-camera-hub-card) · **Bruges i:** teknik-overblik

Samlet kamera-hub til UniFi Protect: live-grid, hændelseslog og NVR-systemstatus.

- `title` / `subtitle` — tekst
- `protect_ingress_path` — sti til Protect ingress-panel
- `cameras` — array, hver `{key, name, icon, area, ai, res, doorbell}` — kortet udleder selv camera_entity/event_entity/motion_entity fra key+res+area
- `nvr` — objekt `{storage_entity, capacity_entity, cpu_entity, temp_entity, memory_entity, uptime_entity, hdd_entities[]}`
- Har visuel editor (`ha-camera-hub-card-editor`)

---

### ha-control-center-card
**Tag:** `custom:ha-control-center-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-control-center-card](https://github.com/MRDonnii/ha-control-center-card) · **Bruges i:** ikke fundet i live dashboards

Samlet statusoverblik for husets sikkerheds- og driftskategorier med hurtige kontroller.

- `title` — tekst, standard "Husets kontrolcenter"
- `status_items` — array, hver `{entity, ...}`
- `waste_entity`, `ambient_light_entity`, `backup_entity` — entity-id'er, valgfri

---

### ha-door-window-card
**Tag:** `custom:ha-door-window-card` · **Version:** 0.4.0 · **Repo:** [MRDonnii/ha-door-window-card](https://github.com/MRDonnii/ha-door-window-card) · **Bruges i:** teknik-overblik

Alle døre og vinduer altid synlige: status, åbningstæller, sidste åbning og åben-varighed.

- `title` / `subtitle` — tekst
- `long_open_minutes` — tal, standard 30 (tærskel for "åben for længe"-advarsel)
- `items` — **påkrævet** array, hver `{entity, battery_entity, name, type/icon_set, icon_open, icon_closed}`
- Henter recorder-historik pr. item på et interval

---

### ha-electricity-price-card
**Tag:** `custom:ha-electricity-price-card` · **Version:** 0.5.1 · **Repo:** [MRDonnii/ha-electricity-price-card](https://github.com/MRDonnii/ha-electricity-price-card) · **Bruges i:** hjem-overblik

Samlet elpriskort med understøttelse af både Strømligning og Energi Data Service.

- `source` — `"auto"` \| `"stromligning"` \| `"energidataservice"`, standard `"auto"`
- `energidataservice`, `stromligning_current`, `stromligning_tomorrow`, `stromligning_forecast` — entity-id'er med standardværdier
- `desktop_height` — tal, standard 350
- `fill_height` — bool, standard `false`
- Har visuel editor

---

### ha-fjernvarme-house-card
**Tag:** `custom:ha-fjernvarme-house-card` (registrerer også alias `custom:ha-fjernvarme-house-card-v2` samt det medfølgende `custom:ha-calefa-details-card`) · **Version:** 0.1.63 · **Repo:** [MRDonnii/ha-fjernvarme-house-card](https://github.com/MRDonnii/ha-fjernvarme-house-card) · **Bruges i:** energi-overblik (som `-v2` og `ha-calefa-details-card`)

Fjernvarmeunit med temperaturstyrede rør, radiator, varmt vand og bypass. `ha-calefa-details-card` giver samlet styring af varmekurve, returbegrænser, rum og Calefa-drift.

- `title` — tekst, standard "Fjernvarme"
- `animation` — bool, standard `true`
- `show_details` — bool, standard `true`
- `entities` — objekt-map af Calefa/varme-sensorer, merges med config
- Begge kort har visuel JSON-editor

> Der findes desuden et separat, HACS-publiceret [ha-fjernvarme-card](https://github.com/MRDonnii/ha-fjernvarme-card) — en tidligere/parallel version af samme koncept.

---

### ha-heat-economy-card
**Tag:** `custom:ha-heat-economy-card` · **Version:** 0.2.0 · **Repo:** [MRDonnii/ha-heat-economy-card](https://github.com/MRDonnii/ha-heat-economy-card) · **Bruges i:** energi-overblik

Varmepumpe vs. fjernvarme-økonomi med bedste timer og break-even.

- `title` — tekst, standard "Varmepumpe vs. Fjernvarme"
- `spa_kw` — tal, standard 3.2 (antaget effektforbrug for varmepumpen)
- `vp_price_entity`, `fj_price_entity`, `optimal_entity`, `cop_entity`, `outdoor_entity`, `price_entity`, `tomorrow_entity` — entity-id'er, valgfri

---

### ha-heating-diagnostics-card
**Tag:** `custom:ha-heating-diagnostics-card` · **Version:** 0.4.3 · **Repo:** [MRDonnii/ha-heating-diagnostics-card](https://github.com/MRDonnii/ha-heating-diagnostics-card) · **Bruges i:** energi-overblik

Animeret rumdiagnose der arbejder sammen med Room Energy Optimizer-integrationen.

- `title` — tekst, standard "Varmeoptimering"
- `animation` — bool, standard `true`
- `learning_hours` — tal, standard 48
- `compact` — bool, påvirker kortstørrelse
- `rooms` — **påkrævet** array, hver med climate/temperatur-entiteter plus `baseline_learning_hours`/`baseline_ready`/`deviation_percent`-attributter læst fra state
- `total_demand`, `data_problem` — entity-id'er, valgfri

---

### ha-heat-pump-overview-card
**Tag:** `custom:ha-heat-pump-overview-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-heat-pump-overview-card](https://github.com/MRDonnii/ha-heat-pump-overview-card) · **Bruges i:** energi-overblik

Animeret energi- og diagnosekort for en flåde af varmepumper.

- `title` — tekst, standard "Varmepumper"
- `animation` — bool, standard `true`
- `pumps` — **påkrævet** ikke-tomt array, hver `{name, icon, brand, climate, output, input, cop, daily_energy, daily_cost, max_output, max_input}`

---

### ha-home-camera-card
**Tag:** `custom:ha-home-camera-card` · **Version:** 0.6.0 · **Repo:** [MRDonnii/ha-home-camera-card](https://github.com/MRDonnii/ha-home-camera-card) · **Bruges i:** hjem-overblik

Responsivt kamera-overblik med automatisk og manuelt kameravalg.

- `title` — tekst, standard "Kameraer lige nu"
- `navigation_path` — tekst, standard `/teknik-overblik/overvagning`
- `click_action` — `"navigate"` \| `"more-info"` \| `"none"`, standard `"navigate"`
- `aspect_ratio` — tekst, standard `"16:9"`
- `show_header`, `fill_height` — bool, standard `false`
- `groups` — **påkrævet** ikke-tomt array, hver `{name, selector_entity, cameras: [{key, name, entity, navigation_path, fit_scale}]}`
- Har visuel editor

---

### ha-home-header-card
**Tag:** `custom:ha-home-header-card` · **Version:** 0.8.28 · **Repo:** [MRDonnii/ha-home-header-card](https://github.com/MRDonnii/ha-home-header-card) · **Bruges i:** hjem-overblik

Samlet statusheader med vejr, alarmer og lokale vejreffekter.

- `title` — tekst, standard "Hjemmet lige nu"
- `weather` — **påkrævet** entity-id (kaster fejl hvis den mangler)
- `weather_path` — tekst, standard `/energi-overblik/vejret`
- `animation`, `show_weather_fx` — bool, standard `true`
- `weather_fx_intensity` — tal, standard 0.42
- `weather_fx_density` — tal, standard 0.6
- `cycle_seconds` — tal, standard 8
- `alerts` — array, sendes videre til det interne `ha-alarm-center-card`-popup
- `activities` — array, valgfri
- `snooze_entity` — entity-id, standard `input_text.dashboard_alarm_snooze`

---

### ha-home-room-overview-card
**Tag:** `custom:ha-home-room-overview-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-home-room-overview-card](https://github.com/MRDonnii/ha-home-room-overview-card) · **Bruges i:** hjem-overblik

Rum-grid med temperatur, luftfugtighed, lys, tilstedeværelse og åbninger pr. rum.

- `rooms` — **påkrævet** ikke-tomt array, hver `{name, icon, temperature, humidity, light, presence, opening, alert: {entity, active, idle, icon}, outdoor, accent, popup}`
- Henter recorder-historik pr. rum til sparklines

---

### ha-home-status-card
**Tag:** `custom:ha-home-status-card` (bundler desuden `custom:ha-home-summary-card` og `custom:ha-home-desktop-layout-card`, plus matchende `-editor`-elementer) · **Version:** 0.8.29 · **Repo:** [MRDonnii/ha-home-status-card](https://github.com/MRDonnii/ha-home-status-card) · **Bruges i:** hjem-overblik

Én pakke, tre kort: `ha-home-status-card` er et konfigurerbart knapkort med indbyggede presets; `ha-home-summary-card` giver samlet husstatus/forbrug/kalender/rum-grid til forsiden; `ha-home-desktop-layout-card` giver balancerede, responsive kolonner til PC-forsiden.

**ha-home-status-card:**
- `preset` — én af de indbyggede presets (`home_energy`, `ev`, `electricity_price`, `pool`, `pet`, `security`, `heating`, `settings`, ...) — vælger et helt entity-bundt; påkrævet med mindre `entity` angives direkte
- Alle preset-felter kan overskrives direkte i config
- `gate_lock_inverted` — bool (til sikkerheds-presettet)

**ha-home-summary-card** (via `SUMMARY_DEFAULTS`):
- `title`, `monthly_energy_entity`, `electricity_price_entity`, `electric_month_cost_entity`, `water_month_entity`, `water_month_cost_entity`, `heat_month_entity`, `heat_month_cost_entity`
- `electricity_path`, `water_path`, `heat_path` — navigations-stier for utility-fliserne
- `co2_entity`, `air_quality_entity`, `water_flow_entity`, `storage_entity`, `hdd_entities[]`
- `event_days` (standard 14), `max_events` (standard 40)
- `rooms[]` — `{name, icon, temperature, humidity, climate, presence}` pr. rum (temperatur, mål-temperatur/afvigelse, luftfugtighed, varmekald og tilstedeværelse vises kun når data findes)
- `calendars[]` — `{entity, name, color}`

---

### ha-house-mode-card
**Tag:** `custom:ha-house-mode-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-house-mode-card](https://github.com/MRDonnii/ha-house-mode-card) · **Bruges i:** ikke fundet i live dashboards

Samlet kort til hus-mode, notifikationsniveau og overstyringer.

- `title` — tekst, standard "Hus-mode"
- `mode_entity` — **påkrævet** entity-id
- `notification_entity`, `auto_away_entity` — entity-id'er, valgfri
- `overrides` — array, standard `[]`, hver `{entity, ...}`
- `mode_icons` — objekt-map, standard `{}`

---

### ha-house-status-card
**Tag:** `custom:ha-house-status-card` · **Version:** 0.1.0 · **Repo:** [MRDonnii/ha-house-status-card](https://github.com/MRDonnii/ha-house-status-card) · **Bruges i:** ikke fundet i live dashboards

Komplet statusoverblik: låse, døre/vinduer, alarm, garage, hjemme, apparater og robotter. Delvist afløst af `ha-security-center-card` og `ha-home-status-card`.

- `title` — tekst, standard "Husets status"
- `locks`, `door_entities`, `persons`, `appliances`, `robots` — arrays, standard `[]`
- `open_count_entity`, `alarm_entity`, `secondary_alarm_entity`, `garage_entity` — entity-id'er, valgfri

---

### ha-kid-tracker-card
**Tag:** `custom:ha-kid-tracker-card` · **Version:** 0.5.0 · **Repo:** [MRDonnii/ha-kid-tracker-card](https://github.com/MRDonnii/ha-kid-tracker-card) · **Bruges i:** hjem-overblik

Komplet personkort: lokation, hjemtur, aktivitet, batterier, GPS og enhedsstatus.

- `title` — tekst, standard "Sporing"
- `entity` — **påkrævet** person-entity-id
- Alle øvrige tekst-config-værdier der matcher et entity-id-mønster overvåges automatisk for state-ændringer (fri-form entity-felter)

---

### ha-kiosk-server-card
**Tag:** `custom:ha-kiosk-server-card` · **Version:** 0.2.0 · **Repo:** [MRDonnii/ha-kiosk-server-card](https://github.com/MRDonnii/ha-kiosk-server-card) · **Bruges i:** teknik-overblik

Samlet kort til en kiosk-pc: status, Glances-metrics, styring og kiosk-indstillinger.

- `title` — tekst, standard "Kiosk-pc"
- `actions` — array, standard `[]`
- Store antal valgfrie entity-felter: `health_entity`, `status_entity`, `chrome_entity`, `cpu_entity`, `ram_entity`, `temp_entity`, `uptime_entity`, `upgrades_entity`, `last_active_entity`, `power_entity`, `energy_entity`, `ip_entity`, `glances_*` (cpu/ram/disk/load/uptime/disk_free/ram_free/threads), `screen_light_entity`, `volume_entity`, `zoom_entity`, `window_mode_entity`, `theme_entity`, `url_entity`, `keyboard_switch_entity`, `smartplug_switch_entity`, `screenshot_entity`

---

### ha-lawn-mower-card
**Tag:** `custom:ha-lawn-mower-card` · **Version:** 0.4.0 · **Repo:** [MRDonnii/ha-lawn-mower-card](https://github.com/MRDonnii/ha-lawn-mower-card) · **Bruges i:** teknik-overblik

Fuldt kort til en robotplæneklipper: status, batteri, zoner og justeringer.

- `title` — tekst, standard "Robotplæneklipper"
- `mower` — **påkrævet** `lawn_mower`-entity-id
- Alle øvrige tekst-config-værdier med et `.` i sig behandles som fri-form entity-felter der auto-overvåges

---

### ha-license-plate-card
**Tag:** `custom:ha-license-plate-card` · **Version:** ikke versioneret · **Repo:** [MRDonnii/ha-license-plate-card](https://github.com/MRDonnii/ha-license-plate-card) · **Bruges i:** teknik-overblik

"Protect Nummerpladevagt" — 14 dages nummerpladehistorik med Protect-billeder.

- `title` — tekst, standard "Nummerpladevagt"
- `subtitle` — tekst, standard "Protect · Indkørsel"
- `entity` — entity-id, standard `sensor.protect_nummerpladehistorik`
- `camera_entity` — entity-id, standard `camera.indkorsel_high_resolution_channel`
- `navigation_path` — tekst, standard `/teknik-overblik/overvagning`

---

### ha-light-scene-card
**Tag:** `custom:ha-light-scene-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-light-scene-card](https://github.com/MRDonnii/ha-light-scene-card) · **Bruges i:** ikke fundet i live dashboards

Samlet kort til én lysscene med hoved-toggle, lysstyrke og farvevalg pr. lys.

- `title` — tekst, standard `""`
- `toggle_entity` — entity-id, valgfri (hoved-toggle)
- `lights` — **påkrævet** ikke-tomt array, hver `{name, icon, brightness_entity, color_entity}`

---

### ha-number-grid-card
**Tag:** `custom:ha-number-grid-card` · **Version:** 0.4.0 · **Repo:** [MRDonnii/ha-number-grid-card](https://github.com/MRDonnii/ha-number-grid-card) · **Bruges i:** ikke fundet i live dashboards

Genbrugeligt grid af justerbare talværdier (`input_number`) med +/- kontroller.

- `title` — tekst, standard `""`
- `columns` — tal, standard 1
- `items` — **påkrævet** ikke-tomt array, hver `{entity, sensor_entity, name, unit, sensor_unit}`

---

### ha-ops-status-card
**Tag:** `custom:ha-ops-status-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-ops-status-card](https://github.com/MRDonnii/ha-ops-status-card) · **Bruges i:** ikke fundet i live dashboards

Samlet driftstatus for Home Assistant, kiosk og backup med tilhørende handlinger.

- `title` — tekst, standard "Driftstatus"
- `actions`, `health_items` — arrays, standard `[]`
- `ha_uptime`, `ha_core`, `ha_supervisor`, `kiosk_uptime`, `kiosk_cpu`, `kiosk_memory`, `backup_entity` — entity-id'er, valgfri

---

### ha-person-detection-card
**Tag:** `custom:ha-person-detection-card` · **Version:** ikke versioneret · **Repo:** [MRDonnii/ha-person-detection-card](https://github.com/MRDonnii/ha-person-detection-card) · **Bruges i:** teknik-overblik

"Protect Personvagt" — 14 dages personhistorik med Protect-billeder.

- `title` — tekst, standard "Personvagt"
- `subtitle` — tekst, standard "Protect · Udendørs kameraer"
- `entity` — entity-id, standard `sensor.protect_personhistorik`
- `live_navigation_path` — tekst, standard `/teknik-overblik/overvagning`

---

### ha-person-overview-card
**Tag:** `custom:ha-person-overview-card` · **Version:** 0.2.0 · **Repo:** [MRDonnii/ha-person-overview-card](https://github.com/MRDonnii/ha-person-overview-card) · **Bruges i:** hjem-overblik

Samlet personoversigt med lokation, batteri og hjemtur.

- `columns`, `mobile_columns` — tal, standard 2
- `persons` — **påkrævet** ikke-tomt array, hver `{name, entity, tracker, city, battery, charging, distance, travel_time, image, navigation_path}`
- Har JSON-tekstfelt-editor

---

### ha-pet-care-card
**Tag:** `custom:ha-pet-care-card` · **Version:** 0.2.1 · **Repo:** [MRDonnii/ha-pet-care-card](https://github.com/MRDonnii/ha-pet-care-card) · **Bruges i:** hjem-overblik

Samlet kæledyrs-, vand- og foderoversigt.

- `title` — tekst, standard "Kæledyrspleje"
- `pet_name` — tekst, standard "Kæledyr"
- `icon` — tekst, standard `mdi:dog-side`
- `animation` — bool, standard `true`
- `meals` — array, standard `[]`, hver `{enabled, status, feed_action, skip}`
- `water`, `water_battery`, `feeder_mode`, `daily_amount`, `feeder_error`, `container_grams`, `container_percent`, `refill_action` — entity-id'er, valgfri

---

### ha-pool-card
**Tag:** `custom:ha-pool-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-pool-card](https://github.com/MRDonnii/ha-pool-card) · **Bruges i:** hjem-overblik

Samlet poolkort: pumpestyring, guidet backwash/rinse, kamera, statistik, statusadvarsel, 7-dages historik og vejrbaseret forecast. ~30 config-felter med defaults via `getStubConfig`, herunder:

- `camera_entity`, `person_in_water_entity`, `person_terrace_entity`
- `pump_switch_entity`, `pump_running_entity`, `pump_status_entity`, `override_select_entity`
- `power_entity`, `energy_today_entity`, `cost_today_entity`, `runtime_today_entity`
- `normal_goal_entity`, `interval_minutes_entity`, `interval_pause_minutes_entity`
- `automation_active_entity`, `forced_pause_active_entity`, `manual_override_timer_entity`, `after_swim_timer_entity`
- `backwash_status_entity`, `backwash_timer_entity`, `rinse_timer_entity`
- `water_temp_entity`, `temp_rise_today_entity`, `filter_progress_entity`, `status_warning_entity`, `next_action_entity`, `best_swim_time_entity`
- `scripts` — objekt, merges fladt med defaults (backwash/rinse action-scripts)

---

### ha-pool-settings-card
**Tag:** `custom:ha-pool-settings-card` · **Version:** 0.2.0 · **Repo:** [MRDonnii/ha-pool-settings-card](https://github.com/MRDonnii/ha-pool-settings-card) · **Bruges i:** hjem-overblik

Samlede pool-indstillinger i faner: sandfiltertider, automatik, komfort, vedligeholdelse og indsigt.

- `title` / `subtitle` — tekst
- `back_path` — tekst, standard `/hjem-overblik/pool`
- `sections` — array (fuldt overskrivbar standard fra `getStubConfig`), hver `{title, icon, danger_action: {label, desc, icon, entity, service, data, confirm}, rows: [{label, entity}]}`

---

### ha-power-flow-card
**Tag:** `custom:ha-power-flow-card` · **Version:** 0.5.0 · **Repo:** [MRDonnii/ha-power-flow-card](https://github.com/MRDonnii/ha-power-flow-card) · **Bruges i:** energi-overblik

Samlet strømpris-kort med animeret effekt-flow, CO2-intensitet, prissammensætning, 24-timers prisgraf og dagsstatistik.

- `title` — tekst, standard "Strømpris"
- `price_entity` — **påkrævet** entity-id
- `today_mean_entity`, `tomorrow_available_entity`, `house_power_entity`, `ev_power_entity`, `daily_entity`, `co2_entity`, `fossil_pct_entity`, `spot_entity`, `distribution_entity`, `nettariff_entity`, `systemtariff_entity`, `tax_entity`, `surcharge_entity` — entity-id'er, valgfri

---

### ha-radiator-overview-card
**Tag:** `custom:ha-radiator-overview-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-radiator-overview-card](https://github.com/MRDonnii/ha-radiator-overview-card) · **Bruges i:** energi-overblik

Animeret radiator- og temperaturkort.

- `title` — tekst, standard "Radiatoroverblik"
- `animation` — bool, standard `true`
- `history_hours` — tal, standard 24
- `rooms` — **påkrævet** array, hver `{climate, temperature, humidity, window, comfort}`
- Poller recorder-historik hvert 5. minut

---

### ha-roborock-vacuum-card
**Tag:** `custom:ha-roborock-vacuum-card` · **Version:** 0.4.0 · **Repo:** [MRDonnii/ha-roborock-vacuum-card](https://github.com/MRDonnii/ha-roborock-vacuum-card) · **Bruges i:** teknik-overblik

Fuldt Roborock-kort med kort, forbrugsdele og rumvalg.

- `title` — tekst, standard "Robotstøvsuger"
- `vacuum` — **påkrævet** `vacuum`-entity-id
- `rooms`, `quick_clean` — arrays, standard `[]`
- Mange valgfrie entity-felter: `map_image`, `battery`, `status_text`, `vacuum_error`, `cleaning_area`, `cleaning_time`, `cleaning_progress`, `current_room`, `last_clean_start`, `last_clean_end`, `total_area`, `total_count`, `total_time`, `dock_error`, `dock_mop_drying`, `filter_left`

---

### ha-robot-fleet-card
**Tag:** `custom:ha-robot-fleet-card` · **Version:** 0.2.0 · **Repo:** [MRDonnii/ha-robot-fleet-card](https://github.com/MRDonnii/ha-robot-fleet-card) · **Bruges i:** teknik-overblik

Samlet robotcenter med live status og adaptive faner.

- `title` — tekst, standard "Robotcenter"
- `robots` — **påkrævet** ikke-tomt array, hver `{card: {type, ...}}` — kortet rendrer det indlejrede korttype pr. aktiv fane
- Har JSON-tekstfelt-editor

---

### ha-security-center-card
**Tag:** `custom:ha-security-center-card` · **Version:** 0.3.2 · **Repo:** [MRDonnii/ha-security-center-card](https://github.com/MRDonnii/ha-security-center-card) · **Bruges i:** hjem-overblik

Samlet security center: alarm/lås/kontakt-status.

- `primary_alarm_name` — tekst, standard "Alarm"
- `secondary_alarm_name` — tekst, standard "Alarm 2"
- `actions` — objekt, standard `{}`
- `locks` — array, standard `[]`, hver `{entity, battery_entity, radio_fault_entity, network_fault_entity, hardware_fault_entity}`
- `contacts` — array, standard `[]`, hver `{entity, battery_entity, signal_entity}`
- `openings` — array, standard `[]`, hver `{entity}`
- `primary_alarm`, `secondary_alarm`, `open_count` — entity-id'er, valgfri

---

### ha-settings-center-card
**Tag:** `custom:ha-settings-center-card` (bundler editor `ha-settings-center-card-editor`) · **Version:** 0.5.0 · **Repo:** [MRDonnii/ha-settings-center-card](https://github.com/MRDonnii/ha-settings-center-card) · **Bruges i:** hjem-overblik

Samlet indstillingscenter uden gentagne funktioner, opbygget i faner.

- `title` — tekst, standard "Indstillinger"
- `default_tab` — tekst, standard `"home"` (én af en fast `TABS`-liste)
- Resten af config er fane-specifik og fri-form, og patches løbende i stedet for fuld gen-render

---

### ha-simple-vacuum-card
**Tag:** `custom:ha-simple-vacuum-card` · **Version:** 0.4.0 · **Repo:** [MRDonnii/ha-simple-vacuum-card](https://github.com/MRDonnii/ha-simple-vacuum-card) · **Bruges i:** teknik-overblik

Kompakt kort til en almindelig robotstøvsuger.

- `title` — tekst, standard "Robotstøvsuger"
- `vacuum` — **påkrævet** `vacuum`-entity-id
- `battery`, `bin_full`, `average_mission_time`, `battery_cycles`, `missions_total`, `missions_successful`, `missions_failed`, `missions_canceled`, `total_cleaning_time`, `tank_level`, `dock_tank_level` — entity-id'er, valgfri

---

### ha-temperature-target-card
**Tag:** `custom:ha-temperature-target-card` · **Version:** 0.3.0 · **Repo:** [MRDonnii/ha-temperature-target-card](https://github.com/MRDonnii/ha-temperature-target-card) · **Bruges i:** energi-overblik

Temperaturgrafer med dynamiske termostatmål.

- `title` — tekst, standard "Temperaturer & setpunkter"
- `hours` — tal, standard 24 (historik-vindue)
- `animation` — bool, standard `true`
- `rooms` — **påkrævet** ikke-tomt array, hver `{climate, temperature, ...}`
- Henter recorder-historik ved `setConfig`

---

### ha-tesla-vehicle-card
**Tag:** `custom:ha-tesla-vehicle-card` (bundler `custom:ha-tesla-charge-popup-card`) · **Version:** ikke versioneret · **Repo:** [MRDonnii/ha-tesla-vehicle-card](https://github.com/MRDonnii/ha-tesla-vehicle-card) · **Bruges i:** teknik-overblik

"Tesla Vehicle Center" — samlet Tesla-, Monta- og EV Ledger-kort.

- `title` — tekst, standard "Tesla ladning" / "EnerGitte" afhængigt af hvilket af de to kort
- `navigation_path` — tekst, standard `/teknik-overblik/tesla`
- `entities` — objekt-map der overskriver et stort indbygget `TESLA_ENTITIES`-default: batteri, rækkevidde, kilometertæller, online, indendørs/udendørs temp, sover, lader/lades-flag, døre, sentry, bagagerum, lokations-tracker, hvac, effektivitet, dæktryk x4, dags-/ture-/sidste-tur-statistik, ladeeffekt/-hastighed/-færdig/-resterende/-estimat, mål-SOC, klar-til-tid, bedste ladetid/-pris, Monta wallet/transaktioner/kontrol-entiteter
- `evledger_entry_id` — **påkrævet** for at kunne slette ture/ladninger via "Slet"-knapperne (ingen fallback-værdi; det var oprindeligt hardcoded til denne instans' eget EV Ledger config-entry, men er fjernet i den publicerede udgave)

---

### ha-toggle-grid-card
**Tag:** `custom:ha-toggle-grid-card` · **Version:** 0.5.0 · **Repo:** [MRDonnii/ha-toggle-grid-card](https://github.com/MRDonnii/ha-toggle-grid-card) · **Bruges i:** ikke fundet i live dashboards

Genbrugeligt grid af til/fra-kontroller til switches, automations og input_booleans.

- `title` — tekst, standard `""`
- `columns` — tal, standard 1
- `items` — **påkrævet** ikke-tomt array, hver `{entity, name, icon}`

---

### ha-unraid-server-card
**Tag:** `custom:ha-unraid-server-card` · **Version:** 0.2.0 · **Repo:** [MRDonnii/ha-unraid-server-card](https://github.com/MRDonnii/ha-unraid-server-card) · **Bruges i:** teknik-overblik

Samlet kort til Unraid-server: status, load, diske, Docker-containere og VM'er.

- `title` — tekst, standard "Server"
- `disks` — array, standard `[]`, hver `{usage_entity, health_entity}`
- `containers`, `vms` — arrays, standard `[]`, hver `{entity}`
- ~20 valgfrie enkelt-entity-felter: `ssh_entity`, `array_state_entity`, `disk_health_entity`, `docker_running_entity`, `vm_running_entity`, `power_entity`, `cpu_entity`, `ram_entity`, `cpu_temp_entity`, `array_usage_entity`, `version_entity`, `api_version_entity`, `up_since_entity`, `notifications_entity`, `updates_entity`, `array_started_entity`, `parity_valid_entity`, `parity_check_entity`, `docker_cpu_entity`, `docker_ram_entity`, `docker_updates_entity`

---

### ha-ventilation-card
**Tag:** `custom:ha-ventilation-card` (bundler `custom:ha-ventilation-details-card` plus begge `-editor`-elementer) · **Version:** 0.3.5 · **Repo:** [MRDonnii/ha-ventilation-card](https://github.com/MRDonnii/ha-ventilation-card) · **Bruges i:** energi-overblik

Temperatur-bevidst kort til varmegenvindingsventilation (HRV/ERV). Details-varianten giver samlet Dantherm-drift, eftervarme, diagnose og historik.

**ha-ventilation-card:**
- `title` — tekst, standard "Ventilation"
- `animation` — bool, standard `true`
- `show_afterheat`, `show_history` — bool, standard `false`
- `entities` — objekt-map, merges med config

**ha-ventilation-details-card:**
- `title` — tekst, standard "Dantherm detaljer"
- `entities` — objekt-map, valideret shape (kaster fejl ved ugyldig config)

---

### ha-water-meter-card
**Tag:** `custom:ha-water-meter-card` · **Version:** 0.2.0 · **Repo:** [MRDonnii/ha-water-meter-card](https://github.com/MRDonnii/ha-water-meter-card) · **Bruges i:** energi-overblik

Animeret vandmåler-kort med live flow, forbrug og gateway-status.

- `title` — tekst, standard "Vandforbrug"
- `total` — **påkrævet** entity-id
- `max_flow` — tal, standard 1000
- Alle øvrige tekst-config-værdier med et `.` i sig behandles som fri-form entity-felter der auto-overvåges

---

### ha-weather-card
**Tag:** `custom:ha-weather-card` · **Version:** 0.4.0 · **Repo:** [MRDonnii/ha-weather-card](https://github.com/MRDonnii/ha-weather-card) · **Bruges i:** energi-overblik

Samlet vejrkort: nu/i dag, timeprognose, pollen, sol & UV, radar og 5-dages udsigt — alt hentet direkte fra en native `weather`-entity, ingen custom sensorer krævet.

- `title` — tekst, standard "Vejr og varsler"
- `subtitle` — tekst, standard "Vejr, pollen og solforhold"
- `weather_entity` — **påkrævet** entity-id (kaster fejl hvis den mangler)
- `more_info_entity` — entity-id, standard samme som `weather_entity`
- `sun_entity` — entity-id, standard `sun.sun`
- `pollen` — array, standard 5 danske pollentyper, hver `{name, entity}`
- `radar_lat`, `radar_lon` — koordinater til radarkortet
- Poller vejrudsigter på et interval

---

### ac-temperature-control-card.js
**Tag:** `custom:ac-temperature-control-card` · **Version:** ikke versioneret · **Repo:** [MRDonnii/ac-temperature-control-card](https://github.com/MRDonnii/ac-temperature-control-card) · **Bruges i:** energi-overblik

Optimistisk AC-temperaturstyring der sender kommandoen ved slip (ikke live under træk).

- `entity` — **påkrævet** climate-entity-id

---

### calefa-number-control-card.js
**Tag:** `custom:calefa-number-control-card` · **Version:** ikke versioneret · **Repo:** [MRDonnii/calefa-number-control-card](https://github.com/MRDonnii/calefa-number-control-card) · **Bruges i:** ikke fundet i live dashboards

Optimistisk tal-kontrol til Calefa- og Home Assistant-helpers.

- `entity` — **påkrævet** entity-id
- `name` — tekst, standard = entity-id
- `description` — tekst, standard `""`
- `icon` — tekst, standard `mdi:tune-variant`
- `accent` — CSS-farve, standard `var(--dashboard-accent)`

---

### hourly-weather-scroll-card.js
**Tag:** `custom:hourly-weather-scroll-card` · **Version:** ikke versioneret · **Repo:** [MRDonnii/hourly-weather-scroll-card](https://github.com/MRDonnii/hourly-weather-scroll-card) · **Bruges i:** ikke fundet i live dashboards

Ikke-klikbar, horisontalt "drag"-bar timevejrsprognose.

- `entity` — entity-id, standard `sensor.weather_forecast` (læser attributten `hourly_forecast`)

---

### locked-map-card.js
**Tag:** `custom:locked-map-card` · **Version:** ikke versioneret · **Repo:** [MRDonnii/locked-map-card](https://github.com/MRDonnii/locked-map-card) · **Bruges i:** teknik-overblik

Wrapper omkring det indbyggede `map`-kort med fastlåst position og fungerende zoom.

- Accepterer al native `map`-kort-config (entities m.m.)
- `lock_pan` — bool, forbruges af wrapperen og strippes før config sendes videre til det indre map-kort

---

### pool-forecast-card.js
**Tag:** `custom:pool-forecast-card` · **Version:** ikke versioneret · **Repo:** [MRDonnii/pool-forecast-card](https://github.com/MRDonnii/pool-forecast-card) · **Bruges i:** ikke fundet i live dashboards

Pooltemperatur-forecast med usikkerhedsinterval og vejrkontekst.

- `title` / `subtitle` — tekst
- `forecast_entity` — standard `sensor.pool_forventet_vandtemperatur`
- `temp_entity` — standard `sensor.pool_vandtemperatur`
- `weather_entity` — standard `sensor.weather_forecast`

---

### pool-history-card.js
**Tag:** `custom:pool-history-card` (bundler `custom:pool-water-quality-card`) · **Version:** ikke versioneret · **Repo:** [MRDonnii/pool-history-card](https://github.com/MRDonnii/pool-history-card) · **Bruges i:** ikke fundet i live dashboards

Pooltemperatur-historik (`pool-history-card`) plus pH/klor-vandkvalitetshistorik (`pool-water-quality-card`).

**pool-history-card:**
- `title` / `subtitle` — tekst
- `temp_entity` — standard `sensor.pool_vandtemperatur`
- `pump_entity` — standard `sensor.poolpumpe_koeretid_i_dag`
- `days` — tal, standard 7

**pool-water-quality-card:**
- `ph_entity`, `chlorine_entity` — standard `input_number.pool_ph_vaerdi` / `input_number.pool_klor_vaerdi`
- `ph_history_entity`, `chlorine_history_entity` — standard `sensor.pool_ph_maaling` / `sensor.pool_klor_maaling`
- `legacy_measured_entity` — standard `input_datetime.pool_sidste_vandmaaling`
- `imported_measurements` — array, standard én seed-post `{date, ph, chlorine}`
- `measured_entity` — standard `sensor.pool_sidste_vandmaling_visning`
- `days` — tal, standard 7

---

### mysmart-draggable-toggle.js
**Tag:** `custom:mysmart-draggable-toggle` · **Version:** ikke versioneret · **Repo:** [MRDonnii/mysmart-draggable-toggle](https://github.com/MRDonnii/mysmart-draggable-toggle) · **Bruges i:** ikke fundet i live dashboards

Klikbar og trækbar toggle-switch.

- `entity` — **påkrævet** entity-id
- `orientation` — tekst, standard `"vertical"`
- `size` — tekst, standard `"large"`
- `center_card` — bool, standard `true`
- `hide_icons` — bool, standard `false`
- `color_bg`, `color_icon`, `color_active`, `color_icon_active`, `color_off` — CSS-farver/gradients med defaults

---

### energy-fjernvarme-labels.js
**Ikke et kort** — intet `customElements.define`. Et MutationObserver-script der omskriver "gas"/"Gasforbrug" til "fjernvarme"/"Fjernvarmeforbrug" på HA's native `/energy`-side. Indlæses globalt som en Lovelace-resource og vågner selv når `window.location.pathname` matcher `/config/energy` eller `/energy`. Ingen config.

---

### hyacintvej-home-card (dir)
**Tag:** `custom:hyacintvej-home-card` · **Version:** 1.3.2 · **Repo:** ikke publiceret · **Bruges i:** ikke fundet i live dashboards

Let, bespoke HTML/JS-forside. `setConfig` gemmer config-objektet, men intet i filen læser det bagefter — alle entity-id'er, tekster og opførsel er hardcodet i render-logikken. Kortet er reelt ikke konfigurerbart i praksis; nævnt her for fuldstændighedens skyld.

---

## Ikke publiceret separat

To filer er bevidst holdt uden for GitHub:

- **`hyacintvej-home-card`** — kortet gemmer `setConfig`-værdien, men bruger den aldrig; alle entity-id'er og tekster (inklusive rigtige for- og efternavne på husstandens medlemmer og gadenavnet) er hardcoded direkte i render-logikken i stedet for at gå gennem config. Det kræver en omskrivning til rigtig config-drevet kort, før det giver mening at dele det — ellers ville det bare være denne husstands egne persondata, ikke et genbrugeligt design.
- **`energy-fjernvarme-labels.js`** — ikke et kort (intet `customElements.define`), men et lille DOM-script der omskriver "gas" til "fjernvarme" på HA's indbyggede `/energy`-side. Holdt uden for kataloget over faktiske kort.

Alle øvrige kort — inklusive de tre der tidligere var udeladt her (`ha-license-plate-card`, `ha-person-detection-card`, `ha-tesla-vehicle-card`) og de ældre rod-niveau `.js`-filer — er nu publiceret som selvstændige repos. De indeholder kun generisk kort-kode: entity-id'er i defaults er navneeksempler til udskiftning, ikke data der afslører noget om husstanden. Et enkelt hardcoded internt id (`ha-tesla-vehicle-card`s EV Ledger-integrations-id) blev fjernet fra den publicerede udgave og gjort til et påkrævet config-felt i stedet.
