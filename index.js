import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 5000;

const now = new Date()
app.set("view engine", "ejs");
app.use(express.static("public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [
    {
        id:1,
        title:"The growth of feminist literature in global south",
        content:"Feminist literature in the Global South has grown as writers began challenging the idea that feminism was only a Western project. Authors from regions like Africa, Latin America, South Asia, and the Middle East started documenting how gender oppression intersects with colonial history, class inequality, race, and local cultural norms. Their writing often focuses on lived realities—labor exploitation, land rights, education, and everyday resistance. Instead of a single universal feminism, these works highlight plural feminisms shaped by local struggles. Scholars and activists have used literature, essays, and testimonies to build intellectual traditions that question patriarchy while also critiquing global power structures and development narratives.",
        author:"john khagre",
        date: now

    },
    {
        id:2,
        title:"Building alternatives on platenary scale",
        content:"Writers and activists in the Global South have been central to this conversation. They argue that many communities already practice alternatives—cooperatives, commons governance, mutual aid networks, and indigenous ecological stewardship. The challenge is scaling these without destroying their democratic character. Digital infrastructure, open-source technologies, and decentralized governance models are often proposed as tools that allow collaboration across borders while keeping control distributed.",
        author:"ramlal jhonson",
        date: `${now}`
    }
]

app.get("/posts",(req,res) =>{
    console.log(posts)
    res.json(posts)

})

app.get("/posts/:id",async(req,res) =>{
    const post = posts.find((p) => p.id === parseInt(req.params.id))
    if(!post){
        return res.status(404).json({message: "post not found "})
    }
    res.json(post)

})

app.post("/posts",(req,res)=>{
    const newId = posts.length + 1
    const post ={
        id: newId,
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        date:new Date()
    }
    posts.push(post)
    res.json(posts)
})

app.patch("/posts/:id",(req,res) =>{
    try{
        const post = posts.find((p) => p.id === parseInt(req.params.id))
         if(!post) {
            return res.status(404).json({message:"post not found"})
         }else{
            if(req.body.title)   post.title=req.body.title
            if(req.body.content) post.content=req.body.content
            if(req.body.author)  post.author= req.body.author
            res.json(post)
         }
        }catch(error){
         res.status(500).json({message:"Error editing the post"})
        }
} );

app.delete("/posts/:id",(req,res) =>{
    const id = parseInt(req.params.id)
    posts=posts.filter(post=>post.id !== id)
    res.json(posts)
    res.json({message:"Post deleted"});
})
;







app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})