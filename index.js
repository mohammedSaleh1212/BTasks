const bodyParser = require('body-parser');
require('dotenv')
const express = require('express')
const cors = require('cors');
const mongoose  =require('mongoose')
const contacts = require('./routes/contacts')

const app = express()
// if(!process.env.JWT_PRIVATE_KEY) {
// console.log('FATAL ERROR : jwt private key is not defined')
// process.exit(1)
// }

mongoose.connect('mongodb://localhost/contactDatabase') 
.then(() => console.log('connected to the database'))
.catch(error => console.log(error.message))

app.use(express.json())
app.use(bodyParser.json())
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'x-auth-token');
    next();
});
app.use('/api/contacts',contacts)


//PORt
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})



