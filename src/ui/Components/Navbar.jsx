import { Link } from "react-router-dom";
import ThemeToggle from "./ThmeToggle";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { authorise } from "../../service/Authservice";
const Navbar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await authorise();

      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="bg-slate-950 h-[70px] flex flex-col justify-center text-slate-50 ">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-5">
          <Link to={"/"}>
            <img className="h-[60px]" src={logo} alt="" />
          </Link>
          <div className="hidden md:flex gap-2">
            <div>
              <Link to={"/"}>Dashboard</Link>
            </div>
            <div>
              <Link to={"/user/portfolio"}>Portfolio</Link>
            </div>
            <div>
              <Link to={"/user/orders"}>Orders</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <div>
              <Link to={"/profile"}>
                {user.avatar ? (
                  <img
                    className="h-[40px] rounded-full"
                    src={user.avatar}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </Link>
            </div>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
