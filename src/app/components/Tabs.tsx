"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaUsers, FaStar } from "react-icons/fa";
import styles from "./Tabs.module.css";

export default function Tabs() {
  const pathname = usePathname();
  const activeTab = pathname.includes("/favorites") ? "favorites" : "all";

  return (
    <div className={styles.tabs}>
      <Link
        href="/"
        className={styles.tab}
        data-active={activeTab === "all"}
      >
        <FaUsers />
        All Contacts
      </Link>
      <Link
        href="/favorites"
        className={styles.tab}
        data-active={activeTab === "favorites"}
      >
        <FaStar />
        Favorites
      </Link>
    </div>
  );
}
