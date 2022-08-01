const express = require("express")
const app =express()
let {people} = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({extended:false}))
app.get('/api/people',(req,res)=>{
  res.status(200).json({success:true,data:people})
})
// parse json
app.use(express.json());
app.post('/api/people',(req,res)=>{
  console.log(req.url);
  const {name} = req.body;
  if(!name){
    return res.status(400).json({success:false,msg:"please provide name value"})
  }
  res.status(201).json({success:true,person:name})
})

app.post("/api/postman/people",(req,res)=>{
  const {name} = req.body
  if(!name){
    return res
        .status(400)
        .json({success:false, msg:"please provid name value"})
  }
  res.status(201).send({success:true,data:[...people, {id:8,name:name}]})
})

app.put('/api/people/:id',(req,res)=>{
  const {id} = req.params;
  const {name} = req.body;
  const person = people.find((person)=>person.id === Number(id))

  if(!person){
    return res
        .status(404)
        .json({success:false, msg:`no person with ${id}`})
  }

  const newPeople = people.map((person)=>{
    if(person.id === Number(id)){
      person.name = name
    }
    return person
  })
  res.status(200).json({success:true, data:newPeople})
})

app.delete('/api/people/:id',(req,res)=>{
  const {id} = req.params;
  const person = people.find(person=>person.id === Number(id));
  if(!person){
    return res
        .status(404)
        .json({success:false, msg:`no person with id ${id}`} )
  }
  const newPeople = people.filter((person)=>{
    return person.id !== Number(id)
  })
  res.status(200).json({success:true,data:newPeople})
})

app.post('/login',(req,res)=>{

  const {name} = req.body;
  if(name){
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide credentials')
})


app.listen(5000,()=>{
  console.log("This server is listening at port 5000....")
}) 