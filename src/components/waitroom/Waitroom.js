import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Selectplayers from '../selectplayers/Selectplayers'
import { useNavigate } from 'react-router-dom';
import {API} from '../../global/Api'
import './Waitroom.css'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Waitroom({socket,teamName,room,admin,playersDetail}) {
    const navigate =useNavigate()
    const [amount,setAmount] = useState({})
    const [currentAmount,setCurrentAmount] = useState('')
    const [start,setStart] = useState(false)
    const [selectPlayer,setSelectPlayer] = useState(false)
    const [players,setPlayers] = useState([])
    const [next,setNext] = useState(0)
    const [commend,setCommend] = useState([])
    const [totalAmount,setTotalAmount] = useState([])
    const [details,setDetails] = useState([])
    const [hover,setHover] = useState(false)

   

   useEffect(()=>{
    playersDetail(details)
   },[details,playersDetail])
 
useEffect(()=>{
    fetch(`${API}/amount`,{
        method:"POST",
        body:JSON.stringify({
            team:teamName,
            amount:100000
        }),
        headers:{'Content-Type':'application/json',
        my_token:localStorage.getItem("token")}
    })

},[teamName])

useEffect(()=>{
    fetch(`${API}/amount`,{
        headers:{'my_token':localStorage.getItem("token"),}
    })
    .then((data)=>data.json())
    .then((value)=>setTotalAmount(value))

},[currentAmount])
  
    useEffect(()=>{
        socket.on('receive-amount',datas =>{
            setAmount(datas)
            setCommend(data=>[...data,datas])
        })

        socket.on('receive-players',myTeam =>{
            setPlayers(players=>[...players,myTeam])
            
            
        })

        socket.on('receive-next',nextPlayer =>{
            setNext(nextPlayer.next)
            
            
        })

        socket.on('receive-start',start =>{
            setStart(start.start)
            
        })

        socket.on('receive-nil',nilValue =>{
            setAmount(nilValue.nil)
        })

        socket.on('receive-team',teamNameOfAll =>{
            if(localStorage.getItem("token")){
            navigate(teamNameOfAll.teamName)
            }
        })

        socket.on('receive-details',details =>{
            setDetails(data=>[...data,details])
        })

    },[socket,navigate])



    const sendAmount = async ()=>{
        if(currentAmount !== ''){
        if( currentAmount > parseInt(amount.amount) || !amount.amount){
            const amountData = {
                room:room,
                team:teamName,
                amount:currentAmount
            }
            for(let i=0;i<totalAmount.length;i++){
            if(totalAmount[i].team === teamName ){
                if(totalAmount[i].amount >= currentAmount){
            await socket.emit('send-amount',amountData)
            setAmount(amountData)
            setCommend(data=>[...data,amountData])
            setCurrentAmount('')
            }else{
                alert("You not having enough of money")
            }
        }
        }
        }else{
            alert("Choosle more amount then current amount")
        }
    }else{
            alert("Fill the amount")
        }
    }



    const handleStart=async()=>{
        if(admin){
        if(players.length !==0 ){
            const start = {
                room:room,
                team:teamName,
                start:true
            }
            await socket.emit('send-start',start)
        setStart(start.start)
        }else{
            alert('Select players')
        }
    }else{
        alert('Only admin can start')
    }
    }

   const handleNext =async ()=>{
    if(admin){
       if(amount.amount){
        detailsOfPlayers()
    if(players.length-1 > next ){
        
        const nextPlayer = {
            room:room,
            team:teamName,
            next: next+1
        }
      for(let i=0;i<totalAmount.length;i++){
        if(totalAmount[i].team === amount.team && amount.amount){
            if(totalAmount[i].amount >= 0){
        
            fetch(`${API}/amount/${amount.team}`,{
                method:"PUT",
                body:JSON.stringify({
                    amount:totalAmount[i].amount - Number(amount.amount)
                }),
                headers:{'Content-Type':'application/json',
                my_token:localStorage.getItem("token")},
               
               })

            await socket.emit('send-next',nextPlayer)
            setNext(nextPlayer.next)
            setCurrentAmount('')


            const nilValue = {
                room:room,
                team:teamName,
                nil: ''
            }
            await socket.emit('send-nil',nilValue)
            setAmount(nilValue.nil)
            

       
       
            }else{
                alert('Bet the amount (or) reject the player')
            }
        
        }
    }
    }else if(!amount.amount){
        alert("Bet the amount")
    }
    else{
        const teamNameOfAll = {
            room:room,
            team:teamName,
            teamName : '/auction/players'
        }
        fetch(`${API}/amount/delete`,{
            method:'DELETE',
            headers:{'my_token':localStorage.getItem("token"),}
        })
        await socket.emit('send-team',teamNameOfAll)
        if(localStorage.getItem("token")){
        navigate(teamNameOfAll.teamName)
        }
       
        
    }
}else{
    alert("Bet the amount")
}
}else{
    alert('Only admi can sell a player')
}


   }


  const detailsOfPlayers =()=>{
   
    var details = {
        room:room,
        team : amount.team,
        player : players[next].name,
        price: amount.amount
    }
    
     socket.emit('send-details',details)
     setDetails(data=>[...data,details])
  }
 
  const handleMouseOver = ()=>{
    
    setHover(true)
  }

  const handleMouseOut = ()=>{
    
    setHover(false)
  }



  return (
    <div className='waitRoom'>
        <p ><AdminPanelSettingsIcon  className='admin' style={{color:admin ?"#66F714":"red",fontSize:"28px"}} onMouseOut={()=>handleMouseOut()} onMouseOver={()=>handleMouseOver()} />{hover?admin?<p className='hoverAdmin' style={{color:'#66F714'}}>Admin</p> : <p className='hoverAdmin' style={{color:'red'}}>Not Admin</p>:null}</p>
        { !start ?
        <div >
            {selectPlayer ?
            <div>
        <Selectplayers players={{setPlayers ,players}}  socket={socket} room={room} teamName={teamName} selectPlayer={setSelectPlayer}/>
        </div>:
        <div >
            <AddCircleIcon className='waitRoomSelectIcon' onClick={()=>setSelectPlayer(true)}/>
            <div>
                <div className='waitRoomSelectedPlayers'>
                    {players.length !== 0?
                <div >
                   
                    {players.map((playersDetail,index)=>(
                        <div className='listOfPlayers'  key={index}>
                            <div>
                        <label className='playerListHeadingDetails'>Name</label>
                    <p >{playersDetail.name}</p>
                    </div>
                    <div>
                        <label className='playerListHeadingDetails'>Role</label>
                    <p >{playersDetail.role}</p>
                    </div>
                    <div>
                        <label className='playerListHeadingDetails'>Hand</label>
                    <p >{playersDetail.hand}</p>
                    </div>
                    </div>
                ))}
                </div>:null
                }
                    </div>
                <button className='waithRoomStartButton' onClick={handleStart}>Start</button></div>
                <div >
              <button className='waithRoomBackButton' onClick={()=>navigate(-1)}>BACK</button>
            </div>
            </div>}
        </div>:
        <div>
            { next.length !== 0?
            <div className='totalAmountAndPlayerDetails'>
                <div>
                    <h4>Total Amount</h4>
                    {totalAmount.map((total,index)=>(
                    <p key={index}>{teamName === total.team? total.amount :null}</p>
                    ))}
                </div>
                <div>
                    <h4>Player details</h4>
                <p>{players[next].name}</p>
                <p>{players[next].role}</p>
                <p>{players[next].hand}</p>
                </div>
            </div> :null
}
            <div className='bettingArea'>
                <div>
                    
        <p className='betAmount'>{amount.amount}</p>
               
        <input className='bettingInput' value={currentAmount} type='number' placeholder='Amount' onChange={(e)=>setCurrentAmount(e.target.value)}/>
        <button className='bettingButton' onClick={sendAmount}>Bet</button>
        <div className='sellButton' onClick={()=>handleNext()}>Sell</div>
        <button className='waithRoomBackButton' onClick={()=>navigate(-1)}>BACK</button>
        
        </div>
        <div>
            <h4>commend</h4>
            <div className='commend'>
          {commend.length !== 0 ?
        
          commend.map((com,index)=>(
                <div className='commendDetails' key={index}>
                    <p>{com.team}</p>
                    <p>{com.amount}</p>
                    </div>
                    
            )) : null}
            </div>
            
        </div>
        </div>
        </div>
    }
    </div>
  )
}

export default Waitroom