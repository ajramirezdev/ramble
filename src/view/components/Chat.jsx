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

const SERVER_URL = "http://localhost:2222";

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
    <div
      className="bg-emerald-300 rounded shadow-lg flex flex-col"
      style={{ height: "46rem", width: "80rem" }}
    >
      <h3 className="text-white bg-emerald-500 rounded-tl rounded-tr px-4 py-2">
        <div className="flex justify-between items-center">
          <h3>{roomName}</h3>
          {room.createdBy !== user._id ? (
            <div className="">
              <Link
                className="bg-red-500 rounded hover:bg-green-700"
                onClick={() => leaveRoom(room)}
                to="/chat/joined"
              >
                leave
              </Link>
            </div>
          ) : null}
        </div>
      </h3>
      <div className="flex-grow p-4 overflow-y-scroll" ref={chatContainerRef}>
        {chats.map((chat, index) => {
          const sender = users.find((user) => user._id === chat.sender._id);
          return (
            <div
              key={index}
              className={sender._id === user._id ? "bg-emerald-400" : null}
            >
              <div className="flex items-center">
                <img
                  src={sender.img}
                  alt={`${chat.sender.firstName}'s avatar`}
                  className="m-5"
                  style={{
                    width: "60px",
                    height: "60px",
                    display: "inline-block",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span className="mr-2">
                  {chat.sender.firstName}{" "}
                  <p style={{ fontSize: ".9rem" }}>
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
                        {new Date(chat.createdAt).toLocaleString().slice(-2)}
                      </span>
                    ) : (
                      <span>
                        {moment(chat.createdAt).format("dddd")} at{" "}
                        {new Date(chat.createdAt)
                          .toLocaleString()
                          .slice(11, 15)}{" "}
                        {new Date(chat.createdAt).toLocaleString().slice(-2)}
                      </span>
                    )}
                  </p>
                </span>
              </div>
              <div className="ml-5">{chat.body}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between p-2 border-t border-gray-300">
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
            className="ml-5 border-gray-300 rounded-lg shadow-lg p-2"
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
  );
};

export default Chat;
