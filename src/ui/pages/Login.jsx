
import * as Yup from "yup";
import { useEffect } from "react";
import { authorise, signin } from "../../service/Authservice";
import { useFormik } from "formik";
const Login = ({ setPage }) => {
  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8765/oauth2/authorization/github";
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8765/oauth2/authorization/google";
  };

  useEffect(() => {
    authorise();
  },[])

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "Must be at least 4 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const data = await signin(values);
        if (data.status == 200) {
          localStorage.setItem("LOCAL_JWT", data.token);
          setPage("FIVE-PAISA");
        }
        resetForm();
      } catch (error) {
        console.error("Error during login:", error);
        resetForm();
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <form
        className="max-w-lg w-5/6 mx-auto mb-10 bg-white px-4 py-6 rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
            placeholder="user@gmail.com"
            {...formik.getFieldProps("username")}
            required
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="absolute text-red-500 text-sm mt-1">
              {formik.errors.username}
            </div>
          ) : (
            <div className="text-red-500 text-sm mt-1"></div>
          )}
        </div>
        <div className="my-6">
          <label
            htmlFor="password"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 
    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
      formik.touched.password && formik.errors.password ? "border-red-500" : ""
    }`}
            placeholder="********"
            {...formik.getFieldProps("password")}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <div className="absolute text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="flex items-start mb-3 mt-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-medium rounded-lg text-md w-full sm:w-auto md:w-2/4 px-5 py-2.5 text-center text-white bg-slate-600 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
