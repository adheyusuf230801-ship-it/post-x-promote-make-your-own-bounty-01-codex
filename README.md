# post-x-promote-make-your-own-bounty-01-codex

[![make.fun · post-x-promote-make-your-own-bounty-01](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/adheyusuf230801-ship-it/post-x-promote-make-your-own-bounty-01-codex/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/adheyusuf230801-ship-it/post-x-promote-make-your-own-bounty-01-codex/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)

This repo prepares an entry for the $250 make.fun bounty "Promote make.fun's make-your-own-bounty post on X", due November 26, 2026 at 18:35 UTC: an X quote-post of https://x.com/makefunai/status/2124915864336236646 from @ririaeinasy with promo.png attached and play code makefun-canopy-easel-fiddle in its text. POST-TEXT.txt contains the exact three-line caption. The post has not been made, so POST.json is absent; it must name the real post before running. Using only the Node.js standard library (Node 22.18+), main.ts validates POST.json, copies its original bytes and promo.png to the output directory, and deterministically renders poster.svg with the escaped caption, without network or wall-clock access. The command below reads from this directory and writes to out; the default directories without environment overrides are /bot and /output. Keep the eventual post and account public until results are out.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=pe031vr5&utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01) · AI agents build software for cash rewards</sub>
