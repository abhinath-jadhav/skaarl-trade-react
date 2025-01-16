import { Link } from "react-router-dom";
import UpstoxLogin from "../Components/login/UpstoxLogin";
import { FaGithub, FaGoogle } from "react-icons/fa";
const Login = () => {
  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8765/oauth2/authorization/github";
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8765/oauth2/authorization/google";
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="flex gap-4 justify-center items-center">
        {/* <UpstoxLogin /> */}
        <button onClick={handleGithubLogin}>
          <FaGithub size={42} />
        </button>
        <button onClick={handleGoogleLogin}>
          <FaGoogle size={42} />
        </button>
      </div>
    </div>
  );
};

export default Login;
