import express from 'express'
import userRoutes from './routes/userRoutes.js' 
import accountRoutes from './routes/accountRoutes.js' 
import cors from 'cors'
import { errorHandler } from './middleware/errorMiddleware.js'
import { getAllRoutesAndResponds } from './controller/userController.js'
import connectDB from './config/db.js'

const app = express()

// cors middleware
app.use(cors())

// Middleware for json parsing 
app.use(express.json());

// route for showing the routes
// app.use('/' ,getAllRoutesAndResponds)
// console.log("sdfgh");

// bank routes
app.use('/users' , userRoutes )
app.use('/accounts' , accountRoutes )

app.use(errorHandler)

const PORT = process.env.PORT || 3000 
connectDB().then(()=>{
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  

