#!/usr/bin/env node
const fs = require('fs')
const snarkjs = require('snarkjs')
const bigInt = snarkjs.bigInt
const buildGroth16 = require('websnark/src/groth16')
const websnarkUtils = require('websnark/src/utils')


async function main() {
  let circuit = require('./circuit.json')
  const input = require('./input.json')
  let proving_key = fs.readFileSync('./transformed_pk.bin').buffer
  let groth16 = await buildGroth16()

  console.log('Generating SNARK proof')
  const proofData = await websnarkUtils.genWitnessAndProve(groth16, input, circuit, proving_key)
  delete proofData['publicSignals']
  proofData.protocol = 'groth'
  fs.writeFileSync('proof1.json', JSON.stringify(proofData, null, ' '))
  process.exit(0)
}

main()