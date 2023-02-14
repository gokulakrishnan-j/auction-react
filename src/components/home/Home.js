import React,{useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../global/Api'
import './Home.css'

function Home({emailId}) {
    const navigate = useNavigate()
    const {email}= useParams()

    useEffect(()=>{
     emailId(email)
  },[email,emailId])

    useEffect(()=>{
        fetch(`${API}/auction/token/${email}`)
        .then((data)=>data.json())
        .then((value)=>localStorage.setItem("token",value.my_token))
    },[email])

  return (
    <div className='home'>
      <div className='homeBox'>
        <p className='homeRoom' onClick={()=>navigate(`/auction/create-room/${email}`)}>Create Room</p>
        <p className='homeRoom' onClick={()=>navigate(`/auction/join-room/${email}`)}>Join Room</p>
        
        <div>
          <button className='homeBackButton' onClick={()=>navigate(-1)}>BACK</button>
        </div>
        
        </div>
        
    </div>
  )
}

export default Home