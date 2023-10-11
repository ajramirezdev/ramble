import {Link} from "react-router-dom"

import Logo from "../../../assets/ramble-white.png";
import CustomButton from "../components/CustomButton";
// Icons
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { useState } from "react";

const NavigationBar = () => {
  const Links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    // {
    //   name: "Features",
    //   link: "/",
    // },
    // {
    //   name: "Help Center",
    //   link: "/",
    // },
  ];

  const [toggleMenu, setToggleMenu] = useState(true);

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="w-full fixed bg-gradient-to-r from-slate-800 from-10% to-emerald-600 to-50%">
      <nav className="p-2 px-10 text-lg shadow md:flex md:justify-between md:items-center md:w-auto md:z-auto z-[-1] w-full items-center transition-all duration-200 ease-in">
        <div className="sm:flex sm:justify-between flex justify-between">
          <span className="text-2xl text-white">
            <img src={Logo} alt="logo" className="h-11 mr-5 inline" />
          </span>
          <div className="md:hidden xl:hidden">
            {toggleMenu ? (
              <span className="text-slate-800">
                <FiMenu
                  className="text-3xl block cursor-pointer"
                  onClick={handleMenu}
                />
              </span>
            ) : (
              <span className="text-slate-800">
                <FiX
                  className="text-3xl block cursor-pointer"
                  onClick={handleMenu}
                />
              </span>
            )}
          </div>
        </div>
        <ul
          className={`md:flex text-center ${
            toggleMenu ? "hidden" : "block"
          } items-center`}
        >
          {Links.map((link, index) => (
            <Link to={link.link} key={index}>
              <li className="md:mx-5 md:my-0 my-4 text-l text-white hover:text-slate-100 hover:text-xl hover:font-bold cursor-pointer duration-200">
                {link.name}
              </li>
            </Link>
          ))}
          <div>
            <CustomButton
              styleSize="w-28"
              styleColor="bg-slate-800"
              styleTextColor="text-emerald-300"
              name="Sign Up"
            />
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
  