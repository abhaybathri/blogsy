import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)
    }, [navigate, authStatus, authentication])

    return loader ? (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
    ) : <>{children}</>
}
export default Protected;