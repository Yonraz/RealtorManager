import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useDarkMode() {
  const [enabled, setEnabled] = useLocalStorage<boolean>("dark-mode", false);
  const isEnabled = typeof enabled === "boolean" ? enabled : false;

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;
    isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled, isEnabled]);
  return [isEnabled, setEnabled] as const;
}
