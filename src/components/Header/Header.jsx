import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../index";
import { useTheme } from "../../context/ThemeContext";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const { dark, toggleDark } = useTheme();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Sign Up", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ]

    const handleNav = (slug) => {
        navigate(slug)
        setMenuOpen(false)
    }

    const handleLogout = () => {
        authService.logout().then(() => dispatch(logout()))
        setMenuOpen(false)
    }

    return (
        <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            <Container>
                <nav className="flex items-center h-14">

                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Blogsy
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden md:flex items-center gap-1 ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => handleNav(item.slug)}
                                        className="px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150"
                                        style={{ color: 'var(--text-secondary)' }}
                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--input-bg)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150"
                                    style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--input-bg)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={toggleDark}
                                className="ml-2 w-9 h-9 flex items-center justify-center rounded-full"
                                style={{ backgroundColor: 'var(--input-bg)' }}
                                aria-label="Toggle dark mode"
                            >
                                {dark ? '☀️' : '🌙'}
                            </button>
                        </li>
                    </ul>

                    {/* Mobile right side: dark toggle + hamburger */}
                    <div className="flex items-center gap-2 ml-auto md:hidden">
                        <button
                            onClick={toggleDark}
                            className="w-9 h-9 flex items-center justify-center rounded-full"
                            style={{ backgroundColor: 'var(--input-bg)' }}
                            aria-label="Toggle dark mode"
                        >
                            {dark ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--input-bg)' }}
                            aria-label="Toggle menu"
                        >
                            <span className="block w-4 h-0.5 rounded" style={{ backgroundColor: 'var(--text-primary)', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
                            <span className="block w-4 h-0.5 rounded" style={{ backgroundColor: 'var(--text-primary)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
                            <span className="block w-4 h-0.5 rounded" style={{ backgroundColor: 'var(--text-primary)', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="md:hidden border-t" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                    <div className="px-4 py-3 flex flex-col gap-1">
                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    onClick={() => handleNav(item.slug)}
                                    className="w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
                                    style={{ color: 'var(--text-primary)' }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--input-bg)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}
                        {authStatus && (
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
                                style={{ color: '#ef4444' }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--input-bg)'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;
