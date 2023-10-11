const CustomButtonText = ({
  styleSize,
  styleColor,
  styleTextColor,
  handleClick,
  name,
  type,
}) => {
  const buttonTextStyle = `p-0 m-0 text-xs underline hover:text-emerald-900 ${styleTextColor} ${styleSize} ${styleColor}`;

  return (
    <div className="text-center">
      <button type={type} className={buttonTextStyle} onClick={handleClick}>
        {name}
      </button>
    </div>
  );
};

export default CustomButtonText;
