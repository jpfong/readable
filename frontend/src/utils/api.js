const url = "http://localhost:3001"

const headers = {
  headers: { 'Authorization': 'whatever-you-want' },
  credentials: 'include'
}

export const getCategories = () =>
  fetch(`${url}/categories`, headers)
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${url}/posts`, headers)
    .then(res => res.json())

export const getCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, headers)
    .then(res => res.json())

export const getPost = (postId) =>
  fetch(`${url}/posts/${postId}`, headers)
    .then(res => res.json())