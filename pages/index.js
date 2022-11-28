import fs from "fs";
import fm from "front-matter";
import path from "path";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className="container">
      <h1>My Posts</h1>
      <main className="article-wrapper">
        {posts.map(post => (
          <article key={post.slug} className="card">
            <h4>
              <Link href={post.slug}>{post.attributes.title}</Link>
            </h4>
            <p>{post.attributes.desc}</p>
            <sub>{post.attributes.date}</sub>
          </article>
        ))}
      </main>

      <style jsx>{`
        .container {
          width: 1000px;
          max-width: 100%;

          margin: 10px auto 0;
          padding: 0 20px;
        }

        .article-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
        }

        .card {
          background-color: #f5f5f5;
          padding: 5px 10px;
          border-radius: 4px;
          width: 400px;
        }

        .card:hover {
          background-color: #eaeaea;
          box-shadow: 1px 2px 6px gray;
        }

        .card:hover h4 {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps = () => {
  // Read all files
  const files = fs.readdirSync(path.join("posts"));

  const posts = [];

  for (const filename of files) {
    // Get slug of posts
    const slug = filename.split(".")[0];

    // Read mdx file
    const rawMdx = fs.readFileSync(path.join("posts", filename), "utf-8");

    // Extract raw mdx to js front-matter object
    const frontMatter = fm(rawMdx);

    posts.push({ ...frontMatter, slug });
  }

  return {
    props: {
      posts,
    },
  };
};
