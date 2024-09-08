import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import databaseService from '../app/services/databaseService';
import storageService from '../app/services/storageService';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Loader } from '../components/index.js';

export default function PostPage() {

    const { slug } = useParams();   // Getting slug from url.
    const navigate = useNavigate();

    const { data: post, isFetching, isError } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => {
            if (slug) return databaseService.getPost(slug);
            throw new Error('Slug is required');
        },
    });

    return (
        <>
            <Button
                className="!w-8 !h-8 !rounded-full flex items-center justify-center !bg-transparent !text-white hover:opacity-75 mx-10 my-8 z-30 relative"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIosIcon className="ml-2" />
            </Button>
            <div className="min-h-[70vh] flex items-start justify-center w-[1100px] max-w-[90%] mx-auto gap-3 pb-10 my-14">

                {
                    isFetching && <Loader containerClasses="!h-full" />
                }

                {
                    isError && <div>Error...</div>
                }

                {
                    post && (
                        <div className="w-full flex flex-row justify-center items-start gap-8">
                            {post.featuredImage && post.featuredImage !== '' && (
                                <div className="w-1/2 max-w-fit flex items-center justify-center">
                                    <img
                                        src={storageService.getFilePreview(post.featuredImage).toString()}
                                        alt="post-image"
                                        className="max-w-full max-h-[400px] rounded-2xl border border-[#cbd5e11a]"
                                    />
                                </div>
                            )}

                            <div className="flex-grow p-8">
                                <h2 className="text-3xl font-bold mb-4">
                                    {post.title}
                                </h2>

                                <p className="word-wrap break-words w-[90%] tracking-wide">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
};
