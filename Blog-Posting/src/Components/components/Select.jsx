import React,{useId} from 'react'

function Select({items,label="Status",className="",...prop},ref) {
  return (
    <div>
    {label && <label htmlFor={label} className='text-shadow-lg text-white   text-xl font-bold'>{label}</label>}
    <select
    id={useId()}
    className={`focus:ring-1 focus:outline-none focus:ring-amber-600 rounded-xl p-2 w-full text-white   text-2xl bg-zinc-900  border-zinc-700 hover:bg-zinc-950 shadow-md  border-1 ${className}`}
    ref={ref}
    {...prop}
    >
      <option className='text-zinc-600' value="" hidden>
    Select Status
  </option>
        {items?.map((item)=>(<option key={item}>{item}</option>))}
    </select></div>
  )
}

export default React.forwardRef(Select)