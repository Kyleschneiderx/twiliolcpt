const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

const app = express();

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (req, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  console.log(req.body.From)

//  '<Response><Say>Hi Greg this is an automated phone message from Lake City Physical Therapy just letting you know that you have an open balance. Please at your earliest convience give our  billing department a call at 208-667-1988 or visit our website at lake-city-pt.com and navigate to the patient payment portal. If this information seems incorrect please contact us to resolve the matter, Thank You</Say></Response>'
  const twiml = new VoiceResponse();
  twiml.say(`Hi Kyle this is an automated phone message from Lake City Physical Therapy just letting you know that you have an outstanding balance. Please at your earliest convience give our  billing department a call at 208-667-1988 or visit our website at lake-city-pt.com and navigate to the patient payment portal. If this information seems incorrect please contact us to resolve the matter, Thank You and have a nice day.`);

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(8080, () => {
  console.log(
    'Now listening on port 3000. ' +
    'Be sure to restart when you make code changes!'
  );
});