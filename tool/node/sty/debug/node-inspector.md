# node-inspector

[repo](https://github.com/node-inspector/node-inspector)

```bash
npm install -g node-inspector
```

- node-inspector 是通过 websocket 方式来转向 debug 输入输出
- 调试前需要先先启动node-inspector 来监听 Nodejs 的 debug 调试端口
- 默认情况下 node-inspector 的端口是 8080 通过参数--web-port=[port]来设置端口


`node-debug server.js`

或者

`node --debug server.js` 或者第一行就pause `node --debug-brk server.js`
`node-inspector`

打开
`http://localhost:8080/debug?port=5858`

然后调试 `just like client-side JS` 断点、跳过、堆栈、求值... 各种姿势 你喜欢就好

