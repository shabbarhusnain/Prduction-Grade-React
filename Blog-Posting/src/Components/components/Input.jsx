import React from 'react'
import { forwardRef } from 'react'
function Input({
    type="text",
    className,
    label="",
    labelclass="",
    ...prop
},ref) {
  return (
    <>{label?<label htmlFor={label} className={`text-shadow-lg text-white   text-xl font-bold ${labelclass}`}>{label}</label>:<></>}
    <input
    className={`focus:ring-1 focus:outline-none focus:ring-amber-600 rounded-xl p-2 w-full text-white   text-2xl bg-zinc-900  border-zinc-700 hover:bg-zinc-950 shadow-md  border-1 ${className}`}
    type={type}
    ref={ref}
    {...prop}
    /></>
  )
}

export default forwardRef(Input)