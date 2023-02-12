// const jose = require('jose');
const fs = require('fs');
const crypto = require("crypto");

// load environment variables
require('dotenv').config(); const env = process.env;

const now = new Date()
const unixtime = Math.floor(now.getTime() / 1000) ;

// generate keypair
const keypair = crypto.generateKeyPairSync('ec', {namedCurve: env.CRV})
const jwkPublicKey = keypair.publicKey.export({format: 'jwk'})
const jwkPrivateKey = keypair.privateKey.export({format: 'jwk'})

/**
 * see: 
 * 1. https://w3c-ccg.github.io/did-method-web/
 * 2. https://learn.mattr.global/tutorials/dids/did-web
 */

// load the skeleton
const did = require('./define/did:web/skeleton.json');
const verificationMethod = require('./define/did:web/verificationMethod.skeleton.json');

// id (see: https://w3c-ccg.github.io/did-method-web/#method-specific-identifier)
const id = 'did:web:' + env.DOMAIN + (typeof env.REPOS === 'string' ? `:${env.REPOS}` : '')
did.id = id

// verificationMethod (see: https://www.w3.org/TR/did-core/#verification-methods)
{
  const kid = id + '#key-0';
  const controller = id;

  verificationMethod.id = kid
  verificationMethod.type = "JsonWebKey2020"
  // verificationMethod.type = "Ed25519VerificationKey2020" ???
  verificationMethod.controller = controller
  switch(verificationMethod.type) {
    case "JsonWebKey2020":
    verificationMethod.publicKeyJwk = jwkPublicKey
    break;
    default:
    console.log(`ERROR: unknown verificationMethod.type: ${verificationMethod.type}`)
    process.exit(1)
  }
  did.verificationMethod.push(verificationMethod)
  
  did.authentication.push(kid)
  did.assertionMethod.push(kid)
  // did.keyAgreement.push(kid)
}

fs.writeFileSync(`./docs/did-${unixtime}.json`, JSON.stringify(did, null, 2));
fs.writeFileSync(`./keys/jwk-${unixtime}.json`, JSON.stringify(jwkPrivateKey, null, 2));

