import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Chat from "./view/components/Chat.jsx";
import RoomModel from "./model/RoomModel.jsx";
import UserModel from "./model/UserModel.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./model/providers/authProvider.jsx";
import RegistrationController from "./controller/RegistrationController.jsx";
import Homecontroller from "./controller/HomeController.jsx";
import PublicRoomList from "./view/components/PublicRoomList.jsx";
import PrivateRoomList from "./view/components/PrivateRoomList.jsx";
import JoinedRoomList from "./view/components/JoinedRoomList.jsx";
import CreatedRoomList from "./view/components/CreatedRoomList.jsx";
import SearchedRoomList from "./view/components/SearchedRoomList.jsx";
import PrivateChat from "./view/components/PrivateChat.jsx";
import AboutPage from "./view/pages/AboutPage.jsx";
import ContactPage from "./view/pages/ContactPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegistrationController />,
  },
  {
    path: "/chat",
    element: <Homecontroller />,
    children: [
      {
        path: "search",
        element: <SearchedRoomList />,
      },
      {
        path: "public",
        element: <PublicRoomList />,
      },
      {
        path: "private",
        element: <PrivateRoomList />,
      },
      {
        path: "joined",
        element: <JoinedRoomList />,
      },
      {
        path: "my-rooms",
        element: <CreatedRoomList />,
      },
      {
        path: "room/:roomId",
        element: <Chat />,
        loader: async ({ params }) => {
          try {
            return { room: await RoomModel.getOneRoom(params.roomId) };
          } catch (error) {
            console.error(error);
          }
        },
      },
      {
        path: ":senderId/:receiverId",
        element: <PrivateChat />,
        loader: async ({ params }) => {
          try {
            return { receiver: await UserModel.getOneUser(params.receiverId) };
          } catch (error) {
            console.error(error);
          }
        },
      },
    ],
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
