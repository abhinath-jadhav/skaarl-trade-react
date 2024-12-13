import { Navbar, Footer, HomeSideBar } from "../Components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-w-screen scrollbar-hide max-h-screen">
      <div className="sticky top-0 z-50 h-[12vh]">
        <Navbar />
        <div className="mb-2 flex justify-center gap-10 mt-2 text-sm">
          <p>
            NIFTY : <span>52100</span>
          </p>
          <p>
            BANKNIFTY : <span>52100</span>
          </p>
          <p>
            FINNIFTY : <span>52100</span>
          </p>
          <p>
            SENSEX : <span>52100</span>
          </p>
          <p>
            MIDCAPNIFTY : <span>52100</span>
          </p>
          <p>
            INDIA VIX : <span>52100</span>
          </p>
        </div>
      </div>

      <div className="w-full p-4">
        <div className="flex justify-center">
          <div className="w-[27%] md:max-w-[27%] 2xl:max-w-[27%] bg-slate-100 dark:bg-[#151e28]">
            <HomeSideBar />
          </div>
          <div className="hidden md:block w-[77%] md:max-w-[77%] 2xl:max-w-[77%] bbg-slate-100 dark:bg-[#151e28] border border-slate-300 dark:border-slate-500">
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
