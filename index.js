const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoute = require('./routers/userRoutes');
const movieRoute = require('./routers/movieRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();
// app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(cors({credentials:true, origin:"https://movie-application-mauve.vercel.app"}));

app.use(cookieParser());
app.use(express.json());
 

app.use('/user',userRoute);
app.use('/movie',movieRoute);
const port = process.env.PORT || 9001;
mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
app.listen(port)
console.log('app listening to port'+port)}).catch((err)=>
console.log((err)))



// dHeLeDLVgoZZ2Xyx