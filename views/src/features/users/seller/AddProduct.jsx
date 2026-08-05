import { useEffect, useState } from "react";
import { handleChange } from "../../../utilities/event-helper";
import { Link, useLocation, useNavigate } from "react-router";
import { addProductBySeller, editProductBySeller } from "./sellerAPI";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const isEdit = location.pathname.includes("edit");

  const formStruct = {
    name: "",
    description: "",
    in_stock: "",
    price: "",
  };

  const [newProduct, setNewProduct] = useState(null);
  const [formData, setFormData] = useState(formStruct);

  const heading = <h2>{isEdit ? "Edit product" : "Add new Product"}</h2>;
  const submitButton = (
    <button>{isEdit ? "Update Product" : "Add Product"}</button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editProductBySeller({ productId: product.id, formData });
        navigate("/user/product/view");
        return;
      }
      const data = await addProductBySeller(formData);
      setNewProduct(data);
    } catch (err) {
      console.error("Product add/ modify failed.", err);
    }
  };

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name,
        description: product.description,
        in_stock: product.in_stock,
        price: Number(product.price).toFixed(2),
      });
    } else {
      setFormData(formStruct);
    }
  }, [isEdit, product]);

  return (
    <>
      {newProduct && (
        <div>
          <p>Status: {newProduct.message}</p>
          <Link to={`/product/${newProduct.id}`}>{newProduct.name}</Link>
        </div>
      )}
      <div>
        {heading}
        <form method={isEdit ? "patch" : "post"} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product Name:</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                handleChange(setFormData, "name", e.target.value)
              }
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <br />
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) =>
                handleChange(setFormData, "description", e.target.value)
              }
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="stock">Stock (in pcs):</label>
            <br />
            <input
              type="number"
              name="stock"
              id="stock"
              value={formData.in_stock}
              onChange={(e) =>
                handleChange(setFormData, "in_stock", e.target.value)
              }
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <br />
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={(e) =>
                handleChange(setFormData, "price", e.target.value)
              }
              required
              autoComplete="off"
            />
          </div>
          {submitButton}
        </form>
      </div>
    </>
  );
};

export { AddProduct };
