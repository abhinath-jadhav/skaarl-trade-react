import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <div className="flex justify-center gap-2 bg-slate-950 text-slate-50 p-2 w-full">
        <div>
          <Link to={"/m/dashboard"}>Dashboard</Link>
        </div>
        <div>
          <Link to={"/user/portfolio"}>Portfolio</Link>
        </div>
        <div>
          <Link to={"/user/orders"}>Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
