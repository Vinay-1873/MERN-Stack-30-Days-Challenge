import {useState} from "react";

function App(){
  const[isLoginmode, setLoginmode]=useState(true);

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('');
  // function to toggle the button
   const togglemode = () => {
    return setLoginmode(!isLoginmode);
   };

   const submitHandler = async(event)=>{
    event.preventDefault();
    const url = isLoginmode 
      ? 'http://localhost:5000/api/login' 
      : 'http://localhost:5000/api/signup';

    try {
      // 2. Send the messenger (fetch) to the backend
      const response = await fetch(url, {
        method: 'POST', // 'POST' means we are securely submitting data
        headers: {
          'Content-Type': 'application/json', // Telling the server to expect JSON format
        },
        // We package the email and password into a JSON string to send over the internet
        body: JSON.stringify({ email: email, password: password }) 
      });

      // 3. Read the Bouncer's reply
      const data = await response.json();

      // 4. Check if the Bouncer approved the request (response.ok means a successful 200 status code)
      if (response.ok) {
        alert("Success! " + data.message);
        
        // If they successfully logged in, we save their VIP Wristband (Token) in the browser's memory
        if (isLoginmode && data.token) {
          localStorage.setItem('token', data.token);
          console.log("Token saved to local storage!");
        }
      } else {
        // If the Bouncer rejected them (wrong password, email already exists, etc.)
        alert("Rejected: " + data.message);
      }

    } catch (error) {
      // This happens if the server is completely turned off or broken
      console.error("Network error:", error);
      alert("Could not connect to the server. Is your backend running on port 5000?");
    }
  };


  
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
        <h2 style={{ textAlign: 'center' }}>{isLoginmode ? 'Login' : 'Sign Up'}</h2>

        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Email Address</label>
            <input 
             type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             required 
             style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>
          
          <div>
            <label>Password</label>
            <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
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