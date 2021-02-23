import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { AllPost } from "./AllPost"

export const AllPostList = (props) => {
  const { posts, getPosts } = useContext(PostContext)
  const history = useHistory()

  useEffect(() => {
    getPosts()
  }, [])
  console.log(posts)
  return (
    <div>
      <h3>Posts</h3>
      <button onClick={() => history.push("/posts/create")}>Create New Post</button>
      {posts.map((p) => (
        <AllPost key={p.id} post={p} props={props} />
      ))}
    </div>
  )
}
