import {
  MdDarkMode,
  MdLightMode,
  MdMapsHomeWork,
  MdQuestionMark,
} from "react-icons/md";
import Icon from "../icon/Icon";
import { FaSearch } from "react-icons/fa";
import useDarkMode from "../../hooks/useDarkMode";
import ClickableIcon from "../icon/ClickableIcon";
import { CgClose } from "react-icons/cg";

export default function Sidebar(props: {
  isOpen: boolean;
  toggleIsOpen: () => void;
}) {
  const { isOpen, toggleIsOpen } = props;
  const [darkModeEnabled, setDarkModeEnabled] = useDarkMode();
  function toggleDarkMode() {
    setDarkModeEnabled(!darkModeEnabled);
  }
  return (
    <div className={isOpen ? "open-sidebar" : "closed-sidebar"}>
      <div className="fixed z-10 h-full top-[-70px] right-0 w-16 m-0 flex flex-col justify-between text-gray-900 bg-white-300 dark:bg-gray-900 dark:text-white-500 shadow-lg">
        <div className="my-20">
          <ClickableIcon
            icon={<CgClose size={50} />}
            tooltip="סגור"
            onClick={toggleIsOpen}
          />
          <Icon icon={<MdMapsHomeWork size={50} />} tooltip="נכסים" />
          <Icon icon={<FaSearch size={40} />} tooltip="חיפוש" />
          <Icon icon={<MdQuestionMark size={50} />} tooltip="עזרה" />
        </div>
        <div>
          <ClickableIcon
            icon={
              darkModeEnabled ? (
                <MdDarkMode size={50} />
              ) : (
                <MdLightMode size={50} />
              )
            }
            tooltip="ערכת נושא"
            onClick={toggleDarkMode}
          />
        </div>
      </div>
    </div>
  );
}
