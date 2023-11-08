const express = require('express')
const cors = require('cors')
const userRoutes = require("./src/routes/userRoutes")
require('dotenv').config() 

const app = express()
const port = process.env.PORT || 8000

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log('Server says hiii!')
})

app.use('/api/v1/users', userRoutes);

