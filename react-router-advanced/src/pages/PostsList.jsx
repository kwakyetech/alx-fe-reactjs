import { Link } from 'react-router-dom'

const samplePosts = [
  { id: '1', title: 'First Post', body: 'This is the first post.' },
  { id: '2', title: 'Second Post', body: 'This is the second post.' },
  { id: '3', title: 'Third Post', body: 'This is the third post.' },
]

export default function PostsList() {
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {samplePosts.map((p) => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}