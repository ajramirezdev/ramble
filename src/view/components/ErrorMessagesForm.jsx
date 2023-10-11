const ErrorMessagesForm = ({ name, message, form }) => {
  return (
    <div>{name  ? <p className="text-red-500 text-xs">{message}</p> : null}</div>
  );
};

export default ErrorMessagesForm;
