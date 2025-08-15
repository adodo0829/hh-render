# 画布的缩略图功能

缩略图可以采用 DOM 复制

缩略比例

## 1. 根据传入属性

- 计算（或者直接获取）原画布可视窗口的大小 screenWidth/screenHeight
- 等比计算缩略图的初始化大小 mapWidth/mapHeight

## 2.计算画布内容

全部映射到缩略图中所需要的变化值 screenToMapTransform

## 3.监听画布的 zoom 事件

用 screenTransform 记录画布当前的变换；

## 4.监听缩略图可视矩形的 zoom 事件

用 minimapTransform 记录矩形当前的变换

## 5.计算

画布的最终缩放效果 transform = screenTransform * invert(minimapTransform)，
而缩略图可视矩形的变换为 invert(transform)；

## 屏幕坐标 和 迷你图坐标
