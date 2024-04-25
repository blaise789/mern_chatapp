import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignupHook";
import { AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai';


const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [visible,setVisible]=useState(false)
  const {loading,signup}=useSignup()

  const handleCheckBoxChange=(gender)=>{
    setInputs({...inputs,gender})
  }


  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
    setInputs({  fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",})

  };
  return (
    <div className="  flex flex-col  items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup <span className="text-blue-500">ChatApp </span>
        </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label p-2">
            <span className="text-base">FullName</span>
          </label>
          <input
            type="text"
            value={inputs.fullName}
            placeholder="John Doe"
            className="w-full input input-bordered h-10"
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
        </div>
        <div>
          <label className="label p-2 ">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="johndoe"
            className="w-full input input-bordered h-10"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>

        <div className="relative">
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type={visible?`text`:'password'}
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          
          {visible ?
          (<AiOutlineEye className="absolute top-[51px] right-2" onClick={(e)=>setVisible(!visible)} />):(
            <AiOutlineEyeInvisible className="absolute top-[51px] right-2" onClick={(e)=>setVisible(!visible)}/>
            )
       
          }
          
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full input input-bordered h-10"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
        </div>
        <GenderCheckBox  onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender} />
        <Link
          to={"/login"}
          className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
        >
          Already have an account?
        </Link>
        <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
              type="submit"
            >
              {loading?(<span className="loading loading-spinner"></span>):"SignUp"}
            </button>
         </div>   
        
      </form>
    </div>
    </div>

  );
};

export default Signup;
