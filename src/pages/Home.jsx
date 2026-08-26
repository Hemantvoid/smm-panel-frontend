import { useEffect, useMemo, useState } from "react";

import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Server,
  Star,
  ChevronRight,
  Layers3,
  Headphones,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import api from "../axios";

import { useTheme } from "../context/ThemeContext";

export default function Home() {

  const navigate = useNavigate();

  const {
    settings,
    theme,
  } = useTheme();

  const [services, setServices] =
    useState([]);
  const [latestBlogs, setLatestBlogs] =
  useState([]);

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("All");

  useEffect(() => {

  loadServices();
  loadLatestBlogs();

}, []);

  const loadServices = async () => {

    try {

      const res =
        await api.get(
          "/services/public"
        );

      setServices(res.data);

    } catch (err) {

      console.error(err);
    }
  };

  const loadLatestBlogs = async () => {

  try {

    const res =
      await api.get("/api/blog");

    setLatestBlogs(
      res.data.slice(0, 3)
    );

  } catch (err) {

    console.error(
      "Failed to load latest blogs:",
      err
    );

  }
};

  // =========================
  // CLEAN CATEGORY
  // =========================

  const extractCategory =
    (category) => {

      if (!category)
        return "Other";

      return category
        .split("-")[0]
        .trim();
    };

  // =========================
  // CATEGORIES
  // =========================

  const categories =
    useMemo(() => {

      return [

        "All",

        ...new Set(

          services.map(
            (s) =>
              extractCategory(
                s.category
              )
          )

        ),

      ];

    }, [services]);

  // =========================
  // FILTERED
  // =========================

  const filteredServices =

    selectedCategory === "All"

      ? services

      : services.filter(

          (s) =>

            extractCategory(
              s.category
            ) ===
            selectedCategory

        );

  // =========================
  // FEATURED
  // =========================

  const featuredServices =
    filteredServices.slice(0, 12);

  return (

    <div
      className={`
        min-h-screen
        text-white
        ${theme.background}
      `}
    >

      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          backdrop-blur-2xl
          bg-black/20
          border-b
          border-white/10
        "
      >

       <div
  className="
    max-w-7xl
    mx-auto
    px-3
    sm:px-4
    md:px-6
    h-16
    md:h-20
    flex
    items-center
    justify-between
    gap-2
  "
>

          {/* LEFT */}
          <div
  className="
    flex
    items-center
    gap-2
    min-w-0
    flex-1
  "
>

            {settings?.logoUrl ? (

              <img
                src={settings.logoUrl}
                alt="logo"
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  md:w-12
                  md:h-12
                  rounded-xl
                  md:rounded-2xl
                  object-cover
                  shadow-xl
                "
              />

            ) : (

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                "
              />

            )}

            <div>

              <h1
              className="
              text-lg
              md:text-2xl
              font-black
              text-white
              truncate
              "
              >

                {settings?.panelName ||
                  "SMM Panel"}

              </h1>

             <p
              className="
              hidden
              sm:block
              text-xs
              text-slate-400
              ">
                Cheapest SMM Services
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div
  className="
    flex
    items-center
    gap-1.5
    sm:gap-3
    shrink-0
  "
>

           <button
  onClick={() =>
    navigate("/blog")
  }
  className="
    hidden
    sm:block
    px-3
    md:px-5
    py-2.5
    rounded-2xl
    text-slate-300
    hover:text-white
    hover:bg-white/10
    transition
  "
>
  Blog
</button>

            <button
              onClick={() =>
                navigate("/login")
              }
              className="
                px-3
                sm:px-3
                md:px-5
                py-2
                text-sm
                md:text-base
                rounded-2xl
                border
                border-white/10
                bg-white/5
                hover:bg-white/10
                transition
              "
            >
              Login
            </button>

            <button
              onClick={() =>
                navigate("/register")
              }
              className="
              px-3
              sm:px-3
              md:px-5
              py-2
              text-sm
              md:text-base
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                font-semibold
                flex
                items-center
                gap-2
              "
            >

              Sign Up

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </header>

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section
        className="
          relative
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            inset-0
            opacity-20
            blur-3xl
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
          "
        />

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-6
            py-28
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >

          {/* LEFT */}
          <div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-indigo-500/20
                bg-indigo-500/10
                text-indigo-300
                text-sm
                mb-8
              "
            >

              <Sparkles size={16} />

              Fastest Growing SMM Panel

            </motion.div>

           <h1
  className="
    text-4xl md:text-6xl
    lg:text-7xl
    font-black
    text-white
    leading-tight
    mb-8
  "
>
  Best SMM Panel in India

  <span
    className="
      block
      bg-gradient-to-r
      from-indigo-400
      to-purple-500
      bg-clip-text
      text-transparent
    "
  >
    Affordable Social Media Marketing Services
  </span>
</h1>

           <p
  className="
    text-xl
    text-slate-400
    leading-relaxed
    max-w-2xl
    mb-10
  "
>
  Grow your social media presence with affordable SMM services.
  Buy Instagram followers and likes, YouTube views, Telegram members,
  TikTok likes and other social media marketing services with fast delivery.
</p>
            <div
              className="
                flex
                flex-wrap
                gap-4
              "
            >

              <button
                onClick={() =>
                  navigate("/register")
                }
                className="
                  px-8
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  font-bold
                  text-lg
                  shadow-2xl
                  shadow-indigo-500/20
                "
              >
                Get Started
              </button>

              <button
  onClick={() =>
    document
      .getElementById("services")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
  className="
    px-8
    py-4
    rounded-2xl
    border
    border-white/10
    bg-white/5
    text-lg
  "
>
  View Services
</button>

            </div>

          </div>

          {/* RIGHT */}
          <div
            className="
              grid
              grid-cols-2
              gap-5
            "
          >

            {[
              {
                title:
                  "Orders Completed",
                value: "2M+",
                icon: Globe,
              },

              {
                title:
                  "Active Users",
                value: "50K+",
                icon: ShieldCheck,
              },

              {
                title:
                  "API Uptime",
                value: "99.9%",
                icon: Server,
              },

              {
                title:
                  "24/7 Support",
                value: "Always",
                icon: Headphones,
              },

            ].map((item, i) => {

              const Icon =
                item.icon;

              return (

                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: i * 0.1,
                  }}
                  className="
                    w-full
                    max-w-full
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-5
                    md:p-7
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-r
                      from-indigo-500
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      mb-5
                    "
                  >

                    <Icon size={28} />

                  </div>

                  <p
                    className="
                      text-slate-400
                      mb-2
                    "
                  >
                    {item.title}
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-black
                    "
                  >
                    {item.value}
                  </h3>

                </motion.div>

              );
            })}

          </div>

        </div>

      </section>

      {/* ================================= */}
      {/* CATEGORY SECTION */}
      {/* ================================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          pb-8
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-8
          "
        >

          <div>

            <h2
              className="
                text-3xl md:text-5xl
                font-black
                text-white
                mb-3
              "
            >
              Popular Categories
            </h2>

            <p
              className="
                text-slate-400
                text-lg
              "
            >
              Choose your desired
              social media platform.
            </p>

          </div>

        </div>

        {/* CATEGORY BUTTONS */}
        <div
          className="
            flex
            flex-wrap
            gap-4
          "
        >

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(cat)
              }
              className={`
                px-6
                py-3
                rounded-2xl
                transition
                font-semibold
                flex
                items-center
                gap-2

                ${
                  selectedCategory === cat

                    ? "bg-indigo-600 text-white"

                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                }
              `}
            >

              <Layers3 size={18} />

              {cat}

            </button>

          ))}

        </div>

      </section>

      {/* ================================= */}
      {/* SERVICES */}
      {/* ================================= */}

      <section
  id="services"
  className="
    max-w-7xl
    mx-auto
    px-6
    pb-28
  "
