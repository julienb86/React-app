import React, { useState, useEffect } from "react";

const UpdateProduct = props => {
  const [product, setProduct] = useState(props.currentProduct);

  useEffect(() => {
    setProduct(props.currentProduct);
  }, [props]);

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
        props.updateProduct(product.id, product);
      }}
    >
      <div className="form-group">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nom du produit"
        />
        <label htmlFor="price">Prix</label>
        <input
          type="text"
          name="price"
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
          onChange={handleChange}
          className="form-control"
          placeholder="Type"
        />
        <button className="btn btn-success form-control my-2">Modifier</button>
        <button
          onClick={() => props.setUpdated(false)}
          className="btn btn-warning form-control my-2"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;
