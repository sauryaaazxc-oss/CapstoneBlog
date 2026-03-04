import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 1000;
const API_URL = "http://localhost:5000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/" ,async(req,res) =>{
    const response = await  axios(`${API_URL}/posts`);
    console.log(response)
    res.render("index.ejs",{Blogs:response.data})
})


app.get("/new" ,(req,res)=>{
   res.render("modify.ejs",{heading: "New Post",Submit:"Create post"})
})





app.post("/submit", async (req,res)=>{
    try{
    const response = await axios.post(`${API_URL}/posts`,req.body)
    console.log(response.data)
    res.redirect("/")
    }
    catch(err){
        res.status(500).json({message:"ERROR CREATING POST"})
    }
});

app.get("/edit/:id",async(req,res) =>{

    try{
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`)
    console.log(response.data)
    res.render("modify.ejs",{
        heading:"Edit post",
        Submit:"update post",
        post: response.data,
    })

    }catch(err){
        res.json({message:err})
    }

})

app.post("/edit/:id" ,async(req,res) =>{
    try{
        const response=await axios.patch(`${API_URL}/posts/${req.params.id}`,req.body)
        console.log(response.data)
        res.redirect("/")
    }catch(err){
        console.error(err.message)
        res.status(500).json({messge:"Failed to submit the updates try again"})
    }
})

app.get("/api/post/delete/:id",async(req,res)=>{
    try{
        await axios.delete(`${API_URL}/posts/${req.params.id}`)
        res.redirect("/")
    }catch(err){
        console.log(err.messge)
    }
})


app.listen(port,()=>{
    console.log(`SERVER RUNNING ON PORT ${port}`)
})

