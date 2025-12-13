import styles from "@/app/page.module.css";
import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

type HeaderProps = {
  children?: ReactNode;
  title?: string;
  action?: ReactNode;
};

type ContentProps = {
  children: ReactNode;
  disableScroll?: boolean;
};

type FooterProps = {
  children: ReactNode;
};

export function Header({ children, title, action }: HeaderProps) {
  return (
    <div className={styles.outerHeader}>
      <div className={styles.header}>
        {!!title ? <h1 className={styles.title}>{title}</h1> : null}
        {action ? <div className={styles.headerAction}>{action}</div> : null}
      </div>
      {children}
    </div>
  );
}

export function Content({ children, disableScroll = false }: ContentProps) {
  return (
    <div className={styles.content}>
      <div
        className={
          disableScroll ? styles.fixedContent : styles.scrollableContent
        }
      >
        {children}
      </div>
    </div>
  );
}

export function Footer({ children }: FooterProps) {
  return <div className={styles.outerFooter}>{children}</div>;
}

import ThemeControls from "./ThemeControls";

// ... (existing imports)

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className={styles.container}>
      <ThemeControls />
      {children}
    </main>
  );
}
