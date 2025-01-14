const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let data = new User(req.body);
  // console.log(data);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  // console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post('/add-product', async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
}),

app.get('/products',async(req,res)=>{
    let products = await Product.find();
    if(products.length > 0){
      res.send(products);
    }else{
      res.send({result:'Data is not found'});
    }
}),

app.delete('/product/:id', async(req,res)=>{
  const result = await Product.deleteOne({_id:req.params.id});
  res.send(result);
}),
app.get('/product/:id', async(req,res)=>{
  const result = await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }else{
    res.send("result not found");
  }
}),

app.put('/product/:id', async(req,res)=>{
  const result = await Product.updateOne(
    {_id:req.params.id},
    {
      $set : req.body
    }
  )
  res.send(result);
}),

app.get('/search/:key', async(req,res)=>{
  let result = await Product.find(
    {
      '$or' : [
            {name : {$regex : req.params.key}},
            {price : {$regex : req.params.key}},
            {category : {$regex : req.params.key}},
            {company : {$regex : req.params.key}}
      ]
    }
  );
  res.send(result);
})

app.listen(5000);
