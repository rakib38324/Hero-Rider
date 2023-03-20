import React from 'react';
import { useForm } from 'react-hook-form';

const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();



    const handleSignUp = (data) =>{
        console.log(data)
    }

    return (
        <div>
            <div>
        <h2 className='text-4xl  font-semibold text-center mb-5 text-black py-6'>Please Sign Up First</h2>
        <div className='w-full p-7'>

          <form onSubmit={handleSubmit(handleSignUp)}>

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Your Full Name</span></label>
                <input type="text" {...register("username", {
                  required: "Name is Required",
                  
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your name.' />
                {errors.username && <p className='text-red-500'>{errors.username.message}</p>}

              </div>

              
              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Your Email</span></label>
                <input type="text" {...register("useremail", {
                  required: "Email is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your email.' />
                {errors.useremail && <p className='text-red-500'>{errors.useremail.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Your Age</span></label>
                <input type="text" {...register("userage", {
                  required: "Age is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your age.' />
                {errors.userage && <p className='text-red-500'>{errors.userage.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Your Address</span></label>
                <input type="text" {...register("useraddress", {
                  required: "Address is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your address.' />
                {errors.useraddress && <p className='text-red-500'>{errors.useraddress.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Phone Number</span></label>
                <input type="text" {...register("phone", {
                  required: "Phone Number is Required",
                  minLength: { value: 11, message: "Phone Number must be 11 characters or long" }
                })} className="input  input-bordered w-full max-w-xs" placeholder="Phone number" required />
                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Your Area</span></label>
                <input type="text" {...register("userarea", {
                  required: "Area is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your area.' />
                {errors.userarea && <p className='text-red-500'>{errors.userarea.message}</p>}
              </div>


              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold">Driving Licence</span></label>
                <input type="file" {...register("userdrivinglience", {
                  required: "Photo is Required"
                })} className="input border-gray-300  w-full max-w-xs pt-2" required />
                {errors.userdrivinglience && <p className='text-red-500'>{errors.userdrivinglience.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold">NID Picture</span></label>
                <input type="file" {...register("usernid", {
                  required: "Photo is Required"
                })} className="input border-gray-300  w-full max-w-xs pt-2" required />
                {errors.usernid && <p className='text-red-500'>{errors.usernid.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold">Profile Picture</span></label>
                <input type="file" {...register("userprofilepicture", {
                  required: "Photo is Required"
                })} className="input border-gray-300  w-full max-w-xs pt-2" required />
                {errors.userprofilepicture && <p className='text-red-500'>{errors.userprofilepicture.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Care Name</span></label>
                <input type="text" {...register("carename", {
                  required: "Care name is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your car name.' />
                {errors.carename && <p className='text-red-500'>{errors.carename.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Care Model</span></label>
                <input type="text" {...register("caremodel", {
                  required: "Care model is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your car model.' />
                {errors.caremodel && <p className='text-red-500'>{errors.caremodel.message}</p>}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Care Number Palate</span></label>
                <input type="text" {...register("carnumberpalate", {
                  required: "Care number palate is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your care number palate.' />
                {errors.carnumberpalate && <p className='text-red-500'>{errors.carnumberpalate.message}</p>}
              </div>




              <div className="form-control  w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold">Please Select Vehicle Type</span></label>
                <select
                  {...register('condition')}
                  className="select input-bordered  w-full max-w-xs">
                  <option className='text-primary'>Car</option>
                  <option className='text-primary'>Bike</option>
                </select>
              </div>


              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Password</span></label>
                <input type="password" {...register("password", {
                  required: "Password is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your address.' />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              </div>



              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text text-black font-bold ">Confirm Password</span></label>
                <input type="password" {...register("confirmpassword", {
                  required: "Confirm Password is Required"
                })} className="input  input-bordered w-full max-w-xs" placeholder='Enter your address.' />
                {errors.confirmpassword && <p className='text-red-500'>{errors.confirmpassword.message}</p>}
              </div>

            </div>



            <div className='text-center my-10'>

              {/* <button  >  { loading ? <SmallLoading></SmallLoading> :<button> */}
              <button className='btn bg-gray-400 text-black text-xl font-bold lg:w-1/4 hover:bg-slate-900 hover:text-white' type='submit'>Sign Up</button>
            </div>
           
          </form>


        </div>
      </div>
        </div>
    );
};

export default SignUp;