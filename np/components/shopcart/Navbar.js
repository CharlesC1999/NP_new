import React from "react";
import Navstyles from "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      {/* 桌機 */}
      <nav className={`pt-5 ${Navstyles.navbarDesk}`}>
        <div className={`${Navstyles.cir} ${Navstyles.circle1}`}>
          {/* <span>1</span> */}
          {/* <span>購物車</span> */}
        </div>
        <div className={`${Navstyles.line}`} />
        <div className={`${Navstyles.cir} ${Navstyles.circle2}`}>
          {/* <span>2</span> */}
          {/* <span>填寫資料</span> */}
        </div>
        <div className={`${Navstyles.line}`} />
        <div className={`${Navstyles.cir} ${Navstyles.circle3}`} />
      </nav>

      {/* 手機 */}
      <nav className={`${Navstyles.navbarMobile} pt-3`}>
        <div className={`${Navstyles.cir} ${Navstyles.circle1}`} />
        <div className={`${Navstyles.line}`} />
        <div className={`${Navstyles.cir} ${Navstyles.circle2}`} />
        <div className={`${Navstyles.line}`} />
        <div className={`${Navstyles.cir} ${Navstyles.circle3}`} />
      </nav>
    </>
  );
};
export default Navbar;
