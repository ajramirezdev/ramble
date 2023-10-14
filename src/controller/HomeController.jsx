import { useContext, useEffect, useRef, useState } from "react";
import UserModel from "../model/UserModel";
import RoomModel from "../model/RoomModel";
import jwt_decode from "jwt-decode";
import { Link, Outlet, useNavigate } from "react-router-dom";
import RoomTabs from "../view/components/RoomTabs";
import { AuthContext } from "../model/providers/authProvider";
import CustomButton from "../view/components/CustomButton";
import CreateRoomModal from "../view/components/CreateRoomModal";
import PasswordModal from "../view/components/PasswordModal";
import DeleteRoomModal from "../view/components/DeleteRoomModal";
import EditRoomModal from "../view/components/EditRoomModal";
import EditUserModal from "../view/components/EditUserModal";
import { storage } from "../config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import FriendList from "../view/components/FriendlList";
import logo from "../../assets/ramble-r-logo.png";

//icons
import { IoLogOut } from "react-icons/io5";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { RiChatPrivateFill } from "react-icons/ri";
import { AiOutlineWechat } from "react-icons/ai";
import { BsChatTextFill } from "react-icons/bs";

const HomeController = () => {
  const [state, dispatch] = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  //for rooms
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [privateData, setPrivateData] = useState({});
  const [deleteRoomData, setDeleteRoomData] = useState({});
  const [editRoomData, setEditRoomData] = useState({});
  const [roomEdits, setRoomEdits] = useState({});
  // const roomSearchRef = useRef();
  const [path, setPath] = useState("");
  //for user edits
  const [userEdits, setUserEdits] = useState({});
  const [imgUpload, setImgUpload] = useState();
  const [profilePicURL, setProfilePicURL] = useState();
  const [previousImageRef, setPreviousImageRef] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const decodedUser = jwt_decode(localStorage.getItem("token"));
      const userData = await UserModel.getOneUser(decodedUser._id);
      const allUsers = await UserModel.getAllUsers();
      const allRooms = await RoomModel.getAllRooms();
      const publicRooms = await RoomModel.getPublicRooms();
      const privateRooms = await RoomModel.getPrivateRooms();
      const joinedRooms = await RoomModel.getJoinedRooms(userData._id);
      const createdRooms = await RoomModel.getCreatedRooms(userData._id);

      setUser(userData);
      dispatch({ type: "SET_ALL_USERS", payload: allUsers });
      dispatch({ type: "SET_ALL_ROOMS", payload: allRooms });
      dispatch({ type: "SET_PUBLIC_ROOMS", payload: publicRooms });
      dispatch({ type: "SET_PRIVATE_ROOMS", payload: privateRooms });
      dispatch({ type: "SET_JOINED_ROOMS", payload: joinedRooms });
      dispatch({ type: "SET_CREATED_ROOMS", payload: createdRooms });
    };

    fetchData();
  }, [dispatch]);

  const leaveRoom = async (room) => {
    const memberIndex = room.members.findIndex((id) => id === user._id);
    const roomMembers = [...room.members];
    roomMembers.splice(memberIndex, 1);

    await RoomModel.editRoom(room._id, {
      ...room,
      members: roomMembers,
    });

    const joinedRoomIndex = state.joinedRooms.findIndex(
      (joinedRoom) => joinedRoom._id === room._id
    );
    const updatedJoinedRooms = [...state.joinedRooms];
    updatedJoinedRooms.splice(joinedRoomIndex, 1);
    dispatch({ type: "SET_JOINED_ROOMS", payload: updatedJoinedRooms });

    if (room.isPrivate) {
      const privateRoomIndex = state.privateRooms.findIndex(
        (privateRoom) => privateRoom._id === room._id
      );
      const updatedPrivateRooms = [...state.privateRooms];
      updatedPrivateRooms[privateRoomIndex].members = roomMembers;
      dispatch({ type: "SET_PRIVATE_ROOMS", payload: updatedPrivateRooms });
    } else {
      const publicRoomIndex = state.publicRooms.findIndex(
        (publicRoom) => publicRoom._id === room._id
      );
      const updatedPublicRooms = [...state.publicRooms];
      updatedPublicRooms[publicRoomIndex].members = roomMembers;
      dispatch({ type: "SET_PUBLIC_ROOMS", payload: updatedPublicRooms });
    }
  };

  const joinRoom = async (room, path) => {
    if (room.isPrivate) {
      dispatch({ type: "SHOW_ROOM_PASSOWRD_FORM" });
      setPrivateData(room);
      setPath(path);
      return;
    }

    if (!room.members.includes(user._id)) {
      await RoomModel.editRoom(room._id, {
        members: [...room.members, user._id],
      });
    }
    const editedRoom = { ...room, members: [...room.members, user._id] };

    const roomIndex = state.publicRooms.findIndex(
      (publicRoom) => publicRoom._id === room._id
    );

    if (path === "/chat/search") {
      const searchedRoomIndex = state.searchedRooms.findIndex(
        (searchedRoom) => searchedRoom._id === room._id
      );
      const updatedSearchedRooms = [...state.searchedRooms];
      updatedSearchedRooms[searchedRoomIndex] = editedRoom;
      dispatch({
        type: "SET_SEARCHED_ROOMS",
        payload: updatedSearchedRooms,
      });
    }

    if (roomIndex !== -1) {
      const updatedPublicRooms = [...state.publicRooms];
      updatedPublicRooms[roomIndex] = editedRoom;

      dispatch({
        type: "SET_PUBLIC_ROOMS",
        payload: updatedPublicRooms,
      });

      dispatch({
        type: "SET_JOINED_ROOMS",
        payload: [...state.joinedRooms, editedRoom],
      });
    }
  };

  const setRoomToPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const submitUserEdits = async (event) => {
    event.preventDefault();
    await UserModel.editeUser(user._id, userEdits);
    setUser({ ...user, ...userEdits });
    dispatch({ type: "SHOW_EDIT_USER_MODAL" });
  };

  const saveUserInputs = (event) => {
    switch (event.target.id) {
      case "firstName":
        setUserEdits({ ...userEdits, firstName: event.target.value });
        break;
      case "lastName":
        setUserEdits({ ...userEdits, lastName: event.target.value });
        break;
      case "age":
        setUserEdits({ ...userEdits, age: event.target.value });
        break;
      case "email":
        setUserEdits({ ...userEdits, email: event.target.value });
        break;
      default:
        break;
    }
  };

  const saveRoomInputs = (event) => {
    switch (event.target.id) {
      case "roomName":
        setRoomData({ ...roomData, roomName: event.target.value });
        break;
      case "roomCaption":
        setRoomData({ ...roomData, roomCaption: event.target.value });
        break;
      case "password":
        setRoomData({ ...roomData, password: event.target.value });
        break;
      case "confrimPassword":
        setRoomData({ ...roomData, confrimPassword: event.target.value });
        break;
      case "newRoomName":
        setRoomEdits({ ...roomEdits, roomName: event.target.value });
        break;
      case "newRoomCaption":
        setRoomEdits({ ...roomEdits, roomCaption: event.target.value });
        break;
      case "oldPassword":
        setRoomEdits({ ...roomEdits, oldPassword: event.target.value });
        break;
      case "newPassword":
        setRoomEdits({ ...roomEdits, password: event.target.value });
        break;
      default:
        break;
    }
  };

  const createNewRoom = async (event) => {
    event.preventDefault();

    const roomByName = await RoomModel.getRoomByName(roomData.roomName);

    if (roomByName) {
      dispatch({ type: "EMAIL_TAKEN", payload: true });
      return;
    } else {
      dispatch({ type: "EMAIL_TAKEN", payload: false });
    }

    if (!roomData.roomName.trim() || !roomData.roomCaption.trim()) {
      dispatch({ type: "BLANK_NAMES", payload: true });
      return;
    } else {
      dispatch({ type: "BLANK_NAMES", payload: false });
    }

    if (isPrivate) {
      if (roomData.password !== roomData.confrimPassword) {
        dispatch({ type: "DIFFERENT_PASSWORDS", payload: true });
        return;
      } else {
        dispatch({ type: "DIFFERENT_PASSWORDS", payload: false });
      }
    }

    const newRoomData = {
      ...roomData,
      isPrivate: isPrivate,
      createdBy: user._id,
    };

    const newRoom = await RoomModel.createRoom(newRoomData);

    dispatch({
      type: "SET_CREATED_ROOMS",
      payload: [...state.createdRooms, newRoom],
    });

    if (newRoom.isPrivate) {
      dispatch({
        type: "SET_PRIVATE_ROOMS",
        payload: [...state.privateRooms, newRoom],
      });
    } else {
      dispatch({
        type: "SET_PUBLIC_ROOMS",
        payload: [...state.publicRooms, newRoom],
      });
    }
    dispatch({ type: "SHOW_CREATE_ROOM_FORM" });
  };

  const editRoom = async (room, path) => {
    const editedRoom = await RoomModel.editRoom(room._id, roomEdits);

    const createdRoomIndex = state.createdRooms.findIndex(
      (createdRoom) => createdRoom._id === room._id
    );
    const updatedCreatedRooms = [...state.createdRooms];
    updatedCreatedRooms[createdRoomIndex] = editedRoom;
    dispatch({ type: "SET_CREATED_ROOMS", payload: updatedCreatedRooms });

    if (path === "/chat/search") {
      const searchedRoomIndex = state.searchedRooms.findIndex(
        (searchedRoom) => searchedRoom._id === room._id
      );
      const updatedSearchedRooms = [...state.searchedRooms];
      updatedSearchedRooms[searchedRoomIndex] = editedRoom;
      dispatch({
        type: "SET_SEARCHED_ROOMS",
        payload: updatedSearchedRooms,
      });
    }

    if (room.isPrivate) {
      const privateRoomIndex = state.privateRooms.findIndex(
        (privateRoom) => privateRoom._id === room._id
      );
      const updatedPrivateRooms = [...state.privateRooms];
      updatedPrivateRooms[privateRoomIndex] = editedRoom;
      dispatch({ type: "SET_PRIVATE_ROOMS", payload: updatedPrivateRooms });
    } else {
      const publicRoomIndex = state.publicRooms.findIndex(
        (publicRoom) => publicRoom._id === room._id
      );
      const updatedPublicRooms = [...state.publicRooms];
      updatedPublicRooms[publicRoomIndex] = editedRoom;
      dispatch({ type: "SET_PUBLIC_ROOMS", payload: updatedPublicRooms });
    }
    dispatch({ type: "SHOW_EDIT_ROOM_MODAL" });
  };

  const deleteRoom = async (roomData, path) => {
    dispatch({ type: "SHOW_DELETE_ROOM_MODAL" });
    setDeleteRoomData(roomData);
    setPath(path);
  };

  const showEditRoomModal = async (room, path) => {
    dispatch({ type: "SHOW_EDIT_ROOM_MODAL" });
    setEditRoomData(room);
    setPath(path);
  };

  // functions for uploading profile pics
  const handleUpload = (e) => {
    setImgUpload(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (imgUpload == null) return;

    const newImageRef = ref(storage, `user-images/${uuidv4()}`);

    try {
      await uploadBytes(newImageRef, imgUpload);
      const imgURL = await getDownloadURL(newImageRef);

      if (previousImageRef) {
        await deleteObject(previousImageRef);
      }
      await UserModel.editeUser(user._id, { img: imgURL });
      setUser({ ...user, img: imgURL });
      setProfilePicURL(imgURL);
      setPreviousImageRef(newImageRef);
      const userIndex = state.allUsers.findIndex(
        (mainUser) => mainUser._id === user._id
      );
      const updatedUsers = [...state.allUsers];
      updatedUsers[userIndex].img = imgURL;
      dispatch({ type: "SET_ALL_USERS", payload: updatedUsers });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const showEditUserModal = () => {
    dispatch({ type: "SHOW_EDIT_USER_MODAL" });
  };

  const showCreateModal = () => {
    dispatch({ type: "SHOW_CREATE_ROOM_FORM" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="">
      <div className="">
        {state.showEditUserModal ? (
          <EditUserModal
            user={user}
            upload={uploadImage}
            handleChange={handleUpload}
            profilePicURL={profilePicURL}
            saveUserInputs={saveUserInputs}
            submitUserEdits={submitUserEdits}
          />
        ) : null}

        <div className="flex h-screen">
          <div className="bg-emerald-800 h-screen p-2 shadow-lg flex flex-col justify-between 2xl:w-20 w-16 items-center">
            <div>
              <img
                className="2xl:h-14 h-11 mt-0 rounded shadow-md p-1 object-cover bg-emerald-900"
                src={logo}
                alt="Logo"
              />
              <div className="relative inline-block group">
                <button
                  className="2xl:h-14 2xl:w-14 h-10 w-10 mt-5 rounded-full border-spacing-10 bg-slate-300"
                  onClick={() => {
                    showEditUserModal();
                    dispatch({ type: "IS_SEARCH_OPEN", payload: false });
                  }}
                >
                  <img
                    src={user.img}
                    alt={user.name}
                    className="2xl:h-14 2xl:w-14 h-10 w-10 rounded-full shadow-md object-cover"
                  />
                </button>
                <p className="bg-slate-800 text-xs text-white p-1 rounded-lg absolute top-7 left-14 opacity-0 invisible group-hover:opacity-70 group-hover:visible transition-opacity">
                  Profile
                </p>
              </div>
            </div>
            <div>
              <div className="relative inline-block group">
                <button
                  onClick={() => {
                    navigate("my-rooms");
                    dispatch({ type: "IS_SEARCH_OPEN", payload: true });
                  }}
                  className=" text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <BsFillChatRightTextFill className="2xl:text-5xl text-3xl hover:text-emerald-300 text-emerald-100" />
                </button>
                <p className="bg-slate-800 text-xs text-white p-1 rounded-lg absolute top-1 left-14 opacity-0 invisible group-hover:opacity-70 group-hover:visible transition-opacity">
                  My Rooms
                </p>
              </div>
              <div className="relative inline-block group">
                <button
                  onClick={() => {
                    navigate("joined");
                    dispatch({ type: "IS_SEARCH_OPEN", payload: true });
                  }}
                  className=" text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <AiOutlineWechat className="2xl:text-5xl text-3xl hover:text-emerald-300 text-emerald-100" />
                </button>
                <p className="bg-slate-800 text-xs text-white p-1 rounded-lg absolute top-1 left-14 opacity-0 invisible group-hover:opacity-70 group-hover:visible transition-opacity">
                  Joined
                </p>
              </div>

              <div className="relative inline-block group">
                <button
                  onClick={() => {
                    navigate("public");
                    dispatch({ type: "IS_SEARCH_OPEN", payload: true });
                  }}
                  className=" text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <BsChatTextFill className="2xl:text-5xl text-3xl hover:text-emerald-300 text-emerald-100 transform -scale-x-100" />
                </button>
                <p className="bg-slate-800 text-xs text-white p-1 rounded-lg absolute top-1 left-14 opacity-0 invisible group-hover:opacity-70 group-hover:visible transition-opacity">
                  Public
                </p>
              </div>
              <div className="relative inline-block group">
                <button
                  onClick={() => {
                    navigate("private");
                    dispatch({ type: "IS_SEARCH_OPEN", payload: true });
                  }}
                  className=" text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <RiChatPrivateFill className="2xl:text-5xl text-3xl hover:text-emerald-300 text-emerald-100 transform -scale-x-100" />
                </button>
                <p className="bg-slate-800 text-xs text-white p-1 rounded-lg absolute top-1 left-14 opacity-0 invisible group-hover:opacity-70 group-hover:visible transition-opacity">
                  Private
                </p>
              </div>
            </div>

            <div className="relative inline-block group">
              <button
                onClick={() => {
                  showCreateModal();
                  dispatch({ type: "IS_SEARCH_OPEN", payload: false });
                }}
                className=" text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
              >
                <BiSolidMessageSquareAdd className="2xl:text-5xl text-3xl hover:text-emerald-300 text-emerald-100 transform -scale-x-100" />
              </button>
              <p className="bg-slate-800 text-xs text-white p-1 rounded-lg absolute top-1 left-14 opacity-0 invisible group-hover:opacity-70 group-hover:visible transition-opacity">
                Create
              </p>
            </div>

            <div className="relative inline-block group">
              <button
                onClick={() => {
                  logout();
                  dispatch({ type: "IS_SEARCH_OPEN", payload: false });
                }}
                className="text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
              >
                <IoLogOut className="2xl:text-5xl text-3xl self-end cursor-pointer text-red-400 hover:text-red-500 transform -scale-x-100" />
              </button>
              <p className="bg-slate-800 text-xs text-white p-1 rounded-lg absolute top-1 left-14 opacity-0 invisible group-hover:opacity-70 group-hover:visible transition-opacity">
                Logout
              </p>
            </div>
          </div>

          <FriendList mainUser={user} />
          <div className="flex flex-row just w-screen">
            <RoomTabs
              user={user}
              allUsers={state.allUsers}
              searchedRooms={state.searchedRooms}
              privateRooms={state.privateRooms}
              publicRooms={state.publicRooms}
              joinedRooms={state.joinedRooms}
              createdRooms={state.createdRooms}
              joinRoom={joinRoom}
              deleteRoom={deleteRoom}
              showEditRoomModal={showEditRoomModal}
              leaveRoom={leaveRoom}
            />
          </div>
        </div>
        {state.showCreateRoomForm ? (
          <>
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <CreateRoomModal
                userId={user._id}
                isPrivate={isPrivate}
                setRoomToPrivate={setRoomToPrivate}
                saveRoomInputs={saveRoomInputs}
                createNewRoom={createNewRoom}
                differentPasswords={state.differentPasswords}
                blankNames={state.blankNames}
                roomNameTaken={state.emailTaken}
              />
            </div>
          </>
        ) : null}
        {state.roomPasswordForm ? (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <PasswordModal path={path} room={privateData} userId={user._id} />
          </div>
        ) : null}
        {state.showDeleteRoomModal ? (
          <DeleteRoomModal path={path} roomData={deleteRoomData} />
        ) : null}
        {state.showEditRoomModal ? (
          <EditRoomModal
            editRoom={editRoom}
            room={editRoomData}
            path={path}
            saveRoomInputs={saveRoomInputs}
          />
        ) : null}
      </div>
    </div>
  );
};

export default HomeController;
