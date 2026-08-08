import launchit from '../assets/launchit-logo.svg'
import LaunchSequence from './kindavideo';
export default function Home() {
  return (
    <>
      <div className="border-t-2 border-black/10 mt-20"></div>

      <section className="mx-13 border-x-2 h-screen border-black/10 " id="home">
        <div className="flex p-7 border-b-2 border-black/10">
          <div className="justify-start">
            <img src={launchit} className='rounded-2xl'/>
            <h1 className="text-5xl mt-2 font-meow font-extrabold">
              Your competitors are still sketching. We already{" "}
              <span className="text-[#FF2E91]/70">shipped</span> products.
            </h1>
            <p className="font-mono m-2 mt-4">
              we've been on deadline(always). and we have always delivered.
              working with AI Startups to early stage YC and Venture Capital has
              been our goto.{" "}
            </p>
            <div className="mt-7 flex gap-4 items-center">
              <div className="group relative overflow-hidden font-baskerville justify-center items-center flex gap-2 bg-[linear-gradient(to_right,_theme(colors.gray.600),_theme(colors.gray.800),_theme(colors.gray.700),_theme(colors.gray.800))] w-fit px-6 py-[12px] rounded-[7px] text-xs text-white font-extrabold shadow-lg shadow-black/30 border border-transparentoutline outline-2 outline-transparent hover:outline-[#cfff04] transition-[outline-color] duration-300  transition-colors duration-300 hover:cursor-pointer">
                <span className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-300 ease-out group-hover:h-full"></span>
             
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Let's do a call
                </span>
              </div>

              <div className="group relative overflow-hidden w-fit px-6 py-[12px] outline outline-2 outline-transparent hover:outline-[#cfff04] transition-[outline-color] duration-300  rounded-[7px] text-white text-xs shadow-lg shadow-black/30  font-extrabold bg-black/30 font-meow border border-transparent transition-colors duration-300 hover:cursor-pointer">
                <span className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-300 ease-out group-hover:h-full"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  View Work
                </span>
              </div>
            </div>
          </div>
          <div
            className="h-120 w-580 ml-20 bg-black/10 rounded-[9px]">
             <LaunchSequence/> 
          </div>
        </div>
      </section>
    </>
  );
}
