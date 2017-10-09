const url = "http://localhost:3001"

const headers = {
  headers: { 'Authorization': 'whatever-you-want' },
  credentials: 'include'
}

const headers2 = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const getCategories = () =>
  fetch(`${url}/categories`, {
    headers: {
      ...headers2
    }
  }).then(res => res.json()).then(data => data.categories)

export const getPosts = () =>
  fetch(`${url}/posts`, headers)
    .then(res => res.json())

export const getCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, headers)
    .then(res => res.json())

export const getPost = (postId) =>
  fetch(`${url}/posts/${postId}`, headers)
    .then(res => res.json())

export const getPostComments = (postId) =>
  fetch(`${url}/posts/${postId}/comments`, headers)
    .then(res => res.json())

export const updateComment = (comment, option) =>
  fetch(`${url}/comments/${comment.id}`, {
    method: 'POST',
    headers: { 'Authorization': 'whatever-you-want' },
    body: option
    }).then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${url}/comments/${commentId}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'whatever-you-want' }
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${url}/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'whatever-you-want' }
  }).then(res => res.json())

export const createComment = (data) =>
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      ...headers2,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())