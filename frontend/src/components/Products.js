import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProduct(result);
  };

  const DeleteProduct= async(id)=>{
    let result =await fetch(`http://localhost:5000/product/${id}`,{
      method:'Delete'
    }); 
    result = await result.json();                                                                               
    if(result){
      getProduct();
    }
  };
 
  const searchHandler = async(event)=>{
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if(result){
        setProduct(result);
      }
    }else{
      getProduct()
    }
  }

  return (
    <div className="allProduct">
      <h1>Product item</h1>
      <input type="search" name="" placeholder="search here....." className="search"
      onChange={searchHandler} />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Oparation</li>
      </ul>
      {product.length>0 ? product.map((item,index) =>
        <ul key={item.index}>
          <li>{index+1}</li>
          <li>{item.name}</li>
          <li>${item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li><button type="button" onClick={()=>DeleteProduct(item._id)}>delete</button>
              <Link to={'/update/'+ item._id}>update</Link>
          </li>
        </ul>
      ): <h1>Not Record Found</h1>}
    </div>
  );
};

export default Products;
