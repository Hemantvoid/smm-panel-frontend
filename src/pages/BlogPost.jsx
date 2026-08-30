import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import api from "../axios";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/api/blog/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to load blog post:", error);
        setError(error.response?.data?.message || "Blog post not found");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const title = post.metaTitle || post.title || "SMM Lover Blog";
    const description = post.metaDescription || post.excerpt || "";
    const canonicalUrl = `https://smmlover.in/blog/${post.slug}`;
    const imageUrl = post.featuredImage || "https://smmlover.in/assets/logosmm.jpg";

    document.title = title;

    const setMeta = (name, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const setPropertyMeta = (property, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("robots", "index, follow, max-image-preview:large");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    setPropertyMeta("og:type", "article");
        // =====================================
    // ARTICLE META
    // =====================================

    setPropertyMeta(
      "og:site_name",
      "SMM Lover"
    );

    setPropertyMeta(
      "og:image:alt",
      post.title
    );

    setMeta(
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      "twitter:title",
      post.metaTitle || post.title
    );

    setMeta(
      "twitter:description",
      post.metaDescription ||
      post.excerpt ||
      ""
    );

    if (post.featuredImage) {
      setMeta(
        "twitter:image",
        post.featuredImage
      );
    }

    setMeta(
      "robots",
      "index, follow, max-image-preview:large"
    );
    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:site_name", "SMM Lover");
    setPropertyMeta("og:image", imageUrl);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      url: canonicalUrl,

      inLanguage: "en-IN",

      isPartOf: {
        "@type": "Blog",
        name: "SMM Lover Blog",
        url: "https://smmlover.in/blog"
      },
      description,
      image: [imageUrl],
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author || "SMM Lover"
      },
         publisher: {

        "@type": "Organization",

        name: "SMM Lover",

        url: "https://smmlover.in/",

        logo: {
          "@type": "ImageObject",
          url: "https://smmlover.in/favicon.ico"
        }

      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://smmlover.in/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://smmlover.in/blog"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: canonicalUrl
        }
      ]
    };

    const setSchema = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    setSchema("blog-article-schema", schema);
    setSchema("blog-breadcrumb-schema", breadcrumbSchema);

    return () => {
      document.getElementById("blog-article-schema")?.remove();
      document.getElementById("blog-breadcrumb-schema")?.remove();
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <p className="text-slate-400">Loading blog...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-slate-400 mb-6">{error || "This blog post does not exist."}</p>
        <button onClick={() => navigate("/blog")} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition">
          <ArrowLeft size={18} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <button onClick={() => navigate("/blog")} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
            <ArrowLeft size={18} /> Back to Blog
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">

  <Link
    to="/"
    className="hover:text-indigo-400 transition"
  >
    Home
  </Link>

  <span>/</span>

  <Link
    to="/blog"
    className="hover:text-indigo-400 transition"
  >
    Blog
  </Link>

  <span>/</span>

  <span className="text-slate-400 line-clamp-1">
    {post.title}
  </span>

</div>

          {post.category && (
            <p className="text-indigo-400 uppercase text-sm font-semibold mb-4">{post.category}</p>
          )}

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">{post.title}</h1>

          {post.excerpt && (
            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-5 mt-7 text-sm text-slate-500">
            {post.author && (
              <div className="flex items-center gap-2"><User size={16} /><span>{post.author}</span></div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-6 pt-10">
          <img src={post.featuredImage} alt={post.title} className="w-full max-h-[550px] object-cover rounded-3xl" />
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-8 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300 prose-strong:text-white prose-li:text-slate-300 prose-blockquote:text-slate-300" dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>

      <section className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <button onClick={() => navigate("/blog")} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition">
            <ArrowLeft size={18} /> Back to all articles
          </button>
        </div>
      </section>
    </div>
  );
}
