import React, { useContext, useEffect, useRef, useState } from "react";
import UserModel from "../../model/UserModel";
import { Link, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AuthContext } from "../../model/providers/authProvider";

//icons
import { FaUserFriends } from "react-icons/fa";

const FriendList = ({ mainUser }) => {
  const [state, dispatch] = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [searchedFriends, setSearchedFriends] = useState([]);
  const userSearchRef = useRef();
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const friends = state.allUsers.filter(
          (friend) => friend._id !== mainUser._id
        );
        setFriends(friends);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [mainUser]);

  const searchUsers = (event) => {
    event.preventDefault();
    const searchInput = userSearchRef.current.value;
    const searchedUsers = friends.filter(
      (friend) =>
        friend.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        friend.lastName.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (searchedUsers.length !== 0) {
      setSearchedFriends(searchedUsers);
    }
  };

  return (
    <div className="shadow-lg text-left bg-gray-100 w-1/4 xl:w-1/4 md:w-2/5">
      <div className="flex flex-row p-3 2xl:px-4 px-2 justify-evenly 2xl:h-16 h-12 items-center bg-emerald-800">
        <form onSubmit={searchUsers} className="mt-1 w-full flex items-center">
          <FaUserFriends className="2xl:text-2xl text-xl text-emerald-200 2xl:mr-2 mr-1" />
          <div className="flex justify-center items-center w-full bg-white rounded-md p-1">
            <input
              type="text"
              ref={userSearchRef}
              className="2xl:h-8 h-4 outline-none w-full rounded-md xl:text-sm"
              placeholder="Search a friend"
            />
            <AiOutlineSearch className="inline ml-1 2xl:text-2xl text-xl text-gray-500" />
          </div>
        </form>
      </div>
      <h3 className="2xl:text-xl text-base font-bold mx-2 w-full shadow text-emerald-900">
        Friend List
      </h3>
      <div className="p-1">
        {searchedFriends.length === 0
          ? friends.map((friend, index) => {
              return (
                <button
                key={index}
                  onClick={() => {
                    dispatch({ type: "IS_SEARCH_OPEN", payload: false });
                  }}
                  className="w-full"
                >
                  <Link
                    to={`${mainUser._id}/${friend._id}`}
                    key={friend._id}
                    className={
                      params.receiverId === friend._id
                        ? "text-gray-700 2xl:text-lg p-3 pl-4 block bg-gray-200 rounded-md"
                        : "text-gray-700 2xl:text-lg p-3 pl-4 block hover:rounded-md hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200"
                    }
                  >
                    <div className="flex">
                      <img
                        className="2xl:h-14 2xl:w-14 xl:h-10 xl:w-10 md:h-8 object-cover rounded-full mr-2"
                        src={friend.img}
                        alt="Profile"
                      />
                      <div>
                        <div className="flex content-between text">
                          <p className="mr-1">{friend.firstName}</p>
                          <p>{friend.lastName}</p>
                        </div>
                        <div className="text-xs font-bold">{friend.email}</div>
                      </div>
                    </div>
                  </Link>
                </button>
              );
            })
          : searchedFriends.map((friend) => {
              return (
                <Link
                  to={`${mainUser._id}/${friend._id}`}
                  key={friend._id}
                  className="text-gray-700 p-3 pl-4 block hover:bg-emerald-400 shadow-lg"
                >
                  <div className="flex">
                    <img
                      className="h-14 object-cover rounded-full mr-2"
                      src={friend.img}
                      alt=""
                    />
                    <div>
                      <div className="flex content-between text">
                        <p className="mr-1">{friend.firstName}</p>
                        <p>{friend.lastName}</p>
                      </div>
                      <div className="text-xs font-bold">{friend.email}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default FriendList;
