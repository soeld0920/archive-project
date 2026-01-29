export default function PageHeader({icon, title}: {icon: React.ReactNode, title: string}){
  return(
    <header className="w-full h-auto bg-gray-300 flex justify-between">
      <div className="
      w-1/5 h-auto ml-3 px-2 py-1
      flex justify-between items-center
      bg-gray-50
      rounded-t-2xl
      font-[Galmuri]">
        <div className="flex items-center gap-2">
          {icon}
          {title}
        </div>
        <div>
          ×
        </div>
      </div>
      <div className="
      w-auto h-auto mr-5
      flex items-center gap-5">
        <div className="text-2xl">-</div>
        <div>□</div>
        <div className="text-2xl pb-1">×</div>
      </div>
    </header>
  )
}