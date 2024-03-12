import React, { useState, useEffect } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            // console.log('book loaded:', data);
            setBooks(data);
            setFilteredBooks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFilter = () => {
        const filteredBooks = books.filter(book => {
            const price = parseFloat(book.price);
            return (!minPrice || price >= parseFloat(minPrice)) && (!maxPrice || price <= parseFloat(maxPrice));
        });
        setFilteredBooks(filteredBooks);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-4 mt-4 text-center text-cyan-600">Books List</h2>
            <div className="mb-4 flex gap-4 justify-center">
                <input type="number" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
                <input type="number" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
                <button onClick={handleFilter} className="btn btn-info">Filter</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredBooks.map(book => (
                    <div key={book.id} className="card bg-cyan-600 shadow-lg rounded-lg">
                        {/* <img src={book.thumbnail} alt='' className="object-cover w-full h-64" /> */}
                        <div className="card-body text-white">
                            <h2 className="text-2xl  text-center font-bold">ID: {book.id}</h2>
                            <p className="text-sm font-bold">Title: {book.title}</p>
                            <p className="text-lg">Price: ${book.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
