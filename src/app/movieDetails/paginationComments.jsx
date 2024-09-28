import React, { useState } from 'react';

const Comments = ({ commentsData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    // Calculate the total number of pages
    const totalPages = Math.ceil(commentsData.length / commentsPerPage);

    // Get the comments for the current page
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = commentsData.slice(indexOfFirstComment, indexOfLastComment);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            <p className='bg-white text-black font-bold text-l w-auto text-center'>{currentComments.length} of total {commentsData.length} comments</p>
            <ul className="list-none p-0">
                {currentComments.map((item, index) => (
                    <li key={index} className="flex items-center my-2">
                        <img
                            src={item.owner.length > 0 ? item.owner[0].avatar : ''}
                            alt=""
                            className="flex z-0 w-16 h-16 rounded-lg object-cover p-1"
                        />
                        <span>
                            <b className="p-2">{item.owner.length > 0 ? item.owner[0].username : ''}</b> {item.message}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between mt-4">
                <button
                    className={`px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100 transition duration-200 ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    type="button"
                >
                    Previous
                </button>
                <button
                    className={`px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100 transition duration-200 active:scale-95 ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Comments;
