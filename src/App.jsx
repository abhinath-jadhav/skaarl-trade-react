import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Home,
  Layout,
  Login,
  Profile,
  User,
  Orders,
  Tradebook,
  FivePaisaLogin,
  ChartPage,
  Portfolio,
} from "./ui/pages";
import OtpForm from "./ui/pages/OtpForm";
import { HomeSideBar } from "./ui/Components";

function App() {
  return (
    <div className="bg-slate-100 dark:bg-[#151e28] dark:text-slate-50">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/m/dashboard" element={<HomeSideBar />} />
            <Route path="/chart" element={<ChartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/five-paisa-login" element={<FivePaisaLogin />} />
            <Route path="/test" element={<OtpForm />} />
            <Route path="/user" element={<User />}>
              <Route path="tradebook" element={<Tradebook />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
