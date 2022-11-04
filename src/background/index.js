console.log("service worker is running");
let headers ={}
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'send-background') {
        chrome.runtime.sendMessage({type:"create",
          headers:JSON.stringify(headers)
        })
    }
});

function onBeforeRequest(details){
}
function  onBeforeSendHeaders(details){
  let requestHeaders = details.requestHeaders;
  requestHeaders.forEach(item => {
    headers[item.name] = item.value
  })
}

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {urls: ["http://10.10.9.27/api/affiche/GetReadMustList","https://fone.risen.com:80/api/affiche/GetReadMustList"]}, ['requestBody']);
chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, {urls: ["http://10.10.9.27/api/affiche/GetReadMustList","https://fone.risen.com:80/api/affiche/GetReadMustList"]}, ['requestHeaders']);



export {}
