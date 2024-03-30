import express from "express"
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import connectTomongoDb from '../db/connectTomongoDB.js';

const app =express()
app.use(express.json())
dotenv.config();
const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.send('helloaaaaa')
})
app.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.FROM_MAIL_ID,
            pass: process.env.PSWD
        }
    });
 
    const{} = req.body;
 
    const mailOptions = {
        from : process.env.FROM_MAIL_ID,
        to : process.env.TO_MAIL_ID,
        subject:'sent via nodemailer',
        html:`<h1>This message is sent using nodemailer.</h1>`
    };
 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201).send('Email sent successfully');
        }
    });
 });


 app.listen(PORT,()=>{
    connectTomongoDb();
    console.log(`server is running on port ${PORT}`)
}
    
)