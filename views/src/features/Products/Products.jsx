import { useSelector } from "react-redux";
import { selectProduct } from "./productsSlice";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const navigate = useNavigate();
  const productList = useSelector(selectProduct.list);

  const handleOnClick = (e, id) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  return (
    <ul className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5">
      {productList?.map((product) => (
        <li key={product.id} className="w-full flex justify-center">
          <div
            onClick={(e) => handleOnClick(e, product.id)}
            className="max-w-8/10 cursor-pointer shadow-xl"
          >
            <div>
              <img
                src="https://placehold.co/250?text=Product+Image\nPlaceholder&font=roboto"
                alt="placeholder img"
                className="m-auto p-4"
              />
            </div>
            <div className="px-4">
              <p><strong>{product.name}</strong></p>
              <p>
                {product.in_stock > 10
                  ? "In stock"
                  : product.in_stock || "Out of Stock"}
              </p>
              <p>
                {Number(product.price).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </p>
              <p>{product.seller.name}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { AllProducts };
