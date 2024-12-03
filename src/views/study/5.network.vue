<template>
  <div>
    <section>
      <h3>浏览器请求网页的过程</h3>
      <p>
        具体定位某个资源的位置的时候叫：URL（统一资源定位符）（Uniform Resource
        Locator）
      </p>
      <img width="600px" src="@/assets/bs.png" alt="" />
      <img
        width="600px"
        src="https://evelance.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4af8c5f0-a397-4979-b87c-d983938af4e9%2FUntitled.png?table=block&id=befa0cb0-40e2-43ab-bac3-660dd542ad07&spaceId=c9e7ae34-64f6-4cc4-9c74-4ce3b1d1ee92&width=1540&userId=&cache=v2
"
      />
      <pre>
# DNS：Domain Name Server 域名服务器
- 作用：转换 域名与对应ip 的服务器，保存了一张它们的对应的表
客户端询问 DNS本地服务器 这个域名的 IP =》根服务器 =》 .com服务器 =》xxx.com域服务器

# IP：PORT
- IPv4：4组，十进制
- IPv6：8组，十六进制
- 形式：192.168.0.1（长度32位（4个字节），十进制表示） （IPv4）

# TCP
- TCP: Transmission Control Protocol 传输控制协议
- 特点：面向连接（收发数据前，必须建立可靠的连接）
- 建立连接基础：三次握手
- 应用场景：数据必须准确无误的收发
    - HTTP请求、FTP文件传输、邮件收发
- 优点：速度慢、稳定、重传机制、拥塞控制机制、断开连接
- 缺点：效率低、占用资源、容易被攻击（三次握手 → DOS、 DDOS攻击）

- TCP/IP协议组：提供点对点的连接机制，制定了数据封装、定址、传输、路由、数据接收的标准。

- 只要是传数据，不管收发，都得建立**可靠的连接**

## TCP 和 UDP 的区别
1. TCP 是面向连接的，UDP 是无连接的即发送数据前不需要先建立链接。
2. TCP 提供可靠的服务。也就是说，通过 TCP 连接传送的数据，无差错，不丢失，不重复，且按序到达; UDP 尽最大努力交付，即不保证可靠交付。 并且因为 TCP 可靠，面向连接，不会丢失数据因此适合大数据量的交换。
3. TCP 是面向字节流，UDP 面向报文，并且网络出现拥塞不会使得发送速率降低（因此会出现丢包，对实时的应用比如IP电话和视频会议等）。
4. TCP只能是 1 对 1 的，UDP 支持 1 对 1, 1 对多。
5. TCP 的首部较大为 20 字节，而 UDP 只有 8 字节。
6. TCP 是面向连接的可靠性传输，而 UDP 是不可靠的。

## **HTTP 和 HTTPS 区别**

1. HTTP 是不安全的（监听和中间人攻击等手段，获取网站账户信息和敏感信息）
    1. HTTPS 可防止被攻击
2. HTTP 协议的传输内容都是明文，直接在 TCP 连接上运行，客户端和服务器都无法验证对方身份
3. HTTPS 协议的传输内容都被 SSL/TLS 加密，且运行在 SSL/TLS 上， SSL/TLS 运行在 TCP 连接上，所以数据传输是安全的

### GET/POST 区别

1. POST**更安全**
    - 不作为url一部分，不会被缓存，不在浏览器记录中，不保存在服务器日志中
2. POST能发送**更大数据**
3. POST能发送**更多数据类型**，而GET只能是ASCII码字符
4. POST比GET**慢**
    1. 过程慢
    2. get能进行数据缓存，post不行（e.g. 例如下载图片，get的能缓存）
    3. post不能进行管道化传输 （一旦传输过程中出现断开，需要重新开始一次队列任务）

# 浏览器缓存
## Cache-Control字段
- no-cache 让浏览器忽略缓存，而不是让浏览器不缓存。（浏览器依旧缓存）
    - 可以在客户端存储资源，**每次都必须去服务端做新鲜度校验**，来决定从服务端获取新的资源（200）还是使用客户端缓存（304）。也就是所谓的**协商缓存**。
- no-store 这个才是不让浏览器缓存
- max-age 从请求开始算，到过期时间之间的秒数
- public 谁都能缓存，代理服务器也行
- private 代理服务器不能缓存

## Expires字段
Expires: Thu, 10 Nov 2017 08:45:11 GMT 在未过期之前不需要再次请求

## 浏览器缓存策略：强缓存 与 协商缓存
- expires 或 cache-control 没过期，走强制缓存
- if-none-match 和 if-modified-since 与 ETag 和 last-modified 匹配，走协商缓存 304

