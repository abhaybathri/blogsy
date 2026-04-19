import { Link } from 'react-router-dom'
import service from '../appwrite/config';

function PostCard({ $id, title, featuredimage }) {
    return (
        <Link to={`/post/${$id}`} className="block group">
            <div className="rounded-2xl overflow-hidden border transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="aspect-video overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: 'var(--input-bg)' }}>
                    <img
                        src={service.getFilePreview(featuredimage)}
                        alt={title}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <h2 className="font-semibold text-base leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}
export default PostCard;
