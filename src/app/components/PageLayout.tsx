import styles from "@/app/page.module.css";
import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

type HeaderProps = {
  children?: ReactNode;
  title?: string;
};

type ContentProps = {
  children: ReactNode;
};

type FooterProps = {
  children: ReactNode;
};

export function Header({ children, title }: HeaderProps) {
  return (
    <div className={styles.outerHeader}>
      <title>{title}</title>
      <div className={styles.header}>
        {!!title ? <h1 className={styles.title}>{title}</h1> : null}
      </div>
      {children}
    </div>
  );
}

export function Content({ children }: ContentProps) {
  return (
    <div className={styles.content}>
      <div className={styles.scrollableContent}>{children}</div>
    </div>
  );
}

export function Footer({ children }: FooterProps) {
  return <div className={styles.outerFooter}>{children}</div>;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <main className={styles.container}>{children}</main>;
}
