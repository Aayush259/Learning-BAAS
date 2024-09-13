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
                    <p className="z-30 w-full text-center text-2xl text-gray-500">No more posts
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos numquam molestiae consequuntur est, et ratione rerum voluptas iure nisi ex.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, illum iusto! Nam porro explicabo, tenetur enim nostrum molestias id totam at aspernatur, doloremque libero debitis cum, animi dolorum? Doloribus, amet excepturi, facilis perferendis ipsum minima facere iste veritatis inventore iusto quos voluptate magnam aliquid error saepe commodi temporibus et. Quibusdam maxime sapiente a excepturi iusto esse ducimus, dolorum suscipit quaerat vitae veritatis unde asperiores! Aperiam perspiciatis placeat nam eligendi incidunt reprehenderit natus deserunt inventore quidem eaque error nihil, minima doloribus, quo ab eveniet animi numquam id nemo. Inventore praesentium consequatur doloremque molestias soluta unde earum, dolorum mollitia laborum dolor nostrum.
                    </p>
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
