/*
	获取指定id的数据信息
	@param id 指定查找的id
	@return {Object} 满足条件的数据信息
 */  
function getInfo(id){
	return data.list.filter(function(item){
		return item.id == id;
	})[0];
}
/*
	获取在DOM中指定dataFid的数据信息
	@param dataFid 指定查找的dataFid
	@param data 当前页面所有的数据组成的数组
	@return {Object} 满足条件的数据信息
 */  
function getDomInfo(data,dataFid){
	return data.filter(function(item){
		return item.fid == dataFid;
	})[0];
}
/*
	获取指定id下的所有一级子元素
	@param {Object} 所点击元素的id
	@return {array} 所点击元素下的所有一级子元素的全部数据信息所组成的数组
 */
function getChildren(id){
	return data.list.filter(function(item){
		return item.pid == id;
	});
}
/*
	获取指定id的上一级父级的全部数据信息
	@param id 指定查找的id
	@return {Object} 所查找id的父级元素的全部数据信息
 */
function getParent(id){
	var info = getInfo(id);
	if(info){
		return getInfo(info.pid);
	}
}
/*
	获取指定id的所有父级
	@param id 指定查找的id
	@return {Array} 所查找id的所有父级元素的数据信息
 */
function getParents(id){
	//用来存储所有父级元素的数据信息
	var parents = [];
	var parentInfo = getParent(id);
	if(parentInfo){
		parents.push(parentInfo);
		var more = getParents(parentInfo.id);
		parents = more.concat(parents);
	}
	return parents;
}
/*
	获取指定id的所有子级
	@param level 所复制数据中每层数据的层级
	@return {Array} 所查找id的所有子级元素的数据信息
 */
 function getTree(id, level) {
	    var level = level || 0;
	    // 得到一级子级
	    var children = getChildren(id);
	    var data = [];
	    children.forEach(function (item) {
	        item.level = level;
	        data.push(item);
	        data = data.concat(getTree(item.id, level+1));
	    });
	    return data;
	}
/*
	获取新增文件的id
	@param 无
	@return {number} 新增文件的id值
 */
function getNewId(){
	var maxId = 0;
	data.list.forEach(function(item){
		maxId = Math.max(item.id,maxId);
	});
	return ++maxId;
}
/*
	判断当前页面是否有两个除了id完全相同的两个文件
	@param data,fileName,fileType 用来判断是否重名的那条数据的id，用来判断文件的名字，文件的类型
	@return {Boolean} 是否重命名
 */
function seeRefile(data,fileName,fileType){
	for(var i = 0; i < data.length; i++){
		if(fileName == data[i].name && fileType == data[i].type){
			return true;
		}
	}
	return false;
}
/*
	判断是否重命名
	@param id,fileName,fileType 用来判断是否重名的那条数据的id，用来判断文件的名字，文件的类型
	@return {Boolean} 是否重命名
 */
function seeRename(ID,fileName,fileType){
	for(var i = 0; i < data.list.length; i++){
		if(data.list[i].id != ID && fileName == data.list[i].name && fileType == data.list[i].type){
			return true;
		}
	}
	return false;
}
/*
	为新建的文件夹提供系统默认文件名
	@param fileType startName 需要新建的文件类型和系统默认文件名前缀
	@return {String} 生成的系统默认文件名
 */
function getNewname(fileType,startName){
	var newFiles = data.list.filter(function(item){
		return item.type == fileType;
	});
	var names = [];
	var start = startName;
	newFiles.forEach(function(item){
		names.push(item.name);
	});
	names = names.filter(function(value){
		if(
			(value == start)||
			(value.substring(0,6) == `${start}(`/*前后6位是新建文件夹( */
				&& value.charAt(value.length-1) == ")"/*最后一位是) */
				&& Number(value.substring(6,value.length-1))>1/* 不能是 新建文件夹(0)和新建文件夹(1)  */
				&& parseInt(value.substring(6,value.length-1))+"" === value.substring(6,value.length-1) /* 排除小数 和 前边有0的 */
			)
		){
			return true;
		}
		return false;
	});
	names.sort(function(a,b){
		a = a.length<6?0:a.substring(6,a.length-1);
		b = b.length<6?0:b.substring(6,b.length-1);
		return a - b;
	});
	if(names.length == 0 || names[0] != start){
		return start;
	}
	for(var i = 1; i < names.length;i++){
		if(start + "("+(i+1)+")" !== names[i]){
			return start + "("+(i+1)+")";
		}
	}
	return start + "("+(names.length+1)+")";
}
/*
	获取当前页面所有相同类型的文件
	@param nowId ：当前页面的id值; fileType:需要获取的文件类型
	@return {Array} 返回的由相同类型数据组成的数组
 */
 function getSameType(nowId,fileType){
 	var files = getChildren(nowId);
 	return files.filter(function(item){
 		return item.type == fileType;
 	});
 }
 /*
	获取当前页面所有相同类型的文件
	@param nowId ：当前页面的id值; fileType:需要获取的文件类型
	@return {Array} 返回的由相同类型数据组成的数组
 */
function sortByPinyin(arr){
	arr.sort(function(a,b){
		if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
			return 1;
		}
		return -1;
	});
}
/*
	提取所有被选中文件的dataset.pid值,也就相当拿出了所有被选中文件在getChildren(nowId)这个数组中的位置
	@param 无
	@return 无
 */
function getSelectedFids(){
	var selectedFiles = document.querySelectorAll('.active');
	var selectedArr = [];
	for(var i = 0; i < selectedFiles.length; i++){
		selectedArr.push(selectedFiles[i].dataset.fid);
	}
	return selectedArr;
}
/*
	找到所有被选中文件的数据
	@param 无
	@return {Array}由所有被选中文件数据组成的数组
 */
function findSelectedDatas(){
	var fileElsData = getChildren(nowId);
	fileElsData.forEach(function(item,index){
		item.fid = index;
	});
	var selectedFiles = getSelectedFids();
	var selectedDatas = [];
	selectedFiles.forEach(function(item){
		selectedDatas.push(getDomInfo(fileElsData,item));
	});
	return selectedDatas;
}
 /*
	删除所有选中文件
	@param 无
	@return 无
 */
function toDelete(){
	var selectedDatas = findSelectedDatas();
	selectedDatas.forEach(function(item){
		item.pid = 20;
	});
	view(nowId);
}