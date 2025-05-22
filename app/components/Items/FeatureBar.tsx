import cn from "clsx";

interface FeatureBarProps {
  className?: string;
  title: string;
  description?: string;
  hide?: boolean;
  action?: React.ReactNode;
}

const style = `{
  text-center p-6 bg-gray-800 text-sm flex-row  text-white
  justify-center items-center font-medium fixed bottom-0
  w-full z-30 transition-all duration-300 ease-out
  md:flex md:text-left;
}`;

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  className,
  action,
  hide,
}) => {
  const rootClassName = cn(
    style,
    {
      transform: true,
      "translate-y-0 opacity-100": !hide,
      "translate-y-full opacity-0": hide,
    },
    className
  );
  return (
    <div className={rootClassName}>
      <span className="block md:inline">{title}</span>
      <span className="block mb-6 md:inline md:mb-0 md:ml-2">
        {description}
      </span>
      {action && action}
    </div>
  );
};

export default FeatureBar;
