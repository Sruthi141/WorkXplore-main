import { useState } from 'react';
import Popup from './popup.jsx'; // ✅ fix case + extension
import { useNavigate } from 'react-router-dom';

function Revenuehome() {
    const [showPopup, setShowPopup] = useState(true);
    const navigate = useNavigate();

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleKnowMore = () => {
        setShowPopup(false);
        navigate('/plans');
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {showPopup && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <Popup
                        message="You have reached the limit of 10 job applications. To enjoy unlimited job applications, check out our premium subscription."
                        onClose={handleClosePopup}
                        onKnowMore={handleKnowMore}
                    />
                </div>
            )}
        </div>
    );
}

export default Revenuehome;
