import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyriht &copy; DJ Events 2022</p>
      <Link href="/about">About this project</Link>
    </footer>
  );
}
