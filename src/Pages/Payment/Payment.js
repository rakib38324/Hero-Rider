import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const course = useLoaderData();

  return (
    <div className="mb-20  ">
      <p className="text-2xl text-center mt-10 p-2 bg-green-300 border-2 border-green-600 text-black font-bold">
        You want to Enroll{" "}
        <span className="font-bold text-yellow-900 "> {course.course_name}</span>{" "}
        Course. 
      </p>

      <p  className="text-center mt-2 mb-10 text-xl font-bold border-2 p-2 text-black border-green-600 bg-green-300"><span>Now Pay {course.price}$</span></p>

      <div className="lg:grid lg:grid-cols-2">
        <div
          key={course._id}
          className="card card-compact  mx-auto bg-base-100 shadow-xl"
        >
          <figure>
            <img className="w-full" src={course.image} alt="Course Banner" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Course Name: {course.course_name} </h2>
            <h2 className="text-xl">Instructor: {course.instructor_name} </h2>
            <h2 className="text-xl">Course Start: {course.start_date} </h2>
            <h2 className="text-xl">Courses End: {course.end_date} </h2>
            <h2 className="card-title">Price: {course.price}$</h2>
            <p>{course.details}</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>

        <div className="w-3/4 h-1/3 my-aut mx-auto bg-green-100 my-5 p-6 rounded-lg text-black border-2 border-green-500">
          <Elements stripe={stripePromise}>
            <CheckOut booking={course} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
