import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts()
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

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Nothing here yet</h1>
                <p className="text-base" style={{ color: 'var(--text-muted)' }}>Login and publish your first post to get started.</p>
            </div>
        )
    }

    return (
        <div className="py-10">
            <Container>
                <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Latest Posts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
