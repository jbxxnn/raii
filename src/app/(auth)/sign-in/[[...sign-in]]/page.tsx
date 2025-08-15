import React from 'react'
import Image from 'next/image'
import { CustomSignInForm } from '@/components/auth/custom-signin-form'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-[60%_40%]">
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
            <Image src="/slide-logo-black.png" alt="Slide" width={100} height={100} />
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-lg">
          <CustomSignInForm />
        </div>
      </div>
    </div>
    <div className="bg-muted relative hidden lg:block overflow-hidden">
      {/* {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Slide ${index + 1}`}
          fill
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))} */}
      
      {/* Optional: Slide indicators */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div> */}
    </div>
  </div>
  )
}

export default Page
