import classNames from "classnames";

type Props = {
  color?: "home";
  className?: string;
  children: React.ReactNode;
};

export function Container({ color = "home", className, children }: Props) {
  return (
    <div
      className={classNames(
        "flex rounded-[27px] shadow-lg w-[102.5rem] h-[54.75rem] p-14 relative",
        { "bg-gradient-to-br from-[#092A49] to-[#093A49]": color === "home" },
        className
      )}
    >
      {children}
    </div>
  );
}
