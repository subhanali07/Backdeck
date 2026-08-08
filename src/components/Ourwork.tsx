import React from 'react'
import aleeza from '../assets/aleeza.mp4'
import danibhai from '../assets/danibhoi.mp4'
import subhan from '../assets/subhan.mp4'
import naqsh from '../assets/resume-builder.mp4'
import ecommercesite from '../assets/paperbags.mp4'
function ProjectMedia({
  title,
  video,
}: {
  title: string;
  video: { src: string };
}) {
  return (
    <div className="flex h-56 w-full items-center justify-center overflow-hidden bg-black sm:h-64">
      <video
        src={video.src}
        aria-label={title}
        className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
const VIDEOS: Record<string, { src: string }> = {
        subhanportfolio :{src: subhan},
        aleezaportfolio :{src:aleeza},
        daniyalportfolio :{src:danibhai},
        ecommercesite : {src:ecommercesite},
        naqshresume :{src:naqsh}
        
    }

const Ourwork = () => {
    
    

  return (
    <div>Ourwork</div>
  )
}

export default Ourwork