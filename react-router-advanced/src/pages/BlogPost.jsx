import { Link, useParams } from 'react-router-dom'

const blogData = [
  { id: 'a', title: 'Intro to Routing', body: 'Learn how to use react-router for navigation.' },
  { id: 'b', title: 'Nested Routes', body: 'Organize your app with nested routes and layouts.' },
  { id: 'c', title: 'Protected Routes', body: 'Guard private pages and redirect unauthenticated users.' },
]

export default function BlogPost() {
  const { id } = useParams()
  const post = blogData.find((p) => p.id === id)
  if (!post) {
    return (
      <div>
        <h3>Blog post not found</h3>
        <p>No post with id "{id}"</p>
        <Link to="/posts">Back to posts</Link>
      </div>
    )
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to="/posts">Back to posts</Link>
    </article>
  )
}