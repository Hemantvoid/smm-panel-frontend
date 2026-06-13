export default function Modal({
  open,
  onClose,
  title,
  children,
}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div className="relative bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition flex items-center justify-center"
          >
            ✕
          </button>

        </div>

        {/* BODY */}
        <div>
          {children}
        </div>

      </div>

    </div>
  );
}