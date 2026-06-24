import {useState} from "react";

function App(){
  const[isLoginmode, setLoginmode]=useState(true);

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('');
  // function to toggle the button
   const togglemode = () => {
    return setLoginmode(!isLoginmode);
   };

   const submitHandler = ()=>{
    stop.preventDefault();
    if(isLoginmode){
      console.log('logging with in:', email,password);
    }else{
      console.log('Registering with:', email, password);
    }
   }



  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
        <h2>{isLoginmode ? 'Login' : 'Sign Up'}</h2>

        <form action="">
          <div>
            <label>Email Address</label>
            <input 
             type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div>
            <label>Password</label>
            <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={{ padding: '10px', background: 'black', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoginmode? 'SignIn':'SignUp'}
          </button>
        </form>

        <p style={{ marginTop: '20px' }}>
          {isLoginmode?'dont have account':'login to your account'}
          <button onClick={togglemode} style={{ color: 'blue', cursor: 'pointer', background: 'none', border: 'none' }}>
            {isLoginmode? 'SignUp':'Login'}
          </button>
        </p>
    </div>
  );
}

export default App