import React, { useContext } from "react";
import { AuthContext } from "../../model/providers/authProvider";

const SearchBar = ({ roomSearchRef, searchRooms }) => {
  const [state, dispatch] = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={searchRooms}>
        <input
          type="text"
          className="w-20px px-2 py-1 border border-gray-300 rounded bg-white shadow-lg"
          placeholder="Search Rooms or Friends"
          ref={roomSearchRef}
        />
        <button
          type="submit"
          className="w-20px px-2 py-1 bg-emerald-500 text-white rounded shadow-lg  hover:bg-emerald-600"
        >
          Search
        </button>
      </form>
      {state.roomNotFound ? (
        <div className="text-red-300 text-base">No rooms found</div>
      ) : null}
    </div>
  );
};

export default SearchBar;
