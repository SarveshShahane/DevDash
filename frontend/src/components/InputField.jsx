import React from 'react'

const InputField = ({ name, placeholder, onChange ,type="text",label}) => {
    return (
        <div className='group w-full max-w-md flex flex-col gap-2 '>
              <label htmlFor={name} className='text-[#ffffff] font-medium '>{label}</label>
        <input
            type="text"
            name={name}
            className='px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white  inputs w-full'
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
    )
}

export default InputField