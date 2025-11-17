import Stars from "../components/Stars";
import bg from "../assets/bg.jpg";


export default function Hero() {
  return (
    <section
      className="h-screen w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-[55%]"></div>

      <div className="w-[45%] bg-[#0e0e0e]/90 h-full flex flex-col justify-center px-20 text-white">
        <h1 className="text-[80px] font-light leading-none">Just Things</h1>

        <h1 className="text-[90px] tracking-wide font-serif mt-4">
          <span className="border-b pb-2">Photography.</span>
        </h1>

        <p className="text-sm mt-8 leading-relaxed max-w-[380px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde culpa quae, cum fugit, molestias id ipsum! Beatae, deserunt eaque?
        </p>

        <Stars />
      </div>
    </section>
  );
}
