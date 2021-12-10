import { Head, BlitzLayout } from "blitz"
import Logo from "../components/Logo"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "cohortTracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="layout" className="container">
        <header>
          <nav>
            <Logo />
            <div className="nav-items">
              <a href="blah">blah</a>
              <a href="blah">blah</a>
              <a href="blah">blah</a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
