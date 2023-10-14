import { Link, useOutletContext } from "react-router-dom";
import { useContext,useState } from "react";

//icons
import { FcSearch } from "react-icons/fc";
import { AuthContext } from "../../model/providers/authProvider";

const JoinedRoomList = () => {
  const { joinedRooms, user } = useOutletContext();
  const [state, dispatch] = useContext(AuthContext);

  const [showFullText, setShowFullText] = useState({});
  const maxTextLength = 20;

  return (
    <div
      className="
      flex 
      flex-col 
      bg-white
      shadow-lg
      h-screen
      "
    >
      <div className="flex-grow overflow-y-scroll">
        <div className="flex items-center justify-between bg-slate-700 2xl:h-16 h-12 shadow-lg">
          <h1 className="text-white text-xl font-bold py-1 px-6">
            Joined Rooms
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
          {joinedRooms.map((room) => {
            const { roomName, roomCaption } = room;
            return (
              <div
                key={room._id}
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
                  
                  {room.members.includes(user._id) ? (
                    <button
                      onClick={() => {
                        dispatch({ type: "IS_SEARCH_OPEN", payload: false });
                        dispatch({ type: "TOGGLE_SEARCH", payload: false });
                      }}
                    >
                      <Link
                        to={`/chat/room/${room._id}`}
                        className="flex justify-center shadow-lg mt-2 p-1 w-24 bg-emerald-500 text-white rounded text-sm  hover:bg-emerald-600"
                      >
                        Enter
                      </Link>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch({ type: "IS_SEARCH_OPEN", payload: false });
                        dispatch({ type: "TOGGLE_SEARCH", payload: false });
                      }}
                    >
                      <Link>Join</Link>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default JoinedRoomList;

//
