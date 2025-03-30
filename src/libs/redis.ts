import { createClient, RedisClientType } from "redis";
import { redisHost, redisPassword, redisPort, redisUsername } from "./env";

let client :RedisClientType | undefined
export const redisClient = async ()=>{
    try {

        if(!client){

            client = createClient({
                username:redisUsername,
                password:redisPassword,
                socket:{
                    host:redisHost,
                    port:redisPort,
                    connectTimeout:30000
                },
                database:0,
                disableOfflineQueue:true,
                pingInterval:3000
            })
    
            await client
            .on("connect",()=>{
                console.log("Connected to redis server")
            })
            .on("ready",()=>{
                console.log("Redis is ready")
            })
            .on("end",()=>{
                console.log("Redis is ended")
            })
            .on("error",(err)=>{
                console.log("error :",err)
            })
            .on("reconnecting",()=>{
                console.log("Reconnecting")
            })
            .connect()

        }

        return client

    } catch(err:any) {
        console.log(err.message)
    }
}


function disconnect() {
    if(client) {
      client.disconnect()
    }
  }
  
process.on('SIGINT', function() {
    disconnect()
  });

