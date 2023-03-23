import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import useToken from "../../Hooks/useToken";
import SmallLoading from "../../Loading/SmallLoading";

const Login = () => {
  const [ loading, setLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const { signIn } = useContext(AuthContext);

  const handleLogin = (data) => {
    // console.log(data);
    setLoading(true);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user.email);
        
          toast.success("Login Successfully");
          setLoginUserEmail(user.email)
          setLoading(false);
          
        
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setLoginError(error.message);
      });
  };

  console.log(token)

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="h-[800px] flex justify-center pt-20   bg-gray-200 ">
      <div className="w-96 p-7">
        <h2 className="text-4xl  font-semibold text-center">Please Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered  w-full max-w-xs"
              placeholder="Enter your email."
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered  w-full max-w-xs"
              placeholder="Enter Password."
            />
            <label className="label">
              {" "}
              <span className="label-text font-bold">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <p className="text-lg font-semibold italic">
            Are you new to hero rider?{" "}
            <Link to="/signup" className="text-blue-600 underline">
              sign up
            </Link>
          </p>
          <div className="text-center my-5">
            <button
              className="btn hover:bg-gray-100 hover:text-black text-xl font-bold  bg-slate-900 text-white w-full"
            >
              {loading ? <SmallLoading></SmallLoading> : "LogIn"}
            </button>

            <div>
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
