import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
  const [users, setUsers] = useState([])

  const getAllUsers = () => {
    return fetch("http://localhost:8000/users",{
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setUsers);
  }

  const getSingleUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}`,{
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then((res) => res.json())
    }

  const createUser = (newUser) => {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(getAllUsers)
  }

  const updateUser = (newUser) => {
    return fetch(`http://localhost:8000/users/${newUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(getAllUsers)
  }
  return (
    <UserContext.Provider value={{ users, getAllUsers, getSingleUser, createUser, updateUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
