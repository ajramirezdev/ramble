import { useContext } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import UploadImage from "./UploadImage";
import { AuthContext } from "../../model/providers/authProvider";

const EditUserModal = ({
  user,
  upload,
  handleChange,
  profilePicURL,
  saveUserInputs,
  submitUserEdits,
}) => {
  const [state, dispatch] = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <CustomButton
          styleColor="bg-emerald-500"
          name="CLOSE"
          handleClick={() => dispatch({ type: "SHOW_EDIT_USER_MODAL" })}
        />
        <UploadImage
          user={user}
          upload={upload}
          handleChange={handleChange}
          profilePicURL={profilePicURL}
        />
        <form
          action="PUT"
          onSubmit={submitUserEdits}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center">
            <CustomInput
              id="firstName"
              type="text"
              placeholder={user.firstName}
              handleChange={saveUserInputs}
            />
            <CustomInput
              id="lastName"
              type="text"
              placeholder={user.lastName}
              handleChange={saveUserInputs}
            />
            <CustomInput
              id="age"
              type="number"
              placeholder={user.age}
              handleChange={saveUserInputs}
            />
            <CustomInput
              id="email"
              type="email"
              placeholder={user.email}
              handleChange={saveUserInputs}
            />
            <CustomButton name={"SUBMIT"} styleColor="bg-emerald-500" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
