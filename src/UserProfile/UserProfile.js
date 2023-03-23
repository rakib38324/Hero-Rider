import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import BigLoading from "../Loading/BigLoding";

const UserProfile = () => {
  const { user, loading, setLoading } = useContext(AuthContext);

  const [profile, setProfile] = useState(false);

  const email = user?.email;

  useEffect(() => {
    setLoading(true);
    // console.log(email)
    if (email) {
      fetch(`http://localhost:5000/users/${email}`,{
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
            //  console.log(data)
          setProfile(data);
          setLoading(false);
        });
    }
    
  }, [email, setLoading]);
//   console.log(profile);

  return (
    <div className="bg-base-200 mt-1">
      {loading ? (
        <BigLoading></BigLoading>
      ) : (
        <div className=" pt-5 mx-4">
          <p className="text-2xl text-center pt-5 pb-10 font-semibold">
            Your are sign up as a {profile.userType}.
          </p>
          <img
            className="lg:w-1/6 mx-auto rounded-lg"
            src={profile.userProfilePicture}
            alt="Profile"
          />

            {profile.UserStatus === "Block" && <p className="text-3xl text-center my-4 text-red-600 font-bold">Your Profile {profile.UserStatus}, Please communicate with your Instructor.</p>}

          <p className="text-2xl font-bold">Personal Information</p>
          <div className="lg:grid lg:grid-cols-3 mt-2 pb-5 ">
            <p className="text-xl font-semibold">
              Name: <span className="font-normal"> {profile.userName}</span>{" "}
            </p>
            <p className="text-xl font-semibold">
              Email: <span className="font-normal"> {profile.userEmail}</span>{" "}
            </p>
            <p className="text-xl font-semibold">
              Phone: <span className="font-normal"> {profile.userPhone}</span>{" "}
            </p>
            <p className="text-xl font-semibold">
              Address:{" "}
              <span className="font-normal"> {profile.userAddress}</span>{" "}
            </p>
            <p className="text-xl font-semibold">
              Age: <span className="font-normal"> {profile.userAge}</span>{" "}
            </p>
            <p className="text-xl font-semibold">
              {profile.userAre ? (
                <span>
                  Area: <span className="font-normal"> {profile.userArea}</span>
                </span>
              ) : (
                <span>
                  Vehicale Type:{" "}
                  <span className="font-normal"> {profile.vehicaltype}</span>{" "}
                </span>
              )}{" "}
            </p>
          </div>

         {
            profile.userType === "Learner"  ?
            <></>
            :
            <div className="pb-10">
                 <p className="text-2xl font-bold mt-10 mb-2">Care Information</p>
          <div className="lg:grid lg:grid-cols-3">
            <p className="text-xl font-semibold">
              Vehicale Type:{" "}
              <span className="font-normal"> {profile.vehicaltype}</span>
            </p>
            <p className="text-xl font-semibold">
              Care Model:{" "}
              <span className="font-normal"> {profile.careModel}</span>
            </p>
            <p className="text-xl font-semibold">
              Care Name:{" "}
              <span className="font-normal"> {profile.careName}</span>
            </p>
            <p className="text-xl font-semibold">
              Care Number Plate:{" "}
              <span className="font-normal"> {profile.careNumberPlate}</span>
            </p>
            <p className="text-xl font-semibold">
              license:{" "}
              <span className="font-normal"> {profile.userLience}</span>
            </p>
          </div>
            </div>
         }
        </div>
      )}
    </div>
  );
};

export default UserProfile;
