import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts, clearAllPostsFromStore } from '../app/store/features/homePosts';
import databaseService from '../app/services/databaseService';
import { Loader, PostCard } from '../components/index';
import { HomePostType } from '../app/interfaces/interfaces';

function HomePage() {

    // Getting posts from store.
    const homePosts = useSelector((state: HomePostType) => state.homePosts.posts);

    const dispatch = useDispatch();

    // Loading state.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Getting posts from database.
        databaseService.getPosts()
            .then(res => dispatch(addPosts(res.documents)))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

        // Clearing posts from store on component unmount.
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
                className="w-[1100px] max-w-[90%] mx-auto flex flex-row items-start justify-start gap-3 flex-wrap pb-10"
            >
                {
                    homePosts?.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))
                }

                {!loading && homePosts.length && (
                    <p className="absolute z-30 left-0 bottom-4 w-full text-center text-2xl text-gray-500">No more posts</p>
                )}

                {
                    !loading && !homePosts?.length && (
                        <div className="w-full h-full flex items-center justify-center mt-36">
                            <p className="text-2xl text-gray-500">No new posts found.</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default React.memo(HomePage);
