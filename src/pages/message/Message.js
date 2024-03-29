import React, { useState, useEffect, createRef } from "react";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import Friends from "../../components/Friends";
import Profile from "../../components/Profile";
import Flex from "../../components/Flex";
import Images from "../../components/Images";
import Chat from "../../components/Chat";
import AllGroupList from "../../components/AllGroupList";
import {
  BsBarChartSteps,
  BsFillCameraFill,
  BsFillMicFill,
} from "react-icons/bs";
import { BiHappy } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../components/Modal";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "react-html5-camera-photo/build/css/index.css";
import {
  getStorage,
  ref as sRef,
  uploadString,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
import ScrollToBottom from "react-scroll-to-bottom";
import { AudioRecorder } from "react-audio-voice-recorder";
import Cropper, { ReactCropperElement } from "react-cropper";
import { getCurrentUser } from "../../Api/Fuctional";
import { useNavigate } from "react-router-dom";
import Loder from "../../components/Loder";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import { Transition } from "@headlessui/react";
const Message = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [img, setImg] = useState("");
  let [blob, setBlob] = useState("");
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedFriendId, setSelectedFriendId] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 1280) {
        setIsOpenProfile(true);
      } else {
        setIsOpenProfile(false);
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
  const handleClick = () => {
    setIsOpenProfile(!isOpenProfile);
  };
  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setSelectedFriendId(true);
      } else {
        setSelectedFriendId(false);
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
  const handleFriendClick = (friendId) => {
    setSelectedFriendId( friendId );
    console.log(friendId,"jhgg");
  };
  let closeChatBox = () => {
    setSelectedFriendId(false);
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, []);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudio(url);
    setBlob(blob);
  };

  function toggleModal() {
    setIsOpen(!isOpen);
    setImg("");
  }

  function toggleModal2() {
    setIsOpen2(!isOpen2);
  }
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  let activeChat = useSelector(
    (state) => state.allActiveChatUsers.activeChatUsers
  );
  let handleMesage = (e) => {
    setMessage(e.target.value);
  };
  let handleOnFocus = (e) => {
    setShowEmoji(false);
  };
  let handleSendEmoji = () => {
    setShowEmoji(!showEmoji);
    // setMessage(message+);
  };
  // Enter Button Sebd Message
  const textarea = document.querySelector("textArea");

  let handleEnterButn = (e) => {
    if (e.key == "Enter") {
      if (activeChat && activeChat.status == "single") {
        set(push(ref(db, "singleMessage")), {
          whoSendMessId: data.uid,
          whoSendMessName: data.displayName,
          whoSendMessPhoto: data.photoURL,
          whoReceiveMessId: activeChat.id,
          whoReceiveMessName: activeChat.name,
          whoReceiveMessPhoto: activeChat.profilePhoto,
          message,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
        });
      } else {
        set(push(ref(db, "groupMessage")), {
          whoSendId: data.uid,
          whoSendName: data.displayName,
          whoSendPhoto: data.photoURL,
          whoReceiveId: activeChat.id,
          adminId: activeChat.adminId,
          whoReceiveName: activeChat.name,
          whoReceivePhoto: activeChat.profilePhoto,
          message,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
        });
      }
    }
  };
  // Send Emoji
  let sendEmoji = (emoji) => {
    setMessage(message + emoji.emoji);
  };
  // Send Like
  let handleSendLike = () => {
    if (activeChat && activeChat.status == "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendMessId: data.uid,
        whoSendMessName: data.displayName,
        whoSendMessPhoto: data.photoURL,
        whoReceiveMessId: activeChat.id,
        whoReceiveMessName: activeChat.name,
        whoReceiveMessPhoto: activeChat.profilePhoto,
        message: " &#128077;",
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    } else {
      set(push(ref(db, "groupMessage")), {
        whoSendId: data.uid,
        whoSendName: data.displayName,
        whoSendPhoto: data.photoURL,
        whoReceiveId: activeChat.id,
        adminId: activeChat.adminId,
        whoReceiveName: activeChat.name,
        whoReceivePhoto: activeChat.profilePhoto,
        message: " &#128077;",
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  };
  // send Message
  let handleSendMessage = () => {
    setShowEmoji(false);
    if (!message) {
      toast("write SomeThing");
    } else {
      if (activeChat && activeChat.status == "single") {
        set(push(ref(db, "singleMessage")), {
          whoSendMessId: data.uid,
          whoSendMessName: data.displayName,
          whoSendMessPhoto: data.photoURL,
          whoReceiveMessId: activeChat.id,
          whoReceiveMessName: activeChat.name,
          whoReceiveMessPhoto: activeChat.profilePhoto,
          message,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
        });
      } else {
        set(push(ref(db, "groupMessage")), {
          whoSendId: data.uid,
          whoSendName: data.displayName,
          whoSendPhoto: data.photoURL,
          whoReceiveId: activeChat.id,
          adminId: activeChat.adminId,
          whoReceiveName: activeChat.name,
          whoReceivePhoto: activeChat.profilePhoto,
          message,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
        });
      }
    }
  };
  // Send Img
  let handleSendImg = () => {
    const storage = getStorage();
    const storageRef = sRef(storage, "take-photo/" + auth.currentUser.uid);
    const message4 = img;
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeChat && activeChat.status == "single") {
          set(push(ref(db, "singleMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            whoReceiveName: activeChat.name,
            whoReceivePhoto: activeChat.profilePhoto,
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessage("");
            setIsOpen(false);
            setImg("");
          });
        } else {
          set(push(ref(db, "groupMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            adminId: activeChat.adminId,
            whoReceiveName: activeChat.name,
            whoReceivePhoto: activeChat.profilePhoto,
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessage("");
            setIsOpen(false);
            setImg("");
          });
        }
      });
    });
  };
  // Audio Send
  let sendRecordingAudio = () => {
    const storage = getStorage();
    const storageRef = sRef(storage, "audio/" + auth.currentUser.uid);
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeChat && activeChat.status == "single") {
          set(push(ref(db, "singleMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            whoReceiveName: activeChat.name,
            whoReceivePhoto: activeChat.profilePhoto,
            audio: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
          });
        } else {
          set(push(ref(db, "groupMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            adminId: activeChat.adminId,
            whoReceiveName: activeChat.name,
            whoReceivePhoto: activeChat.profilePhoto,
            audio: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
          });
        }
      });
    });
  };

  // SEnd File Upload
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef("");
  let files;
  const onChange = (e) => {
    e.preventDefault();
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      // console.log(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    const storage = getStorage();
    const storageRef = sRef(storage, "files/" + auth.currentUser.uid);
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeChat && activeChat.status == "single") {
          set(push(ref(db, "singleMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            whoReceiveName: activeChat.name,
            whoReceivePhoto: activeChat.profilePhoto,
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessage("");
            setIsOpen2(false);
            setImage("");
          });
        } else {
          set(push(ref(db, "groupMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            adminId: activeChat.adminId,
            whoReceiveName: activeChat.name,
            whoReceivePhoto: activeChat.profilePhoto,
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessage("");
            setIsOpen2(false);
            setImage("");
          });
        }
      });
    });
  };

  const [joinedGroup, setJoinedGroup] = useState([]);
  useEffect(() => {
    const acceptReqGroupRef = ref(db, "acceptGrpReq/");
    onValue(acceptReqGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log("meme", item.val());

        arr.push(item.val().groupId + item.val().userId);
      });
      setJoinedGroup(arr);
    });
  }, []);

  function handleTakePhoto(dataUri) {
    setImg(dataUri);
  }
  let openCamera = () => {
    setIsOpen(!isOpen);
  };
  let openFile = () => {
    setIsOpen2(!isOpen2);
    setImage("");
  };

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="flex h-screen overflow-hidden landscape:max-mb991:overflow-y-auto">
          <ToastContainer position="bottom-center" theme="dark" />
          {!isMobile ? (
            !selectedFriendId && (
              <div className="relative w-[500px] max-mb768:w-full max-mb991:w-[45%] max-pad1024:w-[50%] max-pad1280:w-[35%] bg-white ">
                <div className="h-[180px]">
                  <div className=" hidden  justify-end pr-6 max-pad1280:flex absolute right-[-25px] max-pad1024:right-0 top-5">
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white focus:outline-none z-50"
                      onClick={handleClick}
                    >
                      {isOpenProfile ? (
                        <BsBarChartSteps className="text-2xl" />
                      ) : (
                        <AiOutlineCloseCircle className="text-2xl" />
                      )}
                    </button>
                  </div>
                  <Sidebar active={`message`} />
                </div>
                <div className="">
                  <div>
                    <AllGroupList handleFriendClick={handleFriendClick} />
                  </div>
                  <div>
                    <Friends handleFriendClick={handleFriendClick} />
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="relative w-[500px] max-mb768:w-full max-mb991:w-[45%] max-pad1024:w-[50%] max-pad1280:w-[35%] bg-white ">
              <div className="h-[180px]">
                <div className=" hidden  justify-end pr-6 max-pad1280:flex absolute right-[-25px] max-pad1024:right-0 top-5">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white focus:outline-none z-50"
                    onClick={handleClick}
                  >
                    {isOpenProfile ? (
                      <BsBarChartSteps className="text-2xl" />
                    ) : (
                      <AiOutlineCloseCircle className="text-2xl" />
                    )}
                  </button>
                </div>
                <Sidebar active={`message`} />
              </div>
              <div className="">
                <div>
                  <AllGroupList />
                </div>
                <div>
                  <Friends handleFriendClick={handleFriendClick} />
                </div>
              </div>
            </div>
          )}

          {isMobile ? (
            selectedFriendId && (
              <div
                className="flex-1 flex flex-col overflow-hidden max-mb768:w-full"
                style={{
                  backgroundImage: 'url("images/bg-color.png")',
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Name Info Start*/}
                <div className="bg-white border-r border-solid border-black">
                  <Flex className="flex gap-x-5 p-6 items-center">
                    <div className="w-[90px] h-[90px]">
                      <Images
                        imgSrc={activeChat && activeChat.profilePhoto}
                        className="rounded-full w-full"
                      />
                    </div>
                    <div>
                      <p className="font-pophins text-xl font-medium">
                        {activeChat && activeChat.name}
                      </p>
                      <p className="font-pophins text-base font-normal">
                        Online
                      </p>
                    </div>
                  </Flex>
                </div>
                {/* Name Info End*/}
                {/* Messageing Start */}

                <ScrollToBottom
                  scrollViewClassName={`scrollToBottom scrollbar-hidden px-8`}
                  className={`overflow-y-auto overflow-x-hidden scrollbar-hidden pt-5 flex-1 relative`}
                >
                  <Chat />
                </ScrollToBottom>

                {/* Messageing End */}
                {/* Input Text Area Start */}
                {activeChat && activeChat.status == "single" ? (
                  <div className="flex items-center gap-x-5 p-5 pb-2 relative">
                    {audio && (
                      <div className="absolute top-[14px] left-[20px] w-[87%] flex justify-between">
                        <audio
                          controls
                          src={audio}
                          className="w-[550px]"
                        ></audio>
                        <div className="flex gap-x-5">
                          <button
                            onClick={sendRecordingAudio}
                            className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                          >
                            Send Audio
                          </button>
                          <button
                            onClick={() => setAudio("")}
                            className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                          >
                            Delete Audio
                          </button>
                        </div>
                      </div>
                    )}
                    <input
                      onChange={handleMesage}
                      onFocus={handleOnFocus}
                      onKeyUp={handleEnterButn}
                      value={message}
                      type="text"
                      className="w-full p-3 rounded-lg outline-primary"
                    />
                    {!audio && (
                      <div className="flex gap-x-5 absolute right-[110px]">
                        <BsFillCameraFill
                          onClick={openCamera}
                          className="text-primary text-2xl cursor-pointer"
                        />
                        <BiHappy
                          onClick={handleSendEmoji}
                          className="text-primary text-2xl cursor-pointer"
                        />
                        {showEmoji && (
                          <div className="absolute top-[-465px] right-0">
                            <EmojiPicker
                              onEmojiClick={(emoji) => sendEmoji(emoji)}
                            />
                          </div>
                        )}
                        <ImAttachment
                          onClick={openFile}
                          className="text-primary text-2xl cursor-pointer"
                        />
                        {/* <BsFillMicFill
                className="text-primary text-2xl cursor-pointer"
              /> */}
                        {!audio && (
                          <AudioRecorder
                            onRecordingComplete={addAudioElement}
                          />
                        )}
                      </div>
                    )}
                    {message ? (
                      <button
                        onClick={handleSendMessage}
                        className="bg-primary px-5 py-3 rounded-lg "
                      >
                        <RiSendPlaneFill className="text-white text-2xl" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSendLike}
                        className="bg-primary px-5 py-2 rounded-lg text-2xl"
                      >
                        {/* <RiSendPlaneFill className="text-white text-2xl" /> */}
                        &#128077;
                      </button>
                    )}
                  </div>
                ) : (
                  activeChat &&
                  (data.uid == activeChat.adminId ||
                    joinedGroup.includes(activeChat.id + data.uid)) && (
                    <div className="flex items-center gap-x-5 p-5 pb-2 relative">
                      {audio && (
                        <div className="absolute top-[14px] left-[20px] w-[87%] flex justify-between">
                          <audio
                            controls
                            src={audio}
                            className="w-[550px]"
                          ></audio>
                          <div className="flex gap-x-5">
                            <button
                              onClick={sendRecordingAudio}
                              className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                            >
                              Send Audio
                            </button>
                            <button
                              onClick={() => setAudio("")}
                              className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                            >
                              Delete Audio
                            </button>
                          </div>
                        </div>
                      )}
                      <textarea
                        onChange={handleMesage}
                        onFocus={handleOnFocus}
                        onKeyUp={handleEnterButn}
                        value={message}
                        type="text"
                        className="w-full p-3 pr-[160px] rounded-lg outline-primary resize-none max-h-[150px] h-[50px] scrollbar-hidden"
                        rows="1"
                      ></textarea>
                      {!audio && (
                        <div className="flex gap-x-5 absolute right-[110px]">
                          <BsFillCameraFill
                            onClick={openCamera}
                            className="text-primary text-2xl cursor-pointer"
                          />
                          <BiHappy
                            onClick={handleSendEmoji}
                            className="text-primary text-2xl cursor-pointer"
                          />
                          {showEmoji && (
                            <div className="absolute top-[-465px] right-0">
                              <EmojiPicker
                                onEmojiClick={(emoji) => sendEmoji(emoji)}
                              />
                            </div>
                          )}
                          <ImAttachment
                            onClick={openFile}
                            className="text-primary text-2xl cursor-pointer"
                          />
                          {/* <BsFillMicFill
                className="text-primary text-2xl cursor-pointer"
              /> */}
                          {!audio && (
                            <AudioRecorder
                              onRecordingComplete={addAudioElement}
                            />
                          )}
                        </div>
                      )}
                      {message ? (
                        <button
                          onClick={handleSendMessage}
                          className="bg-primary px-5 py-3 rounded-lg "
                        >
                          <RiSendPlaneFill className="text-white text-2xl" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSendLike}
                          className="bg-primary px-5 py-2 rounded-lg text-2xl"
                        >
                          {/* <RiSendPlaneFill className="text-white text-2xl" /> */}
                          &#128077;
                        </button>
                      )}
                    </div>
                  )
                )}
                {/* text */}

                {/* Input Text Area End */}
              </div>
            )
          ) : (
            <div
              className="flex-1 flex flex-col overflow-hidden max-mb768:w-full"
              style={{
                backgroundImage: 'url("images/bg-color.png")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Name Info Start*/}
              <div className="bg-white border-r border-solid border-black">
                <Flex className="flex gap-x-5 p-6 items-center">
                  <AiOutlineArrowLeft onClick={closeChatBox} className="cursor-pointer"/>
                  <div className="w-[90px] h-[90px] max-pad1024:w-[40px] max-pad1024:h-[40px]">
                    <Images
                      imgSrc={activeChat && activeChat.profilePhoto}
                      className="rounded-full w-full"
                    />
                  </div>
                  <div>
                    <p className="font-pophins text-xl font-medium">
                      {activeChat && activeChat.name}
                    </p>
                    <p className="font-pophins text-base font-normal">Online</p>
                  </div>
                </Flex>
              </div>
              {/* Name Info End*/}
              {/* Messageing Start */}

              <ScrollToBottom
                scrollViewClassName={`scrollToBottom scrollbar-hidden px-8`}
                className={`overflow-y-auto overflow-x-hidden scrollbar-hidden pt-5 flex-1 relative`}
              >
                <Chat />
              </ScrollToBottom>

              {/* Messageing End */}
              {/* Input Text Area Start */}
              {activeChat && activeChat.status == "single" ? (
                <div className="flex items-center gap-x-5 p-5 pb-2 relative">
                  {audio && (
                    <div className="absolute top-[14px] left-[20px] w-[87%] flex justify-between">
                      <audio controls src={audio} className="w-[550px]"></audio>
                      <div className="flex gap-x-5">
                        <button
                          onClick={sendRecordingAudio}
                          className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                        >
                          Send Audio
                        </button>
                        <button
                          onClick={() => setAudio("")}
                          className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                        >
                          Delete Audio
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    onChange={handleMesage}
                    onFocus={handleOnFocus}
                    onKeyUp={handleEnterButn}
                    value={message}
                    type="text"
                    className="w-full p-3 rounded-lg outline-primary"
                  />
                  {!audio && (
                    <div className="flex gap-x-5 absolute right-[110px]">
                      <BsFillCameraFill
                        onClick={openCamera}
                        className="text-primary text-2xl cursor-pointer"
                      />
                      <BiHappy
                        onClick={handleSendEmoji}
                        className="text-primary text-2xl cursor-pointer"
                      />
                      {showEmoji && (
                        <div className="absolute top-[-465px] right-0">
                          <EmojiPicker
                            onEmojiClick={(emoji) => sendEmoji(emoji)}
                          />
                        </div>
                      )}
                      <ImAttachment
                        onClick={openFile}
                        className="text-primary text-2xl cursor-pointer"
                      />
                      {/* <BsFillMicFill
                className="text-primary text-2xl cursor-pointer"
              /> */}
                      {!audio && (
                        <AudioRecorder onRecordingComplete={addAudioElement} />
                      )}
                    </div>
                  )}
                  {message ? (
                    <button
                      onClick={handleSendMessage}
                      className="bg-primary px-5 py-3 rounded-lg "
                    >
                      <RiSendPlaneFill className="text-white text-2xl" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSendLike}
                      className="bg-primary px-5 py-2 rounded-lg text-2xl"
                    >
                      {/* <RiSendPlaneFill className="text-white text-2xl" /> */}
                      &#128077;
                    </button>
                  )}
                </div>
              ) : (
                activeChat &&
                (data.uid == activeChat.adminId ||
                  joinedGroup.includes(activeChat.id + data.uid)) && (
                  <div className="flex items-center gap-x-5 p-5 pb-2 relative">
                    {audio && (
                      <div className="absolute top-[14px] left-[20px] w-[87%] flex justify-between">
                        <audio
                          controls
                          src={audio}
                          className="w-[550px]"
                        ></audio>
                        <div className="flex gap-x-5">
                          <button
                            onClick={sendRecordingAudio}
                            className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                          >
                            Send Audio
                          </button>
                          <button
                            onClick={() => setAudio("")}
                            className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                          >
                            Delete Audio
                          </button>
                        </div>
                      </div>
                    )}
                    <textarea
                      onChange={handleMesage}
                      onFocus={handleOnFocus}
                      onKeyUp={handleEnterButn}
                      value={message}
                      type="text"
                      className="w-full p-3 pr-[160px] rounded-lg outline-primary resize-none max-h-[150px] h-[50px] scrollbar-hidden"
                      rows="1"
                    ></textarea>
                    {!audio && (
                      <div className="flex gap-x-5 absolute right-[110px]">
                        <BsFillCameraFill
                          onClick={openCamera}
                          className="text-primary text-2xl cursor-pointer"
                        />
                        <BiHappy
                          onClick={handleSendEmoji}
                          className="text-primary text-2xl cursor-pointer"
                        />
                        {showEmoji && (
                          <div className="absolute top-[-465px] right-0">
                            <EmojiPicker
                              onEmojiClick={(emoji) => sendEmoji(emoji)}
                            />
                          </div>
                        )}
                        <ImAttachment
                          onClick={openFile}
                          className="text-primary text-2xl cursor-pointer"
                        />
                        {/* <BsFillMicFill
                className="text-primary text-2xl cursor-pointer"
              /> */}
                        {!audio && (
                          <AudioRecorder
                            onRecordingComplete={addAudioElement}
                          />
                        )}
                      </div>
                    )}
                    {message ? (
                      <button
                        onClick={handleSendMessage}
                        className="bg-primary px-5 py-3 rounded-lg "
                      >
                        <RiSendPlaneFill className="text-white text-2xl" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSendLike}
                        className="bg-primary px-5 py-2 rounded-lg text-2xl"
                      >
                        {/* <RiSendPlaneFill className="text-white text-2xl" /> */}
                        &#128077;
                      </button>
                    )}
                  </div>
                )
              )}
              {/* text */}

              {/* Input Text Area End */}
            </div>
          )}

          <Transition
            show={!isOpenProfile}
            enter="transition duration-300 ease-out transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition duration-200 ease-in transform"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
            className={`max-mb768:absolute max-mb768:bg-slate-200 max-mb580:top-20 max-mb580:left-0 max-mb768:left-1/2 h-screen`}
          >
            <div className="w-[400px] max-pad1024:w-full max-pad1280:w-[300px]">
              <Profile />
            </div>
          </Transition>
          {isOpen && (
            <Modal
              onClick={toggleModal}
              titel="Take Your Photo"
              show={true}
              sendImg={handleSendImg}
            >
              <div>
                <Flex>open Camera</Flex>

                <Camera
                  onTakePhoto={(dataUri) => {
                    handleTakePhoto(dataUri);
                  }}
                  idealFacingMode={FACING_MODES.ENVIRONMENT}
                  idealResolution={{ width: 640, height: 480 }}
                  imageType={IMAGE_TYPES.JPG}
                  imageCompression={0.97}
                  isMaxResolution={true}
                  isImageMirror={false}
                  isSilentMode={false}
                  isDisplayStartCameraError={true}
                  isFullscreen={false}
                  sizeFactor={1}
                />
              </div>
              <div>
                <p className="text-xl text-black">Preview</p>
                {img && <img src={img} alt="" />}
              </div>
            </Modal>
          )}
          {isOpen2 && (
            <Modal
              onClick={toggleModal2}
              titel="Open File"
              show={true}
              sendImg={getCropData}
            >
              <div>
                {image && (
                  <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                  />
                )}
                {image && (
                  <>
                    <h1>Preview</h1>
                    <div className="w-[100px] h-[100px] mx-auto rounded-full overflow-hidden mb-5">
                      <div className="img-preview w-full h-full"></div>
                    </div>
                  </>
                )}
                <input onChange={onChange} type="file" name="" id="" />
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default Message;
