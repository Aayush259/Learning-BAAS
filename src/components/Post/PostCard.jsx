import React from 'react';
import { motion } from 'framer-motion';
import storageService from '../../app/services/storageService';
import { Button } from '../index.js';

export default function PostCard({ post }) {

    const title = post.title;
    const content = post.content;
    const imagePreview = post.featuredImage ? storageService.getFilePreview(post.featuredImage) : null;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="m-4 rounded-xl overflow-hidden w-72 bg-black border border-[#cbd5e11a] cursor-pointer select-none">

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
        </motion.div>
    )

};
