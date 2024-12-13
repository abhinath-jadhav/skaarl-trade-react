import { HomeBody, HomeSideBar } from "../Components";
import Container from "../Components/Container";

const Home = () => {
  return (
    <div className="hidden w-full md:block bg-slate-100 dark:bg-[#151e28] border border-slate-300 dark:border-slate-500">
      <HomeBody />
    </div>
  );
};

export default Home;
