import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
  change,
}) {

  return (

    <motion.div

      whileHover={{
        y: -6,
        scale: 1.02,
      }}

      transition={{
        duration: 0.2,
      }}

      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        shadow-xl
      "
    >

      {/* GLOW */}
      <div
        className={`
          absolute
          -top-10
          -right-10
          w-32
          h-32
          rounded-full
          blur-3xl
          opacity-20
          ${color}
        `}
      />

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div>

          <p className="text-slate-400 text-sm mb-2">
            {title}
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white">
            {value}
          </h2>

        </div>

        {/* ICON */}
        <div
          className={`
            w-14 h-14
            rounded-2xl
            flex items-center justify-center
            ${color}
          `}
        >

          {icon}

        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between">

        <span className="text-green-400 text-sm font-medium">
          {change}
        </span>

        <span className="text-slate-500 text-xs">
          Updated now
        </span>

      </div>

    </motion.div>
  );
}