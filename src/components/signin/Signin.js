import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { API } from '../../global/Api'
import { useNavigate } from 'react-router-dom'
import './Signin.css'

const validationSchema = yup.object({
    email:yup
    .string()
    .email("Enter valied email")
    .required("Fill the email"),
    password:yup
    .string()
    .min(8,"Need a longer password")
    .max(14,"Too much password")
    .required("Fill the password")
})

function Signin() {

    const navigate = useNavigate()


    //using formik for validation
    const {handleSubmit,handleChange,handleBlur,touched,values,errors} = useFormik({
        initialValues:{
            email:"",
            password:""
        },

        validationSchema:validationSchema,

        onSubmit:(values)=>{
            

           fetch(`${API}/auction/login`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{'Content-Type':'application/json'},
           })
           //if login sucessfully navigating to product component or if login is unsucessfull alert box will be pop
         //  .then((login)=>login.ok ? navigate(`/auction/home/${values.email}`) : alert("wrong username or password"))
            .then(()=>navigate(`/auction/home/${values.email}`))

       
        }
    })
    
  return (
    <div className='signin'>

        <div className='loginBox'>

        <form onSubmit={handleSubmit}>

            <div >

         <input 
         className='inputForLogin'
        name='email' 
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder='Email'/>

        <div>

        {touched.email && errors.email ? errors.email : null}

        </div>
        </div>

        <div >

         <input 
         className='inputForLogin'
        name='password' 
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder='Password'
        />
        <div>

        {touched.password && errors.password ? errors.password : null}
        </div>
        </div>

        <button className='loginButton' type='submit'>Login</button>

        </form>
        
        {/*if user not registerd then we can click register it will navugate to register page*/}
        <div><p className="Don_not_have_an_account" >Don't have an account? <span className="register" onClick={()=>navigate('/auction/signup')}>Register</span></p></div>
        </div>

    </div>
  )
}

export default Signin
