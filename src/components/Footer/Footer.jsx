import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="py-8 mt-auto" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Blogsy</span>
                <div className="flex gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <Link to="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Home</Link>
                    <Link to="/all-posts" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Posts</Link>
                    <Link to="/add-post" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Write</Link>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Blogsy. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
