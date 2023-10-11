const CustomButton = ({
  styleSize,
  styleColor,
  styleTextColor,
  handleClick,
  name,
}) => {
  const btnStyles = `p-1 m-1 rounded text-white shadow-lg
    ${styleTextColor} 
    ${styleSize} 
    ${styleColor}`;

  const btnStylesHover = ` hover:bg-emerald-600
    ${btnStyles}
    
  `;

  return (
    <div className="flex justify-center">
      <button className={btnStylesHover} onClick={handleClick} type="submit">
        {name}
      </button>
    </div>
  );
};

export default CustomButton;
