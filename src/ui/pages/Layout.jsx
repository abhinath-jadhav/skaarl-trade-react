import { useDispatch, useSelector } from "react-redux";
import { Navbar, Footer, HomeSideBar, Menus, Loader } from "../Components";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authorise } from "../../service/Authservice";
import { updateAuth } from "../../store/authSlice";
import Login from "./Login";
import FivePaisaLogin from "./FivePaisaLogin";

const Layout = () => {
  const isAuth = useSelector((state) => state.authSlice);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState("FIVE-PAISA");
  const [isLoading, setIsLoading] = useState(true);

  const renderPage = (page) => {
    switch (page) {
      case "OUTLET":
        return (
          <>
            <div className="h-full hidden md:block w-full md:w-[27%] bg-slate-100 dark:bg-[#151e28]">
              <HomeSideBar />
            </div>
            <div className="h-full hidden md:block w-[73%] bg-slate-100 dark:bg-[#151e28]">
              <Outlet />
            </div>
            <div className="h-full md:hidden w-full bg-slate-100 dark:bg-[#151e28]">
              <Outlet />
            </div>
          </>
        );
      case "LOGIN":
        return <Login />;
      case "FIVE-PAISA":
        return <FivePaisaLogin />;
      default:
        return <div>Page not found</div>;
    }
  };

  useEffect(() => {
    localStorage.setItem("broker", "fivePaisa");
    const fetchUser = async () => {
      const response = await authorise();
      setIsLoading(false);
      if (response && response.status == 200) {
        setUser(response.data.clientCode);
        dispatch(updateAuth(true));
        setPage("OUTLET");
      } else if (response && response.status == 400) {
        dispatch(updateAuth(false));
        setPage("FIVE-PAISA");
      } else {
        dispatch(updateAuth(false));
        setPage("LOGIN");
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="">
      <div className="sticky top-0 z-50 h-[10vh]">
        <Navbar user={user} />
      </div>

      <div className="h-[90vh] w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="h-full flex justify-center"> {renderPage(page)}</div>
        )}
      </div>

      <div className="fixed md:hidden bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
