import React, { useContext, useEffect, useState } from 'react'
import {CommentContext} from "./CommentProvider"
import {Comment} from "./Comment"

export const CommentList = (props) => {
    const { deleteComment, getComments, addComment, comments } = useContext(CommentContext)

    useEffect(() => {
        console.log("CommentsList View")
        getComments()
    }, [])

return (     
    <div> 
    <h3>This will be a list of a Post's Comments</h3>
    {
        comments.map(commentObj => <Comment key={commentObj.id} comment={commentObj} props={props}/> )
    }
    </div> 
)
}