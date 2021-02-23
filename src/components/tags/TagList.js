import React, { useContext, useEffect, useState } from 'react'
import {TagContext} from "./TagProvider"
import {Tag} from "./TagDetails"
import { Link, useHistory } from "react-router-dom"


export const TagList = (props) => {

const { deleteTag, getTags, addTag, tags } = useContext(TagContext)
useEffect(() => {
    // console.log("HERE")
    getTags()
}, [])

return (     
    <div className="tags"> 
    <h3>Tags</h3>
    <Link to="/tags/create">Create</Link> 

    {
        tags.map(tagObj =>  <Tag key={tagObj.id} tag={tagObj} props={props}/> )
    }
    </div> 
)}
