import { Link, useOutletContext } from "react-router-dom";

const CreatedRoomList = () => {
  const { createdRooms, deleteRoom, showEditRoomModal } = useOutletContext();

  return (
    <div
      className="
      flex 
      flex-col 
      bg-emerald-200 
      shadow-lg
      px-4
      "
      style={{
        width: "80rem",
        height: "46rem",
        overflowY: "auto",
      }}
    >
      {createdRooms.map((room) => {
        const { roomName, roomCaption } = room;
        return (
          <div
            key={room._id}
            className="flex flex-col items-center justify-center shadow-lg mt-3 bg-emerald-300 rounded-3xl">
            <div className="flex">
              <h3 className="font-bold">Room Name:</h3>
                <p className="ml-2 mr-2">{roomName}</p>
              <h3 className="font-bold">Members: </h3>
              <p className="ml-2 mr-2">{room.members.length}</p>
            </div>
            <p className="mb-2 mt-2">{roomCaption}</p>
            <div className="mb-2">
              <button
                className="justify-center shadow-lg mb-2 p-1 w-24 bg-emerald-500 text-white rounded text-sm  hover:bg-emerald-600"
                onClick={() => showEditRoomModal(room)}
              >
                edit
              </button>
              <button
                className="justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm  hover:bg-emerald-600"
                onClick={() =>
                  deleteRoom({ id: room._id, isPrivate: room.isPrivate })
                }
              >
                delete
              </button>
              <button className="justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm  hover:bg-emerald-600">
                <Link to={`/chat/room/${room._id}`}>Enter</Link>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreatedRoomList;
