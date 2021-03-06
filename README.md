# 地图工具
本工具采用百度地图技术支持

### 功能模块

#### 解析上传文件
本工具支持解析csv文件及json文件。请确保传入的是标准csv或json文件，否则解析将出错。
对文件格式的具体要求请参考文件格式小节。

#### 坐标点类型
输入坐标的经纬度类型请选择GPS标准或baidu标准。解析出来的点都是baidu标准的。

#### 文件格式

##### csc文件格式（时间选填）：
31.28117667,121.45031[,2016/12/23 15:35:44]
31.28118333,121.4504417[,2016/12/23 15:35:50]
31.28118667,121.450455[,2016/12/23 15:35:58]
...

##### json文件格式：
在util的json映射中输入框中输入您单个坐标对象的映射关系。譬如你的点数组是：
```json
[
	{
		"longitude": 121.48,
		"latitude": 31.22,
		"date": "2016-12-28 09:24:43"
	},
	{
		"longitude": 121.50,
		"latitude": 31.19,
		"date": "2016-12-28 09:26:43"
	}
]
```
这种格式的话，json映射里就应当是
```json
{"lon": "longitude","lat": "latitude","time": "date"}
```
数组的话直接把lon,lat,time对应的index映射对就行了。目前默认是
```json
{"lon": 3,"lat": 2,"time": 0}
```

##### 直接输入JSON:
顾名思义，直接在输入框输入json格式的内容。单击描点则在地图上描出路径。除了输入方式不同，其他地方和解析json文件无异。

因为TabrisK得到的数据格式一般都是要这么取坐标和时间。如果关注的人多了会考虑优化成更普遍的默认值。
PS：time是选填值

工具地址：
https://tabrisk.github.io/map-util