import React from 'react'

const Registation = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-white shadow-xl w-1/2  rounded-xl ">
        <div
          style={{
            backgroundImage: 'url("images/top-curve-bg.png")',
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          className=" text-center rounded-xl min-h-[165px]"
        >
          <h1 className="text-white font-pophins text-3xl text-center pt-7">
            <img src="images/logo.png" alt="" className="m-auto" />
          </h1>
        </div>
        <div className="px-8 p-5 pt-0">
          <div>
            <p className="font-pophins text-lg my-3">Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-gray-100 py-4 pl-3 rounded-md border-none focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
            />
          </div>
          <div>
            <p className="font-pophins text-lg my-3">Email</p>
            <input
              type="text"
              placeholder="Enter your mail"
              className="w-full bg-gray-100 py-4 pl-3 rounded-md border-none focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
            />
          </div>
          <div>
            <p className="font-pophins text-lg my-3">Create Password</p>
            <input
              type="text"
              placeholder="Enter your password"
              className="w-full bg-gray-100 py-4 pl-3 rounded-md border-none focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
            />
          </div>
          <button className="w-full text-center bg-primary text-white font-pophins text-base py-2.5 rounded-md my-5 hover:bg-orange-300 hover:text-primary">
            {" "}
            Register
          </button>
          <div className="text-center">
            <p>
              Already have an account? <span className='text-primary font-semibold'>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registation