import React,{useState} from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";

function AddBook(){

    const [bookDetails,setBookDetails]=useState({
        bookName:'',
        bookAuthor:'',
        category:'',
        totalBooks:0,
        language:''
    });
    const [error,setError]=useState('');
    const [message,setMessage]=useState('');
   
    const add = (e) =>{
        e.preventDefault();

        if( (bookDetails.bookName==='') || (bookDetails.bookAuthor==='') || (bookDetails.category==='') || (bookDetails.totalBooks<=0) || (bookDetails.language==='') ){
            setError('Every field must be filled !');
            setMessage('');
        }else{
            console.log(bookDetails);
            axios.post(`http://localhost:8080/admin/addBook`,bookDetails)
            .then(res => {
                if(res.data===true){
                    setMessage('Book added to the Library successfully !');
                    setError('');
                    setBookDetails( {bookName:'',
                    bookAuthor:'',
                    category:'',
                    totalBooks:0,
                    language:''});
                }else{
                    setError('Book Could not be added!');
                    setMessage('');
                    setBookDetails( {bookName:'',
                    bookAuthor:'',
                    category:'',
                    totalBooks:0,
                    language:''});
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setBookDetails( {bookName:'',
                    bookAuthor:'',
                    category:'',
                    totalBooks:0,
                    language:''});
                setMessage('');
            });
        }
    }

  return (
      <div>

        <h4 className="m-3 text-center">Add Books</h4><br/>

        <Form>
        <FormGroup row className="m-2">
            <Label for="bookName" sm={2}>Book Name</Label>
            <Col sm={10}>
            <Input type="text" value={bookDetails.bookName} id="bookName" required 
                onChange={(e) => {  setBookDetails({ ... bookDetails, bookName:e.target.value}) }}/>
            </Col>
        </FormGroup>
        <FormGroup row className="m-2">
            <Label for="bookAuthor" sm={2}>Book Author</Label>
            <Col sm={10}>
            <Input type="text" value={bookDetails.bookAuthor} id="bookAuthor" required 
                onChange={(e) => {  setBookDetails({ ... bookDetails, bookAuthor:e.target.value}) }}/>
            </Col>
        </FormGroup>
        <FormGroup row className="m-2">
            <Label for="category" sm={2}>Category</Label>
            <Col sm={10}>
            <Input type="text" value={bookDetails.category} id="category" required
                onChange={(e) => {  setBookDetails({ ... bookDetails, category:e.target.value}) }}/>
            </Col>
        </FormGroup>
        <FormGroup row className="m-2">
            <Label for="totalBooks" sm={2}>Total books to be added</Label>
            <Col sm={10}>
            <Input type="number" className="mt-3" value={bookDetails.totalBooks} id="totalBooks" required
                onChange={(e) => {  setBookDetails({ ... bookDetails, totalBooks:e.target.value}) }}/>
            </Col>
        </FormGroup>
        <FormGroup row className="m-2">
            <Label for="language" sm={2}>Language</Label>
            <Col sm={10}>
            <Input type="text" value={bookDetails.language} id="language" required 
                onChange={(e) => {  setBookDetails({ ... bookDetails, language:e.target.value}) }}/>
            </Col>
        </FormGroup>
        <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
            <Button outline color="primary" onClick={add}>Add Book</Button>
            </Col>
        </FormGroup>
        </Form>

        <center style={{paddingTop:"1rem"}}>
                    {
                        message === '' ? <div></div> : <div class="alert alert-primary" role="alert" style={{width: 600}}>
                            {message}
                        </div>
                    }
        </center>
        <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
                        </div>
                    }
        </center>

        </div>
  );
}

export default AddBook