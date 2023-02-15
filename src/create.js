
// load environment variables
require('dotenv').config(); const env = process.env;

const fs = require('fs');

const Creater = require("./creater");

const now = new Date()
const unixtime = Math.floor(now.getTime() / 1000) ;

const main = async () => {
  // did create
  const didMethod = process.argv[2]
  const creater = Creater(didMethod);
  const did = await creater.create(env)

  // export 
  // fs.writeFileSync(`./docs/did-${unixtime}.json`, JSON.stringify(did, null, 2));
  // fs.writeFileSync(`./keys/jwk-${unixtime}.json`, JSON.stringify(jwkPrivateKey, null, 2));

  console.log(did)
}

main();
