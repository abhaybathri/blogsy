import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import service from '../../appwrite/config'
import { useCallback, useEffect, useState } from "react";
import { Input, Button, RTE, Select } from '../index'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
    const [submitError, setSubmitError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const submit = async (data) => {
        setSubmitError("")
        setSubmitting(true)
        try {
            if (post) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
                if (file) service.deleteFile(post.featuredimage)
                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredimage,
                })
                if (dbPost) navigate(`/post/${dbPost.$id}`)
                else setSubmitError("Failed to update post. Please try again.")
            } else {
                const file = await service.uploadFile(data.image[0])
                if (file) {
                    data.featuredImage = file.$id
                    const dbPost = await service.createPost({ ...data, userId: userData.$id })
                    if (dbPost) navigate(`/post/${dbPost.$id}`)
                    else setSubmitError("Failed to create post. Please try again.")
                } else {
                    setSubmitError("Image upload failed. Please try a different image.")
                }
            }
        } catch (err) {
            setSubmitError(err?.message || "Something went wrong. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    // Enforces Appwrite rules: max 36 chars, only a-z 0-9 hyphen underscore, no leading special char
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-_]/g, "")   // strip invalid chars
                .replace(/\s+/g, "-")              // spaces to hyphens
                .replace(/^[-_]+/, "")             // no leading special chars
                .slice(0, 36)                      // max 36 chars
        }
        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') setValue("slug", slugTransform(value.title), { shouldValidate: true })
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                {post ? 'Edit Post' : 'New Post'}
            </h2>

            {submitError && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>
                    {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-6">
                <div className="w-full lg:w-2/3 lg:pr-4 space-y-4">
                    <div>
                        <Input
                            label="Title"
                            placeholder="Post title"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Input
                            label="Slug"
                            placeholder="post-slug"
                            {...register("slug", {
                                required: "Slug is required",
                                maxLength: { value: 36, message: "Slug must be 36 characters or less" },
                                pattern: { value: /^[a-z0-9][a-z0-9-_]*$/, message: "Slug can only contain lowercase letters, numbers, hyphens and underscores" }
                            })}
                            onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                            readOnly={!!post}
                        />
                        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
                    </div>
                    <div>
                        <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                </div>

                <div className="w-full lg:w-1/3 lg:pl-4 space-y-4">
                    <div>
                        <Input
                            label="Featured Image"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post ? "Please select an image" : false })}
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                    </div>

                    {post && (
                        <div className="rounded-xl overflow-hidden border flex items-center justify-center"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input-bg)', minHeight: '160px' }}>
                            <img
                                src={service.getFilePreview(post.featuredimage)}
                                alt={post.title}
                                className="max-w-full max-h-48 object-contain"
                            />
                        </div>
                    )}

                    <Select options={["active", "inactive"]} label="Status" {...register("status", { required: true })} />

                    <Button
                        type="submit"
                        bgColor={post ? "bg-emerald-600" : undefined}
                        textColor={post ? "text-white" : undefined}
                        className="w-full"
                        disabled={submitting}
                    >
                        {submitting ? (post ? "Updating..." : "Publishing...") : (post ? "Update Post" : "Publish Post")}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default PostForm;
