import React, { useState } from "react";

const AddProduct = props => {
  const emptyProduct = { id: null, name: "", price: "", type: "" };
  const [product, setProduct] = useState(emptyProduct);

  const handleChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <form
      className="justify-content-center row"
      onSubmit={event => {
        event.preventDefault();
        if (!product.name || !product.price || !product.type) {
          return;
        }
        props.createProduct(product);
        setProduct(emptyProduct);
      }}
    >
      <div className="form-group">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          className="form-control"
          required
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nom du produit"
        />
        <label htmlFor="price">Prix</label>
        <input
          type="number"
          name="price"
          required
          value={product.price}
          onChange={handleChange}
          className="form-control"
          placeholder="Prix"
        />
        <label htmlFor="price">Type</label>
        <input
          type="text"
          name="type"
          value={product.type}
          required
          onChange={handleChange}
          className="form-control"
          placeholder="Type"
        />
        <button className="btn btn-success form-control my-4">Ajouter</button>
      </div>
    </form>
  );
};

export default AddProduct;
