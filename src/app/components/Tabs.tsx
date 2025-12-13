"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaUsers, FaStar } from "react-icons/fa";
import styles from "./Tabs.module.css";

type TabsProps = {
  allCount?: number;
  favoriteCount?: number;
};

export default function Tabs({ allCount, favoriteCount }: TabsProps) {
  const pathname = usePathname();
  const activeTab = pathname.includes("/favorites") ? "favorites" : "all";

  return (
    <div className={styles.tabs}>
      <Link href="/" className={styles.tab} data-active={activeTab === "all"}>
        <FaUsers />
        All Contacts
        {allCount !== undefined && (
          <span className={styles.counter}>({allCount})</span>
        )}
      </Link>
      <Link
        href="/favorites"
        className={styles.tab}
        data-active={activeTab === "favorites"}
      >
        <FaStar />
        Favorites
        {favoriteCount !== undefined && (
          <span className={styles.counter}>({favoriteCount})</span>
        )}
      </Link>
    </div>
  );
}
