const express = require('express');
const connectDatabase = require('./src/config/dbconfig');
const shortUrlRouter = require('./src/routes/shortUrlRoute');
const app = express();

const hostname = process.env.HOSTNAME ?? "localhost"; // 127.0.0.0
const port = process.env.PORT ?? "5000";

// Connecting with Database
connectDatabase()

// Middlewares
app.use(express.json()) // Body pharser

// Routes 
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/api/shorturl', shortUrlRouter)
// app.use('/api/posts', blogRouter)
// app.use('/api/category', categoryRouter)

// Server Start Process
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})