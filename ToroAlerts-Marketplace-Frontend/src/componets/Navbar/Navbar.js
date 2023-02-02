import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/SVG/logo";
import { AuthContext } from "../../Context/auth-context";
import Button from "../Button/Button";
import jwt_decode from "jwt-decode";
import Settings from "../../assets/SVG/settings";
import Logout from "../../assets/SVG/logout";
import { useClickOutside } from "../../CustomHooks/use-click-outside";

const Navbar = () => {
  const auth = useContext(AuthContext);
  //console.log("auth-nav", auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [marktePlaceIsActive, setMarketPlaceIsActive] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (location.pathname.slice(1, 12) === "marketplace") {
      setMarketPlaceIsActive(true);
    } else {
      setMarketPlaceIsActive(false);
    }
  }, [location.pathname]);

  let domNode = useClickOutside(() => setOpenDropdown(false));

  return (
    <div className="max-w-screen">
      <div className="bg-primary-blue py-5 xl:py-7 px-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo className="w-10 h-12 xl:w-12 xl:h-14" />
          <div className="text-2xl xl:text-3xl font-normal">
            <span className="text-white">Toro</span>
            <span className="text-primary-yellow">Alerts</span>
          </div>
        </div>
        <div className="text-secondary-blue-ltr text-md xl:text-lg font-bold flex items-center space-x-10">
          <NavLink
            to={
              auth.dealsIn === "stocks"
                ? "/marketplace/my-algorithms/build-algorithms"
                : "/marketplace/my-mirror-trades/configured-platform"
            }
            className={marktePlaceIsActive ? "text-secondary-blue-lt" : "none"}
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive ? "text-secondary-blue-lt" : "none"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive ? "text-secondary-blue-lt" : "none"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? "text-secondary-blue-lt" : "none"
            }
          >
            Contact Us
          </NavLink>
          {!auth.token && (
            <Button
              innerText="Login"
              type="button"
              extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
            />
          )}

          {auth.token && (
            <Button
              onClick={() => {
                if (auth.dealsIn === "crypto") {
                  auth.dealingIn("stocks");
                  navigate("/marketplace/my-algorithms/build-algorithms");
                } else {
                  auth.dealingIn("crypto");
                  navigate("/marketplace/my-mirror-trades/configured-platform");
                }
              }}
              innerText={
                auth.dealsIn === "crypto"
                  ? "Build my Algorithm"
                  : "Mirror my Trades"
              }
              type="button"
              extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
            />
          )}

          {auth.token && (
            <div className="relative">
              <span
                onClick={() => setOpenDropdown(true)}
                className="cursor-pointer rounded-full py-2 px-2 bg-ternary-blue font-medium text-lg text-primary-blue-lt"
              >
                {jwt_decode(auth?.token)?.name?.slice(0, 2)?.toUpperCase()}
              </span>
              {openDropdown && (
                <div ref={domNode} className="z-20 absolute -right-2 top-7">
                  <div
                    style={{
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "10px solid #ffffff",
                    }}
                    className="mt-1 ml-[5.5rem]"
                  ></div>

                  <div className="-mt-[1px] bg-white rounded-xl p-3 shadow-md">
                    <div className="rounded p-1 cursor-pointer hover:bg-ternary-blue-ltr flex items-center space-x-1">
                      <Settings className="w-6 h-6" />
                      <p className="text-lg font-medium font-Nunito text-primary-blue-lt">
                        Settings
                      </p>
                    </div>
                    <div className="bg-ternary-blue h-[1.5px] w-full my-1"></div>
                    <div
                      onClick={() => auth.logout()}
                      className="cursor-pointer rounded p-1 hover:bg-ternary-blue-ltr flex items-center space-x-1"
                    >
                      <Logout className="w-6 h-5" />
                      <p className="text-lg font-medium font-Nunito text-primary-blue-lt">
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
