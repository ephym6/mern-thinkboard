import { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import api from '../lib/axios.js';

import Navbar from '../components/Navbar';
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import NoteDetailPage from "./NoteDetailPage.jsx";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [error, setError] = useState(null); // 🆕 Added error state

    const fetchNotes = async () => {
        try {
            const res = await api.get('/notes');
            console.log(res.data);
            setNotes(res.data);
            setIsRateLimited(false);
            setError(null); // clear previous errors if successful
            console.log(
                `Fetched ${res.data.length} notes from the API`
            )
        } catch (error) {
            console.log('Error fetching notes:', error);
            if (error.response?.status === 429) {
                setIsRateLimited(true);
            } else {
                setError("Unable to fetch notes. Please try again later.");
                console.log('Error fetching notes from database:', error);
                toast.error('Failed to load notes. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {/* Loading state */}
                {loading && (
                    <p className="text-center text-lg text-base-content/70 py-10">
                        Loading notes...
                    </p>
                )}

                {/* Error or Empty state */}
                {!loading && !isRateLimited && (
                    error ? (
                        <div className="text-center py-10">
                            <p className="text-lg text-red-500 mb-4">{error}</p>
                            {/* Retry Button */}
                            <button
                                onClick={fetchNotes}
                                disabled={loading}
                                className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
                            >
                                {loading ? "Fetching..." : "Retry"}
                            </button>
                        </div>
                    ) : notes.length === 0 ? (
                        <NotesNotFound />
                    ) : null
                )}

                {/* Notes grid */}
                {!loading && notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                onClick={() => setSelectedNoteId(note._id)}
                                className="cursor-pointer"
                            >
                                <NoteCard note={note} setNotes={setNotes} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal appears if a note is selected */}
                {selectedNoteId && (
                    <NoteDetailPage
                        noteId={selectedNoteId}
                        onClose={() => setSelectedNoteId(null)}
                    />
                )}
            </div>
        </div>
    )
};

export default HomePage;