import { useSelector } from "react-redux";
import { selectProduct } from "./productsSlice";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const navigate = useNavigate();
  const productList = useSelector(selectProduct.list);

  const handleOnClick = (e, id) => {
    e.stopPropagation();
    navigate(`/product/${id}`)
  };

  return (
    <ul>
      {productList.map((product) => (
        <li key={product.id}>
          <div onClick={(e) => handleOnClick(e, product.id)}>
            <p>{product.product_name}</p>
            <p>{product.description}</p>
            <p>{product.in_stock}</p>
            <p>{product.price}</p>
            <p>{product.seller_name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { AllProducts };
