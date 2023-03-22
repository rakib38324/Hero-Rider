import React, { useContext, useState } from "react";
import {  useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";

import SmallLoading from "../../Loading/SmallLoading";

const SignUp = () => {
  
  const [signUpError, setSignUPError] = useState("");
  const { createUser, loading, setLoading } = useContext(AuthContext);
  

  // console.log(loading)
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/profile";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignUp = (data) => {

    if (data.password !== data.confirmpassword) {
      toast.error("Your Password did not match");
      return;
    }

    setLoading(true);

    toast("Good Job! Your Profile is Creating...", {
      icon: "👏",
    });

   

    createUser(data.useremail, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        
        const lience = data.userdrivinglience[0];
        const usernid = data.usernid[0];
        const userprofilepicture = data.userprofilepicture[0];
    
        const key = process.env.REACT_APP_imgKey;

        const formData = new FormData();
        formData.append("image", lience);
        const url = `https://api.imgbb.com/1/upload?key=${key}`;
        if (formData) {
          fetch(url, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((imgData) => {
              const licence = imgData.data.url;

              formData.append("image", usernid);
              const url = `https://api.imgbb.com/1/upload?key=${key}`;
              if (formData) {
                fetch(url, {
                  method: "POST",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((imgData) => {
                    const userNid = imgData.data.url;

                    formData.append("image", userprofilepicture);
                    const url = `https://api.imgbb.com/1/upload?key=${key}`;
                    if (formData) {
                      fetch(url, {
                        method: "POST",
                        body: formData,
                      })
                        .then((res) => res.json())
                        .then((imgData) => {
                          const userPP = imgData.data.url;

                          const allInfo = {
                            userProfilePicture: userPP,
                            userNid: userNid,
                            userLience: licence,
                            userName: data.username,
                            userEmail: data.useremail,
                            userAge: data.userage,
                            userAddress: data.useraddress,
                            userPhone: data.phone,
                            userArea: data.userarea,
                            careName: data.carename,
                            careModel: data.caremodel,
                            careNumberPlate: data.carnumberpalate,
                            vehicaltype: data.vehicaltype,
                            userType: "Rider",
                          };

                          console.log(allInfo);
                          // console.log(data)

                          // Save user information to the database
                          fetch("http://localhost:5000/users", {
                            method: "POST",
                            headers: {
                              "content-type": "application/json",
                            },
                            body: JSON.stringify(allInfo),
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              // console.log(result);
                              toast.success("You Profile is Ready");
                              setLoading(false);
                              navigate(from, { replace: true });
                            });
                        });
                    }
                  });
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setSignUPError(error.message);
      });

  };

  return (
    <div className="bg-gray-200">
      <div>
        {loading ? (
          <div className="pt-16 flex justify-center">
            {" "}
            <SmallLoading></SmallLoading>{" "}
            <p className="text-xl ml-2 font-extrabold">
              Please Give Some Time...
            </p>{" "}
          </div>
        ) : (
          ""
        )}

        <h2 className="text-4xl  font-semibold text-center mb-5 text-black py-6">
          Sign Up as a Rider
        </h2>

        <div className="w-full p-7">
          <form onSubmit={handleSubmit(handleSignUp)} >
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="form-control">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Your Full Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Name is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your name."
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Your Email
                  </span>
                </label>
                <input
                  type="text"
                  {...register("useremail", {
                    required: "Email is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your email."
                />
                {errors.useremail && (
                  <p className="text-red-500">{errors.useremail.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Your Age
                  </span>
                </label>
                <input
                  type="text"
                  {...register("userage", {
                    required: "Age is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your age."
                />
                {errors.userage && (
                  <p className="text-red-500">{errors.userage.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Your Address
                  </span>
                </label>
                <input
                  type="text"
                  {...register("useraddress", {
                    required: "Address is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your address."
                />
                {errors.useraddress && (
                  <p className="text-red-500">{errors.useraddress.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Phone Number
                  </span>
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone Number is Required",
                    minLength: {
                      value: 11,
                      message: "Phone Number must be 11 characters or long",
                    },
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Phone number"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Your Area
                  </span>
                </label>
                <input
                  type="text"
                  {...register("userarea", {
                    required: "Area is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your area."
                />
                {errors.userarea && (
                  <p className="text-red-500">{errors.userarea.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold">
                    Driving Licence
                  </span>
                </label>
                <input
                  type="file"
                  {...register("userdrivinglience", {
                    required: "Photo is Required",
                  })}
                  className="input border-gray-300  w-full max-w-xs pt-2"
                  required
                />
                {errors.userdrivinglience && (
                  <p className="text-red-500">
                    {errors.userdrivinglience.message}
                  </p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold">
                    NID Picture
                  </span>
                </label>
                <input
                  type="file"
                  {...register("usernid", {
                    required: "Photo is Required",
                  })}
                  className="input border-gray-300  w-full max-w-xs pt-2"
                  required
                />
                {errors.usernid && (
                  <p className="text-red-500">{errors.usernid.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold">
                    Profile Picture
                  </span>
                </label>
                <input
                  type="file"
                  {...register("userprofilepicture", {
                    required: "Photo is Required",
                  })}
                  className="input border-gray-300  w-full max-w-xs pt-2"
                  required
                />
                {errors.userprofilepicture && (
                  <p className="text-red-500">
                    {errors.userprofilepicture.message}
                  </p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Care Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("carename", {
                    required: "Care name is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your car name."
                />
                {errors.carename && (
                  <p className="text-red-500">{errors.carename.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Care Model
                  </span>
                </label>
                <input
                  type="text"
                  {...register("caremodel", {
                    required: "Care model is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your car model."
                />
                {errors.caremodel && (
                  <p className="text-red-500">{errors.caremodel.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Care Number Palate
                  </span>
                </label>
                <input
                  type="text"
                  {...register("carnumberpalate", {
                    required: "Care number palate is Required",
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your care number palate."
                />
                {errors.carnumberpalate && (
                  <p className="text-red-500">
                    {errors.carnumberpalate.message}
                  </p>
                )}
              </div>

              <div className="form-control  w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold">
                    Please Select Vehicle Type
                  </span>
                </label>
                <select
                  {...register("vehicaltype", {
                    required: "Phone Number is Required",
                  })}
                  className="select input-bordered  w-full max-w-xs"
                >
                  <option className="text-primary">Car</option>
                  <option className="text-primary">Bike</option>
                  {errors.vehicaltype && (
                    <p className="text-red-500">{errors.vehicaltype.message}</p>
                  )}
                </select>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters long",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message:
                        "Password must have Uppercase, Number and Special Characters",
                    },
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your address."
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text text-black font-bold ">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  {...register("confirmpassword", {
                    required: "Confirm Password is Required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters long",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message:
                        "Password must have Uppercase, Number and Special Characters",
                    },
                  })}
                  className="input  input-bordered w-full max-w-xs"
                  placeholder="Enter your address."
                />
                {errors.confirmpassword && (
                  <p className="text-red-500">
                    {errors.confirmpassword.message}
                  </p>
                )}
              </div>
            </div>

            <p className="italic text-center mt-10 font-bold">
              Already Have an Account?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Please login...
              </Link>
            </p>
            <p className="italic text-center font-bold">
              Are you a Learner?{" "}
              <Link className="text-blue-600 underline" to="/signuplearner">
                Please Signup as a learner...
              </Link>
            </p>

            <div className="text-center mb-10 mt-5">
              <button
                className="btn hover:bg-gray-400 hover:text-black text-xl font-bold lg:w-1/4 bg-slate-900 text-white"
                type="submit"
              >
                Sign Up
              </button>
              <div>
              {signUpError && <p className="text-red-600">{signUpError}</p>}
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
