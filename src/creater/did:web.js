const crypto = require("crypto");

const verificationMethod = require("../define/did/verificationMethod.json");
const context = require("../define/did:web/@context.json");
const skeleton = require("../define/did:web/skeleton.json");

/**
 * create polygon did method
 * see: https://github.com/ayanworks/polygon-did-method-spec
 * @param {Boolean} isTestnet 
 * @param {String} publicKey 
 * @param {String} privateKey 
 * @returns {JSON} polygon did document
 */
const web = async (env) => {
  const isTestnet = env.POLYGON_IS_TESTNET
  // const pubKey = env.POLYGON_PUBLIC_KEY
  // const priKey = env.POLYGON_PRIVATE_KEY
  

  // generate keypair
  const keypair = crypto.generateKeyPairSync('ec', {namedCurve: env.CRV})
  const jwkPublicKey = keypair.publicKey.export({format: 'jwk'})
  const jwkPrivateKey = keypair.privateKey.export({format: 'jwk'})


  // did document object
  const ddo = Object.assign(context, skeleton)

  const scheme = Boolean(isTestnet) ? 'did:polygon:testnet' : 'did:polygon:mainnet'
  {
    // id (see: https://w3c-ccg.github.io/did-method-web/#method-specific-identifier)
    ddo.id = 'did:web:' + env.DOMAIN + (typeof env.REPOS === 'string' ? `:${env.REPOS}` : '')
    {
      const kid = ddo.id + '#key-0';
      ddo.verificationMethod[0] = verificationMethod

      ddo.verificationMethod[0].id = kid
      ddo.verificationMethod[0].type = "JsonWebKey2020"
      ddo.verificationMethod[0].publicKeyJwk = jwkPublicKey
    }
  }

  return ddo
}

module.exports = web;
