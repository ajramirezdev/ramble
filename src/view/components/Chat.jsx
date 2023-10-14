import { useEffect, useState, useRef } from "react";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import io from "socket.io-client";
import ChatModel from "../../model/ChatModel";
import UserModel from "../../model/UserModel";
import moment from "moment-timezone";
import "../../App.css";

//icons
import { PiPaperPlaneRightFill } from "react-icons/pi";

const SERVER_URL = "https://ramble-be.onrender.com";

const Chat = () => {
  const { room } = useLoaderData();
  const { roomName } = room;
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { user, leaveRoom } = useOutletContext();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const allUsers = await UserModel.getAllUsers();
      setUsers(allUsers);
      const savedMessages = await ChatModel.getRoomMessages(roomId);
      setChats(savedMessages);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected to server with socket ID: ${newSocket.id}`);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    newSocket.emit("joinRoom", { roomId });

    newSocket.on("message", async (newMessage) => {
      setChats((messages) => [...messages, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const sendMessage = () => {
    if (message.trim()) {
      const { _id, firstName, lastName } = user;
      const newChat = {
        roomId,
        body: message,
        sender: { _id, firstName, lastName },
        createdAt: moment().tz("Asia/Manila").toDate(),
      };
      ChatModel.addMessage(
        roomId,
        newChat.sender,
        newChat.body,
        newChat.createdAt
      );
      socket.emit("sendMessage", newChat);
      setMessage("");
    }
  };

  return (
    <div className="rounded shadow-lg flex flex-col bg-white h-screen">
      <h3 className="text-white bg-emerald-500 px-4 ">
        <div className="flex justify-between items-center 2xl:h-16 h-12">
          <h3>{roomName}</h3>
          {room.createdBy !== user._id ? (
            <div className="">
              <Link
                className="bg-red-500 rounded hover:bg-red-700 p-1"
                onClick={() => leaveRoom(room)}
                to="/chat/joined"
              >
                Leave
              </Link>
            </div>
          ) : null}
        </div>
      </h3>
      <div className="flex-grow p-4 overflow-y-scroll" ref={chatContainerRef}>
        {chats.map((chat, index) => {
          const sender = users.find((user) => user._id === chat.sender._id);
          return (
            <div key={index}>
              {/* <p className="text-center pt-2 text-3xs">
                {new Date(chat.createdAt)
                  .toLocaleString()
                  .slice(0, 9)
                  .startsWith(
                    new Date(moment().tz("Asia/Manila").toDate())
                      .toLocaleString()
                      .slice(0, 9)
                  ) ? (
                  <span>
                    Today at{" "}
                    {new Date(chat.createdAt).toLocaleString().slice(11, 16)}{" "}
                    {new Date(chat.createdAt).toLocaleString().slice(-2)}
                  </span>
                ) : (
                  <span>
                    {moment(chat.createdAt).format("dddd")} at{" "}
                    {new Date(chat.createdAt).toLocaleString().slice(11, 15)}{" "}
                    {new Date(chat.createdAt).toLocaleString().slice(-2)}
                  </span>
                )}
              </p> */}
              <div key={index}>
                <div
                  className={
                    sender._id === user._id
                      ? "flex flex-row-reverse items-center px-2 pb-2 text-sm 2xl:text-base"
                      : "flex flex-row items-center px-2 pb-2 text-sm 2xl:text-base"
                  }
                >
                  <div className="flex flex-col">
                    <img
                      src={sender.img}
                      alt={`${chat.sender.firstName}'s avatar`}
                      className="rounded-full h-10 w-10 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={
                        sender._id === user._id
                          ? "mr-6 font-bold text-emerald-900 text-right"
                          : "ml-6 font-bold text-emerald-900 text-left"
                      }
                    >
                      <p className="pt-2 text-3xs text-slate-900">
                        {new Date(chat.createdAt)
                          .toLocaleString()
                          .slice(0, 9)
                          .startsWith(
                            new Date(moment().tz("Asia/Manila").toDate())
                              .toLocaleString()
                              .slice(0, 9)
                          ) ? (
                          <span>
                            Today at{" "}
                            {new Date(chat.createdAt)
                              .toLocaleString()
                              .slice(11, 16)}{" "}
                            {new Date(chat.createdAt)
                              .toLocaleString()
                              .slice(-2)}
                          </span>
                        ) : (
                          <span>
                            {moment(chat.createdAt).format("dddd")} at{" "}
                            {new Date(chat.createdAt)
                              .toLocaleString()
                              .slice(11, 15)}{" "}
                            {new Date(chat.createdAt)
                              .toLocaleString()
                              .slice(-2)}
                          </span>
                        )}
                      </p>
                      {chat.sender.firstName}
                    </span>

                    <div
                      className={
                        sender._id === user._id
                          ? "mr-5 bg-emerald-300 px-4 py-2 rounded-xl shadow-md"
                          : "ml-5 bg-gray-200 px-4 py-2 rounded-xl shadow-md"
                      }
                    >
                      {chat.body}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex 2xl:p-4 p-2 bg-emerald-500 static bottom-0 w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return sendMessage();
          }}
          className="w-full flex bg-white border-gray-300 rounded-lg shadow-lg  mx-4 py-1"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your Message "
            className="ml-1 2xl:p-2 p-1 2xl:text-base rounded-lg text-sm w-full outline-none"
          />

          <PiPaperPlaneRightFill
            onClick={sendMessage}
            className="text-2xl 2xl:text-4xl text-emerald-800 hover:text-emerald-900 mr-2 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
