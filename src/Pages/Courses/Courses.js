import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";

const Courses = () => {
  const { user, loading, setLoading } = useContext(AuthContext);

  const [profile, setProfile] = useState(false);
  const [courses, setCourses] = useState([]);
  const [Enrolled, setEnrolled] = useState("");

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

  useEffect(() => {
    setLoading(true);

    if (email) {
      fetch(`http://localhost:5000/course/enrolled/${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //    console.log(data)
          setEnrolled(data);
          setLoading(false);
        });
    }
  }, [email, setLoading]);

  // console.log(Enrolled);

  return (
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
                <h2 className="text-xl">Course Start: {course.start_date} </h2>
                <h2 className="text-xl">Courses End: {course.end_date} </h2>
                <h2 className="card-title">Price: {course.price}$</h2>
                <p>{course.details}</p>
                <div className="card-actions justify-end">
                  {profile.UserStatus === "Block" ? (
                    <button disabled className="btn bg-gray-800 text-white ">
                      Enrolled Now
                    </button>
                  ) : (
                    <div>
                      {Enrolled.CourseId === course._id ? (
                        <button
                          disabled
                          className="btn bg-gray-800 text-white "
                        >
                          Already Enrolled
                        </button>
                      ) : (
                        <Link
                          to={`/payment/${course._id}`}
                          className="btn bg-green-700 text-white text-xl"
                        >
                          Enroll Now
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Courses;
