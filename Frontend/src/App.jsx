
import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [email,setEmail]= useState("");
  const [token,setToken]= useState("");
  const [QrCode,setQrCode]= useState("");
  const [verify,setVerify]= useState(false);
  const BaseUrl = `http://localhost:9000`

  const handleGenerate = async()=>{
    const {data} = await axios.post(`${BaseUrl}/generate`,{email});
    console.log("data i shere:",data);
    setQrCode(data.qr);
  }

  const handleToken = async ()=>{
    const {data} = await axios.post(`${BaseUrl}/verify`,{email,token})
    console.log("data in hshdsh",data);
    setVerify(data.verified);
  }



  return (
    <>
    <div>

      <div style={{maxWidth:500,margin:'0 auto',padding:20,textAlign:'center'}}> 
        <h2>
          2FA Setup  using Speakeasy
        </h2>
        <input type="email" placeholder='Enter your email' style={{marginBottom:10,padding:8, width:'100%'}} 
         value={email}
         onChange={(e)=>{setEmail(e.target.value)}}
        />

        <br />
        <button onClick={handleGenerate} style={{padding:"10px 20px",marginBottom:20}}>
          Generate QR Code!
        </button>

        { QrCode !== "" &&  <>
          <h4>
            Scan the QR Code with your authenticator app or use the secret key to set up two-factor authentication. 
          </h4>
          <img src={QrCode} alt="QR Code " style={{width:200,marginBottom:20}} />

        </>}
        <div>

          <input type="text" placeholder='Enter OTP from Authenticator'  style={{padding:8,width:"70%",marginRight:10}} 
          value={token}
          onChange={(e)=>{setToken(e.target.value)}}
          
          />
          <button onClick={handleToken} style={{padding:"10px 20px"}}>
            Verify OTP
          </button>
        </div>

        { verify !==  null && <h3 style={{color:'green',marginTop:20}}> 
          {verify == true ? "OTP verified Successfully" : "Invalid OTP Try Again!!"}
        </h3>}

      </div>

    </div>
      
    </>
  )
}

export default App
