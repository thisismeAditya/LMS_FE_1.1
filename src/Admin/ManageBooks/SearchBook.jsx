import React,{useState,useEffect} from "react";
import {Form,Input,Button,Table, Container,Col,Row} from "reactstrap";
import axios from "axios";


function SearchBook(){

    // const [searchBookName,setSearchBookName]= useState('');
    // const [searchBookAuthor,setSearchBookAuthor]= useState('');
    const [searchError,setSearchError]=useState('');
    const [bookList,setBookList]=useState([]);
    const [error,setError]=useState('');
    const [content, setContent] = useState(undefined);
    const [searchBy, setSearchBy] = useState('Name');

    const handleClick = (e) => {
        //e.preventDefault();

        if(content === undefined || content.size === 0){
            setError(`Search Book By ${searchBy} cannot be EMPTY!`);
        }else{
            if(content == null || content === undefined || content.size === 0){
                alert("Please Enter a Valid Feild Value");
            }else{
                axios.get(`http://localhost:8080/member/searchBy${searchBy}/${content}`)
                    .then(res => {
                        try{
                            if(res.data === undefined){
                                alert("Please Enter a Valid Feild Value")
                            }else{
                                setBookList(res.data);
                            }
                            setError('');
                            setContent(content);
                        }catch(e){
                            setError("Please Try again!");
                        }
                    }).catch(err => {
                        err.response.data === undefined || content === undefined || content === ''? setError("Cannot be Empty") : setError(err.response.data);
                        setBookList([]);
                        setContent(undefined)
                    })
            }
        }

        setContent('');
    };



    // const searchByName= (e) =>{
    //     e.preventDefault();
    //     if(searchBookName===''){
    //         setError('Book Name field must not be empty');
    //         setSearchError('');
    //     }else{
    //         axios.get(`http://localhost:8080/member/searchByName/${searchBookName}`)
    //         .then(res => {
    //             if(res.data.length===0){
    //                 setError('No match found !');
    //                 setSearchError('');
    //             }else{
    //                 setError('');
    //                 setSearchError('');
    //                 setBookList(res.data);
    //             }
    //         }).catch(err => {
    //             console.log(err);
    //             setSearchError('');
    //             setError(err.response.data);
    //             setBookList([]);
    //         });
    //     }
    // }

    
    // const searchByAuthor= (e) =>{
    //     e.preventDefault();
    //     if(searchBookAuthor===''){
    //         setError('Book Author field must not be empty');
    //         setSearchError('');
    //     }else{
    //         axios.get(`http://localhost:8080/member/searchByAuthor/${searchBookAuthor}`)
    //         .then(res => {
    //             if(res.data.length===0){
    //                 setError('No match found !');
    //                 setSearchError('');
    //             }else{
    //                 setError('');
    //                 setBookList(res.data);
    //                 setSearchError('');
    //             }
    //         }).catch(err => {
    //             console.log(err);
    //             setError(err.response.data);
    //             setSearchError('');
    //             setBookList([]);
    //         });
    //     }
    // }

    const removeBook = (book, e) =>{
        
        var proceed = window.confirm("All copies of the book will be removed. Do you want to proceed ?");
        if (proceed) {
              axios.delete(`http://localhost:8080/admin/removeBook/${book.bookName}/${book.bookAuthor}`)
            .then(res => {
                if(res.data===true){
                    setSearchError('All copies of: '+book.bookName+' by '+book.bookAuthor+' removed!');
                    handleClick();
                    setError('');
                }else{
                    setSearchError('Could not delete the book.');
                    setError('');
                }
            }).catch(err => {
                console.log(err);
                setSearchError('');
                setSearchError(err.response.data);
            });
        } 
    }

    return(
        <div>
            <h4 className="m-3 text-center">Search Books</h4><br/>

            <div class="input-group mb-3" style={{padding : "1rem", justifyContent:"center"}}>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{`Book by ${searchBy}`}</button>
                <ul class="dropdown-menu">
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Name');
                    } }>Book Name</a></li>
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Author');
                    } }>Book Author</a></li>
                </ul>
                <input type="text" class="form-control" id="validationCustom01" value={content} onChange= { e=> {
                    e.target.value !== undefined || e.target.value !== null ? setContent(e.target.value) : setError("Cannot be Empty")
                }} required/>
                {content !== undefined ? <button class="btn btn-outline-secondary" type="button" onClick = {handleClick}>Search</button> : <button class="btn btn-outline-secondary" type="button">Search</button>}
            </div>

            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
                        </div>
                    }
            </center>
            
            <h4 className="mt-1 text-center">List Of Books</h4>
            <Table striped>
                <thead>
                    <tr>
                    <th>Book Name</th>
                    <th>Book Author</th>
                    <th>Category</th>
                    <th>Total Books</th>
                    <th>Available Books</th>
                    <th>Language</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    bookList.map((book)=>{
                        return (
                            <tr>
                                <th scope="row">{book.bookName}</th>
                                <td>{book.bookAuthor}</td>
                                <td>{book.category}</td>
                                <td>{book.totalBooks}</td>
                                <td>{book.availableBooks}</td>
                                <td>{book.language}</td>
                                <td>
                                    <Button outline color="danger" onClick={()=> removeBook(book)}>Remove Book</Button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
        </Table>
        <center style={{paddingTop:"1rem"}}>
                    {
                        searchError === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {searchError}
                        </div>
                    }
        </center>
        <hr/>
        </div>
    )
}
export default SearchBook