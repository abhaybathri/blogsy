import { forwardRef, useId } from "react";

function Select({ options = [], label, className = '', ...props }, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full px-4 py-2.5 text-sm rounded-xl outline-none border transition-colors duration-150 ${className}`}
                style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
            >
                {options?.map((option) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
export default forwardRef(Select)
