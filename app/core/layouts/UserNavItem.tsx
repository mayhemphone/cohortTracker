import React from "react"
import { useMutation } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { User } from "db"
import { CurrentUser } from "app/users/queries/returnTypes"

type Props = {}

const UserNavItem = ({}: Props) => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) return <UserIcon user={currentUser} />
  return <React.Fragment>UserNavItem</React.Fragment>
}

export default UserNavItem

type UserIconProps = {
  user: CurrentUser
}

const UserIcon = ({ user }: UserIconProps) => {
  return (
    <div
      style={{
        height: "36px",
        width: "36px",
        borderRadius: "50%",
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 800,
      }}
      className="background-primary"
    >
      {user.firstName?.at(0)}
    </div>
  )
}
