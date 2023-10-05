import "./index.css";

const ButtonSecondary = ({ href, children }) => {
  return (
    <a href={href}>
      <button className="secondary">{children}</button>
    </a>
  );
};

export default ButtonSecondary;
