export default function StatsCard({
  title,
  value,
  color = "text-white",
}) {

  return (

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

      <p className="text-slate-400 text-sm mb-3">
        {title}
      </p>

      <h2 className={`text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}