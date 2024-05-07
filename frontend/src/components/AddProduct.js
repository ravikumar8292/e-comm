import { React, useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addproduct = async () => {
    console.log(name, price, category, company);
    // validation
    if(!name || !price || !category || !company){
        setError(true);
        return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="addProduct">
      <h1>Add Product</h1>

      <input
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        className="inputBox"
      />
      {error && !name && <span className="invalid_field">Enter valid name</span>}
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
        {error && !price && <span className="invalid_field">Enter valid price</span>}
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
        {error && !category && <span className="invalid_field">Enter valid category</span>}
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
        {error && !company && <span className="invalid_field">Enter valid company</span>}

      <button type="button" onClick={addproduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