## 关闭tcp
为什么挥手需要四次？
- 关闭连接时，客户端向服务端发送 `FIN` 时，**仅仅表示客户端不再发送数据**了**但是还能接收**数据。
- 服务器收到客户端的 `FIN` 报文时，先回一个 `ACK` 应答报文（**告知客户端“我知道你想断开连接的请求了”。这样客户端便不会因为没有收到应答而继续发送断开连接的请求（即FIN报文）。**），
而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 `FIN` 报文给客户端来表示同意现在关闭连接。
客户端收到关闭通知，告诉服务端我关了

服务端通常需要等待完成数据的发送和处理，所以服务端的 `ACK` 和 `FIN` 一般都会分开发送，从而比三次握手导致多了一次。

## 同源策略
Access-Control-Allow-Origin
目的：
- 减少服务器压力
- 加强数据安全
规避同源策略
- 网页图片链接可以不同源
- 加载 cdn link 可以不同源

      </pre>
    </section>

    <section>
      <h3>AJAX</h3>
      <pre>
# GET
var xhr;

// 1. 创建一个 XMLHttpRequest 类型的对象 —— 相当于打开了一个浏览器
if (window.XMLHttpRequest) { // 兼容性
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

// 2. 打开与一个网址之间的连接 —— 相当于在地址栏输入访问地址
xhr.open('GET', 'https://api.publicapis.org/entries', true);

// 3. 通过连接发送一次请求 —— 相当于回车或者点击访问发送请求
xhr.send();

console.log(xhr.readyState); // 0 1 在发送前和发送后

// 4. 指定 xhr 状态变化事件处理函数 —— 相当于处理网页呈现后的操作
xhr.onreadystatechange = function() {
  console.log(xhr.readyState); // 2 3 4 在 onreadystatechange 中
  // 通过 xhr 的 readyState 判断此次请求的响应是否接收完成
  // 4代表done
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 通过 xhr 的 responseText 获取到响应的响应体
    console.log(JSON.parse(xhr.responseText));
  }
}
# POST
var xhr;

