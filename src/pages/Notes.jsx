import React, { useEffect, useState } from 'react'
import API from '../api/api'
import NoteCard from '../components/NoteCard';
import { Link } from 'react-router-dom';

const Notes = () => {
    // const user=JSON.parse(localStorage.getItem('user'))
    const [data,setData]=useState([]);
    useEffect(()=>{
        const res=API.get('notes/getNotes')
        res.then((result)=>{
            setData(result.data); 

        })
    },[])
    console.log(data);
  return (
        <div className="p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {data.map((note, id) => (
            <li key={id}>
                <NoteCard note={note} />
            </li>
            ))}
        </ul>
        </div>

  )
}

export default Notes