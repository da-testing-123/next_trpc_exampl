import { api } from "~/trpc/server";

export default async function Home() {
  const allPosts = await api.post.getAllPosts.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-[5rem]">
          Testing all posts
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg text-white">
            {allPosts.map((post) => (
              <div key={post.id} className="my-1">
                <div>id:{post.id}</div>
                <div>Title:{post.title}</div>
                <div>Body: {post.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
