import { io } from "socket.io-client"
import { useEffect } from "react"

export default function Chat(){

  useEffect(()=>{

    const socket = io("http://localhost:4000")

    socket.on("connect",()=>{
      console.log("socket connected")
    })

  },[])

  return <h1>HENG Chat</h1>

}