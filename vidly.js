const express=require("express")
const app=express()
const port=process.env.PORT || 4001
app.use(express.json())
const movies=[{id:1,genre:"romance",film:{film1:"suryasonofkrishnan",film2:"sss",film3:"yemayachesave"}},
               {id:2,genre:"scifi",film:{film1:"dark",film2:"inception",film3:"predestination"}},
               {id:3,genre:"thriller",film:{film1:"forgotten",film2:"thecall",film3:"exit"}}
            ]
app.get("/api",(req,res)=>{
    res.send(movies)
})
app.get("/api/vidly/:genre",(req,res)=>{
    const movie=movies.find(c=>(c.genre===req.params.genre))
    if(!movie){
        return res.status(404).send("genre not found")
    }
    res.send(movie.film)
})

app.delete("/api/vidly/:genre",(req,res)=>{
    const movie=movies.find(c=>(c.genre===req.params.genre))
    if(!movie){
        return res.status(404).send("genre not found")
    }
    const index=movies.indexOf(movie)
    movies.splice(index,1)
    res.send(movie)

})
app.post("/api/vidly",(req,res)=>{
    if(req.body.genre==""||req.body.genre.length<3){
       return res.send("invalid")
    }
    if(req.body.film==""){
        return res.send("invalid")
    }
    
    const mov={id:movies.length+1,genre:req.body.genre,film:req.body.film}
    movies.push(mov)
    res.send(movies)
    
})
app.put("/api/vidly/:genre",(req,res)=>{
    const movie=movies.find(c=>(c.genre===req.params.genre))
    if(!movie){
        return res.status(404).send("genre not found")
    }
    if(req.body.genre=="" || req.body.genre.length<3){
        return res.send("invalid")
     }

    movie.genre=req.body.genre
    res.send(movie)
    
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
