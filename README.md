# History Cards prototype

A throwaway prototype of the history card game (`.scratch/history-card-game/spec.md`), built to design B+ ("Quiz Night with pictures") from the design canvas. It is a static PWA with no build step and no backend. Three stories are hard-coded in `js/data.js`, with 10 cards each.

The card text is sample copy and has not been fact-checked. Every picture is a stand-in drawing (`js/art.js`), so every card is tagged RECREATED.

## Run it locally

```bash
python3 -m http.server 8137 --directory prototype
```

Open http://localhost:8137. The service worker only runs on `localhost` or HTTPS.

## Test links

| Link | What it does |
|---|---|
| `?story=molasses` (or `emu`, `dancing`) | A video link: ticks only that story and deals a round straight away |
| `?reset=1` | Clears what the phone remembers (ticks, Played, first-visit coach, install prompt) |
| `?install=inapp` / `android` / `ios` | Forces that install prompt after every round, on any device |
| `tests.html` | Runs the round rule tests in the browser |

## Files

- `js/round.js`: the round engine as pure functions (5 cards, one per mode, Skip, marks, Undo)
- `js/app.js`: the screens and navigation
- `js/cards.js`: card fronts and backs for each mode
- `js/install.js`: the install prompt for each browser, plus service worker registration
- `sw.js`: offline cache. It fetches from the network first, so updates show up straight away

## Deploy

The prototype is published to GitHub Pages from its own public repository, which contains only this folder. To update it, copy this folder over that repository's files, then commit and push.
