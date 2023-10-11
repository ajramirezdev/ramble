import { useNavigate } from "react-router-dom";
import UserModel from "../model/UserModel";
import RegistrationPage from "../view/pages/RegistrationPage";
import { useContext, useState } from "react";
import { AuthContext } from "../model/providers/authProvider";

const RegistrationController = ({ isVisible, onClose }) => {
  const [generalError, setGeneralError] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [state, dispatch] = useContext(AuthContext);

  const saveInputs = (event) => {
    switch (event.target.id) {
      case "firstName":
        setNewUserData({ ...newUserData, firstName: event.target.value });
        break;
      case "lastName":
        setNewUserData({ ...newUserData, lastName: event.target.value });
        break;
      case "email":
        setNewUserData({ ...newUserData, email: event.target.value });
        break;
      case "age":
        setNewUserData({ ...newUserData, age: event.target.value });
        break;
      case "password":
        setNewUserData({ ...newUserData, password: event.target.value });
        break;
      case "confirmPassword":
        setNewUserData({ ...newUserData, confirmPassword: event.target.value });
        break;
      default:
        break;
    }
  };

  // console.log(regex.test(newUserData.lastName));
  const register = async (event) => {
    event.preventDefault();
    // Error();
    const { firstName, lastName, email, age, password, confirmPassword } =
      newUserData;
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const namePattern = /[0-9@#$%^&*!]+/g;

    const userByEmail = await UserModel.getUserByEmail(email);
    // if (!firstName.trim() || !lastName.trim()) {
    //   dispatch({ type: "BLANK_NAMES", payload: true });
    //   return;
    // } else {
    //   dispatch({ type: "BLANK_NAMES", payload: false });
    // }

    if (
      !confirmPassword &&
      !firstName &&
      !lastName &&
      !email &&
      !age &&
      !password
    ) {
      dispatch({ type: "EMPTY_REGISTER_GENERAL", payload: true });
    } else {
      dispatch({ type: "EMPTY_REGISTER_GENERAL", payload: false });
    }

    if (
      !firstName &&
      (lastName || email || age || password || confirmPassword)
    ) {
      dispatch({ type: "EMPTY_FIRST_NAME", payload: true });
      return;
    } else {
      dispatch({ type: "EMPTY_FIRST_NAME", payload: false });
      if (namePattern.test(firstName)) {
        dispatch({ type: "BLANK_FIRST_NAME", payload: true });
        return;
      } else {
        dispatch({ type: "BLANK_FIRST_NAME", payload: false });
      }
    }

    if (
      !lastName &&
      (firstName || email || age || password || confirmPassword)
    ) {
      dispatch({ type: "EMPTY_LAST_NAME", payload: true });
      return;
    } else {
      dispatch({ type: "EMPTY_LAST_NAME", payload: false });
      if (namePattern.test(lastName)) {
        dispatch({ type: "BLANK_LAST_NAME", payload: true });
        return;
      } else {
        dispatch({ type: "BLANK_LAST_NAME", payload: false });
      }
    }

    if (
      !email &&
      (firstName || lastName || age || password || confirmPassword)
    ) {
      dispatch({ type: "EMPTY_EMAIL", payload: true });
      return;
    } else {
      dispatch({ type: "EMPTY_EMAIL", payload: false });
      if (userByEmail) {
        dispatch({ type: "EMAIL_TAKEN", payload: true });
        return;
      } else {
        dispatch({ type: "EMAIL_TAKEN", payload: false });
      }
    }

    if (
      !age &&
      (firstName || lastName || email || password || confirmPassword)
    ) {
      dispatch({ type: "EMPTY_AGE", payload: true });
      return;
    } else {
      dispatch({ type: "EMPTY_AGE", payload: false });
      if (Number(age) <= 12 && Number(age) > 0) {
        dispatch({ type: "AGE_RESTRICTED", payload: true });
        return;
      } else {
        dispatch({ type: "AGE_RESTRICTED", payload: false });
      }
    }

    if (
      !password &&
      (firstName || lastName || email || age || confirmPassword)
    ) {
      dispatch({ type: "EMPTY_PASSWORD", payload: true });
      return;
    } else {
      dispatch({ type: "EMPTY_PASSWORD", payload: false });
      if (!pattern.test(password)) {
        dispatch({ type: "INVALID_PASSWORD", payload: true });
        return;
      } else {
        dispatch({ type: "INVALID_PASSWORD", payload: false });
      }
    }

    if (
      !confirmPassword &&
      (firstName || lastName || email || age || password)
    ) {
      dispatch({ type: "EMPTY_CONFIRM_PASSWORD", payload: true });
      return;
    } else {
      dispatch({ type: "EMPTY_CONFIRM_PASSWORD", payload: false });
      if (password !== confirmPassword) {
        dispatch({ type: "DIFFERENT_PASSWORDS", payload: true });
        return;
      } else {
        dispatch({ type: "DIFFERENT_PASSWORDS", payload: false });
      }
    }

    const data = await UserModel.registerUser({
      ...newUserData,
      age: Number(newUserData.age),
    });

    console.log(data);

    onClose();
  };

  return (
    <RegistrationPage
      saveInputs={saveInputs}
      register={register}
      blankFName={state.blankFName}
      blankLName={state.blankLName}
      emailTaken={state.emailTaken}
      emptyEmail={state.emptyEmail}
      emptyAge={state.emptyAge}
      emptyFirstName={state.emptyFirstName}
      emptyLastName={state.emptyLastName}
      emptyPassword={state.emptyPassword}
      emptyConfirmPassword={state.emptyConfirmPassword}
      ageRestricted={state.ageRestricted}
      invalidPassword={state.invalidPassword}
      differentPasswords={state.differentPasswords}
      emptyRegisterGeneral={state.emptyRegisterGeneral}
      form={newUserData}
      isVisible={isVisible}
      onClose={onClose}
    />
  );
};

export default RegistrationController;
