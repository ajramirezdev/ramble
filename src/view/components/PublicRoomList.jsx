import { Link, useOutletContext } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";

const PublicRoomList = () => {
  const { publicRooms, user, joinRoom, showEditRoomModal, deleteRoom } =
    useOutletContext();

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
      <ScrollableFeed>
        {publicRooms.map((room) => {
          const { _id, roomName, roomCaption, createdBy, members, isPrivate } =
            room;
          const isRoomOwner = createdBy === user._id;
          const isMember = members.includes(user._id);

          return (
            <div
              key={_id}
              className="flex flex-col items-center justify-center shadow-lg mt-3 mb-3 bg-emerald-300 rounded-3xl"
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
                    edit
                  </button>
                  <button
                    onClick={() => deleteRoom({ id: _id, isPrivate })}
                    className="flex justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                  >
                    delete
                  </button>
                  <Link
                    to={`/chat/room/${_id}`}
                    className="flex justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                  >
                    Enter
                  </Link>
                </div>
              ) : isMember ? (
                <Link
                  to={`/chat/room/${_id}`}
                  className="flex justify-center shadow-lg mb-4 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                >
                  Enter
                </Link>
              ) : (
                <button
                  onClick={() => joinRoom(room)}
                  className="flex justify-center m-2 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                >
                  Join
                </button>
              )}
            </div>
          );
        })}
      </ScrollableFeed>
    </div>
  );
};

export default PublicRoomList;
