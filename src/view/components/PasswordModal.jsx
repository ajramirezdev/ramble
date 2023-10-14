import { useContext, useState } from "react";
import CustomInput from "./CustomInput";
import { AuthContext } from "../../model/providers/authProvider";
import CustomButton from "./CustomButton";
import RoomModel from "../../model/RoomModel";

//icons
import { MdOutlineClose } from "react-icons/md";
import {FcKey} from "react-icons/fc"

const PasswordModal = ({ room, userId, path }) => {
  const [state, dispatch] = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  const saveInput = (e) => {
    if (e.target.id === "privateRoomPassword") {
      setInput(e.target.value);
    }
  };

  const enterRoom = async (e) => {
    e.preventDefault();
    if (input !== room.password) {
      setWrongPassword(true);
    } else {
      setWrongPassword(false);

      if (!room.members.includes(userId)) {
        await RoomModel.editRoom(room._id, {
          members: [...room.members, userId],
        });
      }

      const editedRoom = { ...room, members: [...room.members, userId] };
      const roomIndex = state.privateRooms.findIndex(
        (privateRoom) => privateRoom._id === room._id
      );

      if (roomIndex !== -1) {
        const updatedPrivateRooms = [...state.privateRooms];
        updatedPrivateRooms[roomIndex] = editedRoom;

        dispatch({
          type: "SET_PRIVATE_ROOMS",
          payload: updatedPrivateRooms,
        });

        dispatch({
          type: "SET_JOINED_ROOMS",
          payload: [...state.joinedRooms, editedRoom],
        });

        dispatch({ type: "SHOW_ROOM_PASSOWRD_FORM" });
      }

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
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="flex flex-col items-center justify-center bg-white md: w-96  p-2 rounded-lg">
          <button
            onClick={() => dispatch({ type: "SHOW_ROOM_PASSOWRD_FORM" })}
            className="place-self-end text-2xl text-emerald-800"
          >
            <MdOutlineClose />
          </button>
          <h3>
           <b>{room.roomName}</b>
          </h3>
          <form onSubmit={enterRoom} className="flex flex-col items-center">
            <CustomInput
              handleChange={saveInput}
              id="privateRoomPassword"
              type="password"
              placeholder="Enter Room Password"
              icon={<FcKey/>}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            {wrongPassword ? (
              <p className="flex justify-center text-red-500 text-sm mt-2">
                Wrong password
              </p>
            ) : null}
            <CustomButton
              name="Enter"
              styleSize="w-72"
              styleColor="bg-emerald-700 hover:bg-emerald-900"
              styleTextColor="text-white"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordModal;
