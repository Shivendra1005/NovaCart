import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { ProductItem } from "./ProductItem.jsx";
import { Spinner } from "./Spinner.jsx";

export function LatestCollection() {
  const { products, loading } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProduct(products.slice(0, 10));
    }
  }, [products]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-3">
          — Just In —
        </p>
        <h2 className="section-title mb-4">Latest Collections</h2>
        <p className="section-subtitle">
          Discover our exclusive range of products, carefully curated to offer the best
          in quality and style. Updated regularly to keep your wardrobe fresh.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <Spinner />
          <p className="text-slate-400 text-sm">Loading products…</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {latestProduct.map((item, index) => (
            <div
              key={item._id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
            >
              <ProductItem
                image={item.images[0]}
                name={item.name}
                price={item.price}
                productId={item._id}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}