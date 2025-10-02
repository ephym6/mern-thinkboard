import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import axios from "axios";
import toast from "react-hot-toast";

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
        <div>
            <Navbar />

            {isRateLimited && <RateLimitedUI />}
        </div>
    )
};

export default HomePage;