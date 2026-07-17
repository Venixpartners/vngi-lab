import "./globals.css";
import Link from "next/link";
import UserMenu from "../components/UserMenu";

export const metadata = {
  title: "VNGI Lab | Venix NextGen Initiative",
  description:
    "The Reverse Engine by Venix NextGen Initiative. AI can produce the answer. Can you find what it got wrong? Train the understanding behind the output.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700&family=Montserrat:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="container">
          <header className="topbar">
            <Link href="/" className="wordmark" aria-label="VNGI Lab home">
              <img src="/logo-reversed.png" alt="Venix NextGen" className="logo-img" />
              <span className="logo-lab">LAB</span>
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href="/">About</Link>
              <Link href="/challenges">Challenges</Link>
              <Link href="/leaderboard">Leaderboard</Link>
              <a href="https://venixnextgen.org" target="_blank" rel="noreferrer">VNGI Website</a>
              <UserMenu />
            </nav>
          </header>
          {children}
          <footer className="footer">
            <span>Venix NextGen Initiative Ltd/Gte (RC 9688595) | Lagos, Nigeria | <Link href="/policies" className="footlink">Policies</Link></span>
            <span>Innovate. Elevate. NextGen.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
