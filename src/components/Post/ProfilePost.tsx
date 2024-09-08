import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import databaseService from '../../app/services/databaseService';
import { addPosts, clearAllPostsFromStore } from '../../app/store/features/userPosts';
import { Loader, PostCard } from '../index';
import { UserPostType } from '../../app/interfaces/interfaces';

export default function ProfilePost({ userId }: { userId: string }) {

    // Getting user's posts from store.
    const userPosts = useSelector((state: UserPostType) => state.userPosts.posts);

    const dispatch = useDispatch();

    // Loading state.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Getting user's posts from database.
        databaseService.getUserPosts(userId)
            .then(res => dispatch(addPosts(res.documents)))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));

        // Clearing posts from store on component unmount.
        return () => {
            dispatch(clearAllPostsFromStore());
        }
    }, []);

    return (
        <>
            {
                loading && <Loader containerClasses="max-h-full" />
            }

            <div className="w-[1100px] max-w-[90%] mx-auto flex flex-row items-start justify-start gap-3 my-10 flex-wrap">

                {
                    userPosts?.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))
                }

                {
                    !loading && userPosts?.length === 0 && (
                        <div className="w-full h-full flex items-center justify-center mt-14">
                            <p className="text-2xl text-gray-500">Create your first post 😉.</p>
                        </div>
                    )
                }
            </div>
        </>
    );
};
