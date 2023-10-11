import { useContext } from "react";
import { AuthContext } from "../../model/providers/authProvider";
import RoomModel from "../../model/RoomModel";

const DeleteRoomModal = ({ roomData, path }) => {
  const [state, dispatch] = useContext(AuthContext);
  const { id, isPrivate } = roomData;

  const deleteRoom = async () => {
    await RoomModel.deleteRoom(id);
    const createdRoomIndex = state.createdRooms.findIndex(
      (room) => room._id === id
    );
    const updatedCreatedRooms = [...state.createdRooms];
    updatedCreatedRooms.splice(createdRoomIndex, 1);
    dispatch({ type: "SET_CREATED_ROOMS", payload: updatedCreatedRooms });

    if (path === "/chat/search") {
      const searchedRoomIndex = state.searchedRooms.findIndex(
        (searchedRoom) => searchedRoom._id === id
      );
      const updatedSearchedRooms = [...state.searchedRooms];
      updatedSearchedRooms.splice(searchedRoomIndex, 1);
      dispatch({
        type: "SET_SEARCHED_ROOMS",
        payload: updatedSearchedRooms,
      });
    }

    if (isPrivate) {
      const privateRoomIndex = state.privateRooms.findIndex(
        (room) => room._id === id
      );
      const updatedPrivateRooms = [...state.privateRooms];
      updatedPrivateRooms.splice(privateRoomIndex, 1);
      dispatch({ type: "SET_PRIVATE_ROOMS", payload: updatedPrivateRooms });
    } else {
      const publicRoomIndex = state.publicRooms.findIndex(
        (room) => room._id === id
      );
      const updatedPublicRooms = [...state.publicRooms];
      updatedPublicRooms.splice(publicRoomIndex, 1);
      dispatch({ type: "SET_PUBLIC_ROOMS", payload: updatedPublicRooms });
    }
    dispatch({ type: "SHOW_DELETE_ROOM_MODAL" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-xl font-semibold">Are you sure?</div>
        <button
          onClick={deleteRoom}
          className="mr-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Yes
        </button>
        <button
          onClick={() => dispatch({ type: "SHOW_DELETE_ROOM_MODAL" })}
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteRoomModal;
