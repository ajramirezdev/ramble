import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { useContext } from "react";
import { AuthContext } from "../../model/providers/authProvider";

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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <CustomButton
        styleColor="bg-emerald-500"
          handleClick={() => {
            dispatch({ type: "SHOW_CREATE_ROOM_FORM" });
            dispatch({ type: "DIFFERENT_PASSWORDS", payload: false });
            dispatch({ type: "BLANK_NAMES", payload: false });
            dispatch({ type: "EMAIL_TAKEN", payload: false });
          }}
          name="Close"
          styleSize="p-2"
        />
        <h3 className="text-2xl font-semibold mb-4">New Room</h3>
        <form action="POST" onSubmit={createNewRoom}>
          <CustomInput
            id="roomName"
            type="text"
            placeholder="Room Name"
            handleChange={saveRoomInputs}
            styleSize="p-2"
          />
          <CustomInput
            id="roomCaption"
            type="text"
            placeholder="About"
            handleChange={saveRoomInputs}
            styleSize="p-2"
          />
          <button
            onClick={setRoomToPrivate}
            type="button"
            className="bg-emerald-500 ml-4 text-white px-4 py-2 rounded mb-4 mt-4 shadow-lg hover:bg-emerald-600"
          >
            {isPrivate ? "Click here to Public" : "Click here to Private"}
          </button>
          {isPrivate ? (
            <>
              <CustomInput
                id="password"
                type="password"
                placeholder="Password"
                handleChange={saveRoomInputs}
                styleSize="p-2"
              />
              <CustomInput
                id="confrimPassword"
                type="password"
                placeholder="Confirm Password"
                handleChange={saveRoomInputs}
                styleSize="p-2"
              />
              {differentPasswords ? (
                <div className="text-red-500 mb-4 mt-4 ml-3">Password did not match</div>
              ) : null}
            </>
          ) : null}
          <CustomButton name={"CREATE"} styleSize="p-2" />
          {roomNameTaken ? (
            <div className="text-red-500">Room name already taken</div>
          ) : blankNames ? (
            <div className="text-red-500">Name and caption should not be blank</div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
