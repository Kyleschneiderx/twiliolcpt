const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;
// const mongoose = require('mongoose')
const app = express();
const {Patient} = require('./patient')
require('dotenv').config()



// O5ZO2nHPj09LAkO3

// mongoose.connect(process.env.MONGO_URI,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

app.use(express.json({
  type: ['application/json', 'text/plain']
}));

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (req, response) => {


  const VoiceResponse = require('twilio').twiml.VoiceResponse;
  const twiml = new VoiceResponse();
  twiml.say(`Hi this is Lake City PT billing departments automated phone service please stay on the line and we will try an connect you with a representative. If we cannot connect you with a representative please leave us a message and we'll get back to you as soon as possible, or go to lake-city-pt.com to find out more information. Thank You`);
  const dial = twiml.dial();
  dial.number(process.env.PHONE_ONE)
  dial.number(process.env.PHONE_TWO)
  dial.number(process.env.PHONE_THREE)
  dial.number(process.env.TEST_NUMBER)
  response.type('text/xml');
  response.send(twiml.toString())
  console.log(twiml.toString());

  // Patient.find({"number": `${req.body.Caller}`})
  // .then(res =>{
  //   if(res.length === 0){
  //     const VoiceResponse = require('twilio').twiml.VoiceResponse;
  //     const twiml = new VoiceResponse();
  //     twiml.say(`Hi this is Lake City PT billing departments automated phone service please stay on the line and we will try an connect you with a representative. If we cannot connect you with a representative please leave us a message and we'll get back to you as soon as possible, or go to lake-city-pt.com to find out more information. Thank You`);
  //     const dial = twiml.dial();
  //     dial.number(process.env.PHONE_ONE)
  //     dial.number(process.env.PHONE_TWO)
  //     dial.number(process.env.PHONE_THREE)
  //     dial.number(process.env.TEST_NUMBER)
  //     response.type('text/xml');
  //     response.send(twiml.toString())
  //     console.log(twiml.toString());
  //   }else{
  //     console.log(res[0].name)
  //     const VoiceResponse = require('twilio').twiml.VoiceResponse;
  //     const twiml = new VoiceResponse();
  //     twiml.say(`Hi ${res[0].name} thank you for giving us a callback, This is Lake City Physical Therapy billing departments automated phone service please stay on the line and we will try an connect you with a representative. If we cannot connect you with a representative please leave us a message and we'll get back to you as soon as possible. Thank You`);
  //     const dial = twiml.dial();
  //     dial.number(process.env.PHONE_ONE)
  //     dial.number(process.env.PHONE_TWO)
  //     dial.number(process.env.PHONE_THREE)
  //     dial.number(process.env.TEXT_NUMBER)
  //     response.type('text/xml');
  //     response.send(twiml.toString())
  //     console.log(twiml.toString());
  //   }


  // })
  // .catch((err)=>{
  //   console.log(err)
  // })

});


app.post('/add', (req, res)=>{

  console.log(req.body)

  const patient = new Patient({
    ...req.body
  });

  patient.save((err, doc)=>{
      if(err) return res.status(400).send(err)
      res.status(200).json({
          post:true,
          patientId: doc._id
      })
  })

})


app.post('/sms', (req, res)=>{
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  console.log(req.body.Body)
  const twiml = new MessagingResponse();
  const reply = req.body.Body.toLowerCase()
  if(reply === 'remove'){
    console.log('Please remove patient')
    twiml.message('You were removed from the referral list');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }else{
    console.log('checkingOpenTimes')
    twiml.message('That is not a command I understand please give us a call at 208-667-1988 if you need help resolving any questions?');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
})


// Create an HTTP server and listen for requests on port 3000
const port = process.env.PORT || 8080

app.listen(port, () =>{
    console.log('SERVER RUNNING', port)
})