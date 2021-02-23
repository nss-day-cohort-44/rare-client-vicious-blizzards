import React, { useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { Link } from "react-router-dom"
import './Post.css'
import {HumanDate} from "../utils/HumanDate"


export const Post = ({post, props}) =>{
    // when user provider is provided, if statement will need to be altered to user.id = localstorage.getItem(rare_user_id)
    if(localStorage.getItem("rare_user_id")){
        return(
            
            <div className="posts">
               <div>userid: {post.user_id}</div>
                <div>category_id: {post.category_id}</div>
                <Link to={{
                    pathname: `/posts/${post.id}`,
                    state: { chosenPost: post }
                }}>title: {post.title}</Link>
                <div>publication_date: {<HumanDate date={Date(post.publication_date)} />}</div>
                <div>image_url: {post.post_image_url}</div>
                <div>content: {post.content}</div>
                <div>category: {post.category.label}</div>
                <Link to={{
                    pathname: `/posts/add_tags/${post.id}`,
                    state:{chosenPost: post}
                }}>Add Tags</Link>
                <Link to={{
                    pathname: `/posts/manage_tags/${post.id}`,
                    state:{chosenPost: post}
                }}>Manage Tags</Link>
            </div>
        )
    }else{
        return(
            <div>
                U havent made any posts
            </div>
        )
    }
}