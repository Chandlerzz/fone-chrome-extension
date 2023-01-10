console.log("service worker is running");
let headers = {};
// @ts-nocheck
const RULE_ID = 1;

const addRulesets = () => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: RULE_ID,
        priority: 1,
        action: {
          type: "modifyHeaders",
          responseHeaders: [
            {
              header: "content-security-policy",
              operation: "remove",
            },
            {
              header: "x-frame-options",
              operation: "remove",
            },
          ],
        },
        condition: {
          urlFilter: "*",
          resourceTypes: ["sub_frame"],
        },
      },
    ],
    removeRuleIds: [RULE_ID],
  });
};

const removeRulesets = () => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID],
  });
};

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "send-background") {
    chrome.runtime.sendMessage({
      type: "create",
      headers: JSON.stringify(headers),
    });
  }
});

function onBeforeRequest(details) {
  const tabId = details.tabId;
  if (details.url.endsWith("GetFContent")) {
    const uint8array = new Uint8Array(details.requestBody.raw[0].bytes);
    const data = String.fromCharCode.apply(null, uint8array);
    chrome.tabs.sendMessage(
      tabId,
      { data: data },
      function (response) {
      },
    );
  }
}
function onBeforeSendHeaders(details) {
}

chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequest,
  {
    urls: [
      "http://10.10.9.27/api/FContent/GetFContent",
      "https://fone.risen.com:80/api/FContent/GetFContent",
    ],
  },
  ["requestBody"],
);
chrome.webRequest.onBeforeSendHeaders.addListener(
  onBeforeSendHeaders,
  {
    urls: [
      "http://10.10.9.27/api/FContent/getFContentsAndFavorites",
      "http://10.10.9.27/api/FContent/GetFContent",
      "https://fone.risen.com:80/api/FContent/getFContentsAndFavorites",
      "https://fone.risen.com:80/api/FContent/GetFContent",
    ],
  },
  ["requestHeaders"],
);

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
chrome.runtime.onInstalled.addListener(() => {
  addRulesets();
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
