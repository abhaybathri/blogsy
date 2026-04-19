export default function Button({
    children,
    type = "button",
    bgColor,
    textColor,
    className = "",
    ...props
}) {
    const base = "px-5 py-2 text-sm font-semibold rounded-full transition-all duration-150 disabled:opacity-50"

    // explicit color overrides (edit/delete buttons)
    if (bgColor || textColor) {
        return (
            <button type={type} className={`${base} ${bgColor || ''} ${textColor || 'text-white'} ${className}`} {...props}>
                {children}
            </button>
        )
    }

    return (
        <button
            type={type}
            className={`${base} ${className}`}
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
            {...props}
        >
            {children}
        </button>
    )
}
