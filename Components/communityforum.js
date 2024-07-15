'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getComments } from "./getcomments";
import { comment } from "postcss";
import './communityforum.css'


export default function Communityforum({ initialUsers }) {
    const [inputValue, setInputValue] = useState('');
    console.log("initialUsers")
    console.log(initialUsers)

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSend = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/diva/community/add/`, {

                comment: inputValue,
                username: 1,

            });
            console.log(response.data.comment)
            setInputValue('')
            loadMoreUsers()
        } catch (err) {

            console.error(err);
        }
    };
    const NUMBER_OF_USERS_TO_FETCH = 2;

    const [offset, setOffset] = useState(NUMBER_OF_USERS_TO_FETCH);
    const [users, setUsers] = useState(initialUsers);

    useEffect(() => {
        if (initialUsers && Array.isArray(initialUsers)) {
            setUsers(initialUsers); // Set initial users on mount
        }
    }, [initialUsers, users]);
    const loadMoreUsers = async () => {
        try {
            if (apiUsers && Array.isArray(apiUsers)) {

                const apiUsers = await getComments(offset, NUMBER_OF_USERS_TO_FETCH);
                console.log('Fetched Users:', apiUsers);
                setUsers((prevUsers) => [...prevUsers, ...apiUsers]);
                setOffset((prevOffset) => prevOffset + NUMBER_OF_USERS_TO_FETCH);
            } else {
                console.error('No users returned from API:', apiUsers);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            // Optionally handle the error (e.g., show a message to the user)
        }
    };

    return (
        <div className=" bg-pink-100 w-1/2 ">
            <div className=" w-11/12 m-auto h-auto pt-10 pb-10">
                <div className="text-3xl pb-5 text-center">
                    Your Views
                </div>
                <div className="comment section flex flex-col bg-white h-auto rounded-lg text-black pb-4 ">
                <div className="flex justify-around w-full pt-6">
                        <div className="w-5/6">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Add Comment..."
                                className="pt-1 pb-1 pl-2 h-10 border-0 w-full bg-slate-200 rounded-lg"
                            />
                        </div>
                        <div className="1/12">
                            <button onClick={handleSend} className="w-full pl-2 pr-2 bg-pink-600 h-10 rounded-lg">Comment</button>
                        </div>
                    </div>
                    {users.map((comment, key) => (
                        <div className="flex flex-col pt-2 pl-4">
                            <div className="">
                                <b>    @{comment.commented_by}  </b>
                            </div>
                            <div>
                                {comment.comment}
                            </div>
                        </div>
                    ))}
                    
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}