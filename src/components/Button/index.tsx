import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ children, className, onClick, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        "h-14 font-bold text-white w-full border border-[#0FF9F7] rounded-lg",
        className
      )}
    >
      {children}
    </button>
  );
}
