import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import storageService from '../../app/services/storageService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '../index';
import databaseService from '../../app/services/databaseService';
import { deleteUserPost as deletePostFromUser } from '../../app/store/features/userPosts';
import { deleteUserPost as deletePostFromHome } from '../../app/store/features/homePosts';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../interfaces';
import { CreateUpdateGetPostResponseType } from '../../app/interfaces/interfaces';

export default function PostCard({
    post
}: {
    post: CreateUpdateGetPostResponseType
}) {

    // Getting user data from store.
    const userData = useSelector((state: AuthState) => state.auth.userData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Destructuring post data.
    const title = post.title;
    const content = post.content;
    const imagePreview = post.featuredImage ? storageService.getFilePreview(post.featuredImage) : null;

    // Function to delete post.
    const deletePost = async () => {
        try {
            // Deleting post from database.
            if (post.featuredImage) {
                await storageService.deleteFile(post.featuredImage);
            }
            await databaseService.deletePost(post.$id);

            // Deleting post from store.
            dispatch(deletePostFromUser(post.$id));
            dispatch(deletePostFromHome(post.$id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="m-4 rounded-xl overflow-hidden w-72 !bg-black border border-[#cbd5e11a] cursor-pointer select-none z-30"
            onClick={() => navigate(`/post/${post.$id}`)}
        >

            {
                imagePreview && <div
                    className="h-48 w-full bg-center bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${imagePreview})`,
                    }}
                />
            }

            <p
                className="text-2xl font-semibold mx-2 mt-4 "
            >{title}</p>

            <p className="mx-2 my-3 line-clamp-4"> {content} </p>

            {
                userData.$id === post.userId && (
                    <div className="w-fit ml-auto flex flex-row items-center justify-center gap-2 m-2">
                        <Button
                            className="h-8 !w-8 !rounded-full !m-2 flex items-center justify-center !bg-transparent !text-white hover:opacity-70 !p-0"
                            onClick={e => e.stopPropagation()}
                        >
                            <EditIcon />
                        </Button>

                        <Button
                            className="h-8 !w-8 !rounded-full !m-2 flex items-center justify-center !bg-transparent !text-red-600 hover:opacity-70 !p-0"
                            onClick={e => {
                                e.stopPropagation();
                                deletePost()
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
                )
            }

        </motion.div>
    );
};
