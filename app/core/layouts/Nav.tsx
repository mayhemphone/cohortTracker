import React from "react"
import Logo from "../components/Logo"
import UserNavItem from "./UserNavItem"
import { Suspense } from "react"
import { Link, Routes } from "blitz"

type Props = {}

const Nav = ({}: Props) => {
  return (
    <nav>
      <Link href={Routes.Home()}>
        <a style={{ textDecoration: "none" }}>
          <Logo />
        </a>
      </Link>
      <div className="nav-items">
        <Link href={Routes.StudentsPage()}>
          <a>Students</a>
        </Link>
        <Link href={Routes.InstructorsPage()}>
          <a>Instructors</a>
        </Link>
        <Suspense fallback="Loading...">
          <UserNavItem />
        </Suspense>
      </div>
    </nav>
  )
}

export default Nav
