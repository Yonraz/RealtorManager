import { PiHouseLineLight } from "react-icons/pi";
import Icon from "../icon/Icon";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ClickableIcon from "../icon/ClickableIcon";
import { CgMenuLeft } from "react-icons/cg";

export default function Header(props: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <nav className="header">
        <div className="navbar-menu">
          <ClickableIcon
            icon={<CgMenuLeft size={50} />}
            onClick={props.toggleSidebar}
            className={
              props.isOpen
                ? "menu-btn-engaged header-icon"
                : "menu-btn header-icon"
            } // {
          />
          <div className="admin-button text-xs">
            {isLoggedIn ? (
              <button onClick={() => navigate("/admin")}>ניהול</button>
            ) : (
              <button onClick={() => navigate("/login")}>כניסת מנהל</button>
            )}
          </div>
        </div>
        <div className="bg-none bg-transparent" onClick={() => navigate("/")}>
          <Icon icon={<PiHouseLineLight size={50} />} className="header-icon" />
        </div>
      </nav>
    </>
  );
}
