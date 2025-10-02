import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard2.jsx";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`);
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
                console.log(
                    `Fetched ${res.data.length} notes from the API`
                )
            } catch (error) {
                console.log('Error fetching notes:', error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error('Failed to load notes. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading ? (
                    <p className="text-center text-lg text-base-content/70">Loading notes...</p>
                ) : notes.length === 0 ? (
                    <p className="text-center text-lg text-base-content/70">No notes available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
};

export default HomePage;