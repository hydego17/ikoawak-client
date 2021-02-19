import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Toggle from "react-toggle";

import { useTheme } from "next-themes";

import { FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <HeaderStyled>
      <header className="container">
        <ul className="nav-header">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/archive">
              <a>Posts</a>
            </Link>
          </li>
        </ul>
        <div className="nav-toggle">
          <label htmlFor="theme-toggle"></label>
          <Toggle
            id="theme-toggle"
            aria-labelledby="theme-toggle"
            checked={theme === "dark"}
            icons={{
              checked: <BsSun />,
              unchecked: <FaMoon />,
            }}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>
      </header>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.nav`
  position: sticky;
  z-index: 2;
  top: 0;
  padding: 2rem 0;
  margin-bottom: 3rem;

  backdrop-filter: saturate(180%) blur(30px);

  @media screen and (min-width: 30em) {
    margin-top: 2rem;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul.nav-header {
      display: flex;

      li {
        padding-right: 1rem;
      }
    }
  }

  .react-toggle-track-check {
    height: 16px;
    left: 5px;
    svg {
      padding: 1px;
      color: #ffdf75;
    }
  }
  .react-toggle-track-x {
    height: 16px;
    svg {
      padding: 1.5px;
      color: #ffdf75;
    }
  }
`;
