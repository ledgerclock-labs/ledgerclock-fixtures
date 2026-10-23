// Deliberately synthetic. Zero signatures are not valid network evidence.
export function encodeValue({arm=3,closeTime='1800000000',closeTimeMs='1800000000123'}={}){
 const u32=n=>{const b=Buffer.alloc(4);b.writeUInt32BE(n);return b},u64=n=>{const b=Buffer.alloc(8);b.writeBigUInt64BE(BigInt(n));return b};
 let p=[Buffer.alloc(32),u64(closeTime),u32(0),u32(arm)];
 if(arm===3||arm===4)p.push(u64(closeTimeMs));
 if(arm===2||arm===4)p.push(Buffer.alloc(64),u32(29));
 if(arm!==0)p.push(u32(0),Buffer.alloc(32),u32(64),Buffer.alloc(64));
 return Buffer.concat(p).toString('base64');
}
export const sample={schema:1,provenance:'synthetic CAP-0088 compatibility corpus; not signed network data',initialProtocol:29,ledgers:[
 {sequence:100,protocol:30,valueXdr:encodeValue({arm:1,closeTime:'1800000000'})},
 {sequence:101,protocol:30,valueXdr:encodeValue()},
 {sequence:102,protocol:30,valueXdr:encodeValue({arm:4,closeTimeMs:'1800000000999'})},
 {sequence:103,protocol:30,valueXdr:encodeValue({closeTime:'1800000001',closeTimeMs:'1800000001000'})}
],timeBounds:{minTime:'1800000000',maxTime:'1800000000'}};
