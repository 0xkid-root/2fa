
import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [email,setEmail]= useState("");
  const [token,setToken]= useState("");
  const [QrCode,setQrCode]= useState("");
  const [verify,setVerify]= useState(false);

  

  return (
    <>
    <div>

      <div style={{maxWidth:500,margin:'0 auto',padding:20,textAlign:'center'}}> 
        <h2>
          2FA Setup  using Speakeasy
        </h2>
        <input type="email" placeholder='Enter your email' style={{marginBottom:10,padding:8, width:'100%'}} />

        <br />
        <button style={{padding:"10px 20px",marginBottom:20}}>
          Generate QR Code!
        </button>

        <>
          <h4>
            Scan the QR Code with your authenticator app or use the secret key to set up two-factor authentication. 
          </h4>
          <img src={""} alt="QR Code " style={{width:200,marginBottom:20}} />

        </>
        <div>

          <input type="text" placeholder='Enter OTP from Authenticator'  style={{padding:8,width:"70%",marginRight:10}} />
          <button style={{padding:"10px 20px"}}>
            Verify OTP
          </button>
        </div>







      </div>



    </div>
      
    </>
  )
}

export default App
