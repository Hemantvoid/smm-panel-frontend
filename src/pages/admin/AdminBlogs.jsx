import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../axios";

export default function AdminBlogs() {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // =====================================
  // FETCH BLOG POSTS
  // =====================================

  const fetchPosts = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/admin/blog");

      setPosts(response.data);

    } catch (error) {

      console.error(
        "Failed to fetch blog posts:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load blog posts"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchPosts();

  }, []);

  // =====================================
  // DELETE BLOG POST
  // =====================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this blog post?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setDeletingId(id);

      await api.delete(
        `/admin/blog/${id}`
      );

      toast.success(
        "Blog post deleted successfully"
      );

      setPosts((prevPosts) =>
        prevPosts.filter(
          (post) => post.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Failed to delete blog post:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete blog post"
      );

    } finally {

      setDeletingId(null);

    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="flex items-center justify-center min-h-[300px]">

        <div className="text-slate-400">
          Loading blog posts...
        </div>

      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Blog Posts
          </h1>

          <p className="text-slate-400 mt-1">
            Manage your SEO blog content
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/admin/blog/new")
          }
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white transition hover:opacity-90"
          style={{
            background:
              "linear-gradient(135deg, #6366f1, #8b5cf6)"
          }}
        >

          <Plus size={19} />

          Create Post

        </button>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-slate-400">
            Total Posts
          </p>

          <p className="text-2xl font-bold mt-2">
            {posts.length}
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-slate-400">
            Published
          </p>

          <p className="text-2xl font-bold mt-2 text-green-400">
            {
              posts.filter(
                (post) =>
                  post.status === "PUBLISHED"
              ).length
            }
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-slate-400">
            Drafts
          </p>

          <p className="text-2xl font-bold mt-2 text-yellow-400">
            {
              posts.filter(
                (post) =>
                  post.status === "DRAFT"
              ).length
            }
          </p>

        </div>

      </div>


      {/* TABLE */}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                  Title
                </th>

                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                  Published
                </th>

                <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {posts.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-slate-400">
                      No blog posts found.
                    </p>

                    <button
                      onClick={() =>
                        navigate("/admin/blog/new")
                      }
                      className="mt-4 text-indigo-400 hover:text-indigo-300"
                    >
                      Create your first post
                    </button>

                  </td>

                </tr>

              ) : (

                posts.map((post) => (

                  <tr
                    key={post.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >

                    {/* TITLE */}

                    <td className="px-6 py-4">

                      <div className="max-w-[350px]">

                        <p className="font-medium text-white truncate">
                          {post.title}
                        </p>

                        <p className="text-xs text-slate-500 mt-1 truncate">
                          /blog/{post.slug}
                        </p>

                      </div>

                    </td>


                    {/* CATEGORY */}

                    <td className="px-6 py-4">

                      <span className="text-sm text-slate-300">
                        {post.category || "—"}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-4">

                      {post.status === "PUBLISHED" ? (

                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          Published
                        </span>

                      ) : (

                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          Draft
                        </span>

                      )}

                    </td>


                    {/* DATE */}

                    <td className="px-6 py-4">

                      <span className="text-sm text-slate-400">

                        {post.publishedAt
                          ? new Date(
                              post.publishedAt
                            ).toLocaleDateString()
                          : "—"}

                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        {post.status ===
                          "PUBLISHED" && (

                          <button
                            onClick={() =>
                              window.open(
                                `/blog/${post.slug}`,
                                "_blank"
                              )
                            }
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition"
                            title="View"
                          >

                            <Eye size={17} />

                          </button>

                        )}


                        <button
                          onClick={() =>
                            navigate(
                              `/admin/blog/edit/${post.id}`
                            )
                          }
                          className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition"
                          title="Edit"
                        >

                          <Pencil size={17} />

                        </button>


                        <button
                          onClick={() =>
                            handleDelete(post.id)
                          }
                          disabled={
                            deletingId === post.id
                          }
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition disabled:opacity-50"
                          title="Delete"
                        >

                          <Trash2 size={17} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
