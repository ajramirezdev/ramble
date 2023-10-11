import { useContext, useState } from "react";
import CustomInput from "./CustomInput";
import { AuthContext } from "../../model/providers/authProvider";
import CustomButton from "./CustomButton";
import RoomModel from "../../model/RoomModel";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none backdrop-blur-sm">
        <div className="relative w-auto max-w-md">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex justify-end mr-2 p-5 border-b border-solid border-blueGray-200 rounded-t">
              <CustomButton
                handleClick={() => {
                  dispatch({ type: "SHOW_ROOM_PASSOWRD_FORM" });
                }}
                name="Close"
                styleColor="bg-emerald-500"
              />
            </div>
            <form onSubmit={enterRoom} className="p-5">
              <CustomInput
                handleChange={saveInput}
                id="privateRoomPassword"
                type="password"
                placeholder="Enter Room Password"
              />
              {wrongPassword ? (
                <p className="flex justify-center text-red-500 text-sm mt-2">
                  Wrong password
                </p>
              ) : null}
              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <CustomButton
                  type="submit"
                  name="Enter"
                  styleColor="bg-emerald-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PasswordModal;
