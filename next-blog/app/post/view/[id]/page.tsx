import { getPostsByID } from "@/lib/reqvest_data/manage_post";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
    const post = await getPostsByID(params.id);
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
             <h2>{post.title}</h2>
             <br/>
             <p>{post.body}</p>
             <br/>
             <hr/>
             <h5>{post.author.name}</h5>
             <Link
                href={`/post/edit/${post.id}`}
                className="flex items-center justify-center px-4 py-2 mt-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
             >
             Edit Post
             </Link>
          </div>
        </div>
      </section>
    );
  }
  