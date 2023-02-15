const polygon = require("./did:polygon.js");
const web     = require("./did:web.js");

var Creater = function(method) {
  switch(method) {
    case "polygon":
      return { create: polygon }
    case "web":
      return { create: web }
    default:
      console.log(`did method を指定してください
$ npm run create --polygon or --web
      `)
  }
}

module.exports = Creater;