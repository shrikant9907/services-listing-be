const express = require('express');
const connectDatabase = require('./src/config/dbconfig');
const categoryRouter = require('./src/routes/categoryRoute');
const locationRouter = require('./src/routes/locationRoute');
const app = express();

const hostname = process.env.HOSTNAME ?? "localhost"; // 127.0.0.0
const port = process.env.PORT ?? "5000";

// Connecting with Database
connectDatabase()

// Middlewares
app.use(express.json()) // Body pharser

app.use('/api/category', categoryRouter)
app.use('/api/location', locationRouter)
// app.use('/api/service', blogRouter)

// Server Start Process
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})