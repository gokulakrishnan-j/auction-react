import React from 'react'
import './Players.css'
import {useNavigate} from 'react-router-dom'

function Players({playersDetail}) {
  const navigate = useNavigate()


  return (
    <div className='players'>
      <div >
              <button className='playerBackButton' onClick={()=>navigate(-1)}>BACK</button>
            </div>
    <div className='playerBox'>  {
        
        playersDetail.map((detail,index)=>(
          <div className='playerDetails' key={index}>
            <div>
              <h4>Name</h4>
            <p>{detail.player}</p>
            </div>
            
            <div>
            <h4>Price</h4>
            <p>{detail.price}</p>
            </div>

            <div>
              <h4>Team</h4>
            <p>{detail.team}</p>
            </div>
          
          </div>
        ))
         }</div>
    </div>
  )
}

export default Players