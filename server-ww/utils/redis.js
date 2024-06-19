const redis = require("redis");
const client = redis.createClient({ url: "redis://127.0.0.1:6379" }); //默认没有密码 127.0.0.1  端口也是默认

// 如果是连接远程的话
// redis[s]://[[username][:password]@][host][:port][/db-number]:
// const client = createClient({
// 	url: 'redis://alice:foobared@awesome.redis.server:6380'
// });
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => {
  console.log("redis connect success");
});

client.connect();

module.exports = client;
