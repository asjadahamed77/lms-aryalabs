import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/60 flex items-center justify-center z-50'>
     <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin'>
     </div>
    </div>
  )
}

export default Loading
