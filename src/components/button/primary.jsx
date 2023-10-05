import "./index.css";

const ButtonPrimary = ({ href, children }) => {
  return (
    <a href={href}>
      <button className="primary">{children}</button>
    </a>
  );
};

export default ButtonPrimary;