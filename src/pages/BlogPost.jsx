import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";

import api from "../axios";

export default function BlogPost() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // FETCH BLOG POST
  // =====================================

  useEffect(() => {

    const fetchPost = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await api.get(`/api/blog/${slug}`);

        setPost(response.data);

      } catch (error) {

        console.error(
          "Failed to load blog post:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Blog post not found"
        );

      } finally {

        setLoading(false);

      }

    };

    if (slug) {
      fetchPost();
    }

  }, [slug]);


  // =====================================
  // SEO
  // =====================================

  useEffect(() => {

    if (!post) {
      return;
    }

    // PAGE TITLE
    document.title =
      post.metaTitle ||
      post.title ||
      "SMM Lover Blog";


    // =====================================
    // META DESCRIPTION
    // =====================================

    const setMeta = (name, content) => {

      if (!content) {
        return;
      }

      let meta =
        document.querySelector(
          `meta[name="${name}"]`
        );

      if (!meta) {

        meta =
          document.createElement("meta");

        meta.setAttribute(
          "name",
          name
        );

        document.head.appendChild(meta);

      }

      meta.setAttribute(
        "content",
        content
      );

    };


    setMeta(
      "description",
      post.metaDescription ||
      post.excerpt ||
      ""
    );


    // =====================================
    // CANONICAL URL
    // =====================================

    const canonicalUrl =
      `${window.location.origin}/blog/${post.slug}`;


    let canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );


    if (!canonical) {

      canonical =
        document.createElement("link");

      canonical.setAttribute(
        "rel",
        "canonical"
      );

      document.head.appendChild(
        canonical
      );

    }


    canonical.setAttribute(
      "href",
      canonicalUrl
    );


    // =====================================
    // OPEN GRAPH META
    // =====================================

    const setPropertyMeta = (
      property,
      content
    ) => {

      if (!content) {
        return;
      }

      let meta =
        document.querySelector(
          `meta[property="${property}"]`
        );


      if (!meta) {

        meta =
          document.createElement("meta");

        meta.setAttribute(
          "property",
          property
        );

        document.head.appendChild(
          meta
        );

      }


      meta.setAttribute(
        "content",
        content
      );

    };


    setPropertyMeta(
      "og:title",
      post.metaTitle ||
      post.title
    );


    setPropertyMeta(
      "og:description",
      post.metaDescription ||
      post.excerpt ||
      ""
    );


    setPropertyMeta(
      "og:url",
      canonicalUrl
    );


    setPropertyMeta(
      "og:type",
      "article"
    );


    if (post.featuredImage) {

      setPropertyMeta(
        "og:image",
        post.featuredImage
      );

    }


    // =====================================
    // ARTICLE STRUCTURED DATA
    // =====================================

    const schema = {

      "@context":
        "https://schema.org",

      "@type":
        "Article",

      headline:
        post.title,

      description:
        post.metaDescription ||
        post.excerpt ||
        "",

      image:
        post.featuredImage
          ? [post.featuredImage]
          : [],

      datePublished:
        post.publishedAt,

      dateModified:
        post.updatedAt ||
        post.publishedAt,

      author: {

        "@type":
          "Person",

        name:
          post.author ||
          "SMM Lover"

      },

      publisher: {

        "@type":
          "Organization",

        name:
          "SMM Lover"

      },

      mainEntityOfPage: {

        "@type":
          "WebPage",

        "@id":
          canonicalUrl

      }

    };


    let script =
      document.getElementById(
        "blog-article-schema"
      );


    if (!script) {

      script =
        document.createElement(
          "script"
        );

      script.id =
        "blog-article-schema";

      script.type =
        "application/ld+json";

      document.head.appendChild(
        script
      );

    }


    script.textContent =
      JSON.stringify(schema);


    // =====================================
    // CLEANUP
    // =====================================

    return () => {

      const schemaScript =
        document.getElementById(
          "blog-article-schema"
        );

      if (schemaScript) {
        schemaScript.remove();
      }

    };

  }, [post]);


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">

        <p className="text-slate-400">
          Loading blog...
        </p>

      </div>

    );

  }


  // =====================================
  // ERROR
  // =====================================

  if (error || !post) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6">

        <h1 className="text-3xl font-bold mb-4">
          Blog Post Not Found
        </h1>

        <p className="text-slate-400 mb-6">
          {error || "This blog post does not exist."}
        </p>

        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
        >

          <ArrowLeft size={18} />

          Back to Blog

        </button>

      </div>

    );

  }


  // =====================================
  // BLOG PAGE
  // =====================================

  return (

    <div className="min-h-screen bg-[#020617] text-white">


      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="border-b border-white/10">

        <div className="max-w-5xl mx-auto px-6 py-16">


          {/* BACK BUTTON */}

          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
          >

            <ArrowLeft size={18} />

            Back to Blog

          </button>


          {/* CATEGORY */}

          {post.category && (

            <p className="text-indigo-400 uppercase text-sm font-semibold mb-4">

              {post.category}

            </p>

          )}


          {/* TITLE */}

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">

            {post.title}

          </h1>


          {/* EXCERPT */}

          {post.excerpt && (

            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl">

              {post.excerpt}

            </p>

          )}


          {/* AUTHOR + DATE */}

          <div className="flex flex-wrap items-center gap-5 mt-7 text-sm text-slate-500">


            {post.author && (

              <div className="flex items-center gap-2">

                <User size={16} />

                <span>
                  {post.author}
                </span>

              </div>

            )}


            {post.publishedAt && (

              <div className="flex items-center gap-2">

                <Calendar size={16} />

                <span>

                  {new Date(
                    post.publishedAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }
                  )}

                </span>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* ================================= */}
      {/* FEATURED IMAGE */}
      {/* ================================= */}

      {post.featuredImage && (

        <div className="max-w-5xl mx-auto px-6 pt-10">

          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full max-h-[550px] object-cover rounded-3xl"
          />

        </div>

      )}


      {/* ================================= */}
      {/* BLOG CONTENT */}
      {/* ================================= */}

      <main className="max-w-4xl mx-auto px-6 py-12">

        <article
          className="
            prose
            prose-invert
            prose-lg
            max-w-none

            prose-headings:font-bold
            prose-headings:text-white

            prose-p:text-slate-300
            prose-p:leading-8

            prose-a:text-indigo-400
            prose-a:no-underline
            hover:prose-a:text-indigo-300

            prose-strong:text-white

            prose-li:text-slate-300

            prose-blockquote:text-slate-300
          "
          dangerouslySetInnerHTML={{
            __html: post.content
          }}
        />

      </main>


      {/* ================================= */}
      {/* BOTTOM */}
      {/* ================================= */}

      <section className="border-t border-white/10">

        <div className="max-w-4xl mx-auto px-6 py-10">

          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
          >

            <ArrowLeft size={18} />

            Back to all articles

          </button>

        </div>

      </section>


    </div>

  );

}
