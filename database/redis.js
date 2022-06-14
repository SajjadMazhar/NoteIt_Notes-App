const redis = require("redis")

const client = redis.createClient({
    host:"localhost",
    port:6379
})

client.connect();
client.on("connect", ()=>{
    console.log("redis connection successfull")
})
client.on("error", (err)=>{
    console.log("redis error -- ", err)
})

module.exports = client