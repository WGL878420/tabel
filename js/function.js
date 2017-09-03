/*
	各种在业务(页面)中需要调用(复用)的函数
	@type {Object}
 */ 
  
//右键上下文菜单
//@todo:右键菜单中二级菜单的过界处理问题？放在什么位置写合适！
var _this;
var children = []; 
var isChanged = true;
var nowId;
var lis;
var openUI = document.querySelector('#openUI');
var list = document.querySelector('#list');
var contextmenu = document.querySelector('#contextmenu');
function showContextmenu(e, menuData){
	var contextmenuElement = document.querySelector('#contextmenu');
	contextmenuElement.innerHTML = "";
	e.preventDefault();
	menuData.forEach(function(item){
		var li = document.createElement('li');
		var subUl;
		var subLi;
		li.innerHTML = item.name;
		li.addEventListener('mousedown',contextmenuCallback[item.callbackname]);
		if(item.submenu){
			subUl = document.createElement('ul');
			item.submenu.forEach(function(item2){
			subLi = document.createElement('li');
			subLi.innerHTML = item2.name;
			subLi.addEventListener('mousedown',contextmenuCallback[item2.callbackname]);
			subUl.appendChild(subLi);
			});
			li.appendChild(subUl);
		}
	contextmenuElement.appendChild(li);
	var maxX = document.documentElement.clientWidth - contextmenuElement.offsetWidth;
	var maxY = document.documentElement.clientHeight- contextmenuElement.offsetHeight;
	contextmenuElement.style.display = "block";
	//添加到页面上之后才能获取到offset的相关数值
	contextmenuElement.style.top = (e.clientY  > maxY? e.clientY  - contextmenuElement.offsetWidth:e.clientY) + "px";
	contextmenuElement.style.left = Math.min(e.clientX,maxX) +"px";
	li.addEventListener('mouseenter',function(){
		var liUl = this.parentNode.querySelectorAll('ul');
		var lis = this.parentNode.children;
		for(var i = 0; i < lis.length; i++){
			 lis[i].classList.remove('hover');
			}
		for(var i = 0; i < liUl.length; i++){
			 liUl[i].style.display = "none";
			 liUl[i].addEventListener('mouseleave',function(){
			 	for(var i = 0; i < this.children.length; i++){
			 		this.children[i].classList.remove('hover');
			 	}
			 });
		}
		if(this.children[0]){
			this.children[0].style.display = "block";
		}
		this.classList.add('hover');
	});
	var liLi = li.parentNode.children;
	for(var i = 0; i < liLi.length; i++){
			moveIn(liLi[i]);
		}
	});
}
//鼠标移入菜单项
function moveIn(el){
	var lis = el.querySelectorAll('li');
	for(var i = 0; i < lis.length; i++){
		lis[i].addEventListener('mouseenter',function(){
			for(var i = 0; i < lis.length; i++ ){
				lis[i].classList.remove('hover');
			}
			this.classList.add('hover');
		});
	}
}
//隐藏右键菜单
function hideContextmenu(){
	var contextmenuElement = document.querySelector('#contextmenu');
	contextmenuElement.style.display = "none";
}
//右键菜单中的相关事件
var contextmenuCallback = {
	createFolder: function(){
		setTimeout(function(){
			var filename = window.prompt("请输入文件夹名称");
			var newId = getNewId();
			filename = ((filename == "" || filename == null) ? getNewname("folder","新建文件夹") : filename);
			if(seeRename(newId,filename,"folder")){
				alert("重名了");
				return;
			}
			data.list.push({
				id: newId,
				pid: nowId,
				type: "folder",
				name: filename,
				createTime: Date.now()
			});
			view(nowId);
		},200);
		contextmenu.style.display = "none";
	},
	freshen: function(){
		window.location.reload();
		contextmenu.style.display = "none";
	},
	createTxt: function(){
		setTimeout(function(){
			var txtname = window.prompt("请输入文本名称");
			var newId = getNewId();
			txtname = ((txtname == "" || txtname == null) ? getNewname("txt","新建的文本") : txtname);
			if(seeRename(newId,txtname,"txt")){
				alert("重名了");
				return;
			}
			data.list.push({
				id: newId,
				pid: nowId,
				type: "txt",
				name: txtname,
				createTime: Date.now()
			});
			view(nowId);
		},200);
		contextmenu.style.display = "none";
	},
	createHTML: function(){
		setTimeout(function(){
			var htmlname = window.prompt("请输入文件名称");
			var newId = getNewId();
			htmlname = ((htmlname == "" || htmlname == null) ? getNewname("html","新建的网页") : htmlname);
			if(seeRename(newId,htmlname,"html")){
				alert("重名了");
				return;
			}
			data.list.push({
				id: newId,
				pid: nowId,
				type: "html",
				name: htmlname,
				createTime: Date.now()
			});
			view(nowId);
		},200);
		contextmenu.style.display = "none";
	},
	uploadTxt: function(){
		var upload = document.querySelector('#upload');
		upload.setAttribute("accept", "text/*");
		upload.click();
	},
	uploadImage: function(){
		var upload = document.querySelector('#upload');
		upload.setAttribute("accept", "image/*");
		upload.click();
	},
	uploadVideo: function(){
		var upload = document.querySelector('#upload');
		upload.setAttribute("accept", "video/*");
		upload.click();
	},
	uploadAudio: function(){
		var upload = document.querySelector('#upload');
		upload.setAttribute("accept", "audio/*");
		upload.click();
	},
	//BUG:排序之后，如果再有重新渲染页面的操作(view())，之前排序的效果消失！！
	sortByName: function(){
		var allFiles = getChildren(nowId);
		sortByPinyin(allFiles);
		view(nowId,allFiles);
		contextmenu.style.display = "none";
	},
	sortByType: function(){
		var folderArr = getSameType(nowId,"folder");	
		var txtArr = getSameType(nowId,"txt");
		var imgArr = getSameType(nowId,"img");
		var videoArr = getSameType(nowId,"video");
		var audioArr = getSameType(nowId,"audio");
		var htmlArr = getSameType(nowId,"html");
		sortByPinyin(folderArr);
		sortByPinyin(txtArr);
		sortByPinyin(imgArr);
		sortByPinyin(videoArr);
		sortByPinyin(audioArr);
		sortByPinyin(htmlArr);
		var filesArr = [];
		filesArr = filesArr.concat(folderArr,txtArr,htmlArr,imgArr,videoArr,audioArr);
		view(nowId,filesArr);
		contextmenu.style.display = "none";
	},
	sortByDate: function(){
		var allFiles = getChildren(nowId);
		allFiles.sort(function(a,b){
			return a.createTime - b.createTime;
		});
		view(nowId,allFiles);
		contextmenu.style.display = "none";
	},
	sortBySize: function(){
		//暂时无法实现！！
	},
	cancelBubble: function(e){
		e.cancelBubble = true;
		contextmenu.style.display = "none";
	},
	changeBackground: function(e){
		var bg = document.querySelector('#bg');
		if(isChanged){
			bg.style.backgroundImage = "url(images/bg.gif)";
		} else{
			bg.style.backgroundImage = "url(images/bg2.jpg)";
		}
		isChanged = !isChanged;
		contextmenu.style.display = "none";
	},
	open: function(){
		var fileInfo = getInfo(_this.dataset.id);
		switch(fileInfo.type){
			case "folder" :
			view(fileInfo.id);
			break;
			case "trash" :
			view(fileInfo.id);
			break;
			case "img" :
			openImg(fileInfo.file);
			break;
			case "video" :
			openVideo(fileInfo.file);
			break;
			case "audio" :
			openAudio(fileInfo.file);
			break;
			case "txt" :
			openText(fileInfo.file);
			break;
		}
		contextmenu.style.display = "none";
	},
	rename: function(){
		var newName = window.prompt("请输入新的文件名称");
		var p = _this.children[0];
		var info = getInfo(_this.dataset.id);
		newName = ((newName == "" || newName == null) ? info.name : newName);
		if(seeRename(info.id,newName,info.type)){
			alert("重名了，请换个名字");
			newName = window.prompt("请输入新的文件名称");
			secondSeeRename(_this,info.id,newName,info.type);
		} else{
			p.innerHTML = newName;
		}
		contextmenu.style.display = "none";
	},
	delete: function(){
		//包括单项和多项
		toDelete();
		contextmenu.style.display = "none";
	},
	cut: function(){
		children = [];
		var selectedDatas = findSelectedDatas();
		selectedDatas.forEach(function(item,index){
		var info = getInfo(item.id);
		var subChildren = getTree(info.id,1);
		info.level = 0;
		subChildren.unshift(info);
		children.push(subChildren);
		});
		contextmenu.style.display = "none";
	},
	paste: function(){
		children.forEach(function(item,index){
			children[index][0].pid = nowId;
		});
		view(nowId);
		children = [];
		contextmenu.style.display = "none";
	}
};
/*
	渲染文件列表和导航列表
	@param _ID 要渲染的文件数据的id值
 */
