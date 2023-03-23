import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Pagination from "../../Pagination/Pagination";

const Users = () => {
  //   const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [infoPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [checkbox, setCheckbox] = useState([]);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users", {
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    },
  });

  const indexOfLastPage = currentPage * infoPerPage;
  const indexOfFirstPage = indexOfLastPage - infoPerPage;
  const currentUsers = users?.length && users?.slice(indexOfFirstPage, indexOfLastPage);

  // Change page
  const paginate = (pageNumber, event) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    // console.log(value)
    if (checked) {
      setCheckbox([...checkbox, value]);
    } else {
      setCheckbox(checkbox.filter((e) => e !== value));
    }
  };

  const handleManyDelete = async () => {
    // console.log(checkbox)
    for (let i = 0; i < checkbox.length; i++) {
      // console.log(checkbox[i])

      const id = checkbox[i];
      console.log(id);
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Delete Successfully.`);
            refetch();
          }
        });
    }
  };

  const HandleOneDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Delete Successfully.`);
          refetch();
        }
      });
  };

  const HandleBlockUserOne = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Make Block Successfully.`);
          refetch();
        }
      });
  };

  const HandleBlockUserMany = () => {
    for (let i = 0; i < checkbox.length; i++) {
      // console.log(checkbox[i])

      const id = checkbox[i];
      fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success(`Make Block Successfully.`);
            refetch();
          }
        });
    }
  };


  const HandleUnBlockUserMany = () => {
    for (let i = 0; i < checkbox.length; i++) {
      // console.log(checkbox[i])

      const id = checkbox[i];
      fetch(`http://localhost:5000/users/unblock/${id}`, {
        method: "PUT",
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success(`Make Unblock Successfully.`);
            refetch();
          }
        });
    }
  };

  return (
    <div className="mt-1">
      <p className="text-2xl font-bold  mt-5 mb-1 ml-1">Search Users</p>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users by  Name, Email, Phone number and also Age...."
        className="input input-bordered w-full mb-4"
      />

      <button
        onClick={handleManyDelete}
        className="px-3 py-1 rounded mb-4 border-2 bg-red-500  border-red-600 font-semibold  text-white"
      >
        Delete
      </button>
      <button
        onClick={HandleBlockUserMany}
        className="px-3 py-1 ml-5 rounded mb-4 border-2 bg-gray-500  border-gray-600 font-semibold  text-white"
      >
        Block
      </button>

      <button
        onClick={HandleUnBlockUserMany}
        className="px-3 py-1 ml-5 rounded mb-4 border-2 bg-gray-500  border-gray-600 font-semibold  text-white"
      >
        Make Unblock
      </button>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="z-0"></th>
              <th>Name</th>
              <th>Area</th>
              <th>vehicle Type</th>
              <th>User Type</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="border-2 border-t-0 border-rounded-lg">
            {/* row 1 */}
            {currentUsers?.length &&
              currentUsers
                ?.filter((user) => {
                  return search.toLowerCase() === ""
                    ? user
                    : user.userName.toLowerCase().includes(search) ||
                        user.userEmail.toLowerCase().includes(search) ||
                        user.userPhone.includes(search) || 
                        user.userAge.includes(search);
                })
                .map((user) => (
                  <tr key={user._id}>
                    <th>
                      <label className="z-0">
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={user._id}
                          checked={user.checkbox}
                          onChange={(e) => handleCheckbox(e)}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user.userProfilePicture} alt="Profile" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.userName}</div>
                          <div className="text-sm opacity-50">
                            {user.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user.userAddress}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {user.userPhone}
                      </span>
                    </td>

                    <td className="text-lg">{user.vehicaltype}</td>

                    <td className="text-lg text-center">
                      {user.userType}
                      {user.UserStatus ==='Block' && (
                        <p className="ml-1 p-1 bg-red-600 text-xs font-thin text-white text-center rounded-lg">
                          ID {user.UserStatus}
                        </p>
                      )}
                    </td>

                    <td className="flex justify-center">
                      <button
                        onClick={() => {
                          HandleBlockUserOne(user._id);
                        }}
                        className="text-sm px-2 py-1 bg-gray-600 rounded text-white font-semibold"
                      >
                        Block
                      </button>
                      <button
                        onClick={() => {
                          HandleOneDelete(user._id);
                        }}
                        className="text-sm px-2 py-1 ml-3 bg-red-600 rounded text-white font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <Pagination
        infoPerPage={infoPerPage}
        totalInfo={users?.length}
        paginate={paginate}
      ></Pagination>
    </div>
  );
};

export default Users;
