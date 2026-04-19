import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label className='block text-sm font-medium mb-1.5' htmlFor={id} style={{ color: 'var(--text-secondary)' }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-4 py-2.5 text-sm rounded-xl outline-none border transition-colors duration-150 ${className}`}
                style={{
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--text-secondary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input
