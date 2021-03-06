import React, { useState, useContext } from "react"
import { PostTagContext } from "../postTags/PostTagProvider"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ category: {}, user: {user: {}}, tags: {} })
  const [postId, setPostId] = useState(0)
  const { addPostTag } = useContext(PostTagContext)

  const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setPosts)
  }

  const getPostsByUserId = (userId) => {
    userId = localStorage.getItem("rare_user_id")
    return fetch(`http://localhost:8000/posts?user_id=${userId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setPosts)
  }

  const getSinglePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setPost)
  }

  const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getPosts)
  }

  const addPost = (post) => {
    return fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getPosts)
  }

  const deletePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE",
    }).then(getPosts)
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        getPosts,
        updatePost,
        deletePost,
        getSinglePost,
        getPostsByUserId,
        post,
        setPost,
        postId,
        setPostId,
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}
