import { Card } from "./components/common";
import { json } from "stream/consumers";
import { getPosts } from "../lib/reqvest_data/manage_post";
import { LoopItems } from "./components/common/util/LoopItems";

export default async function Home() {
  const posts = await getPosts();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <LoopItems
            items={posts}
            renderElemnt={(post: any, index: number) => {
              return (
                <Card
                  key={post.id}
                  articleID={post.id}
                  articleType={post.category.name}
                  createdAt={post.createdAT}
                  title={post.title}
                  discription={post.body}
                  authorImage={post.author.imageUrl}
                  author={post.author.name}
                />
              );
            }}
          />
          <br/>
        </div>
      </div>
    </section>
  );
}
