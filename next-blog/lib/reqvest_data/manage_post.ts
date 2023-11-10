import { Post } from "@prisma/client";

const getPosts = async (): Promise<Post> => {
    //SSR
    const data = await fetch(`http://localhost:3000/api/article`,{ cache: 'no-store' });
    //ISR
    ///const data = await fetch(`http://localhost:3000/api/article`,{ next: { revalidate: 60 } });
    //SSG
    //const data = await fetch(`http://localhost:3000/api/article`,{ cache: 'force-cache' });
    const post = await data.json();
    return post.data;
};

const getPostsByID = async (id:string): Promise<Post> => {
    const data = await fetch(`http://localhost:3000/api/article/${id}`,{ cache: 'no-store' });
    const post = await data.json();
    return post.data;
};
  
export {
    getPosts,
    getPostsByID
}