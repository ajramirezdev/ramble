import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomButtonText from "./CustomButtonText";
import { useContext } from "react";
import { AuthContext } from "../../model/providers/authProvider";

//icons
import { MdOutlineClose } from "react-icons/md";

const CreateRoomModal = ({
  isPrivate,
  createNewRoom,
  saveRoomInputs,
  setRoomToPrivate,
  differentPasswords,
  blankNames,
  roomNameTaken,
}) => {
  const [state, dispatch] = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col items-center justify-center bg-white md: w-96  p-2 rounded-lg">
        <button
          onClick={() => {
            dispatch({ type: "SHOW_CREATE_ROOM_FORM" });
            dispatch({ type: "DIFFERENT_PASSWORDS", payload: false });
            dispatch({ type: "BLANK_NAMES", payload: false });
            dispatch({ type: "EMAIL_TAKEN", payload: false });
          }}
          className="place-self-end text-2xl text-emerald-800"
        >
          <MdOutlineClose />
        </button>

        <h3 className="text-2xl font-semibold mb-4">New Room</h3>
        <form action="POST" onSubmit={createNewRoom} className="py-2">
          <CustomInput
            id="roomName"
            type="text"
            placeholder="Room Name"
            handleChange={saveRoomInputs}
            styleSize="w-72 h-5"
            styleColor="text-slate-800"
            styleTextColor="text-slate-800"
          />
          <CustomInput
            id="roomCaption"
            type="text"
            placeholder="About"
            handleChange={saveRoomInputs}
            styleSize="w-72 h-5"
            styleColor="text-slate-800"
            styleTextColor="text-slate-800"
          />

          <CustomButtonText
            name={isPrivate ? "Click here to Public" : "Click here to Private"}
            styleSize="w-52"
            styleTextColor="text-gray-500"
            handleClick={setRoomToPrivate}
          />

          {isPrivate ? (
            <>
              <CustomInput
                id="password"
                type="password"
                placeholder="Password"
                handleChange={saveRoomInputs}
                styleSize="w-72 h-5"
                styleColor="text-slate-800"
                styleTextColor="text-slate-800"
              />
              <CustomInput
                id="confrimPassword"
                type="password"
                placeholder="Confirm Password"
                handleChange={saveRoomInputs}
                styleSize="w-72 h-5"
                styleColor="text-slate-800"
                styleTextColor="text-slate-800"
              />
              {differentPasswords ? (
                <div className="text-red-500 mb-4 mt-4 ml-3">
                  Password did not match
                </div>
              ) : null}
            </>
          ) : null}
          <CustomButton
            name="Create Room"
            styleSize="w-72"
            styleColor="bg-emerald-700 hover:bg-emerald-900"
            styleTextColor="text-white"
          />
          {roomNameTaken ? (
            <div className="text-red-500">Room name already taken</div>
          ) : blankNames ? (
            <div className="text-red-500">
              Name and caption should not be blank
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
