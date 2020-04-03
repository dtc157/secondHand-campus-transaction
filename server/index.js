const express = require("express")
const app = express()
const bodyParser = require('body-parser');


app.use(require('cors')())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads',express.static(__dirname+'/uploads'))

require("./plugins/db")(app)
require("./routes/admin")(app)


app.listen(3000,()=>{
    console.log("http://localhost:3000")
})