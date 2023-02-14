import React, { useState } from 'react'
import './Selectplayers.css'

function Selectplayers({players,selectPlayer,socket,room,teamName}) {
    const [name,setName] = useState()
    const [role,setRole] = useState()
    const [hand,setHand] = useState()


    const handleSelect=async ()=>{

     
                const myTeam = {
                    room:room,
                    team:teamName,
                    name :name,
                    role:role,
                    hand:hand,
                   
                }
                await socket.emit('send-players',myTeam)

                players.setPlayers(players=>[...players,myTeam])

                selectPlayer(false)

               
    }
    const handleBack = ()=>{
        selectPlayer(false)
    }
  return (
    <div>
        <form onSubmit={handleSelect}>
        <div >
            <input className='selectPlayersInput' placeholder='Name' type='text' onChange={(e)=>setName(e.target.value)} required/>
        </div>
        <div className='selectPlayersRadioButtonBox'>
        <div className='selectPlayersRadioButtonRole'>
        <h3>Role</h3>
            <div>
            <label htmlFor='Batter'>Batter</label>
            <input id='Batter' name='role'  type='radio' onChange={(e)=>setRole(e.target.id)} required/>
            </div>

            <div>
            <label htmlFor='Bowler'>Bowler</label>
            <input id='Bowler' name='role'  type='radio' onChange={(e)=>setRole(e.target.id)} required/>
            </div>

            <div>
            <label htmlFor='All Rounder'>All Rounder</label>
            <input id='All Rounder' name='role' type='radio' onChange={(e)=>setRole(e.target.id)} required/>
            </div>

            <div>
            <label htmlFor='Wicket kepper'>Wicket kepper</label>
            <input id='Wicket kepper' name='role' type='radio' onChange={(e)=>setRole(e.target.id)} required/>
            </div>
        </div>
    
        <div className='selectPlayersRadioButtonHand'>
        <h3>Hand</h3>
        <div>
            <label htmlFor='Right'>Right</label>
            <input id='Right' name='hand' type='radio' onChange={(e)=>setHand(e.target.id)} required/>
            </div>
            <div>
            <label htmlFor='Left'>Left</label>
            <input id='Left' name='hand' type='radio' onChange={(e)=>setHand(e.target.id)} required/>
            </div>
        </div>
        </div>
        <div>
            <button className='selectPlayerSelectButton' type='submit'>Select</button>
        </div>
        </form>
        <div >
              <button className='selectPlayersBackButton' onClick={()=>handleBack()}>BACK</button>
            </div>
    </div>
  )
}

export default Selectplayers