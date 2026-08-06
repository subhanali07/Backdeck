import React from 'react'
import sacaveatwhite from "../assets/sacaveatwhite.svg"
import Sa from "../assets/Sa.svg"


const navbar = () => {
  return (
    <>
    <nav className='w-full bg-black border border-b-2 h-auto  px-3'>
    <div className='p-1 bg-[#E5E7EB] inline-flex rounded-2xl mt-2'>
    <div className='items-center gap-2 inline-flex px-3 rounded-2xl bg-[#ffffff]'>
     <img src={Sa} className='size-7'/>
     <h1 className='font-baskerville text-xl text-black '>Backdeck & Co.</h1>
    </div>
    </div>
    </nav>
    </>
  )
}

export default navbar