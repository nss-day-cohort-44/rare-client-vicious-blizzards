import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { CommentContext } from "../comments/CommentProvider"
import { Comment } from "../comments/Comment"
import { AllPost } from "./AllPost"
import { Link } from "react-router-dom"


export const PostDetail = (props) => {
    const { getSinglePost, post, setPost, deletePost } = useContext(PostContext)
    const { comments, relatedComments, getCommentsByPostId } = useContext(CommentContext)

    // console.log(props)
    const postId = parseInt(props.match.params.postId)
    useEffect(() => {
        // const postId = parseInt(props.match.params.postId)
        getSinglePost(postId)
        getCommentsByPostId(postId)
            .then(setPost(post))
    }, [])


    const confirmDelete = () => {
        const d = window.confirm("Would you like to delete this?")
        if (d === true) {
            deletePost(postId).then(() => { props.history.push("/posts") })
        }
    }

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getCommentsByPostId(postId)
    }, [comments])

    // console.log(post)
    return (
        <>
            <div>{post.title}</div>
            <div>{post.publication_date}</div>
            <div>{post.image_url}</div>
            <div>{post.content}</div>
            {/* <div>{post.category.label}</div> */}
            <div>{post.username}</div>
            { parseInt(localStorage.getItem("rare_user_id")) === post.user_id ? <>
                <button onClick={() => { confirmDelete() }}>Delete Post</button> 
                <button onClick={() => { props.history.push(`/posts/edit/${post.id}`) }}>
                Edit Post</button> </> : <> {""}</>
            }
            <h3>All comments</h3>
            {
                relatedComments.map(commentObj => <Comment key={commentObj.id} comment={commentObj} props={props} />)
            }
                
            <button onClick={() => { props.history.push(`/posts/${postId}`) 
                // state: { chosenPost: post }
            }}>  View Comments </button>
        </>
    )
}