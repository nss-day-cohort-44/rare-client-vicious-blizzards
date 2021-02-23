import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { AllPost } from "./AllPost"

export const AllPostList = (props) => {
  const { posts, getPosts } = useContext(PostContext)

  useEffect(() => {
    getPosts()
  }, [])
  console.log(posts)
  return (
    <div>
      <h3>Posts</h3>
      {posts.map((p) => (
        <AllPost key={p.id} post={p} props={props} />
      ))}
    </div>
  )
}
