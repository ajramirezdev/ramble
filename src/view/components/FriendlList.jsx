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
    console.log(searchedUsers);
  };

  return (
    <div
      className="shadow-lg text-left bg-emerald-100 w-1/4"
      style={{
        height: "50rem",
      }}
    >
      <div className="flex flex-row shadow-lg p-3 px-4 justify-evenly h-16 items-center bg-emerald-700">
        <form onSubmit={searchUsers} className="mt-1 w-full flex items-center">
          <FaUserFriends className="text-2xl text-emerald-200 mr-2" />
          <div className="flex justify-center items-center w-full bg-white rounded-md p-1">
            <input
              type="text"
              ref={userSearchRef}
              className="h-8 outline-none w-full rounded-md"
              placeholder="Search a friend"
            />
            <AiOutlineSearch className="inline ml-1 text-2xl text-gray-500" />
          </div>
        </form>
      </div>
      <h3 className="text-xl font-bold m-2 w-full shadow text-emerald-900">Friend List</h3>
      {searchedFriends.length === 0
        ? friends.map((friend) => {
            return (
              <Link
                to={`${mainUser._id}/${friend._id}`}
                key={friend._id}
                className={
                  params.receiverId === friend._id
                    ? "text-gray-700 text-xl p-3 pl-4 block bg-emerald-400"
                    : "text-gray-700 text-xl p-3 pl-4 block hover:bg-emerald-400 active:bg-emerald-400 focus:bg-emerald-400"
                }
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
  );
};

export default FriendList;
