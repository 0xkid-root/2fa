const express = require('express');
const cors  = require('cors');
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const speakeasy = require("speakeasy");
const User = require("./modal/User");

const app = express();
app.use(cors())

mongoose.connect("mongodb://localhost:27017/twofa").then(()=>{
    console.log("db connect  successfully")
}).catch(()=>{
    console.log("db not connect")
})
app.use(express.json());



// generate secret   and qr code ----------

app.post('/generate',async(requestAnimationFrame,res)=>{
    const {email} = req.body;

    const user = await User.findOne({
        Email:email
    })
    //  i m checking email :----
    if(user){
        return res.json({
            error:"Email alrady in use"
        })
    }

    const secret = speakeasy.generateSecret({
        name:`ryzer.app ${email}`
    });
    console.log("secret is speakeasy",secret);
 // secreat have a two thing first is base32  key and second thing is otp auth URL 

 await User.create({
    Email:email,
    SecretKey:secret.base32,
 })

 QRCode.toDataURL(secret.otpauth_url,(error,data_url)=>{
    if(error){
        return res.json({
            error:"Something Went Wrong!"
        })
    }
    res.json({
        qr:data_url
    })

 })

})


//verify OTP using Stores Secret function is here why you are fear baby ----- @@##@@

app.post("/verify",async(req,res)=>{
    const {email,token} = req.body;
    const user = User.findOne({
        Email:email,
    })

    if(!user){
        return res.json({
            msg:"User not found!"
        })
    }


    const verified = speakeasy.totp.verify({
        secret:user.SecretKey,
        encoding:base32,
        token,
        window:1
    })
    // here he return true and false value ---------=======

    res.json(verified);

})



app.listen(9000,()=>{
    console.log(`server is running on port 9000`);
})