import React from 'react'

function Loader(props) {
  return (
    <div className={`"w-full h-screen bg-white flex items-center justify-center opacity-${props.opacity} "`} >
        <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Loader