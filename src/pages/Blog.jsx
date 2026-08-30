import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

import api from "../axios";

export default function Blog() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // SEO
  // =====================================

  useEffect(() => {

    const title =
      "SMM Blog | Social Media Marketing Tips & SMM Panel Guides - SMM Lover";

    const description =
      "Learn about SMM panels, Instagram marketing, YouTube growth, Telegram marketing and social media strategies with practical guides from SMM Lover.";

    const canonicalUrl = "https://smmlover.in/blog";

    document.title = title;

    const setMeta = (name, content) => {

      let meta = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    const setPropertyMeta = (property, content) => {

      let meta = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("robots", "index, follow, max-image-preview:large");

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);

    setPropertyMeta("og:type", "website");
    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:site_name", "SMM Lover");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

  }, []);


  // =====================================
  // FETCH PUBLISHED BLOG POSTS
  // =====================================

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await api.get("/api/blog");

        setPosts(response.data);

      } catch (error) {

        console.error(
          "Failed to load blog posts:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load blog posts"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchPosts();

  }, []);


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">

        <p className="text-slate-400">
          Loading blogs...
        </p>

      </div>
    );

  }


  // =====================================
  // ERROR
  // =====================================

  if (error) {

    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-2xl font-bold mb-3">
            Unable to load blog
          </h1>

          <p className="text-slate-400">
            {error}
          </p>

        </div>

      </div>
    );

  }


  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="min-h-screen bg-[#020617] text-white">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <section className="border-b border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-16">

          <p className="text-indigo-400 font-medium mb-3">
            SMM LOVER BLOG
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">

            Social Media Marketing

            <span className="text-indigo-400">
              {" "}Insights
            </span>

          </h1>

          <p className="text-slate-400 max-w-2xl mt-5 text-lg">

            Learn about SMM panels, Instagram marketing,
            YouTube growth, Telegram marketing and
            practical social media marketing strategies.

          </p>

        </div>

      </section>


      {/* ================================= */}
      {/* BLOG POSTS */}
      {/* ================================= */}

      <main className="max-w-6xl mx-auto px-6 py-12">

        {posts.length === 0 ? (

          <div className="text-center py-20">

            <p className="text-slate-400">
              No blog posts available yet.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {posts.map((post) => (

              <article
                key={post.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition"
              >

                {/* ========================= */}
                {/* FEATURED IMAGE */}
                {/* ========================= */}

                {post.featuredImage ? (

                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />

                ) : (

                  <div className="w-full h-48 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">

                    <span className="text-2xl font-bold">
                      SMM LOVER
                    </span>

                  </div>

                )}


                {/* ========================= */}
                {/* CONTENT */}
                {/* ========================= */}

                <div className="p-6">

                  {/* CATEGORY */}

                  {post.category && (

                    <span className="text-xs text-indigo-400 font-medium">

                      {post.category}

                    </span>

                  )}


                  {/* TITLE */}

                  <h2 className="text-xl font-bold mt-2 line-clamp-2">

                    {post.title}

                  </h2>


                  {/* EXCERPT */}

                  {post.excerpt && (

                    <p className="text-slate-400 text-sm mt-3 line-clamp-3">

                      {post.excerpt}

                    </p>

                  )}


                  {/* ========================= */}
                  {/* FOOTER */}
                  {/* ========================= */}

                  <div className="flex items-center justify-between mt-6">

                    {/* DATE */}

                    <div className="flex items-center gap-2 text-xs text-slate-500">

                      <Calendar size={14} />

                      {post.publishedAt
                        ? new Date(
                            post.publishedAt
                          ).toLocaleDateString()
                        : ""
                      }

                    </div>


                    {/* READ MORE */}

                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition"
                    >

                      Read More

                      <ArrowRight size={16} />

                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

    </div>

  );
}
