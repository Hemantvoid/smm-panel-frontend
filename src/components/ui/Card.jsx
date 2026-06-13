export default function Input({
  className = "",
  ...props
}) {

  return (
    <div
      className={`
        bg-slate-900
        border border-slate-700
        rounded-xl
        px-4 py-3
        outline-none
        text-white
        focus:border-indigo-500
        transition
        w-full
        ${className}
      `}
      {...props}
     />
  );
}