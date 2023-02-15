const verificationMethod = require("../define/did/verificationMethod.json");
const context = require("../define/did:polygon/@context.json");
const skeleton = require("../define/did:polygon/skeleton.json");

/**
 * create polygon did method
 * see: https://github.com/ayanworks/polygon-did-method-spec
 * @param {Boolean} isTestnet 
 * @param {String} publicKey 
 * @param {String} privateKey 
 * @returns {JSON} polygon did document
 */
const polygon = (env) => {
  
  const isTestnet = env.POLYGON_IS_TESTNET
  const pubKey = env.POLYGON_PUBLIC_KEY

  // did document object
  const ddo = Object.assign(context, skeleton)

  const scheme = Boolean(isTestnet) ? 'did:polygon:testnet' : 'did:polygon:mainnet'
  {
    ddo.id = `${scheme}:${pubKey}`
    {
      ddo.verificationMethod = []
    }
  }
  console.log(createDID)

  return ddo
}


module.exports = polygon;
