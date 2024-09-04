import React, { useEffect, useState } from 'react';
import { Loader, PostCard } from '../index.js';
import databaseService from '../../app/services/databaseService';

export default function ProfilePost({ userId }) {

    // Loading state.
    const [loading, setLoading] = useState(true);

    // State for all user's post.
    const [posts, setPosts] = useState([]);

    // Getting user's post.
    useEffect(() => {
        databaseService.getUserPosts(userId)
            .then((posts) => {
                setPosts(posts.documents);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                loading && <Loader containerClasses="max-h-full" />
            }


            <div className="w-[1100px] max-w-[90%] mx-auto flex flex-row items-start justify-start gap-3 my-10 flex-wrap">

                {
                    posts?.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))
                }
            </div>
        </>
    );
};