if (window.XMLHttpRequest) { // 兼容性
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

xhr.open('POST', 'https://api.publicapis.org/entries', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// post请求要写 👆(setRequestHeader写open和send之间) 
// post参数是字符串形式 👇🏻
xhr.send('status=1&flag=1');

console.log(xhr.readyState); // 0 1 在发送前和发送后

xhr.onreadystatechange = function() {
  console.log(xhr.readyState); // 2 3 4 在 onreadystatechange 中
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
}

# 6 种跨域获取数据
1.代理服务器
同源策略只针对浏览器（客户端），服务器之间没有跨域限制。客户端先向同源的服务器发送请求，同源服务器再向不同源的服务器请求数据，最后同源服务器将获取到的数据返回给客户端。
    const http = require('http');
    const url = require('url');

    // 创建代理服务器
    const proxyServer = http.createServer((req, res) => {
        // 解析目标服务器的 URL
        const targetUrl = 'http://target-domain.com' + req.url;
        const options = {
            hostname: url.parse(targetUrl).hostname,
            port: 80,
            path: url.parse(targetUrl).path,
            method: req.method,
            headers: req.headers
        };

        // 向目标服务器发送请求
        const proxyReq = http.request(options, (proxyRes) => {
            // 将目标服务器的响应返回给客户端
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });

        req.pipe(proxyReq);
    });

    proxyServer.listen(3000);

## 2.CORS 跨域
    const http = require('http');
    const url = require('url');

    http.createServer((req, res) =》 {
        const origin = req.headers.origin;
        // 允许指定源访问
        res.setHeader('Access-Control-Allow-Origin', 'http://allowed-domain.com');
        // 允许的请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        // 允许的请求头
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        const data = { response: 'Data from server' };
        res.end(JSON.stringify(data));
    }).listen(8081);

## iframe跨域

## jsonp不支持POST请求，只支持GET
script src="http://example.com/api?callback=myCallback" /script
      </pre>
    </section>

    <section>
      <h3>专题系统</h3>
      <pre>
# **为什么需要加密？**
因为http的内容是明文传输的，明文数据会经过中间代理服务器、路由器、wifi热点、通信服务运营商等多个物理节点，如果信息在传输过程中被劫持，传输的内容就完全暴露了。
劫持者还可以篡改传输的信息且不被双方察觉，这就是中间人攻击。
所以我们才需要对信息进行加密。

最容易理解的就是对称加密
简单说就是有一个密钥，它可以加密一段信息，也可以对加密后的信息进行解密，和我们日常生活中用的钥匙作用差不多
如果通信双方都各自持有同一个密钥，且没有别人知道，这两方的通信安全当然是可以被保证的（除非密钥被破解）。

非对称加密
简单说就是有两把密钥，通常一把叫做公钥、一把叫私钥，用公钥加密的内容必须用私钥才能解开，同样，私钥加密的内容只有公钥能解开。

数字签名 CA证书

# http2 与 http1.1 区别
- HTTP/1.1有两个主要的缺点：安全不足和性能不高。
- HTTP/2完全兼容HTTP/1，是“更安全的HTTP、更快的HTTPS"，二进制传输、头部压缩、多路复用、服务器推送等技术可以充分利用带宽，降低延迟，从而大幅度提高上网体验；
- QUIC 基于 UDP 实现，是 HTTP/3 中的底层支撑协议，该协议基于 UDP，又取了 TCP 中的精华，实现了即快又可靠的协议。

# 前端网络储存
cookie与session

### 使用方式
cooki机制：

- 生命周期
    - 默认情况下，cookie**保存在内存**中，浏览器关闭就没了
    - **设置过期**时间后，cookie**保存在硬盘**上，关闭浏览器仍然存在，直到过期时间结束才消失。
- 数据类型
    - cookie以**文本**形式保存在客户端，每次请求时都带上它。

session机制：

- 每次请求，服务器会检查是否有sessionid
    - 有，服务器根据id返回对应session对象
    - 无，服务器创建新的session对象，并把sessionid在本次响应中返回给客户端。
- 通常使用cookie方式存储sessionid到客户端
    - **用户禁用cookie时，如何传递sessionid**
    - 服务端渲染：服务端可以使用URL重写，就是把session_id附带在每个网址后面

- 前后端分离：
    - 后端把 sessionid 返回给前端
    - 前端判断浏览器是否禁用cookie `navigator.cookieEnabled` 如果禁用把 sessionid 存进 `localStorage` ，登录后传递 cookie

### 存储方式

- cookie
    - 只能保存**字符串类型**，以文本的方式
    - 根据同源策略，cookie 是区分端口的，但是浏览器实现来说，“cookie 区分域，而不区分端口，也就是说，同一个 ip 下的多个端口下的 cookie 是共享的！
- session
    - 能支持**任何类型**的对象

### 存储大小

- cookie单个不超过**4kb**
- session没限制

### 安全性

- cookie（不安全）：Cookie欺骗，Cookie截获；
- session（相对安全）的原因：
    - sessionID存在cookie中，首先得攻破cookie
    - sessionID得有人登录，或启动session_start才会有，所以攻破cookie也不一定能得到sessionID
    - 第二次启动session_start后，前一次的sessionID就失效，session过期后，sessionID也随之失效
    - sessionID是加密的

# localStorage 和 sessionStorage 区别
### 生命周期

- sessionStorage：
    - 有“浏览器窗口”的概念，在同源的窗口中始终存在。只要这个浏览器**标签或窗口没有关闭**，**刷新或进入同源另一个页面(不是同源也行)，数据依然存在**。
    但是sessionStorage在关闭了浏览器窗口后就会被销毁。
    同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。（隔离性）
- localStorage：
    - **生命周期永久**，除非主动删除**（js删除，清除浏览器缓存）**

### 存储大小
- 一般都是：5MB

### 存储位置
- 都保存在客户端，不与服务器进行交互通信

### 存储类型
- 只能存储**字符串类型**，对于复杂的对象可以使用ECMAScript提供的**JSON对象的stringify和parse**来处理

### 使用场景
- localStorage：购物车
- sessionStorage：**编辑页刷新页面**，写的内容不丢失。

### web storage 和 cookie 的区别
**作用不同**：web storage是用于**本地大容量存储**数据(存储量5MB);而cookie是用于**存用户登录状态**；
**使用方式**：web storage有setItem、getItem、removeItem、clear等方法，cookie需要我们自己来封装setCookie、getCookie、removeCookie。

## 前端请求axios
- 默认 headers 的 `Content-Type` ：
    - get: 无
    - put、post、patch 都为 `application/json`
- data、params
    - get 请求用：`params`
    - post 请求用：`data`
- post 请求常见的数据格式（content-type）
    1. `Content-Type: application/json` ： 请求体中的数据会以 json 字符串的形式发送到后端
        1. 后端得配置 `Access-Control-Allow-Headers`
    2. `Content-Type: application/x-www-form-urlencoded`：请求体中的数据会以普通表单形式（键值对）发送到后端 username=user1&password=pass123；
    3. `Content-Type: multipart/form-data`： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件
      </pre>
    </section>
  </div>
</template>

<script>
export default {
  name: "xxx",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 大文件上传、断点续传
    // 文件切片 -> 算 hash -> 卡的话用 webworker 或者时间切片 -> 顺便讲讲断点续传和秒传 -> 并发控制 -> 慢启动优化
  },
};
</script>

<style lang="scss" scoped></style>
