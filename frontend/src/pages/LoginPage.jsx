import React, { useContext, useState } from 'react'
import { loginUser } from '../service/auth'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/common/Loading'
import { AppContext } from '../context/AppContext'

const LoginPage = () => {

  const {login} = useContext(AppContext)

  const navigate = useNavigate()

    const [data, setData] = useState({
      email: "",
      password: "",
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
          setLoading(true);
          const response = await loginUser(data);

       login(response.user, response.token)
       console.log(response.token);
       
         
        
          
          if (response.user) {
            switch(response.user.role) {
              case "admin":
                navigate("/admin");
                break;
              case "lecturer":
                navigate("/lecturer");
                break;
              case "student":
                navigate("/student");
                break;
              default:
                navigate("/");
            }
          }
          setData({ email: "", password: "" });
        }  catch (error) {
          console.log("Error logging in:", error);
          
        }finally{
          setLoading(false);
        }
    }

    if(loading) {
        return <Loading />
    }

  return (
    <div className='flex items-center justify-center py-32 '>
      <form onSubmit={submitHandler} className='flex flex-col gap-4 min-w-[300px]  '>
    <div className='flex flex-col w-full'>
        <label>Email</label>
        <input type="text" name='email' value={data.email} onChange={handleChange} className='bg-slate-100 p-3 rounded border border-slate-200 mt-2' required />
    </div>
    <div className='flex flex-col w-full'>
        <label>Password</label>
        <input type="password" name='password' value={data.password} onChange={handleChange} className='bg-slate-100 p-3 rounded border border-slate-200 mt-2' required />
    </div>
    <button className='bg-primaryColor text-white text-lg font-medium py-3 mt-4 rounded-lg cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out '>LOGIN</button>
    <p className='text-sm font-light text-primaryColor/70 hover:underline cursor-pointer duration-300 transition-all ease-in-out'>forgotten password or reset password?</p>
      </form>
    </div>
  )
}

export default LoginPage
