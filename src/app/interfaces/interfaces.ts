
/** Database services response interfaces. **/
export interface CreateUpdateGetPostResponseType {
    $id: string,
    $collectionId: string,
    $databaseId: string,
    $createdAt: string,
    $updatedAt: string,
    $permissions: string[],
    $tenant: string,
    content: string,
    featuredImage: string | null,
    title: string,
    userId: string,
};

export interface ListPostsResponseType {
    documents: CreateUpdateGetPostResponseType[],
    total: number
};

/** Database services request interfaces. **/
export interface CreatePostType {
    title: string;
    slug: string;
    content: string;
    featuredImage: string | undefined;
    userId: string
}

export interface UpdatePostType {
    title?: string;
    content?: string;
    featuredImage?: string | undefined;
}

export interface UploadPostType {
    title: string;
    slug: string;
    content: string;
    featuredImage: FileList | null;
    userId: string
}

export interface HomePostType {
    homePosts: {
        posts: CreateUpdateGetPostResponseType[]
    }
}

export interface UserPostType {
    userPosts: {
        posts: CreateUpdateGetPostResponseType[]
    }
}
