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
    <div className="h-full">
      <div className="flex h-[25%] justify-center gap-2 md:gap-5 text-[10px] md:text-sm py-1 md:py-0">
        <p>
          NIFTY : <span>52100</span>
        </p>
        <p>
          BANKNIFTY : <span>52100</span>
        </p>
        <p>
          FINNIFTY : <span>52100</span>
        </p>
        <p className="hidden md:block">
          SENSEX : <span>52100</span>
        </p>
        <p className="hidden md:block">
          MIDCAPNIFTY : <span>52100</span>
        </p>
        <p className="hidden md:block">
          INDIA VIX : <span>52100</span>
        </p>
      </div>
      <div className="bg-slate-950 h-[75%] flex flex-col justify-center text-slate-50 ">
        <div className="flex h-full items-center px-4">
          <div className="w-[27%] flex items-center gap-5">
            <Link to={"/"}>
              <img className="h-[50px] md:h-[60px]" src={logo} alt="" />
            </Link>
          </div>
          <div className="w-[73%] flex items-center justify-between gap-5">
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
      </div>
    </div>
  );
};

export default Navbar;
