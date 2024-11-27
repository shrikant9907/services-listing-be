const express = require('express');
const cors = require('cors')
const connectDatabase = require('./src/config/dbconfig');
const categoryRouter = require('./src/routes/categoryRoute');
const locationRouter = require('./src/routes/locationRoute');
const businessRouter = require('./src/routes/businessRoute');
const userRouter = require('./src/routes/userRoute');
const authRouter = require('./src/routes/authRoute');
const app = express();

const hostname = process.env.HOSTNAME ?? "localhost"; // 127.0.0.0
const port = process.env.PORT ?? "5000";

// Connecting with Database
connectDatabase()

// Middlewares
app.use(express.json()) // Body pharser

const corsOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/location', locationRouter)
app.use('/api/business', businessRouter)
app.use('/api/auth/', authRouter)

// Server Start Process
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})