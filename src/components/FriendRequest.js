import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../Api/Fuctional";
const FriendRequest = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);

  const [ friendRequest, setFriendRequest ] = useState( [] );
  const [ showAll, setShowAll ] = useState( true );
   useEffect(() => {
     const handleWindowResize = () => {
       if (window.innerWidth <= 768) {
         setShowAll(false);
       } else {
         setShowAll(true);
       }
     };

     // Update the state based on the initial window width
     handleWindowResize();

     // Add event listener for window resize
     window.addEventListener("resize", handleWindowResize);

     // Clean up the event listener when the component unmounts
     return () => {
       window.removeEventListener("resize", handleWindowResize);
     };
   }, []);
  const toggleFriendList = () => {
    setShowAll(!showAll);
  };
  useEffect(() => {
    const friendReqRef = ref(db, "friendRequest/");
    onValue(friendReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverId) {
          arr.push({ ...item.val(), friendReqId: item.key });
        }
      });
      setFriendRequest(arr);
    });
  }, []);
  let handleAcceptFrndReq = (item) => {
    /* console.log(item, "handleAcceptFrndReq"); */
    set( push( ref( db, "friends" ) ), {
      friendReqId: item.friendReqId,

      sendRqId: item.senderId,
      sendRqName: item.senderName,
      sendRqPhoto: item.senderPhoto,
      userId: data.uid,
      userName: data.displayName,
      userPhoto: data.photoURL,

    });
  };
  const [friendAList, setFriendAList] = useState([]);
  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().sendRqId + item.val().userId);
      });
      setFriendAList(arr);
    });
  }, []);
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        /* console.log("bl", item.val()); */
        arr.push(item.val().blockId + item.val().whoBlockId);
      });
      setBlockList(arr);
    });
  }, [] );

  /*  */


   const [loginUser, setLoginUser] = useState([]);

   useEffect(() => {
     getCurrentUser(setLoginUser);
   }, []);

   /* console.log(
     loginUser
       .filter((useritem) => useritem.userId == item.senderId)
       .map((item) => item.profile_picture)[0]
   ); */
  return (
    <div>
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        Friend Request
      </h2>
      <Search placeholder={`search here for users`} />

      <div className="scrollbar-hidden h-[95vh] max-mb580:h-[50vh] landscape:max-mb768:h-[80vh]  max-mb768:h-[30vh] overflow-y-auto">
        {friendRequest.length == 0 ? (
          <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
            No Friend Request Available
          </h1>
        ) : (
          friendRequest
            .slice(0, showAll ? friendRequest.length : 2)
            .map((item) => (
              <Flex
                key={item.friendReqId}
                className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5`}
              >
                <div className="w-[50px] h-[50px] ">
                  <Images
                    // imgSrc={item.senderPhoto}
                    imgSrc={
                      loginUser
                        .filter((useritem) => useritem.userId == item.senderId)
                        .map((item) => item.profile_picture)[0]
                    }
                    className="rounded-full w-full"
                  />
                </div>
                <div>
                  <h3 className="text-heading font-semibold text-lg font-pophins">
                    {/* {item.senderName} */}
                    {
                      loginUser
                        .filter((useritem) => useritem.userId == item.senderId)
                        .map((item) => item.username)[0]
                    }
                  </h3>
                  <p className="text-[#767676] font-normal text-sm font-pophins">
                    Hi Guys, How Are you
                  </p>
                </div>
                <div className="grow text-right">
                  {blockList.includes(data.uid + item.senderId) ||
                  blockList.includes(item.senderId + data.uid) ? (
                    <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md">
                      Blocked
                    </button>
                  ) : friendAList.includes(data.uid + item.senderId) ||
                    friendAList.includes(item.senderId + data.uid) ? (
                    <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                      Accepted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAcceptFrndReq(item)}
                      className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                    >
                      Accept
                    </button>
                  )}
                </div>
              </Flex>
            ))
        )}
        <div className="hidden max-mb768:block">
          {friendRequest.length > 2 && (
            <button onClick={toggleFriendList}>
              {showAll ? (
                <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                  See Less
                </button>
              ) : (
                <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                  See More
                </button>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
