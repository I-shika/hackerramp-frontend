'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function JoinCompetition() {
    const [selectedImage, setSelectedImage] = useState();
    const [competitions, setCompetitions] = useState([]);
    const [competitionId, setCompetitionId] = useState();
    const [showPopup, setShowPopup] = useState(false); // State for the popup

    useEffect(() => {
        // Fetch competitions data
        const fetchCompetitions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/diva/competitionname/');
                if (response.data) {
                    setCompetitions(response.data.data[0].competition_name);
                    setCompetitionId(response.data.data[0].id);
                }
            } catch (error) {
                console.error('Error fetching competitions:', error);
            }
        };
        fetchCompetitions();
    }, []);

    const fileInputRef = React.useRef(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('competitionId', competitionId);
        formData.append('userName', localStorage.getItem('userId'));
        formData.append('designImage', selectedImage);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/diva/submission/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('API response:', response.data);
            setSelectedImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setShowPopup(true); // Show the popup on successful submission
        } catch (error) {
            console.error('Error in submission:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="bg-pink-100 w-full pb-40">
            <div className="text-4xl pb-4 flex justify-center items-center pt-10 pb-10">
                {competitions}
            </div>
           
            <div className="my-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                />
                <div
                    className="w-11/12 h-80 border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer m-auto"
                    onClick={() => fileInputRef.current.click()}
                >
                    {selectedImage ? selectedImage.name : 'Click to select an image'}
                </div>
            </div>
            <div onClick={handleSubmit} className="flex justify-center items-center bg-pink-400 h-10 w-20 m-auto rounded-lg">
                <button>Submit</button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-lg font-bold">Entry Submitted Successfully!</h2>
                        <button onClick={closePopup} className="mt-4 bg-pink-400 p-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
