/*
  业务-和页面或用户打交道的
 */
var elements = { 
	list: document.querySelector('#list'),
	backBtn: document.querySelector('#back'),
	openUI: document.querySelector('#openUI'),
	closBtn: document.querySelector('#clos'),
	contextmenu: document.querySelector('#contextmenu')
}
var nowId = 0;
//初始化
view(nowId); 
//右键上下文菜单
document.addEventListener('contextmenu',function(e){
	if(e.target.tagName.toUpperCase() == "LI"){
		showContextmenu(e, data.menu.file);
	} else {
		showContextmenu(e, data.menu.main);
	}
});
document.addEventListener('mousedown',function(e){
	hideContextmenu();
});
//文件夹事件
(function(){
	for(var i = 0; i < lis.length; i++){
		lis[i].index = i;
		lis[i].addEventListener('mousedown',function(){
			this.classList.add('active');
			this.dataset.fid = this.index;
		});
	}
})();
//返回上一级事件
elements.backBtn.addEventListener('click',function(){
	var info = getInfo(nowId);
    if(info){
        view(info.pid);
    }
});
//文件打开窗口的窗口关闭事件
elements.closBtn.addEventListener('click',function(){
	var child = openUI.children[1];
	openUI.removeChild(child);
	openUI.style.display = "none";
});
//窗口大小改变重新设置文件排放位置
//@todo:后期看能不能再优化一下
window.addEventListener('resize', function(){
	view(nowId);
});
//框选(多看一下，出现很多失误)
elements.list.addEventListener('mousedown',function(e){
	e.preventDefault();
	var start = {x: e.clientX, y: e.clientY};
	var dis = {x: 0, y: 0};
	var frame = document.createElement('div');
	//必须写在mousedown里面，以防发生click的话，在end里找不到frame报错，后面的代码也无法实现；
	elements.list.appendChild(frame);
	//注意代码拼写正确！！且函数带括号直接执行！！
	elements.list.addEventListener('mousemove',move);
	elements.list.addEventListener('mouseup',end);
	function move(e){
		var des = {x: e.clientX, y: e.clientY};
		dis = {x: des.x - start.x, y: des.y - start.y};
		frame.className = "frame";
		frame.style.width = Math.abs(dis.x) + "px";
		frame.style.height = Math.abs(dis.y) + "px";
		frame.style.left = Math.min(des.x,start.x) + "px";
		frame.style.top = Math.min(des.y,start.y) + "px";
		//框选选中
		for(var i = 0; i < lis.length; i++){
			if(getCollide(frame,lis[i])){
				lis[i].classList.add('active');
				lis[i].dataset.fid = i;
			} else{
				lis[i].classList.remove('active');
			}
		}
	}
	function end(){
		elements.list.removeChild(frame);
		elements.list.removeEventListener('mousemove',move);
		elements.list.removeEventListener('mouseup',end);
	}
});
//其他事件引起的框选冒泡的取消
elements.contextmenu.addEventListener('mousedown',function(e){
	e.stopPropagation();
});
//空白处点击取消文件选中状态
document.addEventListener('mousedown',function(){
	for(var i = 0; i < lis.length; i++){
		lis[i].classList.remove('active');
	}
});

