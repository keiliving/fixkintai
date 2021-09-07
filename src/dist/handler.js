"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var webclient = require("request");
var JSDOM = require("jsdom").JSDOM;
var value = process.env.HOGE;
var viewstate;
var eventvalidation;
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
    }, function (error, response, body) {
        var dom = new JSDOM(response.body);
        var cookie = response.headers['set-cookie'][0].split(";")[0].slice(18, -1);
        viewstate = dom.window.document.getElementById("__VIEWSTATE").value;
        eventvalidation = dom.window.document.getElementById("__EVENTVALIDATION").value;
        requestLogin(viewstate, eventvalidation, cookie);
    });
}
var createbody = function (viewstate, eventvalidation) {
    var _bodyString = "";
    var loginBody = {
        "__LASTFOCUS": null,
        "__VIEWSTATE": encodeURIComponent(viewstate),
        "__VIEWSTATEGENERATOR": "2033F6F8",
        "__EVENTTARGET": null,
        "__EVENTARGUMENT": null,
        "__EVENTVALIDATION": encodeURIComponent(eventvalidation),
        "hdnPS": null,
        "txtID": "B1229577",
        "txtPsw": "1d181e",
        "btnLogin.x": "47",
        "btnLogin.y": "38",
        "LoginedID": null,
        "OverWrite": null
    };
    for (var key in loginBody) {
        var value_1 = loginBody[key] ? loginBody[key] : "";
        _bodyString = _bodyString + key + "=" + value_1 + "&";
    }
    return _bodyString;
};
function requestLogin(viewstate, eventvalidation, cookie) {
    webclient.post({
        url: "https://www1.shalom-house.jp/komon/login.aspx",
        "headers": {
            "connection": "keep-alive",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
            "sec-ch-ua-mobile": "?0",
            "upgrade-insecure-requests": "1",
            "origin": "https://www1.shalom-house.jp",
            "content-type": "application/x-www-form-urlencoded",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-user": "?1",
            "sec-fetch-dest": "document",
            "referer": "https://www1.shalom-house.jp/komon/login.aspx",
            "accept-language": "ja",
            "cookie": cookie
        },
        body: createbody(viewstate, eventvalidation)
    }, function (error, response, body) {
        console.log(response.headers['set-cookie']);
        console.log(value);
    });
}
exports.default = requestTopPage;
