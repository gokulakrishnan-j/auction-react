import React,{useEffect, useState} from 'react'
import io from 'socket.io-client'
import Waitroom from '../waitroom/Waitroom'
import { API } from '../../global/Api'
import './CreateRoom.css'
import { useNavigate } from 'react-router-dom'

const socket = io.connect(API)
function CreateRoom({playersDetail}) {
  const navigate = useNavigate()
    const [teamName,setTeamName] = useState('')
    const [room,setRoom] = useState('')
    const [showRoom,setShowRoom] = useState(false)
    const [copy,setCopy] = useState("copy")

var admin = "admin"

    const joinRoom=()=>{
if(teamName && room){
  socket.emit('join-room',room.roomId);
setShowRoom(true)
}
    }

    useEffect(()=>{
      fetch(`${API}/autogenpassword`,{
        headers:{'my_token':localStorage.getItem("token"),}
      })
      .then((data)=>data.json())
      .then((val)=>console.log(val))
      .then((value)=>setRoom(value))
    },[])

    const handleCopy = () =>{
      navigator.clipboard.writeText(room.roomId);
      setCopy("copied")
    }
    
  return (
    <div className='createRoom'>
        { !showRoom ?
        <div className='createRoomBox'>
            <input className='createRoomInput' placeholder='Team Name' onChange={(e)=>setTeamName(e.target.value)} />
            <div className='roomId'>
            <p className='roomIdName'>{room.roomId}</p>
            <h5 className='copy' onClick={()=>handleCopy()}>{copy}</h5>
            </div>
            <div>
                <button className='createRoomButton' onClick={joinRoom}>Create</button>
            </div>
            <div >
              <button className='createRoomBackButton' onClick={()=>navigate(-1)}>BACK</button>
            </div>
        </div>
        : <Waitroom socket={socket} playersDetail={playersDetail} admin={admin} teamName={teamName} room={room.roomId}/>}
    </div>
  )
}

export default CreateRoom
