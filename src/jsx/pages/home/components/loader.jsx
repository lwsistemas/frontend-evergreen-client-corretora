import { Spinner } from "react-bootstrap";
import "../../../../css/home/loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner animation="border" role="status" className="loader">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};
