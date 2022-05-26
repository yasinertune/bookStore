import React, { useState, useEffect } from 'react';
import './App.css';
import AddBook from "./components/AddBook.js"
import Books from "./components/Books.js"
import axios from "axios"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [books, setBooks] = useState([])

  //form da yazdığımız veriler bu state gelicek
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    quantity: "",
    department: "",
    comments: ""
  })

  //useEffect ile gelen veriyi books içine atıyoruz.
  useEffect(() => {
    fetch('/books').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setBooks(jsonRes))
  })

  const handleChange = (e) => {
    const { name, value } = e.target; //contructor oluşturduk
    setBook(prevInput => {
      return ({
        ...prevInput, //kendinden bir önceki değeri tutuyor
        [name]: value
      })
    })
  }

//oluşturduğumuz book state'deki verileri mongodb ye gönderdik 
  const addBook = (e) => {
    e.preventDefault();
    const newBook = {
      bookName: book.bookName,
      author: book.author,
      quantity: book.quantity,
      department: book.department,
      comments: book.comments
    }
    //axios ile mongodb ye verileri gönderdik
    axios.post('/newbook', newBook);
    alert( book.bookName + " adlı kitap eklendi. Stok sayfasına yönlendiriliyorsunuz.");
    setBook({ bookName: "", author: "", quantity: "", department: "", comments: "" });
    window.location.assign("http://localhost:3000/");
  }

 
  const deleteBook = (id,name) => {
    var decision =name + " adlı kitabı silmek istediğinizden eminmisiniz?";
    if(window.confirm(decision)==true)
    {
      return(axios.delete("/delete/" + id),
      alert(name + " adlı kitap silindi."));
    }
    return alert(name + " adlı kitabın silme işlemi iptal edildi.");  
  }

  const lendBook = (id,name,quantity) => {
    if(quantity>0)
    {
      return (
        axios.put("/lend/" + id),
      alert("Kitap: "+name+"  ödünç verildi."));
    }
    return alert(name + " adlı kitap stokta yok. Kitap alınamadı.");
  }

  const backBook = (id,name) => {
    axios.put("/back/" + id)
    alert("Kitap: " + name + " geri verildi. Stok Güncelleniyor.");
  }





  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Book Store</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Book</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addbook">Add Book</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Departments
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">History & Criticism</a></li>
                    <li><a className="dropdown-item" href="#">Crime</a></li>
                    <li><a className="dropdown-item" href="#">Fantasy</a></li>
                    <li><a className="dropdown-item" href="#">Drama</a></li>
                    <li><a className="dropdown-item" href="#">Religious</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Study & Teaching</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Music</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exac path="/" element={<Books books={books} lendBook={lendBook} deleteBook={deleteBook} backBook={backBook} />} />
          <Route  path="/addbook" element={<AddBook book={book} handleChange={handleChange} addBook={addBook} />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
