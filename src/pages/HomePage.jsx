import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import databaseService from '../app/services/databaseService';
import { Loader, PostCard } from '../components/index.js';
import { addPosts, clearAllPostsFromStore } from '../app/store/features/homePosts.js';

function HomePage() {

    const homePosts = useSelector(state => state.homePosts.posts);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        databaseService.getPosts()
            .then(res => dispatch(addPosts(res.documents)))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

        return () => {
            dispatch(clearAllPostsFromStore());
        }
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
                    homePosts?.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))
                }
            </div>
        </div>
    );
};

export default React.memo(HomePage);
