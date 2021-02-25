import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { CommentContext } from "../comments/CommentProvider"
import { Comment } from "../comments/Comment"
import { AllPost } from "./AllPost"
import { Link } from "react-router-dom"


export const PostDetail = (props) => {
    const { getSinglePost, post, setPost, deletePost } = useContext(PostContext)

    // console.log(props)
    const postId = parseInt(props.match.params.postId)
    useEffect(() => {
        getSinglePost(postId)
    }, [])

    const confirmDelete = () => {
        const d = window.confirm("Would you like to delete this?")
        if (d === true) {
            deletePost(postId).then(() => { props.history.push("/posts") })
        }
    }

    console.log("post", post)
    return (
        <section className="post__detail">
            <div className="post--title">{post.title}</div>
            <div className="post--buttons">
            { post.is_current_user ? <>
                <button onClick={() => { confirmDelete() }}>Delete Post</button> 
                <button onClick={() => { props.history.push(`/posts/edit/${post.id}`) }}>
                Edit Post</button> </> : <> {""}</>
            }
            </div>
            <div className="post--category">{post.category.label}</div>
            <div><img className="post--image" src={post.post_image_url}></img></div>
            <div>By {post.user.user.username}</div>
            <div>{post.publication_date}</div>
            <div><button onClick={() => { props.history.push(`/comments/${post.id}`) }}>
                View Comments</button></div>
            <div>{post.content}</div>
            {/* <h3>Comments</h3>
            {
                post.comments.map(commentObj => <Comment key={commentObj.id} comment={commentObj} props={props} />)
            }
            <Link to={{
                pathname: `/posts/addcomment`,
                state: { chosenPost: post }
            }}>Add a Comment</Link> */}
        </section>
    )
}