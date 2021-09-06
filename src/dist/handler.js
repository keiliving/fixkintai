"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webclient = require("request");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
function requestLogin() {
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
    }, function (error, response, body) {
        // cookie ASP.NET_SessionId
        console.log(response.headers['set-cookie'][0].split(";")[0].slice(18, -1));
        var dom = new JSDOM(response.body);
        console.log(dom.window.document.getElementById("__VIEWSTATE").value);
        console.log(dom.window.document.getElementById("__EVENTVALIDATION").value);
    });
}
exports.default = requestLogin;
