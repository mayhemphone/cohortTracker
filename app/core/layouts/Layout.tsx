import { Head, BlitzLayout, useMutation } from "blitz"
import Nav from "./Nav"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "cohortTracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="layout" className="container">
        <header>
          <Nav />
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
