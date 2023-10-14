import React, { useContext } from "react";
import { AuthContext } from "../../model/providers/authProvider";

const SearchBar = ({ roomSearchRef, searchRooms }) => {
  const [state, dispatch] = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center ">
      <form onSubmit={searchRooms}>
        <input
          type="text"
          className="w-20px 2xl:px-2 px-1 py-1 2xl:text-base xl:text-sm outline-none border border-gray-300 rounded bg-white shadow-lg"
          placeholder="Search Rooms or Friends"
          ref={roomSearchRef}
        />
        <button
          type="submit"
          className="w-20px 2xl:px-2 px-1 py-1 2xl:text-base xl:text-sm bg-emerald-500 text-white rounded shadow-lg  hover:bg-emerald-600"
        >
          Search
        </button>
      </form>
      {state.roomNotFound ? (
        <div className="text-red-300 2xl:text-base text-xs">
          No rooms found
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
