import React from 'react'

function SearchBar() {
  return (
    <div className='h-12 w-full -translate-y-[192px] flex items-center justify-center' >
        <a className='block cursor-pointer ' >
            <div className='w-96 h-16 bg-white border px-4 shadow-sm' >
                <input className='w-full h-full outline-none bg-white'  type="text" placeholder='search place'/>
            </div>
        </a>
    </div>
  )
}

export default SearchBar