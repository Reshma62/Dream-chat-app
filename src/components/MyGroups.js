import React from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";

const MyGroups = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[55vh]  p-7 pb-0">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        My Groups
      </h2>
      <div className="overflow-y-scroll overflow-x-hidden">
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Info
            </button>
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Request
            </button>
            <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Delete
            </button>
          </div>
        </Flex>
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Info
            </button>
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Request
            </button>
            <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Delete
            </button>
          </div>
        </Flex>
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Info
            </button>
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Request
            </button>
            <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Delete
            </button>
          </div>
        </Flex>
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Info
            </button>
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Request
            </button>
            <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Delete
            </button>
          </div>
        </Flex>
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Info
            </button>
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Request
            </button>
            <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Delete
            </button>
          </div>
        </Flex>
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Info
            </button>
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Request
            </button>
            <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Delete
            </button>
          </div>
        </Flex>
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Info
            </button>
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Request
            </button>
            <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
              Delete
            </button>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default MyGroups;
