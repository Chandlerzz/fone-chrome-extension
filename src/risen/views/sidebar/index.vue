<template>
    <div id="risen-menu" class=" dialog sidebar" >
        <img class="dialog-title sidebar-title" draggable = "true" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB3CAYAAADIMoQHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozODEyMDg2Ny1hMDZjLTQ4NGQtYWFlZS0wMTA5NjYyNGM3NmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzBDRDA0MzE1OUVEMTFFQTlEOUFDRUM0NkQ1RUFCNDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzBDRDA0MzA1OUVEMTFFQTlEOUFDRUM0NkQ1RUFCNDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjBhNTVjOS1hYzg0LTQ0ZmQtOWQwZC05YjgzYTY1ZTAxMzMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjMDA3MzVkNi03MThjLTExN2QtYjZk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" alt=""/>
        <div class="dialog-content sidebar-content">
		    <slot></slot>
	    </div>
    </div>
</template>
<script setup>
 import { onMounted } from 'vue';
 onMounted(() => {
     for (let i in document.images) {
	     document.images[i].ondragstart = imgdragstart;
     }
 })
 function imgdragstart(){return false;}
 function test(e) {
     const doc = document.getElementById("document")
     doc.style.display = doc.style.display === "" ? "grid" : ""
     doc.contentWindow.postMessage("data", '*');
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
    width:80px;
    text-align:center;
    position: absolute;
    right: 500px;
    top: 10px;
    margin: 10px;
    }

    .dialog-title {
    color: #fff;
    //background-color: #404040;
    font-size: 12pt;
    font-weight: bold;
    cursor: move;
    width:50%;
    }

    .dialog-content {
    padding: 4px;
    }
</style >
