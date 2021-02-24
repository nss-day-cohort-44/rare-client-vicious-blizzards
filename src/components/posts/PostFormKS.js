import React, { useContext, useRef, useEffect, useState } from "react"
import { CategoryContext } from "../categories/CategoryProvider"
import { PostContext } from "./PostProvider"
import { TagContext } from "../tags/TagProvider"
import { PostTagContext } from "../postTags/PostTagProvider"

export const PostForm = (props) => {
  const { addPost, updatePost, posts, getPosts, postId } = useContext(PostContext)
  const { categories, getCategories } = useContext(CategoryContext)
  const { tags, getTags } = useContext(TagContext)
  const { postTags, getAllPostTags, deletePostTag, addPostTag } = useContext(PostTagContext)
  const [tagArrayState, setTagArray] = useState([])

  const [formPost, setFormPost] = useState({})

  const editMode = props.match.params.hasOwnProperty("postId")

  const category = useRef(null)
  const title = useRef(null)
  const publication_date = useRef(null)
  const image_url = useRef(null)
  const content = useRef(null)
  const postTag = useRef(null)

  const handleControlledInputChange = (event) => {
    const newPost = Object.assign({}, formPost)
    newPost[event.target.name] = event.target.value
    setFormPost(newPost)
  }

  const getPostInEditMode = () => {
    if (editMode) {
      const postId = parseInt(props.match.params.postId)
      const selectedPost = posts.find((p) => p.id === postId) || {}
      setFormPost(selectedPost)
    }
  }
  useEffect(() => {
    getPosts()
    getCategories()
    getTags()
  }, [])

  useEffect(() => {
    getPostInEditMode()
  }, [posts])

  const checkForChecked = (event) => {
    const tagArray = tagArrayState
    if (event.target.checked) {
      if (!tagArray.includes(parseInt(event.target.value))) {
        tagArray.push(parseInt(event.target.value))
      }
    } else {
      if (tagArray.indexOf(parseInt(event.target.value)) !== -1) {
        console.log("????")
        tagArray.splice(tagArray.indexOf(parseInt(event.target.value)), 1)
      }
    }
    console.log(tagArray)
    setTagArray(tagArray)
  }

  const constructNewPost = () => {
    if (editMode) {
      updatePost({
        id: formPost.id,
        user_id: parseInt(localStorage.getItem("rare_user_id")),
        category_id: parseInt(formPost.category_id),
        title: formPost.title,
        publication_date: Date.now(),
        image_url: formPost.image_url,
        content: formPost.content,
        approved: true,
      }).then(() => props.history.push("/posts"))
    } else {
      console.log(tagArrayState)
      addPost(
        {
          user_id: parseInt(localStorage.getItem("rare_user_id")),
          category_id: parseInt(formPost.category_id),
          title: formPost.title,
          publication_date: Date.now(),
          image_url: formPost.image_url,
          content: formPost.content,
          approved: true,
        },
        tagArrayState
      ).then(() => props.history.push("/posts"))
    }
  }

  return (
    <form>
      <h2>{editMode ? "Update Post" : "Submit Post"}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="title"
            defaultValue={formPost.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Image Url:</label>
          <input
            type="text"
            name="image_url"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="Image Url"
            defaultValue={formPost.image_url}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="category">Select a Category:</label>
          <select
            required
            name="category_id"
            defaultValue={formPost.category_id}
            onChange={handleControlledInputChange}
            className="form-control"
          >
            <option value="0">Select a category:</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          {!editMode ? <label htmlFor="tags">Select Tags:</label> : ""}
          {!editMode &&
            tags.map((t) => (
              <>
                <input
                  type="checkbox"
                  key={t.id}
                  name={t.label}
                  value={t.id}
                  ref={postTag}
                  onChange={(e) => checkForChecked(e)}
                ></input>
                <label htmlFor={t.label}>{t.label}</label>
              </>
            ))}
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Content:</label>
          <textarea
            type="text"
            name="content"
            required
            autoFocus
            className="form-control"
            rows="20"
            proptype="varchar"
            placeholder="Content"
            defaultValue={formPost.content}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault()
          constructNewPost()
        }}
        className="btn btn-primary"
      >
        {editMode ? "Save Updates" : "Make Post"}
      </button>
    </form>
  )
}
