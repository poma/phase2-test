const fs = require('fs');
const {stringifyBigInts, unstringifyBigInts} = require('snarkjs/src/stringifybigint.js');
const BN128 =  require('snarkjs/src/bn128');

const bn128 = new BN128();

pk1 = require('./proving_key.json')
pk2 = require('./pk.json')
for(let prop in pk2) {
    pk1[prop] = pk2[prop]
}
fs.writeFileSync('transformed_pk.json', JSON.stringify(pk1, null, '  '))

vk1 = require('./verification_key.json')
vk2 = require('./vk.json')
for(let prop in vk2) {
    vk1[prop] = vk2[prop]
}
const json = unstringifyBigInts(vk1);
json.vk_alfabeta_12 = bn128.F12.affine(bn128.pairing( json.vk_alfa_1 , json.vk_beta_2 ));
fs.writeFileSync('transformed_vk.json', JSON.stringify(stringifyBigInts(json), null, '  '))
