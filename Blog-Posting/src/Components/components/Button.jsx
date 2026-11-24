import React from 'react'

function Button({
    children,
    type="button",
    className="",
    ...prop
}) {
  return (
    <button
    type={type}
    className={`px-5 py-2  bg-amber-600 hover:bg-amber-700 text-white font-medium rounded transition cursor-pointer ${className}`}
    {...prop}
    >{children}</button>
  )
}

export default Button