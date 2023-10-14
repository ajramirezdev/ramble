import { useContext } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import UploadImage from "./UploadImage";
import { AuthContext } from "../../model/providers/authProvider";

//icons
import { MdOutlineClose } from "react-icons/md";

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
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col items-center justify-center bg-white md: w-96  p-2 rounded-lg">
        <button
          onClick={() => dispatch({ type: "SHOW_EDIT_USER_MODAL" })}
          className="place-self-end text-2xl text-emerald-800"
        >
          <MdOutlineClose />
        </button>

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
          <div className="flex flex-col items-center my-2">
            <h3 className="font-bold mt-2">Profile Information</h3>
            <CustomInput
              id="firstName"
              type="text"
              placeholder={user.firstName}
              handleChange={saveUserInputs}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            <CustomInput
              id="lastName"
              type="text"
              placeholder={user.lastName}
              handleChange={saveUserInputs}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            <CustomInput
              id="age"
              type="number"
              placeholder={user.age}
              handleChange={saveUserInputs}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            <CustomInput
              id="email"
              type="email"
              placeholder={user.email}
              handleChange={saveUserInputs}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            <CustomButton
              name="Update"
              styleSize="w-72"
              styleColor="bg-emerald-700 hover:bg-emerald-900"
              styleTextColor="text-white"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
