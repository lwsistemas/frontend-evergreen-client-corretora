import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../css/button-group.css";

function ButtonsUser() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="btn-group d-flex flex-wrap" role="group">
      <Link
        className="btn btn-outline-primary m-2 flex-shrink-0"
        to={"./editUser"}
      >
        {t("My data")}
      </Link>
      <Link
        className="btn btn-outline-primary m-2 flex-shrink-0"
        to={"./history"}
      >
        {t("Order History")}
      </Link>
      <Link
        className="btn btn-outline-primary m-2 flex-shrink-0"
        to={"./mywallet"}
      >
        {t("My Wallet")}
      </Link>
      <Link
        className="btn btn-outline-primary m-2 flex-shrink-0"
        to={"./mydocuments"}
      >
        {t("My documents")}
      </Link>
      <Link
        className="btn btn-outline-primary m-2 flex-shrink-0"
        to={"./bank"}
      >
        {t("Bank data")}
      </Link>
      <Link
        className="btn btn-outline-primary m-2 flex-shrink-0"
        to={"./secutiry"}
      >
        {t("Security")}
      </Link>
    </div>
  );
}
export default ButtonsUser;
