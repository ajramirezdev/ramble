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

const SERVER_URL = "https://ramble-be.onrender.com";

const PrivateChat = () => {
  const { receiver } = useLoaderData();
  const { senderId, receiverId } = useParams();
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
      const savedMessages = await ChatModel.getPrivateMessages(
        senderId,
        receiverId
      );
      setChats(savedMessages);
    };
    fetchMessages();
  }, [receiverId, senderId]);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected to server with socket ID: ${newSocket.id}`);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    newSocket.emit("joinPrivateRoom", { senderId, receiverId });

    newSocket.on("privateMessage", (newMessage) => {
      setChats((messages) => [...messages, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [senderId, receiverId]);

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
        _id: receiverId,
        body: message,
        sender: { _id, firstName, lastName },
        createdAt: moment().tz("Asia/Manila").toDate(),
      };
      ChatModel.addMessage(
        newChat._id,
        newChat.sender,
        newChat.body,
        newChat.createdAt
      );
      socket.emit("sendPrivateMessage", newChat);
      setChats((messages) => [...messages, newChat]);
      setMessage("");
    }
  };

  return (
    <div
      className="flex flex-col bg-white rounded shadow-lg"
      style={{ width: "80rem", height: "46rem" }}
    >
      <div className="flex text-slate-900 font-extrabold bg-emerald-400 rounded-tl rounded-tr px-8 py-2 items-center gap-4">
        <img
          src={receiver.img}
          alt=""
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid black",
          }}
        />
        <h3 className="text-lg">
          {receiver.firstName} {receiver.lastName}
        </h3>
      </div>

      <div className="flex-grow p-4 overflow-y-scroll" ref={chatContainerRef}>
        {chats.map((chat, index) => {
          const sender = users.find((user) => user._id === chat.sender._id);
          return (
            <div key={index}>
              <p className="text-center pt-2" style={{ fontSize: ".7rem" }}>
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
              </p>
              <div
                key={index}
                // className={
                //   sender._id === user._id
                //     ? "flex flex-row-reverse items-center px-2 pb-2"
                //     : "flex flex-row items-center px-2 pb-2"
                // }
              >
                <div
                  className={
                    sender._id === user._id
                      ? "flex flex-row-reverse items-center px-2 pb-2"
                      : "flex flex-row items-center px-2 pb-2"
                  }
                >
                  <div className="flex flex-col">
                    <img
                      src={sender.img}
                      alt={`${chat.sender.firstName}'s avatar`}
                      className=""
                      style={{
                        width: "50px",
                        height: "50px",
                        display: "inline-block",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
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
                      {chat.sender.firstName}{" "}
                    </span>
                    <div
                      className={
                        sender._id === user._id
                          ? "mr-5 bg-emerald-300 px-4 py-2 rounded-full shadow-md"
                          : "ml-5 bg-gray-200 px-4 py-2 rounded-full shadow-md"
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
      <div className="p-4 bg-emerald-300">
        <div className="flex justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return sendMessage();
            }}
            className="flex-grow"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your Message "
              className="ml-5 border-gray-300 rounded-lg shadow-lg p-2 "
              style={{ width: "65rem" }}
            />

            <button
              onClick={sendMessage}
              className="mr-5 ml-2 p-2 bg-emerald-500 text-white rounded-lg shadow-lg hover:bg-emerald-600"
              style={{ width: "7rem" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
