const { createDID } = require("@ayanworks/polygon-did-registrar");
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
const polygon = async (env) => {
  const isTestnet = env.POLYGON_IS_TESTNET
  // const pubKey = env.POLYGON_PUBLIC_KEY
  // const priKey = env.POLYGON_PRIVATE_KEY
  

  const txHash = await createDID("testnet");

  if(txHash.success === false) { return }

  // did document object
  const ddo = Object.assign(context, skeleton)

  // const scheme = Boolean(isTestnet) ? 'did:polygon:testnet' : 'did:polygon:mainnet'
  {
    ddo.id = txHash.data.did
    {
      ddo.verificationMethod[0] = verificationMethod
      ddo.verificationMethod[0].id = txHash.data.did
      // ddo.verificationMethod[0]..consoller = "EcdsaSecp256k1VerificationKey2019"
      ddo.verificationMethod[0].publicKeyBase58 = txHash.data.publicKeyBase58
    }
  }

  return ddo
}


module.exports = polygon;
