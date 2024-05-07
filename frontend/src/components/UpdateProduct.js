import { React, useState,useEffect } from "react";
import { json, useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

 useEffect(() => {
   getProductDetails();
 }, [])

 const getProductDetails = async()=>{
      // console.warn(params);
      let result = await fetch(`http://localhost:5000/product/${params.id}`);
      result = await result.json();
      // console.warn(result);
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
 }
 
  const updateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,
    {
      method:'put',
      body: JSON.stringify({name, price, category, company}),
      headers: {
        'Content-Type': "application/json"
      }
    });
    result = await result.json()
    console.warn(result);
    navigate('/');
  }

  return (
    <div className="addProduct">
      <h1>Update Product</h1>

      <input
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        className="inputBox"
      />
      <input
        type="text"
        name=""
        placeholder="Enter Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
        className="inputBox"
      />
      <input
        type="text"
        name=""
        placeholder="Enter Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
        className="inputBox"
      />
      <input
        type="text"
        name=""
        placeholder="Enter Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
        className="inputBox"
      />

      <button type="button" onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;



