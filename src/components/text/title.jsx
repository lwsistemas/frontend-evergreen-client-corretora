import { useMediaQuery } from "@material-ui/core";

const Title = ({ children }) => {
  const isSmallerThan992 = useMediaQuery('(min-width: 992px)');

  return (
    <div
      className="bg-gradient"
      style={{
        backgroundImage:
          "linear-gradient(107deg, #FFF 0%, rgba(255, 255, 255, 0.70) 100%)",
        WebkitTextFillColor: "transparent",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        display: "inline-block",
      }}
    >
      <h1
        className="font-weight-bold"
        style={{
          fontSize: isSmallerThan992 ? "38px" : "30px",
        }}
      >
        {children}
      </h1>
    </div>
  );
};

export default Title;
