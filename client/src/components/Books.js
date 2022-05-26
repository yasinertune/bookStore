import React from 'react'

export default function Books({books,deleteBook,backBook,lendBook}) {
  return (
    <div className='container mt-5'>
        <table className='table table-hover table-dark'>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Department</th>
                    <th scope="col">Quantity</th>
                    <th scope="col" colSpan="3">Process</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book,index) => {
                        return( 
                            <tr scope="col" key={index}>
                                <td>{book._id}</td>
                                <td data-toggle="tooltip" data-placement="top" title={book.comments}>{book.bookName}</td>  
                                <td>{book.author}</td>
                                <td>{book.department}</td>
                                <td>{book.quantity}</td>  
                                <td><button onClick={()=>deleteBook(book._id,book.bookName)} className='btn btn-primary'>KİTAP SİL</button></td>
                                <td><button onClick={()=>lendBook(book._id,book.bookName,book.quantity)} className='btn btn-primary'>ÖDÜNÇ AL</button></td>
                                <td><button onClick={()=>backBook(book._id,book.bookName)} className='btn btn-primary'>GERİ VER</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
