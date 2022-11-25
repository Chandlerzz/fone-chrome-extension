console.log("service worker is running");
let headers = {};
let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "send-background") {
    chrome.runtime.sendMessage({
      type: "create",
      headers: JSON.stringify(headers),
    });
  }
});

function onBeforeRequest(details) {
}
function onBeforeSendHeaders(details) {
  let requestHeaders = details.requestHeaders;
  requestHeaders.forEach((item) => {
    headers[item.name] = item.value;
  });
}

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {
  urls: [
    "http://10.10.9.27/api/affiche/GetReadMustList",
    "https://fone.risen.com:80/api/affiche/GetReadMustList",
  ],
}, ["requestBody"]);
chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, {
  urls: [
    "http://10.10.9.27/api/affiche/GetReadMustList",
    "https://fone.risen.com:80/api/affiche/GetReadMustList",
  ],
}, ["requestHeaders"]);

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const foneProd = "https://fone.risen.com/index";
const foneDev = "http://10.10.9.27:8080/index";

function openMenu(state) {
  var risen = document.querySelector("#risen");
  if (state === "ON") {
    risen.setAttribute("name", "menu");
    risen.classList = ["risen-show"];
  } else if (state === "OFF") {
    risen.setAttribute("name", "");
    risen.classList = ["risen-unshow"];
  }
}

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(foneProd) || tab.url.startsWith(foneDev)) {
    chrome.runtime.getURL("risen.html");
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: openMenu,
      args: [nextState],
    });
  }
});

chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    for (let item in request) {
      const obj = {};
      obj[item] = request[item];
      chrome.storage.sync.set(obj, function () {
        console.log("Value is set to " + item);
      });
    }
    setTimeout(function () {
      chrome.tabs.create({ url: request.openUrlInEditor });
    }, 500);
  },
);
