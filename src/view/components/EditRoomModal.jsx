import { useContext } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { AuthContext } from "../../model/providers/authProvider";

//icons
import { MdOutlineClose } from "react-icons/md";
import {BiSolidGroup} from "react-icons/bi"

const EditRoomModal = ({ room, saveRoomInputs, editRoom, path }) => {
  const [state, dispatch] = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col items-center justify-center bg-white md: w-96  p-2 rounded-lg">
        <button
          onClick={() => dispatch({ type: "SHOW_EDIT_ROOM_MODAL" })}
          className="place-self-end text-2xl text-emerald-800"
        >
          <MdOutlineClose />
        </button>
        <h3 className="text-2xl font-semibold mb-2">Edit Room</h3>
        <h4 className="font-bold flex items-center justify-center text-slate-800"><BiSolidGroup className="text-emerald-800"/>{room.roomName}</h4>
        <form
          action="PUT"
          onSubmit={(e) => {
            e.preventDefault();
            return editRoom(room, path);
          }}
          className="mb-2"
        >
          <CustomInput
            id="newRoomName"
            type="text"
            // placeholder={room.roomName}
            placeholder="New Room Name"
            handleChange={saveRoomInputs}
            styleSize="w-72 h-5"
            styleColor="text-slate-800"
            styleTextColor="text-slate-800"
          />
          <CustomInput
            id="newRoomCaption"
            type="text"
            // placeholder={room.roomCaption}
            placeholder="New Room Caption"
            handleChange={saveRoomInputs}
            styleSize="w-72 h-5"
            styleColor="text-slate-800"
            styleTextColor="text-slate-800"
          />
          {room.isPrivate ? (
            <>
              <CustomInput
                id="oldPassword"
                type="password"
                placeholder="Old Password"
                handleChange={saveRoomInputs}
                styleSize="w-72 h-5"
                styleColor="text-slate-800"
                styleTextColor="text-slate-800"
              />
              <CustomInput
                id="newPassword"
                type="password"
                placeholder="New Password"
                handleChange={saveRoomInputs}
                styleSize="w-72 h-5"
                styleColor="text-slate-800"
                styleTextColor="text-slate-800"
              />
            </>
          ) : null}
          <CustomButton
            name="Submit"
            styleSize="w-72"
            styleColor="bg-emerald-700 hover:bg-emerald-900"
            styleTextColor="text-white"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;
