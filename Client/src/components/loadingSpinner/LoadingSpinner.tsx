import { useEffect } from "react";

export default function LoadingSpinner() {
  // dim background color to 0,0,0,0.5
  useEffect(() => {
    document.body.style.backgroundColor = "rgba(0,0,0,0.5)";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div
      className="z-30 inline-block fixed top-1/2 left-1/2 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
