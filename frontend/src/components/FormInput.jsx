import React from 'react'

const FormInput = ({ label, name, onChange, value, placeholder, type = "text", required = false, children, ...props }) => {
    return (
        <div className='space-y-3'>
            <div className='form-control w-full'>
                <label className='label'>
                    <span className='label-text'>{label}</span>
                </label>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className='input input-bordered w-full'
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props}
                />
            </div>
            {children}
        </div>
    )
}

export default FormInput