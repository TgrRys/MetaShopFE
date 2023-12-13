import { useState } from "react";
import PropTypes from "prop-types";
// import Logo from "../../assets/logo.png";
import "./style.css";

export const Sidebar = ({ isActive }) => {
  const [activeLink, setActiveLink] = useState(null);

  const handleHover = (index) => {
    setActiveLink(index);
  };

  const links = [
    { title: "", icon: "" }, 
    { title: "Home", icon: "home" },
    { title: "Product", icon: "shirt" },
    { title: "Wishlist", icon: "heart" },
    { title: "Cart", icon: "cart" },
    { title: "Purchase History", icon: "time" },
    { title: "Settings", icon: "settings" },
    { title: "Sign Out", icon: "log-out" },
  ];

  return (
    <nav className={`navigation ${isActive ? "active" : ""}`}>
      <ul>
        {links.map((link, index) => (
          <li
            key={index}
            onMouseOver={() => handleHover(index)}
            className={activeLink === index ? "hovered" : ""}
          >
            <a href="#">
              <span className="icon">
                {link.title === "" ? (
                  <img src={link.icon} alt={link.title} />
                ) : (
                  <ion-icon name={`${link.icon}-outline`}></ion-icon>
                )}
              </span>
              {link.title && <span className="title">{link.title}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Sidebar.propTypes = {
  isActive: PropTypes.bool.isRequired,
};