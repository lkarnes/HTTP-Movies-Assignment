import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AddMovie = (props) => {
const [movie, setMovie] = useState({});
console.log(props)
const changeHandler = e => {
    e.persist();
    setMovie({
        ...movie,
        [e.target.name]: e.target.value,
        id: Date.now()
    })
    if(e.target.name === 'stars'){
        setMovie({
            ...movie,
            [e.target.name] : e.target.value.split(','),
            id: Date.now()
        })
    }
}

const onSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/movies', movie)
    .then(res=>{
        console.log(res)
        props.history.push('/')
    })
}

    return (
        <form className='form' onSubmit={onSubmit}>
            <input type="text" name="title" onChange={changeHandler} placeholder="title" value={movie.title}/>
            <input type="text" name="director" onChange={changeHandler} placeholder="director" value={movie.director}/>
            <input type="number" name="metascore" onChange={changeHandler} placeholder="metascore" value={movie.metascore}/>
            <p>**please seperate the stars by commas**</p>
            <textarea className='textarea' type='textArea' name='stars' onChange={changeHandler} placeholder='stars' value={movie.stars}/>
            <button className='submit-button' type='submit'>Submit</button>
        </form>
    )
}

export default AddMovie;