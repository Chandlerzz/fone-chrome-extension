import {keyEventToString,getDefaultKeyString} from "./keycodes.js"
import {getJson,getJson1,getJson2,setHeaders} from "../utils/request.js"
// shortcut for the website www.fone.risen.com

function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }
    let _lastTime = null
    // 返回新的函数
    return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
          fn()
            _lastTime = _nowTime
        }
    }
}
document.addEventListener('keydown', function(evt) {
	var key = keyEventToString(evt);
	if(key === "Control+S")
	{
		event.preventDefault();
		throttle(function(){
			var save = document.querySelector(".save-btn");
			if(save)
			{
				save.click();
			}
		})()
	}
	if(key === "Control+R")
	{
		event.preventDefault();
		throttle(function(){
			var run = document.querySelector(".run-div button");
			if(run)
			{
				run.click();
			}
		})()
	}
	if(evt.code === "Enter")
	{
		event.preventDefault();
		throttle(function(){
			var confirm = Array.from(document.querySelectorAll('.ant-btn'))
			  .find(el => el.textContent.includes('确定'));
			if(confirm)
			{
				confirm.click();
			}
			var confirmPanel = Array.from(document.querySelectorAll("[role='document'] .ant-btn"))
			.find(el => el.textContent.includes("确定"))
			if(confirmPanel)
			{
				confirmPanel.click();
			}
		})()
	}
}, false);
//test for inject script to weg page

var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
var risen = document.createElement("div")
risen.innerText = "risen"
risen.id = "risen"

document.body.appendChild(risen)



export {}
