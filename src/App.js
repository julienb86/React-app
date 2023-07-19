import React, { useState, useEffect } from "react";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  /* Créer un id aléatoire */
  const uuidv4 = require("uuid/v4");

  const initialProduct = { id: null, name: "", price: "", type: "" };

  const [products, setProducts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  const fetchProducts = async () => {
    let response = await fetch("http://localhost:3000/api/products");
    let data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* selectionne le bon produit dans la liste */
  const updateSelected = product => {
    setUpdated(true);
    setCurrentProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type
    });
  };

  const createProduct = product => {
    product.id = uuidv4();

    try {
      fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product })
      })
        .then(res => res.text())
        .then(res => console.log(res));
      setProducts([...products, product]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = (id, updatedProduct) => {
    try {
      fetch(`http://localhost:3000/api/products/` + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedProduct })
      })
        .then(res => res.text())
        .then(res => console.log(res));
      setProducts(
        products.map(product => (product.id === id ? updatedProduct : product))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = id => {
    try {
      fetch(`http://localhost:3000/api/products/` + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.text())
        .then(res => console.log(res));
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center my-5">Nos produits</h1>
        <div className="row">
          <div className="col-md-6">
            {updated ? (
              <>
                <h3 className="text-center">Modifier le produit</h3>
                <UpdateProduct
                  updated={updated}
                  setUpdated={setUpdated}
                  currentProduct={currentProduct}
                  updateProduct={updateProduct}
                />
              </>
            ) : (
              <>
                <h3 className="text-center">Ajouter un produit</h3>
                <AddProduct createProduct={createProduct} />
              </>
            )}
          </div>
          <div className="col-md-6">
            <h3 className="text-center">Liste de produits</h3>
            <Products
              products={products}
              updateSelected={updateSelected}
              deleteProduct={deleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
