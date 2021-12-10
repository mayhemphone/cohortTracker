import { Head, BlitzLayout } from "blitz"

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
            <h1>cohortTracker</h1>
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
