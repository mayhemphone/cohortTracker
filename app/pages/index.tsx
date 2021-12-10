import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Logo from "app/core/components/Logo"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="login-link"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <div className="center-center">
        <div id="welcome">
          <div className="center-center" style={{ marginBottom: "36px" }}>
            <Logo />
          </div>
          <h1>Welcome!</h1>
          <p>
            This is your open-source cohort tracker we&apos;ll use for
            <span className="italics"> all the things</span>!
          </p>
          <ul>
            <li>downloading lessons</li>
            <li>find and turn in homework</li>
            <li>get feedback</li>
            <li>review zoom recordings</li>
            <li>and probably other things</li>
          </ul>
          <Link href={Routes.SignupPage()}>
            <a className="login-link">
              <strong>Sign Up</strong>
            </a>
          </Link>
          <Link href={Routes.LoginPage()}>
            <a className="login-link">
              <strong>Login</strong>
            </a>
          </Link>
        </div>
      </div>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <UserInfo />
    </Suspense>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
