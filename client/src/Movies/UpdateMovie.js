import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const intialItem = {
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = (props) => {
    console.log(props)
    const [movie, setMovie] = useState(intialItem);
    const id = props.match.params.id;
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res=>{
                setMovie(res.data)
                console.log()
            })
    },[])
    
    const changeHandler = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res=>{
            console.log(res)
            props.history.push(`/movies/${id}`);
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="title" onChange={changeHandler} placeholder="title" value={movie.title}/>
            <input type="text" name="director" onChange={changeHandler} placeholder="director" value={movie.director}/>
            <input type="text" name="metascore" onChange={changeHandler} placeholder="metascore" value={movie.metascore}/>
            <input type='text' name='stars' onChange={changeHandler} placeholder='stars' value={movie.stars}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default UpdateMovie;