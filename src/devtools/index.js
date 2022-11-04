import { createApp } from 'vue'
import './style.css'
import App from './devtools.vue'
let created = false
let checkCound = 0
chrome.devtools.network.onNavigated.addListener(createPanleIfHasFone)
const checkFoneInterval = setInterval(createPanleIfHasFone,1000)
createPanleIfHasFone()

function createPanleIfHasFone () {
  if (created || checkCound ++ > 10)
  {
    clearInterval(checkFoneInterval)
    return
  }
  chrome.devtools.inspectedWindow.eval(
    '!!(window.location.origin === "http://10.10.9.27:8080" || window.location.origin === "https://fone.risen.com")',
    function(hasfone) {
      if( !hasfone || created) {
        retun;
      }
      clearInterval(checkFoneInterval)
      created = true
      chrome.devtools.panels.create("fone",
          "MyPanelIcon.png",
          "../panel.html",
          function(panel) {
            panel.onShown.addListener("onPanelShown")
            panel.onHidden.addListener("onPanelHidden")
          }
      );
    }
  )
}
function onPanelShown (){
 chrome.runtime.sendMessage('fone-panel-show')
}
function onPanelHidden (){
 chrome.runtime.sendMessage('fone-panel-Hidden')
}

createApp(App).mount('#app')
