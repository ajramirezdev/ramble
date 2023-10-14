import { useContext, useState } from "react";
import LoginPage from "../view/pages/LoginPage";
import UserModel from "../model/UserModel";
import { AuthContext } from "../model/providers/authProvider";
import { useNavigate } from "react-router-dom";

const LoginController = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [showRegModal, setShowRegModal] = useState(false);
  const [state, dispatch, errorMessage, setErrorMessage] =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    switch (event.target.id) {
      case "email":
        setLoginForm({ ...loginForm, email: event.target.value });
        break;
      case "password":
        setLoginForm({ ...loginForm, password: event.target.value });
        break;
      default:
        return;
    }
  };

  const handleShowRegModal = () => {
    setShowRegModal(true);
  };
  const handleHideRegModal = () => {
    setShowRegModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!loginForm.email && !loginForm.password) {
        dispatch({ type: "EMPTY_LOGIN_GENERAL", payload: true });
        return;
      } else {
        dispatch({ type: "EMPTY_LOGIN_GENERAL", payload: false });
      }

      if (!loginForm.email) {
        dispatch({ type: "EMPTY_LOGIN_EMAIL", payload: true });
        return;
      } else {
        dispatch({ type: "EMPTY_LOGIN_EMAIL", payload: false });
      }

      if (!loginForm.password) {
        dispatch({ type: "EMPTY_LOGIN_PASSWORD", payload: true });
        return;
      } else {
        dispatch({ type: "EMPTY_LOGIN_PASSWORD", payload: false });
      }

      const token = await UserModel.login(loginForm.email, loginForm.password);
      dispatch({ type: "SAVE_TOKEN", payload: token });
      navigate("/chat");
    } catch (err) {
      if (err.message === "Unauthorized Access") {
        dispatch({ type: "WRONG_PASSWORD", payload: true });
      } else {
        dispatch({ type: "WRONG_PASSWORD", payload: false });
      }

      if (err.message === "User not found") {
        dispatch({ type: "USER_NOT_FOUND", payload: true });
      } else {
        dispatch({ type: "USER_NOT_FOUND", payload: false });
      }
    }
  };

  return (
    <LoginPage
      form={loginForm}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      userNotFound={state.userNotFound}
      wrongPassword={state.wrongPassword}
      emptyLoginEmail={state.emptyLoginEmail}
      emptyLoginPassword={state.emptyLoginPassword}
      emptyLoginGeneral={state.emptyLoginGeneral}
      showRegModal={showRegModal}
      handleShowRegModal={handleShowRegModal}
      handleHideRegModal={handleHideRegModal}
      errorMessage={errorMessage}
      invalidPassword={state.invalidPassword}
    />
  );
};

export default LoginController;
