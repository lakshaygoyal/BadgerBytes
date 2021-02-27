import firebase from 'firebase/app';
const { getTokenFromGCPServiceAccount } = require('@sagi.io/workers-jwt')
import 'firebase/firestore';
async function doit() {
  const firebaseConfig = {
    apiKey: "AIzaSyAn8vV-KmVKtcM1vXIP_zqPuRruKNlYJGU",
    authDomain: "food-delivery-app-5e686.firebaseapp.com",
    databaseURL: "https://food-delivery-app-5e686-default-rtdb.firebaseio.com",
    projectId: "food-delivery-app-5e686",
    storageBucket: "food-delivery-app-5e686.appspot.com",
    messagingSenderId: "492916991530",
    appId: "1:492916991530:web:7961ec31fce89b77378553",
    measurementId: "G-519GMXMHP7"
  }
  var SERVICE_ACCOUNT_JSON = {
    "type": "service_account",
    "project_id": "hidden-terrain-256807",
    "private_key_id": "88726e64c6ee2c90a841121528539b0f568e6800",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDDcI7f44/aMehb\nCVzZUBEsXBlZIm1jnx78Rn8afI16JytshxvkJpQRipnx/6MS3CEqkRV2BG95uRex\nY939dkl7CkEH+GdXOsjJeR7a8LzTKwReEaUYc8LyA2n2+b2XCCXkgBca29/CLJRG\nbXcql2hHT6d7DvB+mK60/hO8Z1HOexNN68RNG6YS2igtxVUtYds3WkAjmeF9VQLC\nE/31ZAYLAzjrQC70dYaldbsr5qv5qVA0Hkcec5MDo6Dhg/TKkrnWO8WkYMXR/fag\nkokvUowfr343pc5YqdTDVKcSD3J8phZepqG/4dN9edBZ9y3cWCa4aUPFQIQpfOTr\nvWZnWfYhAgMBAAECggEAMuw9DfEJJl0iobXKz4ShNOG6aRMjVXW8aRclPw18/3r9\nQYXiqouywO9QNVHad6uLqL+sy9dUBG9J0RqoWMZdVwXQ8/axVnUmo/g/JeTcDlmD\nBc+rKLfg75YcIhHoaFXjKaqGWqU3pCxhZghXqG1S6mHCzbmSyCmYO+iH0+tH0Xij\nNQk9kN5xlx8dRoTpAtEjIlpYuxrpP37YTYa2MROhJWBUXHvIFJR1tDSzcIMPiBiM\n6qfrlCqE25vD/HoVrpELu0jr4vRtbcAkXJVmN/1nbdRQ4YXc5ECEepsVviTGfEQb\n6zk/Tj0ompGoPLE+aa6CmqMAwrS1Cz6Bmohcc3Bn0QKBgQDvgM21NfLfB0p65M7+\nx2XN5mTS8QxzX7Gqyu1adw5bpFCXlu8qnDFDLHYUSzRtZH/rEqu4x2KYERXBIMZ6\n+tvYdyQsY2ir1AzHHw1MqTwP/O9bzjNUZfxkw/kDXCFiK+zHR0YpFnds1mViwXGP\nJqNazv5UP329S5ZtQfj3OxPffwKBgQDQ5sbT3wejhWdu1awqREA0mjdnepQUydzL\nk57B1w8NCDowo4fwQBd+aRI/PHf0p97H2TwDJ6kpY+IDnBGyh9Uwdpbr4/SOxoJG\nSFhmHsUePRR3t7kkOR4qNXR17/DAuSXYyTja5VDfT43CeWB0JjDdSPs5y9crX2BO\n3rBcSUj6XwKBgQCjiLJtMloUuXi8szE3vFUiI1fixN64hLXepdMtuy9dmbPB3jiO\nQrpMYLZ7ouI4c6/4hfYlJFeI99l/1m5QGKw2gRt9B5+3/AGBkQ1WtBOj4xRY/lIE\nJeMRttJ33deZnd5+L4eTlJiVA0uVA/sTQNG3trDoO7YSo+Mh1TM3NOqb5wKBgQDQ\nD1muQa9A/Shkamo7+pgcDBDsflioT9kZ5WA0Xba+2xfhw64r6hm8LHghBV/QC7ZG\nQ6WS2tiPwcyknbe+oa0CxMpSDUtRPIMZ7wokQ7c+A8Wz6wd5/W1+ypjAsgaOXJlG\nTjvTQJwInhppvCwF4te+PecBzHT03Nx2ETOD5vXJbwKBgQCqHAZZHMO0J2D2ntVV\nWc8eVphK8PHwJeEV71cNtwRuFD0VeuDtCwMvJ7xrOwNrl3ZVbor5LOeK1HW35/hw\nxgRSe+arhEgneYg75mjfjrcdCpmxYfPl3VBZyp1wqMeMhUetqfo3ED/vSYJj0hqK\nytRjGYTk5O4jc0v+vJ4q/Ga2bw==\n-----END PRIVATE KEY-----\n",
    "client_email": "hidden-terrain-256807@appspot.gserviceaccount.com",
    "client_id": "105107378343700534136",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/hidden-terrain-256807%40appspot.gserviceaccount.com"
  }
  const serviceAccountJSON = SERVICE_ACCOUNT_JSON
  const aud = `https://firestore.googleapis.com/google.firestore.v1.Firestore`

  const token = await getTokenFromGCPServiceAccount({ serviceAccountJSON, aud })

  const headers = { Authorization: `Bearer ${token}` }

  const projectId = "hidden-terrain-256807"
  const collection = 'users'
  const document = 'zEPE9KpUaKUKS5ufWwl9'

  const docUrl =
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`
    + `/${collection}/${document}/fields`

  const response = await fetch(docUrl, { headers })

  const documentObj = await response.json()

  return documentObj
}
// THe above code creates JWT token and gives access to the data base.

/* 
EndPoint: /Signup
*/

async function signUp() {
  await NAMESPACE.put('Sai', 'kokokola', { expirationTtl: 100000 })
  var x = await NAMESPACE.get('Sai')
  return x;
}








addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(req) {
  let headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  });
  var lis = await NAMESPACE.list()
  console.log(lis)
  var url = req.url
  var newUrl = new URL(url)
  var path = newUrl.pathname
  /* 
    Route: /signUp
  */
  if (path === '/signUp') {
    var body = await req.json()
    var name = body.name
    var email = body.email
    var password = body.password
    var phone = body.phone
    var address = body.address
    var type = body.type
    var valid = await NAMESPACE.get(email)
    var res = {
      "status": "error"
    }
    //if(body==null)
    if (valid === null) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"username":email, "name":name, "password":password, "phone": phone, "address":address, "type":type});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      var t = await fetch("https://food-badger.web.app/api/v1/users", requestOptions)

      ////////// Sai Teja Property  //////////
      await NAMESPACE.put(email, password,{expirationTtl: 1000000000})
      var resp =await t.json()
      return new Response(JSON.stringify(resp),{
        status: 200,
        headers: headers
      })
    }
    if(valid!= null){
    return new Response(JSON.stringify(res),{
      status: 200,
      headers: headers
    })
    }

  }
  /*
    Route: /signIn
  */
  if (path === '/signIn') {
    
    var body = await req.json()
    var email = body.email
    var password = body.password
    var valid = await NAMESPACE.get(email)
    var res = {
      "status": "error"
    }
    if(valid == null){
      return new Response(JSON.stringify(res),{
        status: 200,
        headers: headers
      });
    }
    if (valid === password) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"email":email});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      var t = await fetch("https://food-badger.web.app/api/v1/users/signIn", requestOptions)
      var resp = await t.json()
      
      return new Response(JSON.stringify({"id":resp}),{
        status: 200,
        headers: headers
      })
    }
  }
  return new Response("EndPoint Not Found",{
    status: 200,
    headers: headers
  })
}

