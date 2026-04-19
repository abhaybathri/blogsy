import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";
import { useTheme } from "../../context/ThemeContext";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const { dark, toggleDark } = useTheme();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Sign Up", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ]

    return (
        <header style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }} className="sticky top-0 z-50">
            <Container>
                <nav className="flex items-center h-14">
                    <Link to="/" className="text-xl font-bold tracking-tight mr-8" style={{ color: 'var(--text-primary)' }}>
                        Blogsy
                    </Link>
                    <ul className="flex items-center gap-1 ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150"
                                        style={{ color: 'var(--text-secondary)' }}
                                        onMouseEnter={e => { e.target.style.backgroundColor = 'var(--input-bg)'; e.target.style.color = 'var(--text-primary)' }}
                                        onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-secondary)' }}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && <li><LogoutBtn /></li>}
                        <li>
                            <button
                                onClick={toggleDark}
                                className="ml-2 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                                style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                aria-label="Toggle dark mode"
                            >
                                {dark ? '☀️' : '🌙'}
                            </button>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;
