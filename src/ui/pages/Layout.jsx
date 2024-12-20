import { Navbar, Footer, HomeSideBar, Menus } from "../Components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <div className="sticky top-0 z-50 h-[10vh]">
        <Navbar />
      </div>

      <div className="h-[90vh] w-full">
        <div className="h-full flex justify-center">
          <div className="h-full w-full  md:w-[27%]  bg-slate-100 dark:bg-[#151e28]">
            <HomeSideBar />
          </div>
          <div className="h-full hidden md:block w-[73%] bg-slate-100 dark:bg-[#151e28]">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="fixed md:hidden bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
