import { Link } from "react-router-dom";

const Footer = () => {
  console.log("Footer");

  return (
    <div className="">
      <div className="flex justify-center gap-2 bg-slate-950 text-slate-50 p-2 w-full">
        <div>
          <Link to={"/"}>Dashboard</Link>
        </div>
        <div>
          <Link to={"/portfolio"}>Portfolio</Link>
        </div>
        <div>
          <Link to={"/"}>Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
