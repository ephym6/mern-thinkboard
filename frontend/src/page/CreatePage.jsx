import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {ArrowLeftIcon} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const CreatePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!title.trim() || !content.trim()) return toast.error(
        //     'Please fill in all the fields.'
        // )

        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, { title, content });
            toast.success('Note created successfully!');
            navigate('/');
        } catch (error) {
            console.log('Error creating note:', error);
            toast.error('Failed to create note. Please try again.');
            if (error.response?.status === 429) {
                toast.error('Rate limit reached. Please wait and try again later.');
                duration: 4000;
                icon: '⚠️';
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to='/' className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-5'/>
                        Back to Notes
                    </Link>

                    <div className='card bg-base-100 shadow-md'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label className='label mb-2'>
                                        <span className='label-text'>Title</span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Note Title'
                                        className='input input-bordered w-full'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label mb-2'>
                                        <span className='label-text'>Content</span>
                                    </label>
                                    <textarea
                                        className='textarea textarea-bordered w-full h-40'
                                        placeholder='Write your note here...'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className='form-control'>
                                    <button
                                        type='submit'
                                        className={`btn btn-primary ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating...' : 'Create Note'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;