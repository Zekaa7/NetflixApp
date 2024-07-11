import { useEffect, useState } from "react";
import "./Nav.css";
import { redirect, useHistory, useNavigate } from "react-router-dom";

export default function Nav() {
  const [show, handleShow] = useState(false);

  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);
  return (
    <div className={`nav ${show && `nav__black`}`}>
      <div className="nav__content">
        <img
          onClick={() => {
            navigate("/");
          }}
          src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Netflix-Logo.png"
          alt=""
          className="nav__logo"
        />
        <img
          onClick={() => {
            navigate("/profile");
          }}
          className="nav__avatar"
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-vnl1thqrh02x7ra2.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
