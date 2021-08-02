const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;
const mongoose = require('mongoose')
const app = express();
const {Patient} = require('./patient')



// O5ZO2nHPj09LAkO3

mongoose.connect('mongodb+srv://kyleschneider:O5ZO2nHPj09LAkO3@cluster0.7rsp0.mongodb.net/twiliolcpt?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});





// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (req, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  console.log(req.body.Caller)
  const VoiceResponse = require('twilio').twiml.VoiceResponse;
//  '<Response><Say>Hi Greg this is an automated phone message from Lake City Physical Therapy just letting you know that you have an open balance. Please at your earliest convience give our  billing department a call at 208-667-1988 or visit our website at lake-city-pt.com and navigate to the patient payment portal. If this information seems incorrect please contact us to resolve the matter, Thank You</Say></Response>'
  // const twiml = new VoiceResponse();
  const twiml = new VoiceResponse();

  twiml.say('Hi this is Lake City PTs automated phone service stay on the line and we will connect you with a representative');
  twiml.dial('+12088183015')
  twiml.dial('+12088507141')
  console.log(twiml.toString());

  // twiml.say(`Hi Kyle this is an automated phone message from Lake City Physical Therapy just letting you know that you have an outstanding balance. Please at your earliest convience give our  billing department a call at 208-667-1988 or visit our website at lake-city-pt.com and navigate to the patient payment portal. If this information seems incorrect please contact us to resolve the matter, Thank You and have a nice day.`);

  // // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});


app.post('/add', (req, res)=>{

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


// Create an HTTP server and listen for requests on port 3000
const port = process.env.PORT || 8080

app.listen(port, () =>{
    console.log('SERVER RUNNING', port)
})