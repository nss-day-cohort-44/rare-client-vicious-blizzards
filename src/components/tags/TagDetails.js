import React, { useContext } from "react"
import { TagContext } from "./TagProvider"



export const Tag = ({ tag, props }) => {

    const { deleteTag } = useContext(TagContext)
   
    const confirmDelete =()=>{
        const d = window.confirm("Are you sure you would like to delete this tag?")
        if(d===true){
            deleteTag(tag.id).then(() => { props.history.push("/tags") })
        }
     }

    if (localStorage.getItem("rare_user_id")) {
        return (
            <div className="tags">
                {tag.label}

               <button onClick={() => { confirmDelete() }}>Delete</button>  

               <button onClick={() => {props.history.push({ pathname: `/tags/edit/${tag.id}`,  tagId : tag.id  })}}> Edit </button>
            </div>
        )
    } else {
        return (
            <div>
                No tags
            </div>
        )
    }
}



