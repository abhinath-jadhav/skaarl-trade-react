import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { updatePrice } from "../../store/currentPriceSlice";
import { authorise } from "../../service/Authservice";

const CurrentPriceFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new SockJS("http://localhost:8765/MS-SKAARL-TRADE/ws/");
    const stompClient = Stomp.over(socket);
    if (authorise()) {
      const headers = {
        token: localStorage.getItem("access_token"),
      };
      stompClient.connect(headers, () => {
        stompClient.subscribe("/topic/public/currentPrice", (message) => {
          const newMessage = message.body;

          if (newMessage != null) {
            dispatch(updatePrice(JSON.parse(newMessage)));
          }
        });
      });
    }

    // Cleanup on unmount
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  return <></>;
};

export default CurrentPriceFeed;
