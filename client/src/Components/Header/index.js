import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.jpg";
import Button from "@mui/material/Button";
import CountryDropdown from "../CountryDropdown";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { useContext } from "react";
import { MyContext } from "../../App";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FaClipboardCheck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import UserAvatarImgComponent from "../userAvatarImg";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const open = Boolean(anchorEl);

  const headerRef = useRef();
  const gotoTop = useRef();
  const context = useContext(MyContext);

  const history = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("location");
    context.setIsLogin(false);
    // window.location.href = "/signIn"
    history("/signIn");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let position = window.pageYOffset;
      if (headerRef.current) {
        if (position > 100) {
          headerRef.current.classList.add("fixed");
        } else {
          headerRef.current.classList.remove("fixed");
        }
      }

      if (gotoTop.current) {
        if (position > 500) {
          gotoTop.current.classList.add("show");
        } else {
          gotoTop.current.classList.remove("show");
        }
      }
    });
  }, []);

  const openNav = () => {
    setIsOpenNav(!isOpenNav);
    context.setIsOpenNav(true);
    context.setIsBottomShow(false);
  };

  const closeNav = () => {
    setIsOpenNav(false);
    context.setIsOpenNav(false);
    context.setIsBottomShow(true);
  };

  const openSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const closeSearch = () => {
    setIsOpenSearch(false);
  };

  const gotoTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openFilter = () => {
    context?.setIsOpenFilters(!context?.isOpenFilters);
  };

  return (
    <>
      <Button className="gotoTop" ref={gotoTop} onClick={gotoTopScroll}>
        <FaAngleUp />
      </Button>

      <div className="headerWrapperFixed" ref={headerRef}>
        <div className="headerWrapper">
          <div className="top-strip bg-blue">
            <div className="container">
              <p className="mb-0 mt-0 text-center">
                Due to the <b>COVID 19</b> epidemic, orders may be processed
                with a slight delay
              </p>
            </div>
          </div>

          <header className="header">
            <div className="container">
              <div className="row">
                <div className="logoWrapper d-flex align-items-center col-sm-2">
                  {context.windowWidth < 992 && (
                    <Button className="circle toggleNav" onClick={openNav}>
                      <IoMdMenu />
                    </Button>
                  )}

                  <Link to={"/"} className="logo">
                    <img src={Logo} alt="Logo" />
                  </Link>

                  {context.windowWidth < 992 && (
                    <div className="position-relative cartTab">
                      <Link to="/cart" className="ml-auto">
                        <Button className="circle">
                          <IoBagOutline />
                        </Button>

                        <span className="count d-flex align-items-center justify-content-center">
                          {context.cartData?.length > 0
                            ? context.cartData?.length
                            : 0}
                        </span>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="col-sm-10 d-flex align-items-center part2">
                  {context.countryList.length !== 0 &&
                    context.windowWidth > 992 && <CountryDropdown />}

                  <div
                    className={`headerSearchWrapper ${
                      isOpenSearch === true && "open"
                    }`}
                  >
                    <div className=" d-flex align-items-center">
                      <SearchBox closeSearch={closeSearch} />
                    </div>
                  </div>

                  <div className="part3 d-flex align-items-center ml-auto">
                    {context.isLogin !== true && context.windowWidth > 992 && (
                      <Link to="/signIn">
                        <Button className="btn-blue btn-round mr-3">
                          Sign In
                        </Button>
                      </Link>
                    )}

                    {context.isLogin === true && (
                      <div className="res-hide">
                        <Button className="circle mr-3" onClick={handleClick}>
                          <FiUser />
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          id="accDrop"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <div className="info d-flex align-items-center">
                            <div className="img">
                              {context?.user?.image !== undefined ? (
                                <UserAvatarImgComponent
                                  img={context?.user?.image}
                                />
                              ) : (
                                <UserAvatarImgComponent
                                  userName={context?.user?.name?.toUpperCase()}
                                  img={context?.user?.image}
                                />
                              )}
                            </div>

                            <div className="ml-3">
                              <h5 className="mb-1 mt-0">
                                {context?.user?.name}
                              </h5>
                              <h6 className="text-sml text-light">
                                {context?.user?.email}
                              </h6>
                            </div>
                          </div>

                          <Link to="/my-account">
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <FaUserAlt fontSize="small" />
                              </ListItemIcon>
                              My Account
                            </MenuItem>
                          </Link>
                          <Link to="/orders">
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <FaClipboardCheck fontSize="small" />
                              </ListItemIcon>
                              Orders
                            </MenuItem>
                          </Link>
                          <Link to="/my-list">
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <FaHeart fontSize="small" />
                              </ListItemIcon>
                              My List
                            </MenuItem>
                          </Link>
                          <MenuItem onClick={logout}>
                            <ListItemIcon>
                              <RiLogoutCircleRFill fontSize="small" />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                        </Menu>
                      </div>
                    )}

                    <div className="ml-auto cartTab d-flex align-items-center">
                      {context.windowWidth > 1000 && (
                        <span className="price">
                          {(context.cartData?.length !== 0
                            ? context.cartData
                                ?.map(
                                  (item) => parseInt(item.price) * item.quantity
                                )
                                .reduce((total, value) => total + value, 0)
                            : 0
                          )?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                      )}

                      <div className="position-relative ml-2 res-hide">
                        <Link to="/cart">
                          <Button className="circle">
                            <IoBagOutline />
                          </Button>
                          <span className="count d-flex align-items-center justify-content-center">
                            {context.cartData?.length > 0
                              ? context.cartData?.length
                              : 0}
                          </span>
                        </Link>
                      </div>

                      {context.windowWidth < 992 && (
                        <Button
                          className="circle ml-3 toggleNav res-hide"
                          onClick={openNav}
                        >
                          <IoMdMenu />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {context.categoryData?.length !== 0 && (
            <Navigation
              navData={context.categoryData}
              isOpenNav={isOpenNav}
              closeNav={closeNav}
            />
          )}
        </div>

        {context.windowWidth < 992 && context?.isBottomShow === true && (
          <div className="fixed-bottom-menu d-flex align-self-center justify-content-between">
            <Link to="/" onClick={() => setIsOpenSearch(false)}>
              <Button className="circle">
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <IoHomeOutline />
                  <span className="title">Home</span>
                </div>
              </Button>
            </Link>

            {context.enableFilterTab === true && (
              <Button className="circle" onClick={() => {
                openFilter();
                setIsOpenSearch(false)
              }}>
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <CiFilter />
                  <span className="title">Filters</span>
                </div>
              </Button>
            )}

            <Button className="circle" onClick={openSearch }>
              <div className="d-flex align-items-center justify-content-center flex-column">
                <IoIosSearch />
                <span className="title">Search</span>
              </div>
            </Button>

            <Link to="/my-list"  onClick={() => setIsOpenSearch(false)}>
              <Button className="circle">
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <IoMdHeartEmpty />
                  <span className="title">Wishlist</span>
                </div>
              </Button>
            </Link>

            <Link to="/orders"  onClick={() => setIsOpenSearch(false)}>
            <Button className="circle">
              <div className="d-flex align-items-center justify-content-center flex-column">
                <IoBagCheckOutline />
                <span className="title">Orders</span>
              </div>
            </Button>
          </Link>
            

            <Link to="/my-account"  onClick={() => setIsOpenSearch(false)}>
              <Button className="circle">
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <FaRegUser />
                  <span className="title">Account</span>
                </div>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
