# 原生JS仿Windows桌面系统（功能类似于百度网盘）
> 这是个通过原生js仿的一个Windows的桌面系统，起初的时候写得挺带劲的，天真的想要实现Windows桌面的大多数功能，
结果越到后面随着业务逻辑的增多越觉得身心俱疲，踩坑无数之后我觉得我还是适可而止，放弃这个天真的想法吧，项目最后虽然没有实现
最初的梦想但是也大大的巩固和提高了我的js水平。

## 技术栈
- 原生js

## 功能
- [x] 面包屑
- [x] 新建文件夹
- [x] 新建文本文档
- [x] 新建HTML
- [x] 刷新
- [x] 剪切
- [x] 粘贴
- [x] 上传文件（包括文本，图片，音频，视频）
- [x] 排序（按名称，类型，修改日期）
- [x] 更换桌面背景
- [x] 打开（包括文件夹和文件的打开）
- [x] 重命名
- [x] 删除
- [x] 文件、文件夹的拖拽以及文件，文件夹拖拽移入文件夹
- [x] 回收站功能（拖拽删除）

## 项目心得
> 随着业务逻辑的增加，所涉及到的逻辑和数据交互也越来越复杂，相比之下更让我体会到了框架给我们带来的便利，
使我们代码的条理和逻辑更加清晰，同时避免直接操作DOM（vue和react）可以让我们更专心于数据和视图，因此这才更加
彰显出原生js的重要性，只有牢固得掌握好原生js才能适应日新月异的框架变化。最后，其实当时还写了一个复制的功能，其主要思路是深度克隆选中的数据之后，先用一个属性记录下副本数据的id值，然后重新分配数据的id值之后再利用之前子父级数据之前通过id值和pid值建立起来的子父级关系来重新建立副本数据之间的子父级关系，这样接下来的思路跟剪切就大同小异了，但是当时做多个文件的复制时出了些小bug，待闲下来再把这个功能添上去，到时候就是v2.0了^_^。

## 安装步骤
- clone项目到本地。
- 用浏览器打开table.html，项目即可运行。

## 项目截图
![tabel_1](https://github.com/xueyanboliang/my-pics/blob/master/tabel/table.jpg?raw=true)
![tabel_2](https://github.com/xueyanboliang/my-pics/blob/master/tabel/table_1.jpg?raw=true)
![tabel_3](https://github.com/xueyanboliang/my-pics/blob/master/tabel/tabel_2.jpg?raw=true)
![tabel_4](https://github.com/xueyanboliang/my-pics/blob/master/tabel/tabel_3.jpg?raw=true)
