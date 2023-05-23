import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { database } from './database'
import { allowedOrigins, credentials } from './middleware'
import router from './routers'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(credentials)
app.use(cors({origin: allowedOrigins}))
app.use(express.json()) 
app.use(cookieParser())

app.use('/api/v1', router)

const PORT = process.env.PORT || "8080"

database.on('connected', () => {
  app.listen(PORT, () => {
    console.log(`Starting on server ${PORT}`);
  })
})