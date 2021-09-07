require('dotenv').config();
const webclient = require("request");
const { JSDOM } = require("jsdom");

let viewstate!:string;
let eventvalidation!:string;
interface StringKeyObject {
  [key: string]: string|null|undefined;
}

function requestTopPage() {
  webclient.get({
    url: "https://www1.shalom-house.jp/komon/login.aspx",
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "ja",
      "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
      },
    body: null
  }, function (error:any, response:any, body:any){
    const dom = new JSDOM(response.body);
    const cookie:string = response.headers['set-cookie'][0].split(";")[0].slice(18, -1);
    viewstate = dom.window.document.getElementById("__VIEWSTATE").value;
    eventvalidation = dom.window.document.getElementById("__EVENTVALIDATION").value;
    requestLogin(viewstate,eventvalidation,cookie);
  });
}


const createbody = (viewstate: string, eventvalidation: string) => {
  let _bodyString = "";
  let loginBody:StringKeyObject = {
    "__LASTFOCUS" : null,
    "__VIEWSTATE" : encodeURIComponent(viewstate),
    "__VIEWSTATEGENERATOR" : process.env.VIEWSTATEGENERATOR,
    "__EVENTTARGET" :null,
    "__EVENTARGUMENT" : null,
    "__EVENTVALIDATION" : encodeURIComponent(eventvalidation),
    "hdnPS" :null,
    "txtID" : process.env.LOGINID,
    "txtPsw" : process.env.PASSWORD,
    "btnLogin.x" : "47",
    "btnLogin.y" : "38",
    "LoginedID" : null,
    "OverWrite" : null
  };
  for (let key in loginBody) {
    let value = loginBody[key]? loginBody[key] : "";
    _bodyString = _bodyString + key + "=" + value + "&";
  }
  return _bodyString;
};

function requestLogin(viewstate: string, eventvalidation: string, cookie: string){
  webclient.post({
    url: "https://www1.shalom-house.jp/komon/login.aspx",
    "headers": {
      "connection" : "keep-alive",
      "cache-control" : "max-age=0",
      "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "upgrade-insecure-requests": "1",
      "origin" : "https://www1.shalom-house.jp",
      "content-type": "application/x-www-form-urlencoded",
      "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "referer": "https://www1.shalom-house.jp/komon/login.aspx",
      "accept-language": "ja",
      "cookie": cookie
    },
    body: createbody(viewstate,eventvalidation)
  }, function (error:any, response:any, body:any){
    var session_id = response.headers['set-cookie'][0].split(";")[0];
    var token = response.headers['set-cookie'][1].split(";")[0];
    renderTopPage(session_id + "; " + token)
  });
}

function renderTopPage(cookie:string){
  webclient.get({
    url: "https://www1.shalom-house.jp/v25/komon/top.aspx",
    "headers": {
      "connection" : "keep-alive",
      "cache-control" : "max-age=0",
      "upgrade-insecure-requests": "1",
      "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "referer": "https://www1.shalom-house.jp/komon/login.aspx",
      "accept-language": "ja",
      "cookie": cookie
    }}, function (error:any, response:any, body:any){
      console.log(response)
    });
}

export default requestTopPage;