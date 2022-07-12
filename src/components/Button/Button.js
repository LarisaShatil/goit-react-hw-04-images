const Button = ({ text, func }) => {
  return (
    <button type="button" onClick={func} className="Button">
      {text}
    </button>
  );
};

export default Button;