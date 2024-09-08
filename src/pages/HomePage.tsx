import React from 'react';
import databaseService from '../app/services/databaseService';
import { Loader, PostCard } from '../components/index';
import { useQuery } from '@tanstack/react-query';

function HomePage() {

    const {data: homePosts, isFetching, isError} = useQuery({
        queryKey: ['homePosts'],
        queryFn: () => databaseService.getPosts(),
    });

    if (isError) return <div>Error.</div>

    return isFetching ? <Loader containerClasses="max-h-full" /> : (
        <>
            <div
                className="w-[1100px] max-w-[90%] mx-auto flex flex-row items-start justify-start gap-3 flex-wrap pb-10"
            >
                {
                    homePosts?.documents.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))
                }

                {homePosts?.documents.length && (
                    <p className="absolute z-30 left-0 bottom-4 w-full text-center text-2xl text-gray-500">No more posts</p>
                )}

                {
                    !homePosts?.documents.length && (
                        <div className="w-full h-full flex items-center justify-center mt-36">
                            <p className="text-2xl text-gray-500">No new posts found.</p>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default React.memo(HomePage);
