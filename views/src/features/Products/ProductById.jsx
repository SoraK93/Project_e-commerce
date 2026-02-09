import { useLoaderData, useParams } from "react-router";

export const ProductById = () => {
  const product = useLoaderData()[0];

  return (
    <div>
      <h1>{product.product_name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.seller_name}</p>
    </div>
  );
};
