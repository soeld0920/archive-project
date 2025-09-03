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
        txt : "Greed",
        href : "/algorithm/greed"
      }
    ]
  }
]

export default function Header(){
  return(
    <header id={styles.header}>
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
          navList.map((navItem,idx) => (
            <NavItem txt={navItem.txt} href={navItem.href} subMenu={navItem.subMenu} key={idx}/>
          ))
        }
      </ul>
    </nav>
  )
}

function NavItem({txt, href, subMenu} : NavItemProps){
  const [open, setOpen] = useState(false);
  return (
    <li style={{position : "relative",display : "flex", justifyContent : "space-between"}}>
      <Link to={href} className={`mouseHoverEvent-Link ${styles.navText}`}>
        {txt}
      </Link>
      {subMenu &&
        <>
          <button 
            type="button"
            onClick={() => setOpen(!open)}
            className={styles.subMenuBtn}
          >{!open ? "▽" : "△"}</button>
          {open && <SubNavToggle subMenuList = {subMenu}/>}
        </>
      }
    </li>
  )
}

type SubNavToggleProps = {subMenuList : SubMenuItem[]}

function SubNavToggle({subMenuList} : SubNavToggleProps){
  return(
    <ul className={styles.subNav}>
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