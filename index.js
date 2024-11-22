import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectToMongoDb } from './connection.js';
import { router } from './url/UrlRouter.js';
import { userRouter } from './users/UserRouter.js';

dotenv.config();
connectToMongoDb(process.env.MONGODB_URL)


const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))



app.use("/api/url", router)

app.use("/api/users", userRouter)

app.use("/home",(req, res) => {
    res.render("home", {
        username : "rakesh"
    })
})

app.use("/", (req, res) => {
    res.status(404).json({error : "page not found"})
})