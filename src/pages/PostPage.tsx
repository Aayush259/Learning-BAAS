import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../app/services/databaseService';
import storageService from '../app/services/storageService';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Loader } from '../components/index.js';
import { CreateUpdateGetPostResponseType } from '../app/interfaces/interfaces';

export default function PostPage() {

    const { slug } = useParams();   // Getting slug from url.
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);   // Loading state.
    const [post, setPost] = useState<CreateUpdateGetPostResponseType | null>(null);   // Post state.

    const title = post?.title;  // Post title.
    const content = post?.content;  // Post content.
    const imagePreview = post?.featuredImage ? storageService.getFilePreview(post?.featuredImage) : null;   // Post featured image.

    useEffect(() => {
        if (!slug) return;
        databaseService.getPost(slug)
            .then(res => setPost(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [slug]);

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
                    loading && <Loader containerClasses="!h-full" />
                }

                <div className="w-full flex flex-row justify-center items-start gap-8">
                    {imagePreview && (
                        <div className="w-1/2 max-w-fit flex items-center justify-center">
                            <img
                                src={imagePreview.toString()}
                                alt="post-image"
                                className="max-w-full max-h-[400px] rounded-2xl border border-[#cbd5e11a]"
                            />
                        </div>
                    )}

                    <div className="flex-grow p-8">
                        <h2 className="text-3xl font-bold mb-4">
                            {title}
                        </h2>

                        <p className="word-wrap break-words w-[90%] tracking-wide">
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
