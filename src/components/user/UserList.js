import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"

export const UserList = (props) => {
  console.log(props)
  const { users, getAllUsers } = useContext(UserContext)
  useEffect(() => {
    getAllUsers()
  }, [])
  console.log(users)
  return (
    <>
      <p>User List</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.user.first_name} {user.user.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
