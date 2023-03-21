import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
const Friends = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [friendList, setFriendList] = useState([]);
    useEffect(() => {
      const friendsRef = ref(db, "friends/");
      onValue(friendsRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (
            data.uid == item.val().senderId ||
            data.uid == item.val().receiverId
          ) {
            arr.push(item.val());
          }
        });
        setFriendList(arr);
      });
    }, []);
  return (
    <div className="flex flex-col overflow-hidden h-[50vh]  p-7">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        Friends
      </h2>
      <div className="overflow-y-scroll overflow-x-hidden">
        {friendList.map((item) => (
          <Flex
            className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
          >
            <div className="w-[50px] h-[50px] ">
              <Images
                imgSrc={
                  item.senderId == data.uid
                    ? item.receiverPhoto
                    : item.senderPhoto
                }
                className="rounded-full w-full"
              />
            </div>
            <div>
              <h3 className="text-heading font-medium text-lg font-pophins">
                {item.senderId == data.uid
                  ? item.receiverName
                  : item.senderName}
              </h3>
              <p className="text-[#767676] font-normal text-sm font-pophins">
                Hi Guys, How Are you
              </p>
            </div>
            <div className="grow text-right">
              <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                Message
              </button>
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default Friends;
