/*
	数据  
	@type {Object}
 */  
var data = {
	menu: {
		"main":[
			{
				name: "新建",
				callbackname: "cancelBubble",
				submenu:[
					{
						name: "新建文件夹",
						callbackname: "createFolder"
					},
					{
						name: "文本文档",
						callbackname: "createTxt"
					},
					{
						name: "新建HTML",
						callbackname: "createHTML"
					}
				]
			},
			{
				name: "刷新",
				callbackname: "freshen"
			},
			{
				name: "粘贴",
				callbackname: "paste"
			},
			{
				name: "上传文件",
				callbackname: "cancelBubble",
				submenu:[
					{
						name: "文本",
						callbackname: "uploadTxt"
					},
					{
						name: "图片",
						callbackname: "uploadImage"
					},
					{
						name: "音频",
						callbackname: "uploadAudio"
					},
					{
						name: "视频",
						callbackname: "uploadVideo"
					}
				]
			},
			{
				name: "排序方式",
				callbackname: "cancelBubble",
				submenu:[
					{
						name: "名称",
						callbackname: "sortByName"
					},
					{
						name: "类型",
						callbackname: "sortByType"
					},
					{
						name: "修改日期",
						callbackname: "sortByDate"
					}
				]
			},
			{
				name: "更换桌面背景",
				callbackname: "changeBackground"
			}
		],
		"file":[
			{
				name: "打开",
				callbackname: "open"
			},
			{
				name: "重命名",
				callbackname: "rename"
			},
			{
				name: "删除",
				callbackname: "delete"
			},
			{
				name: "剪切",
				callbackname: "cut"
			}
		]
	},
	list:[
		{
	        id: 14,
	        pid: 0,
	        type: 'pc',
	        name: '我的电脑',
			createTime: 0
	    },
	    {
	        id: 15,
	        pid: 0,
	        type: 'Internet',
	        name: '网络',
			createTime: 0
	    },
	    {
	        id: 16,
	        pid: 0,
	        type: 'qq',
	        name: 'QQ',
			createTime: 0
	    },
	    {
	        id: 17,
	        pid: 0,
	        type: 'wx',
	        name: '微信',
			createTime: 0
	    },
	    {
	        id: 20,
	        pid: 0,
	        type: 'trash',
	        name: '回收站',
			createTime: 0
	    },
	    {
	        id: 18,
	        pid: 0,
	        type: 'google',
	        name: 'google',
			createTime: 0
	    },
	    {
	        id: 19,
	        pid: 0,
	        type: 'sb',
	        name: 'Sublime Text3',
			createTime: 0
	    },
		{
	        id: 1,
	        pid: 0,
	        type: 'folder',
	        name: '前端',
			createTime: 0
	    },
	    {
	        id: 2,
	        pid: 0,
	        type: 'folder',
	        name: '后端',
			createTime: 0
	    },
	    {
	        id: 3,
	        pid: 0,
	        type: 'folder',
	        name: 'Java',
			createTime: 0
	    },
	    {
	        id: 4,
	        pid: 0,
	        type: 'folder',
	        name: 'PHP',
			createTime: 0
	    },
	    {
	        id: 5,
	        pid: 0,
	        type: 'folder',
	        name: '大数据',
			createTime: 0
	    },
	    {
	        id: 6,
	        pid: 0,
	        type: 'txt',
	        name: 'python',
			createTime: 0
	    },
	    {
	        id: 7,
	        pid: 1,
	        type: 'folder',
	        name: 'JS',
			createTime: 0
	    },
	    {
	        id: 8,
	        pid: 1,
	        type: 'folder',
	        name: 'HTML',
			createTime: 0
	    },
	    {
	        id: 9,
	        pid: 7,
	        type: 'folder',
	        name: '框架',
			createTime: 0
	    },
	    {
	        id: 10,
	        pid: 9,
	        type: 'folder',
	        name: 'vue',
			createTime: 0
	    },
	    {
	        id: 11,
	        pid: 10,
	        type: 'txt',
	        name: '轻松搞定Vue',
			createTime: 0
	    },
	    {
	        id: 12,
	        pid: 1,
	        type: 'folder',
	        name: 'CSS',
			createTime: 0
	    },
	    {
	    	id: 13,
	    	pid: 2,
	    	type: "txt",
	    	name: "后端攻城狮",
			createTime: 0
	    }
	]
};