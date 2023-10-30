import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import iconHome from "../../../icons/sidebar/home.svg";
import iconMarkets from "../../../icons/sidebar/markets.svg";
import iconExchange from "../../../icons/sidebar/exchange.svg";
import iconProfile from "../../../icons/sidebar/profile.svg";
import iconDepositFiat from "../../../icons/sidebar/deposit-fiat.svg";
import iconDepositCrypto from "../../../icons/sidebar/deposit-crypto.svg";
import iconWithoutFiat from "../../../icons/sidebar/without-fiat.svg";
import iconBlog from "../../../icons/sidebar/blog.svg";
import icoSupport from "../../../icons/sidebar/support.svg";
import logoHeader from "../../../images/brand/logoHeader.png";
import { useTranslation } from "react-i18next";


const Sidebar = ({ selectedItem }) => {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 769);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsExpanded(windowWidth >= 769);
  }, [windowWidth]);

  const HomeIcon = (props) => (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.5 21.4091H3.5C2.11929 21.4091 1 20.2898 1 18.9091V10.0629C1.00001 8.92367 1.51789 7.84623 2.4075 7.1346L8.5375 2.23079C9.90705 1.13519 11.8531 1.13519 13.2226 2.23079L19.5925 7.32657C20.4821 8.03822 21 9.1157 21 10.2549V18.9091C21 20.2898 19.8807 21.4091 18.5 21.4091Z"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const MarketsIcon = (props) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.167 20.909H4.444C3.922 20.909 3.5 20.486 3.5 19.965V16.187C3.5 15.665 3.923 15.243 4.444 15.243H9.166"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.832 4.85306V20.9091H19.554C20.076 20.9091 20.498 20.4861 20.498 19.9651V4.85306C20.498 4.33106 20.075 3.90906 19.554 3.90906H15.776C15.255 3.90906 14.832 4.33206 14.832 4.85306H14.832Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.833 20.909H9.16602V10.52C9.16602 9.99805 9.58902 9.57605 10.11 9.57605H14.832"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const ExchangeIcon = (props) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 16.2981L10.071 11.2271C10.462 10.8361 11.095 10.8361 11.485 11.2271L13.626 13.3681C14.017 13.7591 14.65 13.7591 15.04 13.3681L21 7.40906"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.332 7.40906H20.999V10.0761"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.0008 21.3381H1.92578V3.63007"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const WalletIcon = (props) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5033 6.95113L16.1375 3.79672C15.5003 2.94719 14.3105 2.74338 13.4269 3.33243L7.92871 6.99791"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.503 11.4998H21.004C21.5566 11.4998 22.0045 11.9477 22.0045 12.5002V15.5015C22.0045 16.054 21.5566 16.5019 21.004 16.5019H18.503C17.1217 16.5019 16.002 15.3821 16.002 14.0008V14.0008C16.002 12.6195 17.1217 11.4998 18.503 11.4998V11.4998Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.0036 11.4998V9.49895C21.0036 8.11766 19.8838 6.99791 18.5026 6.99791H5.49714C4.11585 6.99791 2.99609 8.11766 2.99609 9.49895V18.5027C2.99609 19.884 4.11585 21.0037 5.49714 21.0037H18.5026C19.8838 21.0037 21.0036 19.884 21.0036 18.5027V16.5019"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );


  const WithoutCryptoIcon = (props) => (
    // <svg
    //   width="24"
    //   height="25"
    //   viewBox="0 0 24 25"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M5.74663 15.1602C5.60858 15.1606 5.49694 15.2727 5.49717 15.4107C5.49741 15.5488 5.60945 15.6605 5.74749 15.6604C5.88554 15.6603 5.99738 15.5483 5.99738 15.4103C5.99709 15.272 5.88488 15.1601 5.74662 15.1602"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     d="M9.99965 13.9097C10.8284 13.9097 11.5003 14.5815 11.5003 15.4103C11.5003 16.2391 10.8284 16.9109 9.99965 16.9109C9.17088 16.9109 8.49902 16.2391 8.49902 15.4103C8.49902 14.5815 9.17088 13.9097 9.99965 13.9097"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     fill-rule="evenodd"
    //     clip-rule="evenodd"
    //     d="M17.0019 12.4091V18.4116C17.0019 19.5166 16.1061 20.4124 15.0011 20.4124H4.99583C4.46532 20.4122 3.95659 20.2014 3.58157 19.8261C3.20655 19.4509 2.99595 18.9421 2.99609 18.4116V12.408C2.99624 11.8774 3.20712 11.3687 3.58235 10.9937C3.95758 10.6187 4.46642 10.4081 4.99693 10.4082H15.0022C15.5327 10.4084 16.0414 10.6192 16.4164 10.9945C16.7915 11.3697 17.0021 11.8785 17.0019 12.4091Z"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     d="M14.2518 15.6604C14.3899 15.66 14.5015 15.5479 14.5013 15.4099C14.501 15.2718 14.389 15.1601 14.251 15.1602C14.1129 15.1603 14.0011 15.2723 14.0011 15.4103C14.0014 15.5486 14.1136 15.6605 14.2518 15.6604"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     d="M6.19531 10.4082L7.40614 5.88934L7.40645 5.88834C7.54389 5.37594 7.87925 4.93912 8.33876 4.67398C8.79827 4.40884 9.34429 4.33711 9.85669 4.47455L19.5199 7.06375L19.5209 7.06406C20.0333 7.20149 20.4701 7.53686 20.7353 7.99637C21.0004 8.45589 21.0721 9.00191 20.9347 9.5143L19.3812 15.3123C19.1016 16.3509 18.0497 16.9815 17.0019 16.7387"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    // </svg>
    <i className="fa fa-bitcoin fa-2x" style={{color: props.color, width: 24, height:25}}></i>
  );

  const ProfileIcon = (props) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4749 4.93419C15.8417 6.30103 15.8417 8.5171 14.4749 9.88394C13.108 11.2508 10.892 11.2508 9.52513 9.88394C8.15829 8.5171 8.15829 6.30103 9.52513 4.93419C10.892 3.56735 13.108 3.56735 14.4749 4.93419"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 18.9091V19.9091C4 20.4611 4.448 20.9091 5 20.9091H19C19.552 20.9091 20 20.4611 20 19.9091V18.9091C20 15.8831 16.048 13.9171 12 13.9171C7.952 13.9171 4 15.8831 4 18.9091Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const DepositFiatIcon = (props) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.2996 18.4C11.047 18.4 7.59961 14.9526 7.59961 10.7C7.59961 6.4474 11.047 3 15.2996 3C19.5544 3 22.9996 6.4474 22.9996 10.7C22.9996 14.9526 19.5544 18.4 15.2996 18.4"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.326 7.43961C4.2516 7.63761 1 10.9772 1 15.1C1 19.3526 4.4474 22.8 8.7 22.8C11.7734 22.8 14.4046 20.9872 15.641 18.3824"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const DepositCryptoIcon = (props) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.81641 17.7971C6.46241 19.9831 9.06941 21.4091 12.0004 21.4091C16.9504 21.4091 21.0004 17.3591 21.0004 12.4091C21.0004 7.45906 16.9504 3.40906 12.0004 3.40906"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.816 17.7971C3.682 16.2911 3 14.4281 3 12.4091C3 7.45906 7.05 3.40906 12 3.40906"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="0"
      />
      <path
        d="M11.75 7.40906V8.65906"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.75 17.4091V16.1591"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.237 10.4091C14.172 9.43306 13.367 8.65906 12.375 8.65906H11.005C10.035 8.65906 9.25 9.44506 9.25 10.4141C9.25 11.2191 9.798 11.9211 10.578 12.1171L12.921 12.7051C13.702 12.9011 14.249 13.6031 14.249 14.4081C14.249 15.3781 13.463 16.1631 12.494 16.1631H11.124C10.13 16.1631 9.325 15.3871 9.261 14.4091"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const WithoutFiatIcon = (props) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.74663 15.1602C5.60858 15.1606 5.49694 15.2727 5.49717 15.4107C5.49741 15.5488 5.60945 15.6605 5.74749 15.6604C5.88554 15.6603 5.99738 15.5483 5.99738 15.4103C5.99709 15.272 5.88488 15.1601 5.74662 15.1602"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.99965 13.9097C10.8284 13.9097 11.5003 14.5815 11.5003 15.4103C11.5003 16.2391 10.8284 16.9109 9.99965 16.9109C9.17088 16.9109 8.49902 16.2391 8.49902 15.4103C8.49902 14.5815 9.17088 13.9097 9.99965 13.9097"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.0019 12.4091V18.4116C17.0019 19.5166 16.1061 20.4124 15.0011 20.4124H4.99583C4.46532 20.4122 3.95659 20.2014 3.58157 19.8261C3.20655 19.4509 2.99595 18.9421 2.99609 18.4116V12.408C2.99624 11.8774 3.20712 11.3687 3.58235 10.9937C3.95758 10.6187 4.46642 10.4081 4.99693 10.4082H15.0022C15.5327 10.4084 16.0414 10.6192 16.4164 10.9945C16.7915 11.3697 17.0021 11.8785 17.0019 12.4091Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.2518 15.6604C14.3899 15.66 14.5015 15.5479 14.5013 15.4099C14.501 15.2718 14.389 15.1601 14.251 15.1602C14.1129 15.1603 14.0011 15.2723 14.0011 15.4103C14.0014 15.5486 14.1136 15.6605 14.2518 15.6604"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.19531 10.4082L7.40614 5.88934L7.40645 5.88834C7.54389 5.37594 7.87925 4.93912 8.33876 4.67398C8.79827 4.40884 9.34429 4.33711 9.85669 4.47455L19.5199 7.06375L19.5209 7.06406C20.0333 7.20149 20.4701 7.53686 20.7353 7.99637C21.0004 8.45589 21.0721 9.00191 20.9347 9.5143L19.3812 15.3123C19.1016 16.3509 18.0497 16.9815 17.0019 16.7387"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const BlogIcon = (props) => {
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9107 12.9184L18.8857 6.94337C19.5981 6.23097 20.7532 6.23097 21.4656 6.94337V6.94337C22.178 7.65578 22.178 8.81082 21.4656 9.52322L15.4906 15.4982C15.1081 15.8807 14.6119 16.1288 14.0764 16.2053L12.6941 16.4028C12.5046 16.4299 12.3135 16.3662 12.1781 16.2308C12.0428 16.0955 11.979 15.9043 12.0061 15.7148L12.2036 14.3326C12.2801 13.7971 12.5282 13.3009 12.9107 12.9184V12.9184Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 16.4091H7"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 12.9091H7"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 9.40906H7"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 6.83889V5.40906C19 4.30449 18.1046 3.40906 17 3.40906H5C3.89543 3.40906 3 4.30449 3 5.40906V19.4091C3 20.5136 3.89543 21.4091 5 21.4091H17C18.1046 21.4091 19 20.5136 19 19.4091V11.9889"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>;
  };
  const SupportIcon = (props) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 11.7001C3 14.3831 4.42 16.7451 6.599 18.2341C6.598 19.0891 6.6 20.2411 6.6 21.4501L10.131 19.7031C10.735 19.8191 11.359 19.8821 12 19.8821C16.952 19.8821 21 16.2391 21 11.7001C21 7.16106 16.952 3.51806 12 3.51806C7.048 3.51806 3 7.16106 3 11.7001Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.8992 12.7371V12.5301C11.8992 11.8521 12.3182 11.4851 12.7382 11.2031C13.1482 10.9271 13.5592 10.5671 13.5592 9.90306C13.5592 8.98606 12.8162 8.24406 11.9002 8.24406C10.9842 8.24406 10.2402 8.98506 10.2402 9.90206"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.8984 15.0761C11.8154 15.0761 11.7484 15.1431 11.7494 15.2261C11.7494 15.3091 11.8164 15.3761 11.8994 15.3761C11.9824 15.3761 12.0494 15.3091 12.0494 15.2261C12.0494 15.1431 11.9834 15.0761 11.8984 15.0761"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <>
      {windowWidth > 480 && (
        <aside
          className={`sidebar ${isExpanded ? "expanded" : ""}`}
          style={{
            backgroundColor: "#121318",
            color: "white",
            width: "auto",
            padding: "16px 0px",
          }}
        >
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "40px", padding: "0px 16px" }}
          >
            <img
              style={{ width: isExpanded ? "100px" : "40px" }}
              src={logoHeader}
            />
          </div>
          <nav>
            <ul
              className="d-flex flex-column"
              style={{ gap: "16px", padding: "0 8px" }}
            >
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "home" ? "#FFC107" : "transparent",
                  borderRadius: selectedItem === "home" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <HomeIcon
                        color={selectedItem === "home" ? "#000" : "#C8C7C8"}
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color: selectedItem === "home" ? "#000" : "#C8C7C8",
                        }}
                      >
                        Dashboard
                      </span>
                    </>
                  ) : (
                    <HomeIcon
                      color={selectedItem === "home" ? "#000" : "#C8C7C8"}
                    />
                  )}
                </Link>
              </li>
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "markets" ? "#FFC107" : "transparent",
                  borderRadius: "8px",
                }}
              >
                <Link
                  to="/mercados"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <MarketsIcon
                        color={selectedItem === "markets" ? "#000" : "#C8C7C8"}
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color:
                            selectedItem === "markets" ? "#000" : "#C8C7C8",
                        }}
                      >
                        {t('Application_Mercados')}
                      </span>
                    </>
                  ) : (
                    <MarketsIcon
                      color={selectedItem === "markets" ? "#000" : "#C8C7C8"}
                    />
                  )}
                </Link>
              </li>
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "exchange" ? "#FFC107" : "transparent",
                  borderRadius: selectedItem === "exchange" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/exchangePro"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <ExchangeIcon
                        color={selectedItem === "exchange" ? "#000" : "#C8C7C8"}
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color:
                            selectedItem === "exchange" ? "#000" : "#C8C7C8",
                        }}
                      >
                        {t('Application_exchangePro')}
                      </span>
                    </>
                  ) : (
                    <ExchangeIcon
                      color={selectedItem === "exchange" ? "#000" : "#C8C7C8"}
                    />
                  )}
                </Link>
              </li>
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "profile" ? "#FFC107" : "transparent",
                  borderRadius: selectedItem === "profile" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/user/editUser"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <ProfileIcon
                        color={selectedItem === "profile" ? "#000" : "#C8C7C8"}
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color:
                            selectedItem === "profile" ? "#000" : "#C8C7C8",
                        }}
                      >
                        {t('Account')}
                      </span>
                    </>
                  ) : (
                    <ProfileIcon
                      color={selectedItem === "profile" ? "#000" : "#C8C7C8"}
                    />
                  )}
                </Link>
              </li>
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "deposito-fiat"
                      ? "#FFC107"
                      : "transparent",
                  borderRadius:
                    selectedItem === "deposito-fiat" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/deposit"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <DepositFiatIcon
                        color={
                          selectedItem === "deposito-fiat" ? "#000" : "#C8C7C8"
                        }
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color:
                            selectedItem === "deposito-fiat"
                              ? "#000"
                              : "#C8C7C8",
                        }}
                      >
                        {t('Deposit fiat')}
                      </span>
                    </>
                  ) : (
                    <DepositFiatIcon
                      color={
                        selectedItem === "deposito-fiat" ? "#000" : "#C8C7C8"
                      }
                    />
                  )}
                </Link>
              </li>
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "account-withdraw-cripto"
                      ? "#FFC107"
                      : "transparent",

                  borderRadius:
                    selectedItem === "account-withdraw-cripto" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/account-withdraw-cripto"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <WithoutCryptoIcon
                        color={
                          selectedItem === "account-withdraw-cripto"
                            ? "#000"
                            : "#C8C7C8"
                        }
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color:
                            selectedItem === "account-withdraw-cripto"
                              ? "#000"
                              : "#C8C7C8",
                        }}
                      >
                        {t('Withdraw crypto')}
                      </span>
                    </>
                  ) : (
                    <WithoutCryptoIcon
                      color={
                        selectedItem === "account-withdraw-cripto" ? "#fff" : "#fff"
                      }
                    />
                  )}
                </Link>

              </li>
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "deposito-crypto"
                      ? "#FFC107"
                      : "transparent",

                  borderRadius:
                    selectedItem === "deposito-crypto" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/account-deposit-cripto"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <DepositCryptoIcon
                        color={
                          selectedItem === "deposito-crypto"
                            ? "#000"
                            : "#C8C7C8"
                        }
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color:
                            selectedItem === "deposito-crypto"
                              ? "#000"
                              : "#C8C7C8",
                        }}
                      >
                        {t('Deposit crypto')}
                      </span>
                    </>
                  ) : (
                    <DepositCryptoIcon
                      color={
                        selectedItem === "deposito-crypto" ? "#000" : "#C8C7C8"
                      }
                    />
                  )}
                </Link>

              </li>
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "saque-fiat" ? "#FFC107" : "transparent",
                  borderRadius: selectedItem === "saque-fiat" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/account-withdraw-fiat"
                  className="d-flex"
                  style={{
                    gap: "12px",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <WithoutFiatIcon
                        color={
                          selectedItem === "saque-fiat" ? "#000" : "#C8C7C8"
                        }
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color:
                            selectedItem === "saque-fiat" ? "#000" : "#C8C7C8",
                        }}
                      >
                        {t('Withdraw fiat')}
                      </span>
                    </>
                  ) : (
                    <WithoutFiatIcon
                      color={selectedItem === "saque-fiat" ? "#000" : "#C8C7C8"}
                    />
                  )}
                </Link>
              </li>
              {/* <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "blog" ? "#FFC107" : "transparent",

                  borderRadius: selectedItem === "blog" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/blog"
                  className="d-flex"
                  style={{
                    gap: "12px",
                    color: selectedItem === "blog" ? "#000" : "#fff",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <BlogIcon color={selectedItem === "blog" ? "#000" : "#C8C7C8"}/>
                      <span style={{ fontWeight: "medium",  color:
                            selectedItem === "blog" ? "#000" : "#C8C7C8", }}>Blog</span>
                    </>
                  ) : (
                    <BlogIcon color={selectedItem === "blog" ? "#000" : "#C8C7C8"} />
                  )}
                </Link>
              </li> */}
              <li
                style={{
                  padding: "8px 16px",
                  gap: "8px",
                  justifyContent: isExpanded ? "start" : "center",
                  backgroundColor:
                    selectedItem === "suporte" ? "#FFC107" : "transparent",
                  borderRadius: selectedItem === "suporte" ? "8px" : "0px",
                }}
              >
                <Link
                  to="/support"
                  className="d-flex"
                  style={{
                    gap: "12px",
                    color: selectedItem === "suporte" ? "#000" : "#fff",
                  }}
                >
                  {isExpanded ? (
                    <>
                      <SupportIcon
                        color={selectedItem === "suporte" ? "#000" : "#C8C7C8"}
                      />
                      <span
                        style={{
                          fontWeight: "medium",
                          color: selectedItem === "suporte" ? "#000" : "#C8C7C8",
                        }}
                      >
                        {t('Application_Support')}
                      </span>
                    </>
                  ) : (
                    <SupportIcon
                      color={selectedItem === "suporte" ? "#000" : "#C8C7C8"}
                    />
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
