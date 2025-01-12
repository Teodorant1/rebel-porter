export function TornPaper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative rounded-sm border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <div
          className="absolute inset-x-0 top-0 h-2 bg-repeat-x"
          style={{
            backgroundImage: "url(\data:image/svg+xml,%3Csvg width='20' height='8' viewBox='0 0 20 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0C2.5 2.5 8 5 8C7.5 7.5 10 0C12.5 12.5 15 8C17.5 17.5 0V8H0V0Z' fill='black'/%3E%3C/svg%3E\)",
          }}
        />
        {children}
      </div>
    </div>
  )
}

