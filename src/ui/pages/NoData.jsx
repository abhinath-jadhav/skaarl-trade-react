import { RiErrorWarningFill } from "react-icons/ri";

const NoData = ({ message }) => {
  return (
    <div className="h-[700px] flex flex-col justify-center items-center text-2xl gap-3">
      <div className="text-orange-400">
        <RiErrorWarningFill size={80} />
      </div>
      <div>{message}</div>
    </div>
  );
};

export default NoData;
