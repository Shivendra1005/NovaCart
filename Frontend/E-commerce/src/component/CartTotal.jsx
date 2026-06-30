import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
      <Title text1="CART" text2="TOTALS" />

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between items-center text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">{currency}{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="border-t border-slate-200" />
        <div className="flex justify-between items-center text-slate-600">
          <span>Shipping Fee</span>
          <span className={`font-semibold ${subtotal === 0 ? "text-slate-400" : "text-slate-800"}`}>
            {subtotal === 0 ? "—" : `${currency}${delivery_fee}`}
          </span>
        </div>
        <div className="border-t border-slate-200" />
        <div className="flex justify-between items-center pt-1">
          <span className="text-base font-bold text-slate-800">Total</span>
          <span className="text-xl font-bold text-indigo-600">
            {currency}{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
