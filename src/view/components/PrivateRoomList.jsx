import { Link, useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";

//icons
import { FcSearch } from "react-icons/fc";
import { AuthContext } from "../../model/providers/authProvider";

const PrivateRoomList = () => {
  const { privateRooms, user, joinRoom, showEditRoomModal, deleteRoom } =
    useOutletContext();
  const [state, dispatch] = useContext(AuthContext);

  const [showFullText, setShowFullText] = useState({});
  const maxTextLength = 20;

  return (
    <div
      className="
      flex 
      flex-col 
      m-auto 
      bg-white
      rounded-lg 
      shadow-lg
      h-screen
      "
    >
      <div className="flex-grow overflow-y-scroll">
        <div className="flex items-center justify-between bg-slate-700 2xl:h-16 h-12 shadow-lg">
          <h1 className="text-white text-xl font-bold py-1 px-6">
            Private Rooms
          </h1>
          {!state.isSearchOpen ? (
            <FcSearch
              className="text-3xl mr-2 2xl:text-4xl 2xl:mr-4 cursor-pointer"
              onClick={() => {
                dispatch({ type: "IS_SEARCH_OPEN", payload: true });
                dispatch({ type: "TOGGLE_SEARCH", payload: true });
              }}
            />
          ) : null}
        </div>

        <section className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 justify-evenly m-6">
          {privateRooms.map((room) => {
            const {
              _id,
              roomName,
              roomCaption,
              createdBy,
              members,
              isPrivate,
            } = room;
            const isMember = members.includes(user._id);
            const isRoomOwner = createdBy === user._id;

            return (
              <div
                key={_id}
                className="flex items-center justify-center shadow-lg bg-emerald-200 text-black rounded-3xl p-2 min-h-40 h-auto w-full px-8 text-justify"
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="flex">
                    <h3 className="font-bold">Room Name:</h3>
                    <p className="ml-2 mr-2">{roomName}</p>
                  </div>
                  <div className="flex">
                    <h3 className="font-bold">Members: </h3>
                    <p className="ml-2 mr-2">{room.members.length}</p>
                  </div>
                  <div className="flex">
                    <h4 className="font-bold">About:</h4>
                    <p className="ml-2 mr-2">
                      {showFullText[room._id]
                        ? roomCaption
                        : roomCaption.slice(0, maxTextLength)}
                    </p>
                    {roomCaption.length > maxTextLength ? (
                      <button
                        onClick={() =>
                          setShowFullText({
                            ...showFullText,
                            [room._id]: !showFullText[room._id],
                          })
                        }
                        className="text-red-900 text-xs"
                      >
                        {showFullText[room._id] ? "Read Less" : "Read More"}
                      </button>
                    ) : null}
                  </div>
                  <div className=" flex items-center justify-center mt-2">
                    {isRoomOwner ? (
                      <div className="flex">
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
                      <Link
                        to={`/chat/room/${_id}`}
                        className="flex justify-center shadow-lg m-1 p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600"
                      >
                        Enter
                      </Link>
                    ) : (
                      <button
                        className="flex justify-center shadow-lg p-1 w-24 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 "
                        onClick={() => joinRoom(room)}
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default PrivateRoomList;
