import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";

const Users = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [infoPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [checkbox, setCheckbox] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    };

    fetchData();
  }, []);
//   console.log(users);

  // Get current posts
  const indexOfLastPage = currentPage * infoPerPage;
  const indexOfFirstPage = indexOfLastPage - infoPerPage;
  const currentUsers = users?.slice(indexOfFirstPage, indexOfLastPage);

  // Change page
  const paginate = (pageNumber, event) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };


  const handleCheckbox = (e) =>{
    const {value, checked} = e.target;
    // console.log(value)
    if(checked){
        setCheckbox([...checkbox , value ])
    }

    else{
        setCheckbox(checkbox.filter( (e)=> e !== value ))
    }

    
  }

  const handleDelete = async() =>{
    // const data = JSON.stringify(checkbox);
    // console.log(checkbox)
    // for(let i =0; i<checkbox.length; i++){
    //     console.log(checkbox[i])
    
    
    // fetch(`http://localhost:5000/users/${checkbox[i]}`,{
    //     method: 'DELETE',
    //     headers: {
            
    //     }
    // })
    // .then(res => res.json())
    // .then(data => {
    //     if(data.deletedCount > 0){
    //         // toast.success(`Delete Successfully.`);
    //         // refetch();
    //     }
    // })
    // }
  }


  return (
    <div className="mt-1">
      
      <p className="text-2xl font-bold  mt-5 mb-1 ml-1">Search Users</p>
      <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search users by  Name, Email, Phone number and also Age...." className="input input-bordered w-full mb-4" />

      <button onClick={handleDelete} className="px-3 py-1 rounded mb-4 border-2 bg-red-500  border-red-600 font-semibold  text-white">Delete</button>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="z-0">
                
              </th>
              <th>Name</th>
              <th>Area</th>
              <th>vehicle Type</th>
              <th>User Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentUsers?.length &&
              currentUsers?.filter((user) => {
                return search.toLowerCase() === ''
                  ? user
                  : user.userName.toLowerCase().includes(search) || user.userEmail.toLowerCase().includes(search) || user.userPhone.includes(search) || user.userAge.includes(search);
              })
              .map((user) => (
                <tr key={user._id}>
                  <th>
                    <label className="z-0">
                      <input  type="checkbox" className="checkbox" value={user._id}  checked={user.checkbox} onChange={(e)=>handleCheckbox(e)}/>
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
                  <td className="text-lg">{user.userType}</td>
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
