const express = require('express')
//const request = require('superagent');

/// database
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { ObjectID } = require('bson')
const app = express()
const port = process.env.PORT
app.use(express.json())
// Using  router
app.use(userRouter)
app.use(taskRouter)
//Hannah5656@@
// 9a7d77bbd9386484c849f3f22a85c53d-us17 api key email
// how middleware work in application
// without middleware new request -> run route handler
// with middleware new request -> do something -> run route handler


app.listen(port,()=>{
    console.log('Server is up on port'+port)
})
// all learning function of index.js moving to allfunctions.js













