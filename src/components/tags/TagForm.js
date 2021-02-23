  
import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider"



export const TagForm = (props) => {
    // Use the required context providers for data
    const { addTag, getTags, tags, updateTag } = useContext(TagContext)
  
    // Component state
    const [tag, setTag] = useState({})
    // Is there a a URL parameter??
    const editMode = props.location.hasOwnProperty("tagId")

  
    const handleControlledInputChange = (event) => {
      /*
          When changing a state object or array, always create a new one
          and change state instead of modifying current one
      */

      const newTag = Object.assign({}, tag)
      newTag[event.target.name] = event.target.value
      setTag(newTag)
      }
  
    const getTagInEditMode = () => {
      if (editMode) {
        const tagId = parseInt(props.location.tagId)
        const selectedTag = tags.find(t => t.id === tagId) || {}
        setTag(selectedTag)
      }
    }
  
       
    useEffect(() => {
        getTags()
    }, [])
  
    // Once provider state is updated, determine the tag (if edit)
    useEffect(() => {
        getTagInEditMode()
      }, [tags])
  
  
    const constructNewTag = () => {
  
        if (editMode) {
            updateTag({
            id: props.location.tagId,
            label: tag.label
          })
            .then(() => props.history.push("/tags"))
        } else {
            addTag({
            label: tag.label
            
          })
            .then(() => props.history.push("/tags"))
        }
      }

      // console.log("incoming tag", tag)
    
    return (
      <form className="tagForm">
        <h2 className="tagForm__title">{editMode ? "Update Tag" : "Add Tag"}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label">Tag label: </label>
            <input type="text" name="label" required autoFocus className="form-control"
              placeholder="Tag name"
              onChange={handleControlledInputChange}
              value={tag.label}
            />
          </div>
        </fieldset>
       
        
        <button type="submit"
          onClick={evt => {
            evt.preventDefault()
            constructNewTag()
            // console.log('Did anything actually happen here?', tag)
          }}
          className="btn btn-primary">
          {editMode ? "Save New Tag" : "Submit Tag"}
        </button>
        <button onClick={() => {
                    props.history.push(`/tags`)
                }}>Back
                </button>
      </form>
    )
  
}