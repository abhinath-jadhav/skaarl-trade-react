import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { saveUserInfo } from "../../../service/Authservice";
import UpstoxLogo from "../../../assets/upstox.jpg";
import Untitled from "../../../assets/Untitled.png";

const UpstoxLogin = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if `code` exists in the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const authorizationCode = queryParams.get("code");

    if (authorizationCode) {
      //exchangeCodeForToken(authorizationCode);
      exchangeCodeForToken(authorizationCode);
    }
  }, [location]);

  const handleAuthorization = () => {
    const clientId = "dd927ea1-b01e-4f2b-b59a-0b541c088c2c";
    const redirectUri = "http://localhost:5173";
    const authorizationUrl = `https://api.upstox.com/v2/login/authorization/dialog?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    window.location.href = authorizationUrl;
  };

  const exchangeCodeForToken = async (authorizationCode) => {
    const tokenUrl = "https://api.upstox.com/v2/login/authorization/token";
    const headers = {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const data = new URLSearchParams({
      code: authorizationCode, // Replace this with the received authorization code
      client_id: "dd927ea1-b01e-4f2b-b59a-0b541c088c2c",
      client_secret: "ipt5os4rwg",
      redirect_uri: "http://localhost:5173",
      grant_type: "authorization_code",
    });

    try {
      const response = await axios.post(tokenUrl, data, { headers });
      localStorage.setItem("access_token", response.data.access_token);
      saveUserInfo(response.data);
      location("/");
    } catch (error) {
      console.error(error.response.status);
      console.error(error.response.data);
    }
  };

  return (
    <button onClick={handleAuthorization}>
      <img
        className="w-10 h-10 rounded-full"
        src={UpstoxLogo}
        alt="Upstox Logo"
      />
    </button>
  );
};

export default UpstoxLogin;
