import { getDefaultKeyString, keyEventToString } from "./keycodes.js";
// shortcut for the website www.fone.risen.com

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500;
  }
  let _lastTime = null;
  // 返回新的函数
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime;
    }
  };
}
document.addEventListener("keydown", function (evt) {
  var key = keyEventToString(evt);
  if (key === "Control+S") {
    event.preventDefault();
    throttle(function () {
      var save = document.querySelector(".save-btn");
      if (save) {
        save.click();
      }
    })();
  }
  if (key === "Control+R") {
    event.preventDefault();
    throttle(function () {
      var run = document.querySelector(".run-div button");
      if (run) {
        run.click();
      }
    })();
  }

  if (evt.code === "Enter") {
    event.preventDefault();
    throttle(function () {
      var confirm = Array.from(document.querySelectorAll(".ant-btn"))
        .find((el) => el.textContent.includes("确定"));
      if (confirm) {
        confirm.click();
      }
      var confirmPanel = Array.from(
        document.querySelectorAll("[role='document'] .ant-btn"),
      )
        .find((el) => el.textContent.includes("确定"));
      if (confirmPanel) {
        confirmPanel.click();
      }
    })();
  }
  // TODO 开启 | 关闭插件模式
  if (key === "Control+O") {
    event.preventDefault();
    throttle(function () {
      var risen = document.querySelector("#risen");
      var classList = risen.classList.toString();
      if (classList === "risen-show") {
        risen.classList = ["risen-unshow"];
      } else {
        risen.classList = ["risen-show"];
      }
    })();
  }
}, false);

// 插入插件 id 为 risen 将extensionId写入localStorage
window.localStorage.setItem("extensionId", chrome.runtime.id);

var risen = document.createElement("div");
risen.innerText = "risen";
risen.id = "risen";
risen.classList = ["risen-unshow"];
document.body.appendChild(risen);


//打包后将插件中的js和css写入fone build.py


export {};