function view(_ID,dataList){
	nowId = _ID;
	var pathList = document.querySelector('#pathList');
	if(nowId == 0){
		pathList.style.display = "none";
	} else{
		pathList.style.display = "block";
	}
	var dataList = dataList || getChildren(nowId);
	var list = document.querySelector('#list');
	var showData = [];
	dataList.forEach(function(item,index){
		item.fid = index;
	});
	list.innerHTML = "";
	//渲染文件列表
	dataList.forEach(function(item,index){
		var li = document.createElement('li');
		if(seeRefile(showData,item.name,item.type)){
			li.innerHTML = `<p>${item.name}副本</p>`;
		} else{
			li.innerHTML = `<p>${item.name}</p>`;
		}
		li.className = item.type;
		li.addEventListener('dblclick',function(){
			switch(item.type){
				case "folder" :
				view(item.id);
				break;
				case "trash" :
				view(item.id);
				break;
				case "img" :
				openImg(item.file);
				break;
				case "video" :
				openVideo(item.file);
				break;
				case "audio" :
				openAudio(item.file);
				break;
				case "txt" :
				openText(item.file);
				break;
			}
		});
		li.addEventListener('contextmenu',function(){
			//将DOM与数据关联起来
			this.dataset.id = item.id;
			_this = this;
		});
		list.appendChild(li);
		showData.push(item);
		li.style.left = getFileOffset(li,index).x + "px";
		li.style.top = getFileOffset(li,index).y + "px";
	});
	lis = list.getElementsByTagName('li');
	//给当前页面所有li绑定事件，每渲染一次就要绑定一次，但是代码只读一遍！！所以每渲染一次就要重新绑定一次
	for(var i = 0; i < lis.length; i++){
		lis[i].index = i;
		//可能有其他影响
		lis[i].dataset.fid = i;
		lis[i].addEventListener('click',function(){
			for(var i = 0; i < lis.length; i++){
				if(i!=this.index){
					lis[i].classList.remove('active');
				}
			}
		});
		lis[i].addEventListener('mousedown',function(e){
			e.stopPropagation();
			e.preventDefault();
			this.classList.add('active');
			this.dataset.fid = this.index;
			//文件的拖拽删除
			var trashData = data.list.filter(function(item){
				return item.type == "trash";
			})[0];
			trashLocation = trashData.fid;
			var trash = lis[trashLocation];
			//判断是否已进行复制的依据
			var nowNode = null;
			var cloneFiles = [];
			var startFilesOffset = [];
			var start = {x: e.clientX, y: e.clientY};
			var _self = this;
			var isTrashCloned = false;
			var selectedFiles;
			var folders = list.querySelectorAll('.folder');
			var preSelectedFolders = list.querySelectorAll('.active.folder');
			document.addEventListener('mousemove',move);
			document.addEventListener('mouseup',end);
			function move(e){
				if(!nowNode){
					selectedFiles = list.querySelectorAll('.active,.hover');
					for(var i = 0; i < selectedFiles.length; i++){
						var node = selectedFiles[i].cloneNode(true);
						node.style.opacity = ".4";
						list.appendChild(node);
						cloneFiles.push(node);
						if(_self == selectedFiles[i]){
							nowNode = node;
						}
						if(trash == selectedFiles[i]){
							isTrashCloned = true;
						}
						startFilesOffset[i] = {x: css(selectedFiles[i],'left'),y:css(selectedFiles[i],'top')};
					}
				}
				var dis = {x: e.clientX - start.x, y: e.clientY - start.y}
				for(var i = 0; i < cloneFiles.length; i++){
					css(cloneFiles[i],'left',dis.x + startFilesOffset[i].x );
					css(cloneFiles[i],'top',dis.y + startFilesOffset[i].y );
				}
			}
			function end(e){
				document.removeEventListener('mousemove',move);
				document.removeEventListener('mouseup',end);
				if(!nowNode){
					return;
				}
				var unselectedFolders = [];
				if(preSelectedFolders.length){
					for(var i = 0; i < folders.length; i++){
						for( var j = 0; j < preSelectedFolders.length; j++){
							if(folders[i] !== preSelectedFolders[j]){
								unselectedFolders.push(folders[i]);
							}
						}
					}
				} else{
						unselectedFolders = folders;
					}
				//移入文件夹
				for(var i = 0; i < unselectedFolders.length; i++){
					if(getCollide(nowNode,unselectedFolders[i])){
						var moveFolderFid = unselectedFolders[i].dataset.fid;
						var moveFoldersInfo = getDomInfo(dataList,moveFolderFid);
						var selectedDatas = findSelectedDatas();
						selectedDatas.forEach(function(item){
							item.pid = moveFoldersInfo.id;
						});
						view(nowId);
					}
				}
				if(getCollide(nowNode,trash) && !isTrashCloned){
					toDelete(); 
				} else{
					for(var i = 0; i < cloneFiles.length; i++){
						list.removeChild(cloneFiles[i]);
					}
				}
			}
		});
	}
	//渲染导航列表
	//由三部分组成：根目录 + 所有父级 + 当前目录
	var paths = document.querySelector('#paths');
	paths.innerHTML = "";
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.href = "javascript:;";
	a.innerHTML = `桌面`;
	a.addEventListener('click',function(){
		view(0);
	});
	li.appendChild(a);
	paths.appendChild(li);
	var parentsInfos = getParents(nowId);
	if(!nowId){
		return;
	}
	var selfList = getInfo(nowId).name;
	parentsInfos.forEach(function(item){
		var li = document.createElement('li');
		var a = document.createElement('a');
		var selfId = item.id;
		a.href = "javascript:;";
		a.innerHTML = `${item.name}`;
		a.addEventListener('click',function(){
			view(item.id);
		});
		li.innerHTML = ` ▶`;
		li.appendChild(a);
		paths.appendChild(li)
	});
	var li = document.createElement('li');
	li.innerHTML = ` ▶<span>${selfList}</span>`;
	paths.appendChild(li);
}	
//重命名中的二次判断
function secondSeeRename(el,id,newName,type){
	var p = el.children[0];
	var info = getInfo(el.dataset.id);
	newName = ((newName == "" || newName == null) ? info.name : newName);
	if(seeRename(id,newName,type)){
			alert("重名了，请换个名字");
			newName = window.prompt("请输入新的文件名称");
			secondSeeRename(el,id,newName,type);
		} else{
			p.innerHTML = newName;
		}
}
//对象复制
function cloneObj(obj) {  
    var newObj = {};  
    if (obj instanceof Array) {  
        newObj = [];  
    }  
    for (var key in obj) {  
        var val = obj[key];  
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。  
        newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
    }  
    return newObj;  
};
//上传文件
var upload = document.querySelector('#upload');
	upload.addEventListener("change",function(){
		var type = this.files[0].type.split("/")[0];
		switch(type){
			case "image":
				uploadTo("img");
				break;
			case "video":
				uploadTo("video");
				break;
			case "audio":
				uploadTo("audio");
				break;
			case "text":
				uploadTo("txt");
				break;
		}
		contextmenu.style.display = "none";
	});
