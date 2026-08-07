import dihmare from "../assets/dihmare.png";

export default function Home() {
  return (
    <>
      <div className="border-t-2 border-black/10 mt-20"></div>

      <section className="mx-13 border-x-2 h-screen border-black/10 " id="home">
        <div className="flex p-7 ">
          <div className="justify-start">
            <h1 className="text-4xl mt-2 font-baskerville font-extrabold">
              Your competitors are still sketching. We already{" "}
              <span className="text-[#FF2E91]/70">shipped</span> products.
            </h1>
            <p className="font-mono m-2 mt-4">
              we've been on deadline(always). and we have always delivered.
              working with AI Startups to early stage YC and Venture Capital has
              been our goto.{" "}
            </p>
            <div className="mt-7 flex gap-4  items-center">
              <div className="font-baskerville justify-center items-center flex gap-2  bg-[linear-gradient(to_right,_theme(colors.gray.600),_theme(colors.gray.800),_theme(colors.gray.700),_theme(colors.gray.800))] w-fit px-3 py-[3.5px] rounded-[7px] text-xs text-white font-extrabold shadow-lg shadow-black/30">
                <img
                  src={dihmare}
                  className="rounded-full size-8 object-cover"
                  alt="Daniyal"
                />
                Book call with Daniyal
              </div>
              <div className=" w-fit px-6 py-[12px]  rounded-[7px] text-white text-xs  font-extrabold bg-black/30  font-meow">View Work</div>
            </div>
          </div>
          <video
            src=""
            about="avideo ig"
            className="h-100 w-180 ml-20 bg-black/10 rounded-[9px]"
          />
        </div>
      </section>
    </>
  );
}
