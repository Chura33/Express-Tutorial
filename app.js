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

app.get('/api/v1/query',(req,res)=>{
  const {search,limit} = req.query;
  let sortedProducts = [...products];

  if(search){
    sortedProducts = sortedProducts.filter((product)=>{
      return product.name.startsWith(search);
    })
  }

  if(limit){
    sortedProducts = sortedProducts.slice(0,Number(limit))
  }
  if (sortedProducts.length < 1){
   
   // res.status(200).send('no products matched your search')
   return res.status(200).json({success:true,data:[]})
  }
  return res.status(200).json(sortedProducts)
})

app.listen(5000,()=>{
  console.log("This server is listening at port 5000....")
})