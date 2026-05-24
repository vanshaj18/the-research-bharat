import { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "nav" | "footer";
};

export default function PageShell({
  children,
  className = "",
  as: Tag = "div",
}: PageShellProps) {
  return <Tag className={`page-shell w-full ${className}`.trim()}>{children}</Tag>;
}
