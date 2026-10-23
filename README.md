# LedgerClock fixtures

Deterministic, explicitly synthetic CAP-0088 compatibility corpus.

LedgerClock helps Stellar integrators test assumptions affected by CAP-0088. The MVP decodes standalone StellarValue XDR variants 0–4, preserves uint64 timestamps as decimal strings, checks previous-ledger protocol gates, and replays inclusive transaction time bounds. The included synthetic upgrade corpus demonstrates a bad millisecond-as-second adapter and multiple ledgers in the same whole second.

## Run the integrated workspace

```sh
mkdir ledgerclock && cd ledgerclock
git clone https://github.com/ledgerclock-labs/ledgerclock-decoder.git
git clone https://github.com/ledgerclock-labs/ledgerclock-engine.git
git clone https://github.com/ledgerclock-labs/ledgerclock-backend.git
git clone https://github.com/ledgerclock-labs/ledgerclock-frontend.git
git clone https://github.com/ledgerclock-labs/ledgerclock-fixtures.git
node --test ledgerclock-*/test.mjs
node ledgerclock-backend/server.mjs
# In another terminal:
node ledgerclock-frontend/server.mjs
```

Open http://127.0.0.1:4360, load the synthetic corpus, then run a review. Node 22 or newer; no external runtime packages. Clone repositories as siblings with their original names because imports cross component boundaries. Backend port 4361; frontend port 4360.

## Scope and evidence

This is a new MVP, not a production validator. Synthetic fixtures use zero signatures; no signatures, quorum, ledger hashes, upgrades or consensus authenticity are verified. The parser accepts standalone StellarValue, not arbitrary LedgerCloseMeta or a complete LedgerHeader. Protocol 30 format tests are local fixtures, not proof of activation on public testnet. Reviews are limited to 1,000 contiguous ledgers and 1 MiB HTTP bodies. Reports are held in memory (last 100); export anything you need before restarting. No signing or transaction submission.

Time bounds use whole seconds, inclusive maxTime, and zero maxTime as unlimited. The upgrade ledger still uses the old format; the following ledger uses millisecond arms. A shared second is a compatibility observation, not itself a protocol failure. Input SHA-256 identifies the exact JSON serialization, not a canonical semantic representation.

## Sources

- [CAP-0088](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0088.md)
- [StellarValue schema](https://github.com/stellar/stellar-xdr/blob/master/Stellar-ledger.x)
- [Bell announcement](https://stellar.org/blog/developers/introducing-bell-protocol-30-on-stellar)

See CONTRIBUTING.md, SECURITY.md and ROADMAP.md. MIT license.

## Observed testnet replay

`testnet-horizon-response.json` is a public Horizon response captured 2026-10-23 from `https://horizon-testnet.stellar.org/ledgers?order=desc&limit=3`. `testnet-corpus.json` contains the standalone StellarValue extracted from each header using Stellar SDK 17.3.0. Ledgers 5351480–5351482 are Protocol 29, arm 1. `testnet-report.json` records the timing replay. This is a read-only capture, not a deployment or proof of Protocol 30 activation. The source node's data is not independently authenticated.
