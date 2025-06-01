const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }: {itemsPerPage: number, totalItems: number, currentPage: number, onPageChange: (number: number) => void}) => {

    const pageNumbers = [];
    const numberOfPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="">
            <ul className='flex justify-center'>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <a
                            onClick={() => {
                                onPageChange(number)
                            }}
                            href="#"
                            className={currentPage === number ?
                                "text-costume-cream bg-amber-100 flex rounded-full p-2 mr-1.5 " :
                                "text-costume-cream bg-gray-300 flex hover:bg-gray-200 rounded-full p-2 mr-1.5"}
                        >
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Pagination;