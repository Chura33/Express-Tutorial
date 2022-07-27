const express = require("express")
const app =express()
const {products} = require('./data')

app.get('/',(req,res)=>{
  res.send('<h1>Home Page</h1> <a href="/api/products">Products</a>')
})

app.get('/api/products',(req,res)=>{
  const newProducts = products.map((product)=>{
    const {id, name, image} = product
    return {id,name,image}
  })
  res.json(newProducts)
})

// using route parameters
app.get('/api/products/:productID',(req,res)=>{
  // console.log(req)
  // console.log(req.params)
  const {productID} = req.params;
  const singleProduct = products.find(product=>product.id ===Number(productID))
  // console.log(productID)
  if(!singleProduct){
    return res.status(404).send('Product does not exist')
  }
  return res.json(singleProduct)
})

// A slight mimic of a login process using req.params
app.get('/api/products/:name/reviews/:id',(req,res)=>{
  const {name,id} = req.params;
  if (name === "Chura" && id==='123'){
    return res.send('hello world')
  }
  else{
    return res.send("Access denied")
  }
})

app.get('/api/v1/check',(req,res)=>{
  console.log(req.query)
  res.send('hello world')
})
app.listen(5000,()=>{
  console.log("This server is listening at port 5000....")
})