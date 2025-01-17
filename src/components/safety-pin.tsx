export function SafetyPin() {
  return (
    <div className="relative h-6 w-6 rotate-45 transform">
      <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-black" />
      <div className="absolute left-0 h-4 w-0.5 rounded-full bg-black" />
      <div className="absolute right-0 h-4 w-0.5 rounded-full bg-black" />
      <div className="absolute right-0 top-0 h-2 w-2 rounded-full border border-black bg-white dark:border-slate-800" />
    </div>
  );
}
