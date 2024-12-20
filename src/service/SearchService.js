import axiosSkaarl from "../utils/api";

const search = async (searchTerm) => {
  const res = await axiosSkaarl.get(
    `/instrument/query?query=${encodeURIComponent(searchTerm)}`
  );
  if (res.status == 200) {
    return res.data;
  }
  return null;
};

export { search };
