import { Link, useParams } from 'react-router-dom'

const samplePosts = [
  { id: '1', title: 'First Post', body: 'This is the first post.' },
  { id: '2', title: 'Second Post', body: 'This is the second post.' },
  { id: '3', title: 'Third Post', body: 'This is the third post.' },
]

export default function Post() {
  const { postId } = useParams()
  const post = samplePosts.find((p) => p.id === postId)
  if (!post) {
    return (
      <div>
        <h3>Post not found</h3>
        <p>No post with id "{postId}"</p>
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