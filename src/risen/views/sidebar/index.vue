<template>
    <div id="risen-menu" class=" dialog sidebar">
        <div class="dialog-title sidebar-title">RISEN</div>
        <div class="dialog-content sidebar-content">
		    <slot></slot>
	    </div>
    </div>
</template>
<script setup>
 function test(e) {
     alert("123")
 }

 var Dragging = function (validateHandler) {
     //参数为验证点击区域是否为可移动区域，如果是返回欲移动元素，负责返回null
     var draggingObj = null //dragging Dialog
     var diffX = 0
     var diffY = 0

     function mouseHandler(e) {
         switch (e.type) {
             case 'mousedown':
                if(e.target.className && e.target.className.includes("dialog-title")){
                 e.target.addEventListener('click',test)
                }
                 draggingObj = validateHandler(e) //验证是否为可点击移动区域
                 if (draggingObj != null) {
                     diffX = e.clientX - draggingObj.offsetLeft
                     diffY = e.clientY - draggingObj.offsetTop
                 }
                 break

             case 'mousemove':
                if(e.target.className && e.target.className.includes("dialog-title")){
                   e.target.removeEventListener('click',test)
                }
                 if (draggingObj) {
                     draggingObj.style.left = e.clientX - diffX + 'px'
                     draggingObj.style.top = e.clientY - diffY + 'px'
                 }
                 break

             case 'mouseup':
                 draggingObj = null
                 diffX = 0
                 diffY = 0
                 break
         }
     }

     return {
         enable: function () {
             document.addEventListener('mousedown', mouseHandler)
             document.addEventListener('mousemove', mouseHandler)
             document.addEventListener('mouseup', mouseHandler)
         },
         disable: function () {
             document.removeEventListener('mousedown', mouseHandler)
             document.removeEventListener('mousemove', mouseHandler)
             document.removeEventListener('mouseup', mouseHandler)
         },
     }
 }

 function getDraggingDialog(e) {
     var target = e.target
     while (target && target.className.indexOf('dialog-title') == -1) {
         target = target.offsetParent
     }
     if (target != null) {
         return target.offsetParent
     } else {
         return null
     }
 }

 Dragging(getDraggingDialog).enable()
</script>
<style scoped>
    .dialog {
    width: 100px;
    text-align:center;
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #ccc;
    -webkit-box-shadow: 1px 1px 3px #292929;
    -moz-box-shadow: 1px 1px 3px #292929;
    box-shadow: 1px 1px 3px #292929;
    margin: 10px;
    }

    .dialog-title {
    color: #fff;
    background-color: #404040;
    font-size: 12pt;
    font-weight: bold;
    padding: 4px 6px;
    cursor: move;
    }

    .dialog-content {
    padding: 4px;
    }
</style >
