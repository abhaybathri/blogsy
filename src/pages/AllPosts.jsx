import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts([])
            .then((posts) => { if (posts) setPosts(posts.documents) })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p style={{ color: 'var(--text-muted)' }}>Loading posts...</p>
            </div>
        )
    }

    return (
        <div className="py-10">
            <Container>
                <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>All Posts</h1>
                {posts.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No posts found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts
