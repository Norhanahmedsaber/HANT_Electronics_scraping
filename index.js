const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const searchRouter=require("./Routers")
app.use(express.json());

app.use(searchRouter)
app.get("/",async(req,res)=>{
  
  res.send("hello world")
})
app.listen(port, () => {
  console.log("Server is Running on port: " + port);
});