import { useSelector } from "react-redux";
import { selectProduct } from "../../Products/productsSlice";
import { useNavigate } from "react-router";
import { deleteProductBySeller } from "./sellerAPI";

const ViewProduct = () => {
  const navigate = useNavigate();
  let productList = useSelector(selectProduct.list);

  const onProductClick = (e, id) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  const onButtonClick = (e, product, text) => {
    e.preventDefault();
    e.stopPropagation();
    if (text === "edit") {
      navigate(`/user/product/${text}`, { state: { product } });
      return;
    } else if (text === "delete") {
      (async () => {
        try{
          await deleteProductBySeller({ productId: product.id });
        } catch (err) {
          console.error(err)
        }
      })();
    }
  };

  return (
    <ul>
      {productList?.map((product) => (
        <li key={product.id}>
          <div onClick={(e) => onProductClick(e, product.id)}>
            <p>Product Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Quantity: {product.in_stock}</p>
            <p>Price: {Number(product.price).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })}</p>
            <p>Seller: {product.seller.name}</p>
            <button onClick={(e) => onButtonClick(e, product, "edit")}>
              Edit
            </button>
            <button onClick={(e) => onButtonClick(e, product, "delete")}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { ViewProduct };
