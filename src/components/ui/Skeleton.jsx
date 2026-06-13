export default function Skeleton({
  className = "",
}) {

  return (
    <div
      className={`
        animate-pulse
        bg-slate-700/60
        rounded-xl
        ${className}
      `}
    />
  );
}