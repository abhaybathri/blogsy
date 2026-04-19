import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate("/")
            })
        } else navigate("/")
    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage)
                navigate("/")
            }
        })
    }

    return post ? (
        <div className="py-10">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden mb-8 flex items-center justify-center"
                        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--input-bg)', minHeight: '200px' }}>
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="max-w-full max-h-[480px] object-contain"
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-white" textColor="text-black" className="shadow-md text-xs px-4 py-1.5">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" textColor="text-white" className="shadow-md text-xs px-4 py-1.5" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{post.title}</h1>
                    <div className="browser-css text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}
