import { Link, useLocation, useOutletContext } from "react-router-dom";

const SearchedRoomList = () => {
  const { searchedRooms, user, joinRoom, showEditRoomModal, deleteRoom } =
    useOutletContext();
  const location = useLocation();

  return (
    <div
      className="
      flex 
      flex-col 
      m-auto 
      shadow-lg
      p-2
      overflow-y-scroll
      "
      style={{
        width: "100%",
        height: "90%",
      }}
    >
      {searchedRooms.map((room) => {
        const { _id, roomName, roomCaption, createdBy, members, isPrivate } =
          room;
        const isMember = members.includes(user._id);
        const isRoomOwner = createdBy === user._id;

        return (
          <div
            key={_id}
            className="flex flex-col items-center justify-center shadow-lg m-2 rounded bg-emerald-200"
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
                  onClick={() => showEditRoomModal(room, location.pathname)}
                  className="justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    deleteRoom({ id: _id, isPrivate }, location.pathname)
                  }
                  className="justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm"
                >
                  Delete
                </button>
                <button className="justify-center shadow-lg mb-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm">
                  <Link to={`/chat/room/${room._id}`}>Enter</Link>
                </button>
              </div>
            ) : isMember ? (
              <button className="justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm">
                <Link to={`/chat/room/${room._id}`}>Enter</Link>
              </button>
            ) : (
              <button
                className="justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm"
                onClick={() => joinRoom(room, location.pathname)}
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

export default SearchedRoomList;
