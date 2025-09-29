import { useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from "../components/RateLimitedUI.jsx";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(true);

    return (
        <div>
            <Navbar />

            {isRateLimited && <RateLimitedUI />}
        </div>
    )
};

export default HomePage;