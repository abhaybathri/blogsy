import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => dispatch(logout()))
    }
    return (
        <button
            className="px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.target.style.backgroundColor = 'var(--input-bg)'; e.target.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-secondary)' }}
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}
export default LogoutBtn;
