"use client"

import React, { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Loader, Mail } from 'lucide-react'
import { Envalope } from '@/icons/envalope'

interface SignInFormData {
  email: string
}

export function CustomSignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()
  
  const [formData, setFormData] = useState<SignInFormData>({
    email: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationPending, setVerificationPending] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [emailAddressId, setEmailAddressId] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return
    
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard'
      })
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign in with Google')
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn.create({
        identifier: formData.email,
      })

      // Prepare email verification
      const foundEmailAddressId = result.supportedFirstFactors?.find(
        factor => factor.strategy === 'email_code'
      )?.emailAddressId

      if (foundEmailAddressId) {
        setEmailAddressId(foundEmailAddressId)
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: foundEmailAddressId,
        })
        setVerificationPending(true)
      } else {
        setError('Email verification not available for this account.')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid email address. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !verificationCode) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: verificationCode,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (verificationPending) {
    return (
      <Card className="w-[500px] p-4">
        <div className="flex justify-center mb-4">
          <Envalope width={48} height={50} />
        </div>
        <CardHeader className="text-center">
          <CardTitle className='text-3xl font-bold'>Check your email</CardTitle>
          <CardDescription className='text-sm text-black'>
            We&apos;ve sent a verification code to <br /> <span className='font-bold'>{formData.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerification} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-center gap-3">
                <div className="flex gap-6">
                  {[0, 1, 2].map((index) => (
                    <Input
                      key={index}
                      type="text"
                      value={verificationCode[index] || ''}
                      onChange={(e) => {
                        const value = e.target.value.slice(-1) // Only take last character
                        const newCode = verificationCode.split('')
                        newCode[index] = value
                        setVerificationCode(newCode.join(''))
                        
                        // Auto-focus next input
                        if (value && index < 5) {
                          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement
                          nextInput?.focus()
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace
                        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                          const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement
                          prevInput?.focus()
                        }
                      }}
                      data-index={index}
                      className="w-12 h-12 text-center text-lg font-inter border-brand-border-800 focus:outline-none focus-visible:outline-none focus:border-brand-500 focus-visible:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus-visible:ring-2 focus-visible:ring-brand-500/20"
                      maxLength={1}
                      placeholder='0'
                      required
                    />
                  ))}
                </div>
                <span className="flex items-center text-brand-gray text-lg">ー</span>
                <div className="flex gap-2">
                  {[3, 4, 5].map((index) => (
                    <Input
                      key={index}
                      type="text"
                      value={verificationCode[index] || ''}
                      onChange={(e) => {
                        const value = e.target.value.slice(-1) // Only take last character
                        const newCode = verificationCode.split('')
                        newCode[index] = value
                        setVerificationCode(newCode.join(''))
                        
                        // Auto-focus next input
                        if (value && index < 5) {
                          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement
                          nextInput?.focus()
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace
                        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                          const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement
                          prevInput?.focus()
                        }
                      }}
                      data-index={index}
                      className="w-12 h-12 text-center text-lg font-inter border-brand-border-800 focus:outline-none focus-visible:outline-none focus:border-brand-500 focus-visible:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus-visible:ring-2 focus-visible:ring-brand-500/20"
                      maxLength={1}
                      placeholder='0'
                      required
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-medium text-base font-inter" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
            
            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (signIn && emailAddressId) {
                    signIn.prepareFirstFactor({ 
                      strategy: 'email_code',
                      emailAddressId 
                    })
                    setError(null)
                  }
                }}
                disabled={isLoading}
                className="text-sm font-inter font-medium"
              >
                Didn&apos;t receive the code? <span className='text-brand-500 font-bold'>Resend</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-[500px] p-4">
      <CardHeader className="text-center mb-4">
        <CardTitle className="text-3xl font-bold">Welcome back!</CardTitle>
        <CardDescription className="text-sm text-black/50">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal font-inter text-black">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-500" strokeWidth={1.5} />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 pl-10 !text-black placeholder:text-gray-400 font-inter border-brand-border-800 focus:outline-none focus-visible:outline-none focus:border-brand-500 focus-visible:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus-visible:ring-2 focus-visible:ring-brand-500/20"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-medium text-base font-inter"
            disabled={isLoading || !isLoaded}
          >
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Continue with Email
              </>
            )}
          </Button>
        </form>

        {/* Separator */}
        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-400">OR</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <div className='mb-4'>
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="w-full h-12 text-black/80 font-inter font-medium border-brand-border-800 hover:bg-gray-50"
          disabled={!isLoaded}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>

        {/* Footer */}
        <div className="text-center space-y-4 mt-4">
          <div className="text-xs font-inter font-medium text-gray-600">
            Don&apos;t have an account?{' '}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-normal text-brand-500 hover:text-brand-600"
              onClick={() => router.push('/sign-up')}
            >
              Sign up
            </Button>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
  )
}