function uploadTo(fileType){
	var file = upload.files[0];
	var newId = getNewId();
	var fileName = file.name;
	upload.value = "";
	if(seeRename(newId,fileName,fileType)){
		alert("该文件已存在");
		return;
	}
	data.list.push({
		id: newId,
		pid: nowId,
		type: fileType,
		file: file,
		name: fileName,
		createTime: Date.now()
	});
	view(nowId);
}	//是否添加事件？？
//打开图片
function openImg(files){
	var reader = new FileReader();
	reader.onload = function(e){
		var img = new Image();
		img.src = e.target.result;
		img.style.position = "absolute";
		img.style.width = "80%";
		img.style.height = "80%";
		img.style.left = "10%";
		img.style.top = "10%";
		openUI.appendChild(img);
		openUI.style.display = "block";
	}
	reader.readAsDataURL(files);
}
//打开文本
function openText(files){
	var reader = new FileReader();
	reader.onload = function(e){
		var p = document.createElement('p');
		p.innerHTML = e.target.result;
		p.style.textIndent = "2em";
		p.style.margin = "20px";
		openUI.appendChild(p);
		openUI.style.display = "block";
	}
	reader.readAsText(files);
}
//打开视频
function openVideo(files){
	var reader = new FileReader();
	reader.onload = function(e){
		var video = document.createElement("video");
		video.src = e.target.result;
		video.setAttribute('controls',"");
		video.style.lineHeight = "900px";
		openUI.appendChild(video);
		openUI.style.display = "block";
	};
	reader.readAsDataURL(files);
}
//打开音频
function openAudio(files){
	var reader = new FileReader();
	reader.onload = function(e){
		var audio = document.createElement('audio');
		audio.src = e.target.result;
		audio.setAttribute('controls',"");
		audio.style.lineHeight = "900px";
		openUI.appendChild(audio);
		openUI.style.display = "block";
	}
	reader.readAsDataURL(files);
}
//计算文件在视图中的位置
function getFileOffset(item,index){
	var list = document.querySelector('#list');
	var fileW = css(item,"width") + 5;
	var fileH = css(item,"height") +20;
	var ceils = Math.floor(list.clientHeight/fileH);
	var x = Math.floor(index/ceils);//算出在第几列
	var y = index%ceils;//算出在第几行
	return {x: x*fileW, y: y*fileH};
}
//检测碰撞
function getCollide(el,el2){
	//el:去碰撞的元素；el2:被撞的元素
	var rect = el.getBoundingClientRect();
	var rect2 = el2.getBoundingClientRect();
	if(rect.right < rect2.left 
	|| rect.left > rect2.right
	|| rect.top > rect2.bottom
	|| rect.bottom < rect2.top){
		return false;
	} else{
		return true;
	}
}