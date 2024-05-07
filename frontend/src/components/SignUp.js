import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
      const auth = localStorage.getItem("user");
      if(auth){
        navigate('/');
      }
    },[navigate])
    const CollectData = async ()=>{
        // console.log({name,email,password});
        let result = await fetch('http://localhost:5000/register',{
          method : 'post',
          body: JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          },
        });
        result = await result.json();
        // console.log(result);
        localStorage.setItem('user',JSON.stringify(result));
        if(result){
          navigate('/');
        }
    }

  return (
    <div className='register'>
      <h1>Registration...</h1>
      <input className='inputBox' value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter Name'/>
      <input className='inputBox' value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter Email'/>
      <input className='inputBox' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter Password'/>
      <button className='appButton' onClick={CollectData}>Sign Up</button>
    </div>
  )
}

export default SignUp