>
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          pb-28
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-10
          "
        >

          <div>

            <h2
              className="
                text-3xl md:text-5xl
                font-black
                text-white
                mb-3
              "
            >
              Services
            </h2>

            <p
              className="
                text-slate-400
                text-lg
              "
            >
              Best prices with
              instant delivery.
            </p>

          </div>

        </div>

        {/* GRID */}
        <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-6
    w-full
  "
>
          {featuredServices.map(
            (service) => (

              <motion.div
                key={service.id}
                whileHover={{
                  y: -5,
                }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-7
                  hover:border-indigo-500/30
                  transition
                "
              >

                {/* CATEGORY */}
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    bg-indigo-500/10
                    text-indigo-300
                    text-sm
                    mb-5
                  "
                >

                  <Star size={14} />

                  {extractCategory(
                    service.category
                  )}

                </div>

                {/* NAME */}
                <h3
                  className="
                  text-xl
                  md:text-2xl
                  font-bold
                  leading-snug
                  break-words
                  whitespace-normal
                  mb-6
                  "
                >
                  {service.name}
                </h3>

                {/* PRICE */}
                <div
                  className="
                    flex
                    flex-wrap
                    items-end
                    gap-2
                    mb-6
                  "
                >

                  <span
                    className="
                      text-5xl
                      font-black
                      text-green-400
                    "
                  >

                    ₹
                    {service.sellPrice}

                  </span>

                  <span
                    className="
                      text-slate-400
                      mb-1
                    "
                  >
                    / 1000
                  </span>

                </div>

                {/* DETAILS */}
                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    text-slate-400
                    mb-7
                  "
                >

                  <span>
                    Min:
                    {" "}
                    {service.min}
                  </span>

                  <span>
                    Max:
                    {" "}
                    {service.max}
                  </span>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    navigate("/login")
                  }
                  className="
                    w-full
                    py-3.5
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-600
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  Login To Order

                  <ChevronRight
                    size={18}
                  />

                </button>

              </motion.div>

            )
          )}

        </div>

      </section>

      </section>

  {/* ================================= */}
{/* WHAT IS AN SMM PANEL */}
{/* ================================= */}

