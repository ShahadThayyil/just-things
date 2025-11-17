export default function Navbar() {
  return (
    <nav className="absolute top-6 right-10 text-white flex gap-4 items-center">
      <span className="tracking-[0.3em] text-sm">MENU</span>
      <div className="flex flex-col gap-[3px] cursor-pointer">
        <span className="w-6 h-[1.8px] bg-white"></span>
        <span className="w-6 h-[1.8px] bg-white"></span>
      </div>
    </nav>
  );
}
