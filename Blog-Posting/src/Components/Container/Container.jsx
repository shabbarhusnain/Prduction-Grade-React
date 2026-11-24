import React from 'react'

function Container({children}) {
  return (
    <div
    className='transition-all duration-300 ease-in-out  bg-zinc-800'
    >{children}</div>
  )
}

export default Container