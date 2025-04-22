import React from 'react'

const Pagination = ({goToNextPage, goToPrevPage, searchResult}) => {
  return (
    <div className='w-full p-2 flex justify-end px-20 mb-10 gap-5'>
        {searchResult && goToPrevPage &&<button className="bg-amber-700/50 hover:bg-amber-700 ease duration-300 text-white p-2 rounded-[5px] cursor-pointer" onClick={goToPrevPage}><i className="fa-solid fa-square-caret-left"></i> Previous</button>}
        {searchResult && goToNextPage && <button className="bg-amber-700/50 hover:bg-amber-700 ease duration-300 text-white p-2 rounded-[5px] cursor-pointer"  onClick={goToNextPage}>Next <i className="fa-solid fa-square-caret-right"></i></button>}
    </div>
  )
}

export default Pagination