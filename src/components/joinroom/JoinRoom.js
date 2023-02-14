import React,{useState} from 'react'
import { API } from '../../global/Api'
import io from 'socket.io-client'
import Waitroom from '../waitroom/Waitroom'
import './JoinRoom.css'
import { useNavigate } from 'react-router-dom'

const socket = io.connect(API)

function JoinRoom({playersDetail}) {
  const navigate =useNavigate()
    const [teamName,setTeamName] = useState('')
    const [room,setRoom] = useState('')
    const [showRoom,setShowRoom] = useState(false)

    const joinRoom=()=>{
        if(teamName && room){
          socket.emit('join-room',room);
        setShowRoom(true)
        }
            }
  return (
    <div className='joinRoom'>
        
        { !showRoom ?
        <div className='joinRoomBox'>
          <div>
            <input className='joinRoomInput' placeholder='Team Name' onChange={(e)=>setTeamName(e.target.value)} />
            </div>
            <div>
            <input className='joinRoomInput' placeholder='Room Id' onChange={(e)=>setRoom(e.target.value)} />
            </div>
            <div>
                <button className='joinRoomButton' onClick={joinRoom}>Join</button>
            </div>
            <div >
              <button className='joinRoomBackButton' onClick={()=>navigate(-1)}>BACK</button>
            </div>
        </div>
        : <Waitroom socket={socket} playersDetail={playersDetail} teamName={teamName} room={room}/>}

    </div>
  )
}

export default JoinRoom