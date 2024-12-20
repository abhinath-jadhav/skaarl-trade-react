import { HomeBody, HomeSideBar } from "../Components";
import Container from "../Components/Container";

const Home = () => {
  return (
    <div className="hidden h-full w-full md:block bg-white dark:bg-black border p-2 border-slate-300 dark:border-slate-500">
      <HomeBody />
    </div>
  );
};

export default Home;
