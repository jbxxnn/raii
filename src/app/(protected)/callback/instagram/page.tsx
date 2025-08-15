import { onIntegrate } from '@/actions/integrations'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    code: string
    state?: string
  }
}

const Page = async ({ searchParams: { code, state } }: Props) => {
  if (code) {
    console.log(code)
    const user = await onIntegrate(code.split('#_')[0])
    if (user.status === 200) {
      // Check if we have a return URL from onboarding
      if (state && decodeURIComponent(state) === '/onboarding') {
        return redirect('/onboarding?instagram=connected')
      }
      
      // Default: return to dashboard integrations (updated URL structure)
      return redirect('/dashboard/integrations')
    }
  }
  return redirect('/sign-up')
}

export default Page
