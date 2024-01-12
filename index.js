const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na1-5bbf2d8f-7eb7-4b8c-8ea1-ec484c7171e1';
const HUB_BASE_URI ='https://api.hubspot.com/crm/v3';
const PORT = 3000;

const baseURI = `http://localhost:${PORT}`;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const bikes = 'https://api.hubspot.com/crm/v3/objects/bikes?properties=bike_name,brand,bike_type';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(bikes, { headers });
        const data = resp.data.results;
        res.render('bikes',  { baseURI: baseURI + "/", data });      
    } catch (error) {
        console.error(error);
    }
});




// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here


app.get('/update', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/bikes';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('updates',  { baseURI: baseURI + "/update", data });      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
*/
app.post("/update", async (req, res) => {
    console.log("Post Req:  ")
  const update = {
    properties: {
      bike_name: req.body?.bike_name ?? 'Ranger',
      brand: req?.body?.brand ?? 'Norco',
      bike_type: req?.body?.bike_type ?? 'Mountain',
    },
  };
  console.log(update);
  const updateCustomObject = 'https://api.hubspot.com/crm/v3/objects/bikes';
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };
  try {
    await axios.post(updateCustomObject, update, { headers });
    res.redirect("/");
  } catch (e) {
    console.error(e.message);
    res.redirect("/");
  }
});



// * Localhost
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


