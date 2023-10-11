import { useContext } from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomButtonText from "../components/CustomButtonText";
import ErrorMessagesForm from "../components/ErrorMessagesForm";

//icons
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { BiError } from "react-icons/bi";

import { AuthContext } from "../../model/providers/authProvider";
//icons

const RegistrationPage = ({
  onClose,
  isVisible,
  saveInputs,
  register,
  blankFName,
  blankLName,
  emailTaken,
  emptyEmail,
  emptyFirstName,
  emptyLastName,
  emptyPassword,
  emptyConfirmPassword,
  ageRestricted,
  emptyAge,
  invalidPassword,
  differentPasswords,
  emptyRegisterGeneral,
  form,
}) => {
  if (!isVisible) return null;

  const [state, dispatch, errorMessage] = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <section className="md: w-96 flex items-center flex-col bg-white p-2 rounded-lg">
          <button
            onClick={onClose}
            className="place-self-end text-2xl text-emerald-800"
          >
            <MdOutlineClose />
          </button>
          <h1 className="text-2xl">Register</h1>
          <p>Invite your Friends!</p>

          <form className="flex flex-col items-center mt-5">
            <CustomInput
              id="firstName"
              type="text"
              placeholder="First Name"
              handleChange={saveInputs}
              errorIcon={<BiError />}
              name={blankFName}
              nameIcon={emptyFirstName}
              form={form.firstName}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            {form.firstName ? (
              <ErrorMessagesForm
                name={blankFName}
                message="Invalid name!"
                form={form.firstName}
              />
            ) : (
              <ErrorMessagesForm
                name={emptyFirstName}
                message="This should not be empty!"
                form={form.firstName}
              />
            )}
            <CustomInput
              id="lastName"
              type="text"
              placeholder="Last Name"
              handleChange={saveInputs}
              errorIcon={<BiError />}
              name={blankLName}
              nameIcon={emptyLastName}
              form={form.lastName}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            {form.lastName ? (
              <ErrorMessagesForm
                name={blankLName}
                message="Invalid name!"
                form={form.lastName}
              />
            ) : (
              <ErrorMessagesForm
                name={emptyLastName}
                message="This should not be empty!"
                form={form.lastName}
              />
            )}
            <CustomInput
              id="email"
              type="email"
              placeholder="Email"
              handleChange={saveInputs}
              errorIcon={<BiError />}
              name={emailTaken}
              nameIcon={emptyEmail}
              form={form.email}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            {form.email ? (
              <ErrorMessagesForm
                name={emailTaken}
                message="Email Taken!"
                form={form.email}
              />
            ) : (
              <ErrorMessagesForm
                name={emptyEmail}
                message="Email should not be empty!"
                form={form.email}
              />
            )}
            <CustomInput
              id="age"
              type="number"
              placeholder="Age"
              handleChange={saveInputs}
              errorIcon={<BiError />}
              name={ageRestricted}
              nameIcon={emptyAge}
              value={form.age}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            {form.age ? (
              <ErrorMessagesForm
                name={ageRestricted}
                message="Age restricted under 13 years old!"
                form={form.age}
              />
            ) : (
              <ErrorMessagesForm
                name={emptyAge}
                message="Age should not be empty!"
                form={form.age}
              />
            )}
            <CustomInput
              id="password"
              type="password"
              placeholder="Password"
              handleChange={saveInputs}
              errorIcon={<BiError />}
              name={invalidPassword}
              nameIcon={emptyPassword}
              form={form.password}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            {form.password ? (
              <ErrorMessagesForm
                name={invalidPassword}
                message="Pasword must have [A-Z]. [a-z].[0-9],[@$!%*?&]!"
                form={form.password}
              />
            ) : (
              <ErrorMessagesForm
                name={emptyPassword}
                message="Password should not be empty!"
                form={form.password}
              />
            )}
            <CustomInput
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              handleChange={saveInputs}
              errorIcon={<BiError />}
              name={differentPasswords}
              nameIcon={emptyConfirmPassword}
              form={form.confirmPassword}
              styleSize="w-72 h-5"
              styleColor="text-slate-800"
              styleTextColor="text-slate-800"
            />
            {form.confirmPassword ? (
              <ErrorMessagesForm
                name={differentPasswords}
                message="Password should match!"
                form={form.confirmPassword}
              />
            ) : (
              <ErrorMessagesForm
                name={emptyConfirmPassword}
                message="Confirm Password should not be empty!"
                form={form.confirmPassword}
              />
            )}

            <ErrorMessagesForm
              name={emptyRegisterGeneral}
              message="Fields should not be empty!"
            />
            <CustomButton
              styleSize="w-72"
              styleColor="bg-emerald-700 hover:bg-emerald-900"
              styleTextColor="text-white"
              handleClick={register}
              name="Register"
            />

            {/* {blankFName ? <div>Names should not be blank</div> : null}
            {blankLName ? <div>Names should not be blank</div> : null}
            {emailTaken ? <div>Email already taken</div> : null}
            {ageRestricted ? (
              <div>Age restricted under 13 years old</div>
            ) : null}
            {invalidPassword ? <div>Invalid Password</div> : null}
            {differentPasswords ? <div>Passwords does not match</div> : null} */}

            {/* <ErrorMessagesForm
              name={emptyRegisterGeneral}
              message="Fields should not be empty!"
            /> */}
          </form>

          <CustomButtonText
            styleSize="w-72"
            styleColor="bg-white"
            styleTextColor="text-gray-500"
            handleClick={onClose}
            name="Already have an account? Login"
          />
        </section>
      </div>
    </div>
  );
};

export default RegistrationPage;

{
  /* Shows the error messages 1 by 1 */
}
{
  /* {blankNames ? (
              <div>Names should not be blank</div>
            ) : emailTaken ? (
              <div>Email already taken</div>
            ) : ageRestricted ? (
              <div>Age restricted under 13 years old</div>
            ) : invalidPassword ? (
              <div>Invalid Password</div>
            ) : differentPasswords ? (
              <div>Passwords does not match</div>
            ) : null} */
}

{
  /* //.// */
}
{
  /* Shows all error messages at once */
}
{
  /* {blankNames ? <div>Names should not be blank</div> : null}
            {emailTaken ? <div>Email already taken</div> : null}
            {ageRestricted ? <div>Age restricted under 13 years old</div> : null}
            {invalidPassword ? <div>Invalid Password</div> : null}
            {differentPasswords ? <div>Passwords does not match</div> : null} */
}
{
  /* <ErrorMessagesForm
              name={errorRegMessage.emptyRegister}
              message="Fields should not be empty!"
              form={form.password}
            /> */
}
