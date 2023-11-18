const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoute = require('./routers/userRoutes');
const movieRoute = require('./routers/movieRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(cookieParser());
app.use(express.json());
 

app.use('/user',userRoute);
app.use('/movie',movieRoute);

mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
app.listen(5000)
console.log('app listening to port 5000')}).catch((err)=>
console.log((err)))



// dHeLeDLVgoZZ2Xyx