import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const staleTimeMs = 60 * 1000 // keep in sync with useQuery staleTime

async function fetchPosts() {
  const res = await fetch(POSTS_URL)
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`)
  return res.json()
}

async function createPost(newPost) {
  const res = await fetch(POSTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  })
  if (!res.ok) throw new Error(`Failed to create post: ${res.status}`)
  return res.json()
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return 'never'
  const diffMs = Date.now() - timestamp
  const sec = Math.floor(diffMs / 1000)
  if (sec < 60) return `${sec}s ago`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  return `${hr}h ago`
}

export default function PostsComponent() {
  const queryClient = useQueryClient()

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: staleTimeMs, // 1 minute fresh
    gcTime: 5 * 60 * 1000, // 5 minutes cache garbage collection
    refetchOnWindowFocus: 'always',
    select: (data) => data.slice(0, 10), // show first 10 posts for brevity
  })

  const queryState = queryClient.getQueryState(['posts'])
  const dataUpdatedAt = queryState?.dataUpdatedAt ?? 0
  const updatedAgoMs = dataUpdatedAt ? Date.now() - dataUpdatedAt : null
  const isFreshFromCache = updatedAgoMs != null && updatedAgoMs < staleTimeMs

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(['posts'])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts'], (old) => {
        const base = Array.isArray(old) ? old : []
        const optimistic = {
          id: Math.max(0, ...base.map((p) => p.id)) + 1,
          ...newPost,
        }
        return [optimistic, ...base]
      })

      // Return a context with the snapshotted value
      return { previousPosts }
    },
    onError: (_err, _newPost, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
      }
    },
    onSettled: () => {
      // Ensure server state is synced
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleAddPost = () => {
    const title = `Quick post ${new Date().toLocaleTimeString()}`
    const body = 'This is an example of optimistic updates with React Query.'
    const userId = 1
    addPostMutation.mutate({ title, body, userId })
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Posts</h2>
        {isFetching && (
          <span className="text-xs text-gray-500">background updating…</span>
        )}
        {!isLoading && !isError && posts && (
          <span className="text-xs text-gray-500">
            {isFreshFromCache ? 'cached (fresh)' : 'cached (stale)'} • updated {formatRelativeTime(dataUpdatedAt)}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => refetch()}
        >
          Refresh
        </button>
        <button
          className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          onClick={handleAddPost}
          disabled={addPostMutation.isPending}
        >
          {addPostMutation.isPending ? 'Adding…' : 'Add quick post'}
        </button>
      </div>

      {isLoading && (
        <div className="text-gray-600">Loading posts…</div>
      )}

      {isError && (
        <div className="text-red-600">Error: {error?.message}</div>
      )}

      {!isLoading && !isError && (
        <ul className="space-y-3">
          {posts?.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-700">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}