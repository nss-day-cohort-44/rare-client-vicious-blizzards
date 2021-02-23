import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { HumanDate } from "../utils/HumanDate"

export const AllPost = ({ post, props }) => {
  // when user provider is provided, if statement will need to be altered to user.id = localstorage.getItem(rare_user_id)
  if (!post) {
    post = {}
  }
  return (
    <div className="posts">
      <div>
        Title:{" "}
        <Link
          to={{
            pathname: `/posts/${post.id}`,
            state: { chosenPost: post },
          }}
        >
          {post.title}
        </Link>
      </div>
      <div>author: {post.user.user.username} </div>
      <div>category: {post.category.label}</div>
    </div>
  )
}
