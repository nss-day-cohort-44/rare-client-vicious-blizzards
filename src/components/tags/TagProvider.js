import React, { useState } from 'react'

export const TagContext = React.createContext()

export const TagProvider = (props) => {

    const [tags, setTags] = useState([])

    const getTags = () => {
		return fetch("http://localhost:8000/tags",{
    headers: {
      "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
    }
  })
		.then(res => res.json())
		.then(setTags);
	}

  const getSingleTag = (id) =>{
    return fetch(`http://localhost:8000/tags/${id}`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
    }
    })
        .then(res => res.json())
        .then(setTags)
    }

	const addTag = (tag) => {
		return fetch("http://localhost:8000/tags", {
			method: "POST",
			headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
			},
			body: JSON.stringify(tag)
		})
		.then(getTags)
    }
    
    const deleteTag = (id) => {
        return fetch(`http://localhost:8000/tags/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
          },
        })
           .then(getTags)  
         
        }

      const updateTag = (tag) => {
        return fetch(`http://localhost:8000/tags/${tag.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
          },
          body: JSON.stringify(tag)
          })
          .then(getTags)
          }

	return <TagContext.Provider value = {{
		tags, getTags, addTag, deleteTag, updateTag, getSingleTag 
	}}>
		{props.children}
	</TagContext.Provider>
}

