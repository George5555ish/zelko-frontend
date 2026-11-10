# Celebrity reference portraits

## Commons-50 (preferred)

```bash
cd backend && npm run fetch:commons && npm run embed:celebrities
```

- Writes `{id}.jpg` + `attribution.json` from Wikimedia Commons (CC BY / BY-SA / CC0 / PD only).
- Credits page: `/credits/celebrities`
- `sketches/` holds the old placeholder drawings (feature-flag `USE_SKETCH_FALLBACK`).

## Manual drop-in

Place licensed `{id}.jpg` here, update `attribution.json`, set `photoReady: true`, then re-embed.

