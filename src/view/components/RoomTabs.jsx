import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import SearchBar from "./SearchBar";
import { AuthContext } from "../../model/providers/authProvider";
import CustomButton from "./CustomButton";

//icons
import { FcSearch } from "react-icons/fc";

//assets
import Logo from "../../../assets/ramble-black.png"

const RoomTabs = ({
  user,
  privateRooms,
  publicRooms,
  joinedRooms,
  createdRooms,
  joinRoom,
  deleteRoom,
  showEditRoomModal,
  leaveRoom,
  searchedRooms,
  allUsers,
}) => {
  const navigate = useNavigate();
  const roomSearchRef = useRef();
  const [state, dispatch] = useContext(AuthContext);

  const searchRooms = (e) => {
    e.preventDefault();
    const searchInput = roomSearchRef.current.value;
    const searchedRooms = [...state.publicRooms, ...state.privateRooms].filter(
      (room) => room.roomName.toLowerCase().includes(searchInput.toLowerCase())
    );
    dispatch({ type: "SET_SEARCHED_ROOMS", payload: searchedRooms });

    if (!searchInput.trim() || !searchedRooms.length) {
      dispatch({ type: "ROOM_NOT_FOUND", payload: true });
    } else {
      dispatch({ type: "ROOM_NOT_FOUND", payload: false });
      navigate("search");
    }
  };

  const showCreateModal = () => {
    dispatch({ type: "SHOW_CREATE_ROOM_FORM" });
  };
  console.log(state.isSearchOpen);
  return (
    <div
      className="bg-emerald-100 rounded-bg-lg shadow-lg h-screen "
      style={{ width: "100%" }}
    >
      <nav
        className="hidden justify-between items-center 2xl:px-4 xl:px-2 2xl:h-16 xl:h-12 bg-gradient-to-r from-slate-800 from-5% to-emerald-700 to-15% "
        // className=" flex fixed left-52 top-52 w-36 h-screen justify-center items-center 2xl:px-4 xl:px-2 2xl:h-16 xl:h-12"
      >
        <div
          className="flex py-3 gap-1 items-center "
          // className="flex flex-col py-3 gap-1 items-center absolute left-0 top-20 "
        >
          <Link
            className="bg-emerald-500 focus:bg-emerald-600 text-white hover:bg-emerald-600 p-1 rounded xl:text-sm"
            to="my-rooms"
          >
            My Chatrooms
          </Link>
          <Link
            className="bg-emerald-500 focus:bg-emerald-600 text-white hover:bg-emerald-600 p-1 rounded xl:text-sm"
            to="joined"
          >
            Joined
          </Link>
          <Link
            className="bg-emerald-500 focus:bg-emerald-600 text-white hover:bg-emerald-600 p-1 rounded xl:text-sm"
            to="public"
          >
            Public
          </Link>
          <Link
            className="bg-emerald-500 focus:bg-emerald-600 text-white hover:bg-emerald-600 p-1 rounded xl:text-sm"
            to="private"
          >
            Private
          </Link>
          <div>
            <CustomButton
              handleClick={showCreateModal}
              name="+ Create Room"
              styleColor="bg-green-500 xl:text-sm"
            />
          </div>
        </div>

        {/* <div>
          <div className="flex flex-row justify-center">
            <SearchBar
              roomSearchRef={roomSearchRef}
              searchRooms={searchRooms}
            />
          </div>
        </div> */}
      </nav>
      {state.isSearchOpen ? (
        <div className="flex flex-row justify-center items-center absolute top-1 right-4 ">
          <FcSearch
            className="text-4xl 2xl:text-5xl cursor-pointer"
            onClick={() => dispatch({ type: "TOGGLE_SEARCH", payload: true })}
          />
          <div className="">
            {state.toggleSearch ? (
              <SearchBar
                roomSearchRef={roomSearchRef}
                searchRooms={searchRooms}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <Outlet
        context={{
          user,
          privateRooms,
          publicRooms,
          joinedRooms,
          createdRooms,
          joinRoom,
          deleteRoom,
          showEditRoomModal,
          leaveRoom,
          searchedRooms,
          allUsers,
        }}
      />
    </div>
  );
};

export default RoomTabs;
