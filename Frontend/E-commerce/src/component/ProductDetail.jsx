import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleProduct } from "../api/api";
import { TopBar } from "./TopBar";
import Footer from "./Footer";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import RelatedProducts from "../component/RelatedProduct";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";

const dummyRating = 4;
const dummyReviewsCount = 122;

const CartPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M12 17v4m-2-2h4" />
  </svg>
);

export function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    if (!productId) {
      setError("Product not found");
      setLoading(false);
      return;
    }
    getSingleProduct(productId)
      .then((data) => {
        setProduct(data);
        setImage(data.images[0]);
      })
      .catch(() => setError("Failed to fetch product details"))
      .finally(() => setLoading(false));
  }, [productId]);

  // ── Loading ──────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Spinner />
          <p className="text-slate-400 text-sm">Loading product…</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-1 flex items-center justify-center text-red-500 text-lg">
          {error}
        </div>
      </div>
    );
  }

  // ── Product Detail ───────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      {product && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">

          {/* ── PRODUCT LAYOUT ── */}
          <div className="flex flex-col lg:flex-row gap-12 animate-fadeIn">

            {/* ── IMAGE GALLERY ── */}
            <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px]">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImage(img)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      image === img
                        ? "border-indigo-500 shadow-md shadow-indigo-100"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-square sm:aspect-auto sm:max-h-[600px] bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  key={image}
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover animate-fadeIn"
                />
              </div>
            </div>

            {/* ── PRODUCT INFO ── */}
            <div className="flex-1 lg:max-w-md">
              {/* Category */}
              <p className="text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-2">
                {product.category} · {product.subCategory}
              </p>

              {/* Name */}
              <h1 className="text-3xl font-bold text-slate-900 mb-3 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < dummyRating ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-500">({dummyReviewsCount} Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <p className="text-3xl font-bold text-slate-900">₹{product.price?.toLocaleString("en-IN")}</p>
                <p className="text-sm text-slate-400 line-through">₹{Math.round(product.price * 1.3).toLocaleString("en-IN")}</p>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  23% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{product.description}</p>

              {/* Size Selection */}
              {product.size && product.size.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-slate-700">Select Size</p>
                    <button className="text-xs text-indigo-600 hover:underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.size.map((sizeOption) => (
                      <button
                        key={sizeOption}
                        onClick={() => setSelectedSize(sizeOption)}
                        className={`px-4 py-2 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                          selectedSize === sizeOption
                            ? "bg-slate-900 text-white border-slate-900 scale-105"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        {sizeOption}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product._id, selectedSize)}
                className="btn-primary w-full text-base py-4 rounded-2xl mb-4 gap-3"
              >
                <CartPlusIcon />
                Add to Cart
              </button>

              {/* Trust Badges */}
              <div className="mt-6 border-t border-slate-100 pt-5 flex flex-col gap-2.5">
                {[
                  "✓ 100% Original product",
                  "✓ Cash on delivery available",
                  "✓ Easy returns & exchange within 7 days",
                ].map((item, i) => (
                  <p key={i} className="text-xs text-slate-500 flex items-center gap-2">{item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* ── RELATED PRODUCTS ── */}
          <RelatedProducts
            category={product.category}
            subCategory={product.subCategory}
          />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetail;
