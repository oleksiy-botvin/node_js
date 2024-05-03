const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/node").catch(err => console.log(err));
const {userRouter} = require("./routers/users_router")

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log("Example app listening on port 3000")
})
