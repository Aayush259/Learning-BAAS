import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import databaseService from '../app/services/databaseService';
import { Loader, PostCard } from '../components/index.js';

export default function HomePage() {

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        databaseService.getPosts()
            .then(res => setPosts(res.documents))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);


    return (
        <div className="w-screen max-h-[80vh] overflow-y-auto overflow-x-hidden mx-auto py-10">
            {
                loading && <Loader containerClasses="max-h-full" />
            }
            <div
                className="w-[1100px] max-w-[90%] mx-auto flex flex-row items-start justify-start gap-3 flex-wrap"
            >
                {
                    posts?.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))
                }
            </div>
        </div>
    );
};
