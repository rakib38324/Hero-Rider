import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import Courses from "../Courses/Courses";

const Home = () => {

  const { user, loading, setLoading } = useContext(AuthContext);

  const [profile, setProfile] = useState(false);
  const [courses, setCourses] = useState([]);
 

  const email = user?.email;

  useEffect(() => {
    setLoading(true);

    if (email) {
      fetch(`http://localhost:5000/users/${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //    console.log(data)
          setProfile(data);
          setLoading(false);
        });
    }
  }, [email, setLoading]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((course) => setCourses(course));
  }, []);

  return (
    <div>
      <div className="carousel w-full mt-5">
        <div id="item1" className="carousel-item w-full h-96">
          <img
            src="https://i.ibb.co/swLhv85/bike.jpg"
            className="w-full"
            alt="banner"
          />
        </div>
        <div id="item2" className="carousel-item w-full h-96">
          <img
            src="https://i.ibb.co/yn20zfJ/bick.png"
            className="w-full"
            alt="banner"
          />
        </div>
        <div id="item3" className="carousel-item w-full h-96">
          <img
            src="https://i.ibb.co/F4cBn1P/driving.png"
            className="w-full"
            alt="banner"
          />
        </div>
        <div id="item4" className="carousel-item w-full h-96">
          <img
            src="https://i.ibb.co/8bp9XJv/banner.jpg"
            className="w-full"
            alt="banner"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
      <p className="text-5xl font-bold text-center mt-10 mb-4">Our Course</p>
      <p className="mb-5 w-3/4 mx-auto text-center text-sm">
        A driving course is an essential step towards becoming a safe and
        responsible driver on the road. It provides individuals with
        comprehensive training on traffic laws, road signs, and defensive
        driving techniques. A driving course also teaches learners how to handle
        various driving scenarios, such as adverse weather conditions, emergency
        situations, and road hazards. By enrolling in a driving course,
        individuals can learn from experienced instructors who can provide
        valuable feedback and guidance on their driving skills. Furthermore,
        completing a driving course can improve one's employability, as many
        jobs require a valid driver's license and safe driving record.
      </p>

      <div>
        {profile.UserStatus === "Block" && (
          <p className="text-3xl text-center my-8 text-red-600 font-bold">
            Your Profile {profile.UserStatus}, Please communicate with your
            Instructor. Otherwise, you can not enroll in any courses.
          </p>
        )}

        <div className="lg:grid lg:grid-cols-2 gap-3 mt-5 mx-2">
          {courses?.length &&
            courses?.map((course) => (
              <div
                key={course._id}
                className="card card-compact  bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={course.image} alt="Course Banner" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Course Name: {course.course_name}{" "}
                  </h2>
                  <h2 className="text-xl">
                    Instructor: {course.instructor_name}{" "}
                  </h2>
                  <h2 className="text-xl">
                    Course Start: {course.start_date}{" "}
                  </h2>
                  <h2 className="text-xl">Courses End: {course.end_date} </h2>
                  <h2 className="card-title">Price: {course.price}$</h2>
                  <p>{course.details}</p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/courses`}
                      className="btn bg-green-700 text-white text-xl"
                    >
                      Go Next
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
