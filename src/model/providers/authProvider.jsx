import { createContext, useReducer, useState } from "react";

const initialState = {
  token: localStorage.getItem("token") || "",
  allUsers: [],
  userNotFound: false,
  wrongPassword: false,
  blankFName: false,
  blankLName: false,
  emptyEmail: false,
  emailTaken: false,
  ageRestricted: false,
  emptyAge: false,
  emptyPassword: false,
  emptyConfirmPassword: false,
  invalidPassword: false,
  differentPasswords: false,
  emptyRegisterGeneral: false,
  emptyLoginEmail: false,
  emptyLoginPassword: false,
  emptyLoginGeneral: false,
  allRooms: [],
  searchedRooms: [],
  publicRooms: [],
  privateRooms: [],
  joinedRooms: [],
  createdRooms: [],
  showCreateRoomForm: false,
  roomPasswordForm: false,
  showDeleteRoomModal: false,
  showEditRoomModal: false,
  roomNotFound: false,
  showEditUserModal: false,
  isSearchOpen: false,
  toggleSearch: false,
  showFullText: false,
};

const AuthContext = createContext();

const AuthProvider = (props) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "SAVE_TOKEN":
        localStorage.setItem("token", action.payload);
        return {
          ...state,
          token: action.payload,
        };
      case "SET_ALL_USERS":
        return {
          ...state,
          allUsers: action.payload,
        };
      case "USER_NOT_FOUND":
        return {
          ...state,
          userNotFound: action.payload,
        };
      case "WRONG_PASSWORD":
        return {
          ...state,
          wrongPassword: action.payload,
        };

      case "BLANK_FIRST_NAME":
        return {
          ...state,
          blankFName: action.payload,
        };
      case "BLANK_LAST_NAME":
        return {
          ...state,
          blankLName: action.payload,
        };
      case "EMAIL_TAKEN":
        return {
          ...state,
          emailTaken: action.payload,
        };

      case "AGE_RESTRICTED":
        return {
          ...state,
          ageRestricted: action.payload,
        };

      case "INVALID_PASSWORD":
        return {
          ...state,
          invalidPassword: action.payload,
        };
      case "DIFFERENT_PASSWORDS":
        return {
          ...state,
          differentPasswords: action.payload,
        };
      case "EMPTY_FIRST_NAME":
        return {
          ...state,
          emptyFirstName: action.payload,
        };
      case "EMPTY_LAST_NAME":
        return {
          ...state,
          emptyLastName: action.payload,
        };
      case "EMPTY_EMAIL":
        return {
          ...state,
          emptyEmail: action.payload,
        };
      case "EMPTY_AGE":
        return {
          ...state,
          emptyAge: action.payload,
        };
      case "EMPTY_PASSWORD":
        return {
          ...state,
          emptyPassword: action.payload,
        };
      case "EMPTY_CONFIRM_PASSWORD":
        return {
          ...state,
          emptyConfirmPassword: action.payload,
        };

      case "EMPTY_REGISTER_GENERAL":
        return {
          ...state,
          emptyRegisterGeneral: action.payload,
        };
      case "EMPTY_LOGIN_EMAIL":
        return {
          ...state,
          emptyLoginEmail: action.payload,
        };
      case "EMPTY_LOGIN_PASSWORD":
        return {
          ...state,
          emptyLoginPassword: action.payload,
        };
      case "EMPTY_LOGIN_GENERAL":
        return {
          ...state,
          emptyLoginGeneral: action.payload,
        };
      case "SET_ALL_ROOMS":
        return {
          ...state,
          allRooms: action.payload,
        };
      case "SET_SEARCHED_ROOMS":
        return {
          ...state,
          searchedRooms: action.payload,
        };
      case "SET_PUBLIC_ROOMS":
        return {
          ...state,
          publicRooms: action.payload,
        };
      case "SET_PRIVATE_ROOMS":
        return {
          ...state,
          privateRooms: action.payload,
        };
      case "SET_CREATED_ROOMS":
        return {
          ...state,
          createdRooms: action.payload,
        };
      case "SET_JOINED_ROOMS":
        return {
          ...state,
          joinedRooms: action.payload,
        };
      case "SHOW_CREATE_ROOM_FORM":
        return {
          ...state,
          showCreateRoomForm: !state.showCreateRoomForm,
        };
      case "SHOW_ROOM_PASSOWRD_FORM":
        return {
          ...state,
          roomPasswordForm: !state.roomPasswordForm,
        };
      case "SHOW_DELETE_ROOM_MODAL":
        return {
          ...state,
          showDeleteRoomModal: !state.showDeleteRoomModal,
        };
      case "SHOW_EDIT_ROOM_MODAL":
        return {
          ...state,
          showEditRoomModal: !state.showEditRoomModal,
        };
      case "ROOM_NOT_FOUND":
        return {
          ...state,
          roomNotFound: action.payload,
        };
      case "SHOW_EDIT_USER_MODAL":
        return {
          ...state,
          showEditUserModal: !state.showEditUserModal,
        };
      case "IS_SEARCH_OPEN":
        return {
          ...state,
          isSearchOpen: action.payload,
        };
      case "TOGGLE_SEARCH":
        return {
          ...state,
          toggleSearch: !state.toggleSearch,
        };
      case "SHOW_FULL_TEXT":
        return {
          ...state,
          showFullText: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [errorMessage, setErrorMessage] = useState({
    emptyEmail: false,
    emptyPassword: false,
    emptyLogin: false,
  });

  return (
    <AuthContext.Provider
      value={[state, dispatch, errorMessage, setErrorMessage]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
