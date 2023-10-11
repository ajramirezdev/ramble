import { useNavigate } from "react-router-dom";
//components
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import WelcomeLogin from "../components/WelcomeLogin";
import CustomButtonText from "../components/CustomButtonText";
import ErrorMessagesForm from "../components/ErrorMessagesForm";
//icons
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { BiError } from "react-icons/bi";

//pages
import RegistrationPage from "./RegistrationPage";

//provider
import { useContext } from "react";
import { AuthContext } from "../../model/providers/authProvider";
import RegistrationController from "../../controller/RegistrationController";

const LoginPage = ({
  form,
  handleSubmit,
  handleChange,
  userNotFound,
  wrongPassword,
  showRegModal,
  handleShowRegModal,
  handleHideRegModal,
  emptyLoginEmail,
  emptyLoginPassword,
  emptyLoginGeneral,
}) => {

  return (
    <div className="flex md:flex-row justify-around items-center flex-col">
      <section>
        <WelcomeLogin />
      </section>

      <section className="flex flex-col items-center">
        <h1 className="my-8 text-4xl md:text-6xl text-center">
          Let's <b className="text-emerald-900 ">Talk</b>, <br />
          <b className="text-green-900">Ramble</b>
        </h1>
        <form className="text-center">
          <h1 className="m-4">Chat your friends today!</h1>
          <CustomInput
            id="email"
            type="email"
            placeholder="Email"
            handleChange={handleChange}
            styleSize="w-72 h-5"
            styleColor="text-slate-800"
            styleTextColor="text-slate-800"
            icon={<MdOutlineMailOutline />}
            errorIcon={<BiError />}
            checkIcon={<MdOutlineCheck />}
            name={userNotFound}
            nameIcon={emptyLoginEmail}
            userNotFound={userNotFound}
          />

          {form.email ? (
            <ErrorMessagesForm
              name={userNotFound}
              message="User Not Found!"
              form={form.email}
            />
          ) : (
            <ErrorMessagesForm
              name={emptyLoginEmail}
              message="Email should not be empty!"
              form={form.email}
            />
          )}

          <CustomInput
            id="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
            styleSize="w-72 h-5"
            styleColor="text-slate-800"
            styleTextColor="text-slate-800"
            icon={<MdLockOutline />}
            errorIcon={<BiError />}
            checkIcon={<MdOutlineCheck />}
            name={userNotFound}
            nameIcon={emptyLoginEmail}
          />
          {form.password ? (
            <ErrorMessagesForm name={wrongPassword} message="Wrong Password!" />
          ) : (
            <ErrorMessagesForm
              name={emptyLoginPassword}
              message="Password should not be empty!"
            />
          )}

          <ErrorMessagesForm
            name={emptyLoginGeneral}
            message="Fields should not be empty!"
          />

          <CustomButton
            styleSize="w-72"
            styleColor="bg-emerald-700"
            styleTextColor="text-white"
            handleClick={handleSubmit}
            name="Login"
          />

          <CustomButtonText
            styleSize="w-56"
            styleColor="bg-white"
            styleTextColor="text-gray-500"
            name="Forgot Password?"
          />

          <CustomButtonText
            styleSize="w-56"
            styleColor="bg-white"
            styleTextColor="text-gray-500"
            handleClick={handleShowRegModal}
            name="No Account yet? Create New"
            type="button"
          />
        </form>
      </section>
      <RegistrationController
        isVisible={showRegModal}
        onClose={handleHideRegModal}
      />
    </div>
  );
};

export default LoginPage;
