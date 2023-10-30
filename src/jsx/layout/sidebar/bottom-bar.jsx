import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarComponent from './sideBarhover'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

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

const MerkatsIcon = (props) => (
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

const Tamanho = 480

const BottomBar = ({ selectedIcon }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(
    window.innerWidth <= Tamanho
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileIconClick = () => {
    // Abra a barra lateral se ela estiver fechada e feche-a se estiver aberta
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    // Feche a barra lateral
    setIsSidebarOpen(false);
  };
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
    setIsBottomBarVisible(windowWidth <= Tamanho);
  }, [windowWidth]);
  

  return (
    <>
      {isBottomBarVisible && ( // Only render the BottomBar if it's visible
        <footer
        style={{
          position: "fixed",
          bottom: -3,
          left: 0,
          right: 0,
          height: "56px",
          backgroundColor: "rgba(18, 19, 24, 0.85)", // Adicione a transparência aqui
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          zIndex:99999
        }}
      >
        
      
      
          <Link to="/">
            <HomeIcon color={selectedIcon === "home" ? "#FFC107" : "#C8C7C8"} />
          </Link>
          <Link to="/mercados">
            <MerkatsIcon color={selectedIcon === "markets" ? "#FFC107" : "#C8C7C8"} />
          </Link>
          <Link to="/exchangePro">
            <ExchangeIcon color={selectedIcon === "exchange" ? "#FFC107" : "#C8C7C8"} />
          </Link>
          <Link to="/user/mywallet">
            <WalletIcon color={selectedIcon === "wallet" ? "#FFC107" : "#C8C7C8"} />
          </Link>
          <div onClick={handleProfileIconClick}>
        <ListOutlinedIcon
            sx={{
              color: isSidebarOpen ? "#FFC107" : "#C8C7C8",
            }}
          />
      </div>
          
        </footer>
      )}
      {isSidebarOpen && <SidebarComponent onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default BottomBar;
