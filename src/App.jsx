import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, Layout, Login, Profile, User } from "./ui/pages";

function App() {
  return (
    <div className="bg-slate-100 dark:bg-[#151e28] dark:text-slate-50">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />}>
              <Route path="portfolio" element={<Login />} />
              <Route path="orders" element={<Login />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
