import React from "react";

const Products = props => {
  return (
    <>
      <div className="justify-content-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prix</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.products.length > 0 ? (
              props.products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price} €</td>
                  <td>
                    <button
                      className="btn btn-info mr-2"
                      onClick={() => props.updateSelected(product)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.deleteProduct(product.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center">Pas de produits</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
