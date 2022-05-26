const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const BookStore = require('./models/BookModel.js');


const app = express();

app.use(bodyParser.json());
app.use(cors());


var CONNECTION_URL ="mongodb+srv://bookStore:bookStore123@cluster0.gaxjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("Connect database"))
.catch((error)=>console.log(error));

//get ile verileri databaseden çektik
app.get('/books', (req,res) => {
    BookStore.find().then(books => res.json(books));
})

//post ile database veri ekledik
app.post('/newbook',async (req,res) => {
    try{
        const newBook= new BookStore({
            bookName: req.body.bookName,
            author: req.body.author,
            quantity: req.body.quantity,
            department: req.body.department,
            comments: req.body.comments,
        })

        const book =await newBook.save();   //veritabanına kaydediyor
        res.status(200).json(book);
    }catch(error) {
        console.log(error)
    }
})


//kitabı id ye göre sildik
app.delete('/delete/:id',(req,res) => {
    const id= req.params.id;
    BookStore.findByIdAndDelete({ _id:id},(error) => {
        if(!error) {
            console.log("book delete");
        }
        else{
            console.log(error);
        }
    },)
})

//kitabı id ye göre -1 yaptık
app.put('/lend/:id',async (req,res) => {
    try{
        await BookStore.findByIdAndUpdate(req.params.id,{$inc:{quantity:-1}})
    }catch(error){
        console.log(error);
    }
})



//kitabı id ye göre +1 yaptık
app.put('/back/:id',async (req,res) => {
    try{
        await BookStore.findByIdAndUpdate(req.params.id,{$inc:{quantity:1}})
    }catch(error){
        console.log(error);
    }
})


app.listen(5000, () =>{
    console.log("Server çalıştı");
})







/*


import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import path from  "path"
import {BookStore} from "./models/BookModel.js"
import { allowedNodeEnvironmentFlags } from "process";

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());


app.get("/", (req, res) => {
    res.json({
        author: "Coding with yasin :)",
        message: "Mutlu yıllar",
        no:"1"
    })
} );



const PORT= process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {
    app.listen(PORT, ()=> {
        console.log('Server is running on port:'+PORT );
    });
}) 
.catch((error)=> {
    console.error(error.message)
});*/