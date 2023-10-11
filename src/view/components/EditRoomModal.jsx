import { useContext } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { AuthContext } from "../../model/providers/authProvider";

const EditRoomModal = ({ room, saveRoomInputs, editRoom, path }) => {
  const [state, dispatch] = useContext(AuthContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <CustomButton
          name="Close"
          handleClick={() => dispatch({ type: "SHOW_EDIT_ROOM_MODAL" })}
          styleSize="p-2"
        />
        <h3 className="text-2xl font-semibold mb-4">Edit Room</h3>
        <form
          action="PUT"
          onSubmit={(e) => {
            e.preventDefault();
            return editRoom(room, path);
          }}
        >
          <CustomInput
            id="newRoomName"
            type="text"
            placeholder={room.roomName}
            handleChange={saveRoomInputs}
            styleSize="p-2"
          />
          <CustomInput
            id="newRoomCaption"
            type="text"
            placeholder={room.roomCaption}
            handleChange={saveRoomInputs}
            styleSize="p-2"
          />
          {room.isPrivate ? (
            <>
              <CustomInput
                id="oldPassword"
                type="password"
                placeholder="Old Password"
                handleChange={saveRoomInputs}
                styleSize="p-2"
              />
              <CustomInput
                id="newPassword"
                type="password"
                placeholder="New Password"
                handleChange={saveRoomInputs}
                styleSize="p-2"
              />
            </>
          ) : null}
          <CustomButton name={"SUBMIT"} styleSize="p-2" />
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;
