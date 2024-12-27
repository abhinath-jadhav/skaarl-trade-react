import { placeOrder } from "../../../service/OrderService";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoToggleSharp } from "react-icons/io5";

const OrderModal = ({ symbol, setIsModalOpen, type, price, stoploss }) => {
  const [action, setAction] = useState("");
  const [formData, setFormData] = useState({
    action: type,
    symbol: symbol,
    price: price,
    stoploss: stoploss,
    qty: Math.floor(50000 / price),
  });
  const [isSafeOrder, setIsSafeOrder] = useState(false);

  useEffect(() => {
    setAction(type);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleSafeOrder = () => {
    setIsSafeOrder(!isSafeOrder);
  };

  return (
    <>
      <div
        id="default-modal"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full h-full"
      >
        <div className="relative p-4 w-full max-w-lg max-h-full text-black">
          <div className="relative bg-white border border-gray-600 rounded-sm shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {symbol}
              </h3>
              <div className="flex items-center gap-2 font-medium text-[0.8rem]">
                <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700">
                  <button
                    onClick={() => setAction("Buy")}
                    className={`${
                      action === "Buy"
                        ? "text-white bg-green-700"
                        : "text-gray-700 bg-gray-200 hover:text-white hover:bg-green-700"
                    } rounded-r-none px-4 py-2 rounded-sm`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setAction("Sell")}
                    className={`${
                      action === "Sell"
                        ? "text-white bg-red-600"
                        : "text-gray-700 bg-gray-200 hover:text-white hover:bg-red-600"
                    } rounded-l-none px-4 py-2 rounded-sm`}
                  >
                    Sell
                  </button>
                </div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-sm text-sm w-9 h-9 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <IoMdClose size={25} />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 font-medium w-2/5">
                  <label htmlFor="qty">Price</label>
                  <input
                    name="price"
                    type="number"
                    className="h-8 px-2 text-sm border no-spinner focus:ring-1 focus:outline-none focus:ring-gray-500"
                    value={formData.price}
                    onChange={(e) => handleChange(e)}
                    disabled={!isSafeOrder}
                  />
                </div>
                <div className="flex flex-col gap-2 font-medium w-2/5">
                  <label htmlFor="qty">Quantity</label>
                  <input
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                    name="qty"
                    type="number"
                    className="h-8 px-2 text-sm border no-spinner focus:ring-1 focus:outline-none focus:ring-gray-500"
                    value={formData.qty}
                    onChange={(e) => handleChange(e)}
                    disabled={!isSafeOrder}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 font-medium w-2/5">
                  <label htmlFor="qty">Stoploss</label>
                  <input
                    name="stoploss"
                    type="number"
                    className="h-8 px-2 text-sm border no-spinner focus:ring-1 focus:outline-none focus:ring-gray-500"
                    value={formData.stoploss}
                    onChange={(e) => handleChange(e)}
                    disabled={!isSafeOrder}
                  />
                </div>
                <div className="flex justify-start items-center w-2/5">
                  <div
                    onClick={handleToggleSafeOrder}
                    className="cursor-pointer"
                  >
                    <p className="mr-2">Edit Order</p>
                    {isSafeOrder ? (
                      <IoToggleSharp size={25} />
                    ) : (
                      <IoToggleSharp size={25} className="rotate-180" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center py-4 px-4 md:px-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => {
                  placeOrder(formData);
                  setIsModalOpen(false);
                }}
                type="button"
                className={`${
                  action === "Buy"
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-red-600 hover:bg-red-700"
                } text-white font-medium rounded-sm text-sm px-5 py-2.5 text-center`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
