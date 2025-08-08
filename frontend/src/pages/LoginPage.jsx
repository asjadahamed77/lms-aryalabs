import React from 'react'

const LoginPage = () => {

    const submitHandler = async (e)=>{
        e.preventDefault()
    }

  return (
    <div className='flex items-center justify-center py-32 '>
      <form onSubmit={submitHandler} className='flex flex-col gap-4 min-w-[300px]  '>
    <div className='flex flex-col w-full'>
        <label>Registration Number</label>
        <input type="text" className='bg-slate-100 p-3 rounded border border-slate-200 mt-2' required />
    </div>
    <div className='flex flex-col w-full'>
        <label>Password</label>
        <input type="password" className='bg-slate-100 p-3 rounded border border-slate-200 mt-2' required />
    </div>
    <button className='bg-primaryColor text-white text-lg font-medium py-3 mt-4 rounded-lg cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out '>LOGIN</button>
    <p className='text-sm font-light text-primaryColor/70 hover:underline cursor-pointer duration-300 transition-all ease-in-out'>forgotten password or reset password?</p>
      </form>
    </div>
  )
}

export default LoginPage
