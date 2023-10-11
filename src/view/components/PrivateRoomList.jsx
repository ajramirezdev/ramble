import { Link, useOutletContext } from "react-router-dom";

const PrivateRoomList = () => {
  const { privateRooms, user, joinRoom, showEditRoomModal, deleteRoom } =
    useOutletContext();

  return (
    <div
      className="
      flex 
      flex-col 
      m-auto 
      bg-emerald-200
      rounded-lg 
      shadow-lg
      px-4
      "
      style={{
        width: "80rem",
        height: "46rem",
        overflowY: "auto",
      }}
    >
      {privateRooms.map((room) => {
        const { _id, roomName, roomCaption, createdBy, members, isPrivate } =
          room;
        const isMember = members.includes(user._id);
        const isRoomOwner = createdBy === user._id;

        return (
          <div
            key={_id}
            className="flex flex-col items-center justify-center shadow-lg mt-3 bg-emerald-300 rounded-3xl"
          >
            <div className="flex">
              <h3 className="font-bold">Room Name:</h3>
              <p className="ml-2 mr-2">{roomName}</p>
              <h3 className="font-bold">Members: </h3>
              <p className="ml-2 mr-2">{room.members.length}</p>
            </div>
            <p className="m-2">{roomCaption}</p>
            {isRoomOwner ? (
              <div className="flex mb-3">
                <button
                  onClick={() => showEditRoomModal(room)}
                  className="justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRoom({ id: _id, isPrivate })}
                  className="flex justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                >
                  Delete
                </button>
                <Link
                  to={`/chat/room/${_id}`}
                  className="flex justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                >
                  Enter
                </Link>
              </div>
            ) : isMember ? (
              <Link to={`/chat/room/${_id}`}>Enter</Link>
            ) : (
              <button
                className="flex justify-center shadow-lg mb-5 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                onClick={() => joinRoom(room)}
              >
                Join
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PrivateRoomList;
