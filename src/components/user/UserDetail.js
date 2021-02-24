import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"

export const UserDetail = (props) => {
  const { getSingleUser,getAllUsers } = useContext(UserContext)
  const userId = parseInt(props.match.params.id)
  //initial state of user is an object with user property
  const [user,setUser] = useState({user:{}})
  const[active,setActive] = useState('')
  const[isStaff,setisStaff] = useState('')
  

  useEffect(() => {
    getSingleUser(userId)
    .then(setUser)
    const date = new Date(user.created_on)
  }, [])
  console.log(props.match.params.id)

  useEffect(() => {
  if (user.user.active === 1) {
    setActive("active")
    } else {
    setActive("Disactive")
  }},[user])
  console.log(user)

  useEffect(() => {
    if (user.user.is_staff === 1) {
      setisStaff("Admin")
      } else {
      setisStaff("Author")
    }},[user])


  return (
    <>
      <h3>
        Name: {user.user.first_name} {user.user.last_name}
      </h3>
      <img src={user.profile_image} alt={user.user.first_name} width="100" />
      <p>Username: {user.user.username}</p>
      <p>Email: {user.user.email}</p>
      <p>Password: {user.user.password}</p>
      <p>Account Type: {isStaff}</p>
      <p>Bio: {user.bio}</p>
      <p>Activity Status: {active}</p>
      <p>
        Account Created On:{" "}
        {new Date(user.created_on).toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          timeZone: "America/Chicago",
        })}
      </p>
    </>
  )
}
