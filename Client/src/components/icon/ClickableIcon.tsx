import Icon from "./Icon";

interface ClickableIconProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
  className?: string;
}

export default function ClickableIcon({
  icon,
  onClick,
  tooltip,
  className,
}: ClickableIconProps) {
  return (
    <div onClick={onClick}>
      <Icon icon={icon} tooltip={tooltip} className={className} />
    </div>
  );
}
