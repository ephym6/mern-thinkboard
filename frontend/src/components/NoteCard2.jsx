
import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';

const NoteCard2 = ({ note }) => {  // Changed to destructure 'note' prop
    return (
        <div className="bg-base-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <Link to={`/note/${note._id}`}>
                <h2 className="text-xl font-semibold mb-2">{note.title ? note.title : 'No Title'}</h2>
                <p className="text-base-content/80">{note.content ? note.content : 'No Content'}</p>
            </Link>
            {/* CreatedAt, edit and delete buttons */}
            <div className='card-actions justify-between items-center mt-4'>
        <span className='text-sm text-base-content/60'>
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
                <div className='flex items-center gap-1'>
                    {/* Edit button */}
                    <button className='btn btn-ghost btn-xs'>
                        <PenSquareIcon size={16}/>
                    </button>
                    {/* Delete button */}
                    <button className='btn btn-ghost btn-xs text-error'>
                        <Trash2Icon size={16}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard2;