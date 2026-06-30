import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );
      setRelatedProducts(filtered);
    }
  }, [category, subCategory, products]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-2">
          — You Might Also Like —
        </p>
        <h2 className="section-title">Related Products</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product, index) => (
          <div
            key={product._id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
          >
            <ProductItem
              productId={product._id}
              name={product.name}
              image={product.images[0]}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
