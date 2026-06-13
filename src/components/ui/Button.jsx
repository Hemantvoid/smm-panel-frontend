export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {

  const variants = {

    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white",

    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white",

    success:
      "bg-green-600 hover:bg-green-500 text-white",

    danger:
      "bg-red-600 hover:bg-red-500 text-white",

  };

  return (
    <button
      className={`
        px-4 py-2 rounded-xl
        transition-all duration-200
        font-medium
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}