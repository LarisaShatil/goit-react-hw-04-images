const Button = ({ text, func }) => {
  return (
    <button type="Button" onClick={func} className="Button">
      {text}
    </button>
  );
};

export default Button;