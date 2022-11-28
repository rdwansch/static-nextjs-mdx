import fs from "fs";
// import fm from "front-matter";
import path from "path";
import Image from "next/image";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Button from "../components/Button";
import Link from "next/link";
import SyntaxHighlighter from "../components/SyntaxHighlighter";

// Import components in order to be used in mdx
const components = { Button, SyntaxHighlighter };

export default function DetailPost(props) {
  return (
    <>
      <article className="container">
        <h1>{props.data.title}</h1>
        <p>{props.data.date}</p>
        <Image src={props.data.cover} alt="cover image" width={400} height={200} />

        {/* Display mdxSource and components */}
        <MDXRemote {...props.mdxSource} components={components} />
      </article>

      <hr />
      <Link href="/">
        <span className="link">Go Back</span>
      </Link>

      <style jsx>{`
        .container {
          width: 1000px;
          max-width: 100%;

          margin: 10px auto 0;
          padding: 0 20px;
        }

        .link {
          text-align: center;
          display: block;
          font-size: 18px;
          text-decoration: underline;

          margin: 20px 0 100px;
        }
      `}</style>
    </>
  );
}

// path -> props -> component

export const getStaticProps = async paths => {
  // Read mfx file
  const rawMdx = fs.readFileSync(path.join("posts", `${paths.params.slug}.mdx`), "utf-8");

  // data is from yaml
  const { data, content } = matter(rawMdx);

  // Extract raw content to MDXRemote format
  const mdxSource = await serialize(content);

  return {
    props: { data, mdxSource },
  };
};

// Generate static file by slug
export const getStaticPaths = () => {
  // Read all files
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map(file => {
    // Return to getStaticProps
    return {
      params: {
        // [slug].js and fill it with file from mdx
        slug: file.replace(".mdx", ""),
      },
    };
  });

  return {
    paths,
    fallback: false, // 404 when paths doesn't contain slug
  };
};
