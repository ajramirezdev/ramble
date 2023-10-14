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

//icons
import { PiPaperPlaneRightFill } from "react-icons/pi";

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
    <div className="flex flex-col bg-white shadow-lg h-full">
      <div className="flex text-slate-900 font-extrabold bg-gray-200 shadow-lg rounded-tr px-8 2xl:h-16 h-12 py-1 items-center gap-4">
        <img
          src={receiver.img}
          alt="Receiver Profile"
          className="rounded-full h-10 w-10 border-2 border-emerald-700 object-cover"
        />
        <h3 className="2xl:text-lg text-base">
          {receiver.firstName} {receiver.lastName}
        </h3>
      </div>

      <div className="flex-grow p-4 overflow-y-scroll" ref={chatContainerRef}>
        <div className="flex flex-col items-center mb-6">
          <img
            src={receiver.img}
            alt="Receiver Profile"
            className="rounded-full h-36 w-36 border-2 border-slate-700 object-cover shadow-md"
          />
          <p>
            Start your <b className="text-emerald-800">Ramble</b> with
          </p>
          <p className="font-semibold">
            {receiver.firstName} {receiver.lastName}!
          </p>
        </div>
        {chats.map((chat, index) => {
          const sender = users.find((user) => user._id === chat.sender._id);
          return (
            <div key={index}>
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
                          ? "mr-6 font-bold text-emerald-900 text-right text-sm 2xl:text-lg"
                          : "ml-6 font-bold text-emerald-900 text-left text-sm 2xl:text-lg"
                      }
                    >
                      {/* {chat.sender.firstName}{" "} */}
                      <p className="pt-2 text-3xs 2xl:text-2xs text-slate-900">
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
                          ? "mr-5 text-justify bg-emerald-300 px-4 py-2 rounded-lg shadow-md max-w-md 2xl:max-w-2xl 2xl:text-lg"
                          : "ml-5 text-justify bg-gray-200 px-4 py-2 rounded-xl shadow-md max-w-md 2xl:max-w-2xl 2xl:text-lg"
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
      <div className="2xl:p-4 p-2 bg-emerald-500 static bottom-0 w-full ">
        <div className="flex">
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
    </div>
  );
};

export default PrivateChat;
