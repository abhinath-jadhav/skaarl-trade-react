import React, { useEffect, useState } from "react";
import { getOrderbook } from "../../service/OrderService";
import { Loader } from "../Components";
import NoData from "./NoData";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    const response = await getOrderbook();
    if (response.status == 200) {
      setOrders(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) return <Loader height="h-[800px] md:h-[700px]" />;

  return (
    <div className="w-full mt-2">
      {orders.length != 0 ? (
        <>
          <div>
            <p className="text-xl">Orders</p>
            {orders.map((order, i) => (
              <div className="flex gap-2">
                <p>{i + 1}</p>
                <p> {order.BuySell}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <NoData message={"No orders found !!!"} />
        </>
      )}
    </div>
  );
};

export default Orders;
