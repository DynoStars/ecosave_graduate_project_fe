import React from 'react'
import Image from 'next/image'
import { LOGO } from '@/utils'
export default function MainLogo() {
  return (
    <div className='bg-white w-32 h-full flex items-center justify-center'>
         <Image width={70} src={LOGO} height={70} alt='main logo' />
    </div>
  )
}
