import { useContext } from "react";
import { AuthContext } from "../../model/providers/authProvider";

const CustomInput = ({
  id,
  type,
  placeholder,
  value,
  handleChange,
  styleSize,
  styleColor,
  styleTextColor,
  icon,
  errorIcon,
  checkIcon,
  name,
  nameIcon,
  userNotFound,
  wrongPassword,
  form,
}) => {
  const btnStyles = ` text-sm pr-0 py-4 m-1 outline-none ${styleColor} ${styleTextColor} ${styleSize} `;
  const btnContainerStyles = `px-1 py-4 m-1 flex justify-around items-center border border-slate-800 rounded ${styleSize}`;
  return (
    <div className={btnContainerStyles}>
      <span>{icon}</span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={btnStyles}
        required
      />
      {name || nameIcon ? (
        <span className="text-red-500 text-2xl">{errorIcon}</span>
      ) : null}
    </div>
  );
};

export default CustomInput;
