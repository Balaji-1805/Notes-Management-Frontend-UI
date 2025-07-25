import React, { useEffect, useState } from 'react';
import API from '../api/api';
import NoteCard from '../components/NoteCard';

const Notes = () => {
    const [data,setData]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const res=API.get('notes/getNotes')
        res.then((result)=>{
            setIsLoading(false);
            setData(result.data); 
        })
    },[isLoading])

    const deleteNote=async(noteId)=>{
      try {
          const res=await API.delete(`notes/delete/${noteId}`)
        if(res.status==200)
        {
            alert("Note Deleted Successfully");
            setData(data.filter((note)=>note._id!==noteId));
        }
        else
        {
            alert("Failed to Delete Note");
        }
      } catch (error) {
        console.log(error);
        alert('Error Deleting Node');
      }
    }
    console.log(data);
  return (
        <div className="p-6">
           {
            (isLoading)? <>
            <center className='text-3xl w-[90%] m-auto mt-30'>Loading...</center></> :
               (data.length==0) ?<>
            <div className='text-3xl w-[90%] m-auto mt-30'><center>No Notes Found</center></div></>:
               <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {data.map((note) => (
            <li key={note._id}>
                <NoteCard note={note} deleteNote={deleteNote} />
                </li>
            ))}
            </ul>
             }
        </div>

  )
}

export default Notes