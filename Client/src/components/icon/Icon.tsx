import "./Icon.css";
interface IconProps {
  icon: React.ReactNode;
  tooltip?: string;
  className?: string;
  backgroundColor?: string;
}

const Icon = ({ icon, tooltip, className }: IconProps) => {
  return (
    <div className={className ? `${className} group` : "sidebar-icon group"}>
      {icon}
      {tooltip && (
        <span className="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
      )}
    </div>
  );
};

export default Icon;
