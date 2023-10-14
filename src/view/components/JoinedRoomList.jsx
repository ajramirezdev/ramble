import { Link, useOutletContext } from "react-router-dom";

const JoinedRoomList = () => {
  const { joinedRooms, user } = useOutletContext();

  return (
    <div
      className="
      flex 
      flex-col 
      bg-white
      shadow-lg
      px-4
      "
      style={{
        height: "94%",
      }}
    >
      {joinedRooms.map((room) => {
        const { roomName, roomCaption } = room;
        return (
          <div
            key={room._id}
            className="flex flex-col items-center justify-center shadow-lg mt-3 bg-emerald-300 rounded-3xl"
          >
            <div className="flex">
              <h3 className="font-bold">Room Name:</h3>
              <p className="ml-2 mr-2">{roomName}</p>
              <h3 className="font-bold">Members: </h3>
              <p className="ml-2 mr-2">{room.members.length}</p>
            </div>
            <p>{roomCaption}</p>
            {room.members.includes(user._id) ? (
              <Link
                to={`/chat/room/${room._id}`}
                className="flex justify-center shadow-lg mb-4 mt-2 p-1 w-24 bg-emerald-500 text-white rounded text-sm  hover:bg-emerald-600"
              >
                Enter
              </Link>
            ) : (
              <Link>Join</Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JoinedRoomList;
