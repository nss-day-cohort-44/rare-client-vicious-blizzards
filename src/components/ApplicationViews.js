import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { UserPostList } from "./posts/UserPostsList"
import { CommentProvider } from "./comments/CommentProvider"
import { CommentList } from "./comments/CommentList"
import { AllPostList } from "./posts/AllPostList"
import { PostDetail } from "./posts/PostDetail"
import { CategoryProvider } from "./categories/CategoryProvider"
import { CategoryList } from "./categories/CategoryList"
import { CategoryForm } from "./categories/CategoryForm"
import { PostForm } from "./posts/PostForm"
import { TagProvider } from "./tags/TagProvider"
import { TagForm } from "./tags/TagForm"
import { TagList } from "./tags/TagList"
import { PostTagProvider } from "./postTags/PostTagProvider"
import { PostTagList } from "./postTags/PostTagList"
import { AddTagForm } from "./postTags/AddTagForm"
import { CommentForm } from "./comments/CommentForm"
import { UserList } from "./user/UserList"
import { UserDetail } from "./user/UserDetail"
import { UserProvider } from "./user/UserProvider"
export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <TagProvider>
          <PostTagProvider>
            <PostProvider>
              <UserProvider>
                <CategoryProvider>
                  <CommentProvider>
                    <Route
                      path="/posts/manage_tags/:postId(\d+)"
                      render={(props) => <PostTagList {...props} />}
                    />
                    <Route
                      path="/posts/add_tags/:postId(\d+)"
                      render={(props) => <AddTagForm {...props} />}
                    />
                    <Route
                      path="/posts/edit/:postId(\d+)"
                      render={(props) => <PostForm {...props} />}
                    />
                    <Route path="/posts/create" render={(props) => <PostForm {...props} />} />
                    <Route exact path="/posts" render={(props) => <AllPostList {...props} />} />
                    {/* <Route exact path="/posts" render={(props) => <UserPostList {...props} />} /> */}
                    <Route
                      path="/posts/:postId(\d+)"
                      render={(props) => <PostDetail {...props} />}
                    />
                    <Route
                      path="/posts/addcomment"
                      render={(props) => <CommentForm {...props} />}
                    />
                    <Route
                      path="/comments/edit/:commentId(\d+)"
                      render={(props) => <CommentForm {...props} />}
                    />
                    <Route
                      path="/comments/:postId(\d+)"
                      render={(props) => <CommentList {...props} />}
                    />

                    <Route
                      exact
                      path="/categories"
                      render={(props) => <CategoryList {...props} />}
                    />

                    <Route
                      exact
                      path="/categories/create"
                      render={(props) => <CategoryForm {...props} />}
                    />
                    <Route
                      path="/categories/edit/:categoryId(\d+)"
                      render={(props) => <CategoryForm {...props} />}
                    />
                    <Route exact path="/tags" render={(props) => <TagList {...props} />} />
                    <Route exact path="/tags/create" render={(props) => <TagForm {...props} />} />
                    <Route
                      exact
                      path="/tags/edit/:id(\d+)"
                      render={(props) => <TagForm {...props} />}
                    />
                    <Route exact path="/users" 
                    render={(props) => <UserList {...props} />} />
                    <Route
                      exact
                      path="/users/:id(\d+)"
                      render={(props) => <UserDetail {...props} />}
                    />
                  </CommentProvider>
                </CategoryProvider>
              </UserProvider>
            </PostProvider>
          </PostTagProvider>
        </TagProvider>
      </main>
    </>
  )
}
