import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThmeToggle";
import logo from "../../assets/logo.png";
import { userLogout } from "../../service/Authservice";
import { useSelector } from "react-redux";

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    await userLogout();
    window.location.href = "http://localhost:5173";
  };

  useSelector((state) => state.authSlice);

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
          <div className="w-[73%] flex items-center justify-end md:justify-between gap-5">
            <div className="hidden md:flex gap-2 items-center">
              <div>
                <Link to={"/"}>Dashboard</Link>
              </div>
              <div>
                <Link to={"/user/orders"}>Orders</Link>
              </div>
              <div>
                <Link to={"/user/tradebook"}>Tradebook</Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div>
                    <Link to={"/user/profile"}>
                      {user.avatar ? (
                        <img
                          className="h-[40px] rounded-full"
                          src={user.avatar}
                          alt="Profile"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <p>{user}</p>
                      )}
                    </Link>
                  </div>
                  <div>
                    <button
                      className="rounded-md px-2 py-1 mr-2 bg-red-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
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
