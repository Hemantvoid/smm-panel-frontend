import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

import api from "../../axios";

export default function AdminBlogEditor() {

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
    category: "",
    author: "",
    status: "DRAFT",
  });

  // =====================================
  // LOAD POST FOR EDIT
  // =====================================

  useEffect(() => {

    if (!isEditMode) {
      return;
    }

    const fetchPost = async () => {

      try {

        setLoading(true);

        const response =
          await api.get(`/admin/blog/${id}`);

        const post = response.data;

        setForm({
          title: post.title || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          featuredImage: post.featuredImage || "",
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
          category: post.category || "",
          author: post.author || "",
          status: post.status || "DRAFT",
        });

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load blog post"
        );

        navigate("/admin/blog");

      } finally {

        setLoading(false);

      }
    };

    fetchPost();

  }, [id, isEditMode, navigate]);


  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================
  // SAVE POST
  // =====================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!form.title.trim()) {

      toast.error("Title is required");

      return;
    }

    if (!form.content.trim()) {

      toast.error("Content is required");

      return;
    }

    try {

      setSaving(true);

      if (isEditMode) {

        await api.put(
          `/admin/blog/${id}`,
          form
        );

        toast.success(
          "Blog post updated successfully"
        );

      } else {

        await api.post(
          "/admin/blog",
          form
        );

        toast.success(
          "Blog post created successfully"
        );

      }

      navigate("/admin/blog");

    } catch (error) {

      console.error(
        "Failed to save blog post:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to save blog post"
      );

    } finally {

      setSaving(false);

    }
  };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="flex items-center justify-center min-h-[300px]">

        <p className="text-slate-400">
          Loading blog post...
        </p>

      </div>
    );

  }


  // =====================================
  // UI
  // =====================================

  return (

    <div className="max-w-5xl mx-auto space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/blog")
            }
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >

            <ArrowLeft size={20} />

          </button>

          <div>

            <h1 className="text-2xl md:text-3xl font-bold">
              {isEditMode
                ? "Edit Blog Post"
                : "Create Blog Post"}
            </h1>

            <p className="text-slate-400 mt-1">
              Create SEO-friendly content for your blog
            </p>

          </div>

        </div>

      </div>


      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* BASIC INFORMATION */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">

          <h2 className="text-lg font-semibold">
            Basic Information
          </h2>


          {/* TITLE */}

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Title *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
              required
            />

          </div>


          {/* EXCERPT */}

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Excerpt
            </label>

            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows="3"
              placeholder="Short description of the article"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition resize-none"
            />

          </div>


          {/* CATEGORY + AUTHOR */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Instagram Marketing"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
              />

            </div>


            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
              />

            </div>

          </div>


          {/* FEATURED IMAGE */}

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Featured Image URL
            </label>

            <input
              type="url"
              name="featuredImage"
              value={form.featuredImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
            />

          </div>

        </div>


        {/* CONTENT */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-lg font-semibold mb-4">
            Content
          </h2>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="20"
            placeholder="Write your blog content here..."
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition resize-y font-mono text-sm"
            required
          />

          <p className="text-xs text-slate-500 mt-2">
            HTML content is supported by the backend.
          </p>

        </div>


        {/* SEO */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">

          <div>

            <h2 className="text-lg font-semibold">
              SEO Settings
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Optimize this post for search engines.
            </p>

          </div>


          {/* META TITLE */}

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Meta Title
            </label>

            <input
              type="text"
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
              placeholder="SEO title"
              maxLength="200"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
            />

            <p className="text-xs text-slate-500 mt-1">
              {form.metaTitle.length}/200
            </p>

          </div>


          {/* META DESCRIPTION */}

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Meta Description
            </label>

            <textarea
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
              rows="4"
              placeholder="SEO description of your article"
              maxLength="500"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition resize-none"
            />

            <p className="text-xs text-slate-500 mt-1">
              {form.metaDescription.length}/500
            </p>

          </div>

        </div>


        {/* PUBLISH SETTINGS */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-lg font-semibold mb-4">
            Publishing
          </h2>

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full md:w-64 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
            >

              <option value="DRAFT">
                Draft
              </option>

              <option value="PUBLISHED">
                Published
              </option>

            </select>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="flex justify-end gap-3 pb-6">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/blog")
            }
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            style={{
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6)"
            }}
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : isEditMode
                ? "Update Post"
                : "Create Post"}

          </button>

        </div>

      </form>

    </div>
  );
}
