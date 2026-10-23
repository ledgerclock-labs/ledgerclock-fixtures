import test from 'node:test';import assert from 'node:assert/strict';import {sample,encodeValue} from './index.mjs';import {review} from '../ledgerclock-engine/index.mjs';
test('corpus explicitly synthetic',()=>assert.match(sample.provenance,/synthetic/));
test('four independent protocol cases',()=>assert.equal(review(sample).rows.length,4));
test('empty tx set ms arm covered',()=>assert.equal(review(sample).rows[2].empty,true));
test('fixture encoding deterministic',()=>assert.equal(encodeValue(),encodeValue()));

import {readFile} from 'node:fs/promises';
test('observed protocol 29 testnet corpus replays',async()=>{const c=JSON.parse(await readFile(new URL('./testnet-corpus.json',import.meta.url)));assert.equal(review(c).valid,true);assert.equal(c.ledgers.length,3)});
