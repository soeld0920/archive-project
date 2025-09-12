import Logo from "components/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/Header.module.css"

type NavItemProps = {
  txt : string;
  href : string;
  subMenu? : SubMenuItem[];
}

type SubMenuItem = {
  txt : string;
  href : string;
}

const navList : NavItemProps[] = [
  {
    txt : "Basic",
    href : "/basic"
  },
  {
    txt : "Python",
    href : "/python"
  },
  {
    txt : "C",
    href : "/c"
  },
  {
    txt : "Java",
    href : "/java"
  },
  {
    txt : "React",
    href : "/react",
    subMenu : [
      {txt : "react", href : "/react/react"},
      {txt : "router", href : "/react/router"},
      {txt : "vite", href : "/react/vite"},
    ]
  },
  {
    txt : "Node.js",
    href : "/node",
  },
  {
    txt : "Github",
    href : "/github"
  },
  {
    txt : "Algorithm",
    href : "/algorithm",
    subMenu : [
      {
        txt : "DP",
        href : "/algorithm/dp"
      },
      {
        txt : "Greedy",
        href : "/algorithm/greedy"
      }
    ]
  }
]

export default function Header(){
  return(
    <header className={styles.header}>
      <Logo variant="main" coverTag="h1" className={styles.logo}/>
      <Nav/>
    </header>
  )
}

function Nav(){
  return(
    <nav className={styles.nav}>
      <ul className={styles.navUl}>
        {
          navList.map((navItem) => (
            <NavItem txt={navItem.txt} href={navItem.href} subMenu={navItem.subMenu} key={navItem.txt}/>
          ))
        }
      </ul>
    </nav>
  )
}

function NavItem({txt, href, subMenu} : NavItemProps){
  const [open, setOpen] = useState(false);
  return (
    <li className={styles.navItem}>
      <Link to={href} className={`mouseHoverEvent-Link ${styles.navText}`}>
        {txt}
      </Link>
      {subMenu &&
        <>
          <button 
            type="button"
            aria-expanded = {open}
            aria-controls={`submenu - ${txt}`}
            aria-haspopup="menu"
            onClick={() => setOpen(!open)}
            className={styles.subMenuBtn}
          >{!open ? "▼" : "▲"}</button>
          {open && <SubNavToggle subMenuList = {subMenu} id = {txt}/>}
        </>
      }
    </li>
  )
}

type SubNavToggleProps = {subMenuList : SubMenuItem[]; id : string}

function SubNavToggle({subMenuList, id} : SubNavToggleProps){
  return(
    <ul className={styles.subNav} id={`submenu - ${id}`}>
      {
        subMenuList.map((item) => (
          <SubNavItem subMenu={item} key={item.txt} />
        )) 
      }
    </ul>
  )
}

type SubNavItemProps = {subMenu : SubMenuItem}

function SubNavItem({subMenu} : SubNavItemProps){
  const {txt,href} = subMenu;
  return(
    <li className={styles.subNavItem}>
      <Link to={href} className={"mouseHoverEvent-Link " + styles.subNavText}>{txt}</Link>
    </li>
  )
}