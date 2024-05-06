const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const path = require("path")
const homeRouter = require("./routes/home")
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");
const { checkAuthenticateUser } = require("./middlewares/authentication");

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkAuthenticateUser("token"))
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/",homeRouter)
app.use("/user",userRouter)

mongoose.connect("mongodb://127.0.0.1:27017/blogs").then(()=>{
    console.log(`mongodb Connected`);
})

app.listen(PORT,()=> console.log(`server started at port:${PORT}`));