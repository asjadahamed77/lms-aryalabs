import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-50'>
     <div className='w-6 h-6 border-4 border-white border-t-0 rounded-full animate-spin'>
     </div>
    </div>
  )
}

export default Loading
