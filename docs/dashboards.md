# Dashboards → kort

Hver linje er `type: custom:<tag>` fundet i det pågældende dashboards Lovelace-config. `-stue`-varianterne af Energi og Teknik Overblik genbruger de samme korttyper i et andet layout og er ikke listet separat. Fuld config pr. kort: [cards.md](cards.md).

## Hjem Overblik (`hjem-overblik`)

Forsiden. Energi/vand/varme-status, kalender, personer, kameraer, rum, sikkerhed, pool, kæledyr.

| Kort | Tag |
|---|---|
| [AI-forbrug](cards.md#ha-ai-usage-card) | `custom:ha-ai-usage-card` |
| [Elpris](cards.md#ha-electricity-price-card) | `custom:ha-electricity-price-card` |
| [Kameraer](cards.md#ha-home-camera-card) | `custom:ha-home-camera-card` |
| [Header / vejr / alarmer](cards.md#ha-home-header-card) | `custom:ha-home-header-card` |
| [Rumoverblik](cards.md#ha-home-room-overview-card) | `custom:ha-home-room-overview-card` |
| [Husstatus-knapper + forside-widgets](cards.md#ha-home-status-card) | `custom:ha-home-status-card`, `custom:ha-home-summary-card`, `custom:ha-home-desktop-layout-card` |
| [Sporing (børn)](cards.md#ha-kid-tracker-card) | `custom:ha-kid-tracker-card` |
| [Personoversigt](cards.md#ha-person-overview-card) | `custom:ha-person-overview-card` |
| [Kæledyrspleje](cards.md#ha-pet-care-card) | `custom:ha-pet-care-card` |
| [Pool](cards.md#ha-pool-card) | `custom:ha-pool-card` |
| [Pool-indstillinger](cards.md#ha-pool-settings-card) | `custom:ha-pool-settings-card` |
| [Security center](cards.md#ha-security-center-card) | `custom:ha-security-center-card` |
| [Indstillingscenter](cards.md#ha-settings-center-card) | `custom:ha-settings-center-card` |

## Energi Overblik (`energi-overblik`)

Varmepumper, fjernvarme, ventilation, elpris, radiatorer, vejr.

| Kort | Tag |
|---|---|
| [AC & varmepumper](cards.md#ha-ac-climate-card) | `custom:ha-ac-climate-card` |
| [Fjernvarme (Calefa)](cards.md#ha-fjernvarme-house-card) | `custom:ha-fjernvarme-house-card-v2`, `custom:ha-calefa-details-card` |
| [Varmepumpe vs. fjernvarme-økonomi](cards.md#ha-heat-economy-card) | `custom:ha-heat-economy-card` |
| [Varmeoptimering / diagnose](cards.md#ha-heating-diagnostics-card) | `custom:ha-heating-diagnostics-card` |
| [Varmepumper](cards.md#ha-heat-pump-overview-card) | `custom:ha-heat-pump-overview-card` |
| [Strømpris / effekt-flow](cards.md#ha-power-flow-card) | `custom:ha-power-flow-card` |
| [Radiatoroverblik](cards.md#ha-radiator-overview-card) | `custom:ha-radiator-overview-card` |
| [Temperaturer & setpunkter](cards.md#ha-temperature-target-card) | `custom:ha-temperature-target-card` |
| [Ventilation (Dantherm)](cards.md#ha-ventilation-card) | `custom:ha-ventilation-card`, `custom:ha-ventilation-details-card` |
| [Vandforbrug](cards.md#ha-water-meter-card) | `custom:ha-water-meter-card` |
| [Vejr og varsler](cards.md#ha-weather-card) | `custom:ha-weather-card` |
| [AC-temperaturstyring (ældre)](cards.md#ac-temperature-control-cardjs) | `custom:ac-temperature-control-card` |

## Teknik Overblik (`teknik-overblik`)

Overvågning/Protect, robotter, servere, Tesla, sikkerhed.

| Kort | Tag |
|---|---|
| [Kamera-hub](cards.md#ha-camera-hub-card) | `custom:ha-camera-hub-card` |
| [Døre og vinduer](cards.md#ha-door-window-card) | `custom:ha-door-window-card` |
| [Kiosk-pc](cards.md#ha-kiosk-server-card) | `custom:ha-kiosk-server-card` |
| [Robotplæneklipper](cards.md#ha-lawn-mower-card) | `custom:ha-lawn-mower-card` |
| [Nummerpladevagt](cards.md#ha-license-plate-card) | `custom:ha-license-plate-card` |
| [Personvagt](cards.md#ha-person-detection-card) | `custom:ha-person-detection-card` |
| [Robotstøvsuger (Roborock)](cards.md#ha-roborock-vacuum-card) | `custom:ha-roborock-vacuum-card` |
| [Robotcenter](cards.md#ha-robot-fleet-card) | `custom:ha-robot-fleet-card` |
| [Robotstøvsuger (simpel)](cards.md#ha-simple-vacuum-card) | `custom:ha-simple-vacuum-card` |
| [Tesla Vehicle Center](cards.md#ha-tesla-vehicle-card) | `custom:ha-tesla-vehicle-card`, `custom:ha-tesla-charge-popup-card` |
| [Unraid-server](cards.md#ha-unraid-server-card) | `custom:ha-unraid-server-card` |
| [Låst kort (ældre)](cards.md#locked-map-cardjs) | `custom:locked-map-card` |

## Internt (ikke en selvstændig dashboard-linje)

| Kort | Bruges fra |
|---|---|
| [Alarm-center popup](cards.md#ha-alarm-center-card) | Åbnes dynamisk fra `ha-home-header-card`, ikke som eget kort i en view |

## Bygget, men ikke fundet i nogen live dashboard lige nu

Enten interne "byggeklods"-kort (grid/generiske kontroller bygget til genbrug), erstattet af nyere kort, eller stadig kladde. Config findes stadig i [cards.md](cards.md) hvis de skal tages i brug:

`ha-agenda-card`, `ha-control-center-card`, `ha-house-mode-card`, `ha-house-status-card`, `ha-light-scene-card`, `ha-number-grid-card`, `ha-ops-status-card`, `ha-toggle-grid-card`, `calefa-number-control-card.js`, `hourly-weather-scroll-card.js`, `pool-forecast-card.js`, `pool-history-card.js`, `mysmart-draggable-toggle.js` samt et privat lokalt oversigtskort.

`energy-fjernvarme-labels.js` er ikke et kort — det er et globalt script der omskriver "gas" til "fjernvarme" på HA's indbyggede `/energy`-side.
