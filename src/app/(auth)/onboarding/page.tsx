import React, { Suspense } from 'react'
import { OnboardingFlow } from '@/components/onboarding'
import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import Image from 'next/image'

type Props = {}

const OnboardingPage = async (props: Props) => {
  // Handle user onboarding - create user in database
  const user = await onBoardUser()
  if (user.status !== 200 && user.status !== 201) {
    return redirect('/sign-in')
  }
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
            <Suspense fallback={<div className="flex items-center justify-center">Loading...</div>}>
              <OnboardingFlow />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block overflow-hidden">
        {/* Background image/slideshow will be added here */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to Slide!</h2>
          <p className="text-lg opacity-90">
            Let&apos;s get you set up with your social media accounts and start automating your conversations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