<section
  className="
    max-w-7xl
    mx-auto
    px-6
    pb-28
  "
>
  <div
    className="
      rounded-[40px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      md:p-12
    "
  >

    {/* LABEL */}

    <p
      className="
        text-indigo-400
        font-semibold
        mb-3
      "
    >
      ABOUT SMM PANELS
    </p>

    {/* HEADING */}

    <h2
      className="
        text-3xl
        md:text-5xl
        font-black
        text-white
        mb-6
      "
    >
      What Is an SMM Panel?
    </h2>

    {/* CONTENT */}

    <div
      className="
        space-y-5
        text-slate-400
        text-lg
        leading-relaxed
        max-w-5xl
      "
    >

      <p>
        An SMM panel is an online platform that allows
        businesses, creators, marketers and resellers to
        purchase social media marketing services from one
        dashboard. These services can include Instagram
        followers and likes, YouTube views, Telegram members,
        TikTok likes and other social media services.
      </p>

      <p>
        SMM Lover provides a simple platform for managing
        social media marketing orders across multiple
        platforms. Users can browse available services,
        add funds to their account and place orders through
        the SMM panel dashboard.
      </p>

      <p>
        Our SMM panel is designed for users looking for
        affordable social media marketing services in India.
        Resellers can also use our API to connect SMM Lover
        services with their own platforms and automate
        order processing.
      </p>

      <p>
        Before placing an order, users should review the
        service description, minimum and maximum order
        limits, delivery information and other service
        details. Choosing the right service is important
        for achieving the desired social media marketing
        results.
      </p>

    </div>

  </div>
</section>

      {/* ================================= */}
{/* LATEST BLOGS */}
{/* ================================= */}

{latestBlogs.length > 0 && (

  <section
    className="
      max-w-7xl
      mx-auto
      px-6
      pb-28
    "
  >

    {/* HEADER */}

    <div
      className="
        flex
        items-end
        justify-between
        mb-10
      "
    >

      <div>

        <p
          className="
            text-indigo-400
            font-semibold
            mb-3
          "
        >
          SMM LOVER BLOG
        </p>

        <h2
          className="
            text-5xl
            font-black
            mb-3
          "
        >
          Latest Insights
        </h2>

        <p
          className="
            text-slate-400
            text-lg
            max-w-2xl
          "
        >
          Learn about social media marketing,
          SMM strategies, Instagram growth,
          YouTube marketing and more.
        </p>

      </div>

      <Link
        to="/blog"
        className="
          hidden
          md:flex
          items-center
          gap-2
          text-indigo-400
          hover:text-indigo-300
          font-semibold
        "
      >
        View All Blogs

        <ArrowRight size={18} />

      </Link>

    </div>


    {/* BLOG GRID */}

    <div
      className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >

      {latestBlogs.map((post) => (

        <article
          key={post.id}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            overflow-hidden
            hover:border-indigo-500/40
            transition
          "
        >

          {/* IMAGE */}

          {post.featuredImage ? (

            <img
              src={post.featuredImage}
              alt={post.title}
              className="
                w-full
                h-52
                object-cover
              "
            />

          ) : (

            <div
              className="
                w-full
                h-52
                bg-gradient-to-br
                from-indigo-600
                to-purple-600
                flex
                items-center
                justify-center
              "
            >

              <span
                className="
                  text-2xl
                  font-black
                "
              >
                SMM LOVER
              </span>

            </div>

          )}


          {/* CONTENT */}

          <div className="p-6">

            {post.category && (

              <p
                className="
                  text-xs
                  text-indigo-400
                  font-semibold
                  uppercase
                  tracking-wide
                  mb-2
                "
              >
                {post.category}
              </p>

            )}


            <h3
              className="
                text-2xl
                font-bold
                leading-snug
                line-clamp-2
              "
            >
              {post.title}
            </h3>


            {post.excerpt && (

              <p
                className="
                  text-slate-400
                  text-sm
                  mt-3
                  line-clamp-3
                "
              >
                {post.excerpt}
              </p>

            )}


            <Link
              to={`/blog/${post.slug}`}
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                text-indigo-400
                hover:text-indigo-300
                font-semibold
              "
            >

              Read Article

              <ArrowRight size={17} />

            </Link>

          </div>

        </article>

      ))}

    </div>


    {/* MOBILE VIEW ALL */}

    <div
      className="
        flex
        md:hidden
        justify-center
        mt-8
      "
    >

      <Link
        to="/blog"
        className="
          flex
          items-center
          gap-2
          text-indigo-400
          font-semibold
        "
      >

        View All Blogs

        <ArrowRight size={18} />

      </Link>

    </div>

  </section>

)}

      {/* ================================= */}
      {/* API SECTION */}
      {/* ================================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          pb-32
        "
      >

        <div
          className="
            rounded-[40px]
            border
            border-white/10
            bg-gradient-to-br
            from-indigo-600/20
            to-purple-600/20
            backdrop-blur-xl
            p-12
          "
        >

          <div
            className="
              max-w-4xl
            "
          >

            <h2
              className="
                text-5xl
                font-black
                mb-6
              "
            >
              API For Resellers
            </h2>

            <p
              className="
                text-slate-300
                text-lg
                leading-relaxed
                mb-10
              "
            >

              Integrate our
              high-performance API
              into your own SMM panel
              with lightning-fast
              response times and
              enterprise-grade uptime.

            </p>

          </div>

          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            {/* API URL */}
            <div
              className="
                rounded-3xl
                bg-black/20
                border
                border-white/10
                p-7
              "
            >

              <p
                className="
                  text-slate-400
                  mb-3
                "
              >
                API URL
              </p>

              <h3
                className="
                  text-xl
                  font-bold
                  break-all
                "
              >

                https://smmlover.in/api/v2

              </h3>

            </div>

            {/* API KEY */}
            <div
              className="
                rounded-3xl
                bg-black/20
                border
                border-white/10
                p-7
              "
            >

              <p
                className="
                  text-slate-400
                  mb-3
                "
              >
                API Key
              </p>

              <h3
                className="
                  text-xl
                  font-bold
                "
              >

                Available After Login

              </h3>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
