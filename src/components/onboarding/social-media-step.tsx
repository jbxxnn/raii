'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { onOAuthInstagram } from '@/actions/integrations'
import { useQuery } from '@tanstack/react-query'
import { onUserInfo } from '@/actions/user'
import { IntegrationModal } from './integration-modal'

interface SocialMediaStepProps {
  onNext: () => void
  instagramConnected?: boolean
}

interface SocialPlatform {
  id: string
  name: string
  icon: React.ReactNode
  status: 'connected' | 'not_connected' | 'coming_soon'
  strategy?: 'INSTAGRAM' | 'CRM'
}

export function SocialMediaStep({ onNext, instagramConnected }: SocialMediaStepProps) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<{
    strategy: 'INSTAGRAM' | 'TIKTOK' | 'WHATSAPP' | 'MESSENGER' | 'TELEGRAM'
    name: string
  } | null>(null)

  const { data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: onUserInfo,
    staleTime: 0,
    refetchOnMount: true,
  })

  const handlePlatformClick = (platform: any) => {
    if (platform.status === 'not_connected') {
      setSelectedPlatform({
        strategy: platform.strategy || platform.id.toUpperCase() as any,
        name: platform.name
      })
      setModalOpen(true)
    } else if (platform.status === 'connected') {
      // Show connected account details modal
      setSelectedPlatform({
        strategy: platform.strategy || platform.id.toUpperCase() as any,
        name: platform.name
      })
      setModalOpen(true)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const handleContinue = () => {
    router.push('/dashboard')
  }

  // Check if Instagram is connected
  const isInstagramConnected = instagramConnected || 
    data?.data?.integrations.find((integration) => integration.name === 'INSTAGRAM')

  const socialPlatforms: SocialPlatform[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      ),
      status: isInstagramConnected ? 'connected' : 'not_connected',
      strategy: 'INSTAGRAM'
    },
    {
      id: 'whatsapp',
      name: 'Whatsapp',
      icon: (
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
          </svg>
        </div>
      ),
      status: 'coming_soon'
    },
    // {
    //   id: 'tiktok',
    //   name: 'Tiktok',
    //   icon: (
    //     <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
    //       <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
    //         <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    //       </svg>
    //     </div>
    //   ),
    //   status: 'coming_soon'
    // },
    // {
    //   id: 'messenger',
    //   name: 'Messenger',
    //   icon: (
    //     <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
    //       <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
    //         <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.498 1.744 6.705 4.471 8.652V24l4.145-2.271c1.087.291 2.23.443 3.384.443 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8.2l3.13 3.259L19.73 8.2l-6.537 6.763z"/>
    //       </svg>
    //     </div>
    //   ),
    //   status: 'coming_soon'
    // },
    // {
    //   id: 'telegram',
    //   name: 'Telegram',
    //   icon: (
    //     <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
    //       <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
    //         <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.820 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    //       </svg>
    //     </div>
    //   ),
    //   status: 'coming_soon'
    // }
  ]

  return (
    <Card className="w-[500px] p-4">
      <CardHeader className="text-center mb-4">
        <CardTitle className="text-3xl font-bold">Welcome to Slide! 🎉</CardTitle>
        <CardDescription className="text-sm text-black/70">
          Let&apos;s connect your social media accounts to get started with automated conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {socialPlatforms.map((platform) => (
            <div
              key={platform.id}
              className={`
                p-4 rounded-xl border flex flex-col items-center justify-center text-center space-y-2 transition-all duration-200
                ${platform.status === 'connected' 
                  ? 'border-brand-500 bg-brand-50' 
                  : platform.status === 'coming_soon'
                  ? 'border-gray-200 bg-gray-50 opacity-60'
                  : 'border-gray-200 hover:border-brand-300 cursor-pointer'
                }
              `}
              onClick={() => handlePlatformClick(platform)}
            >
              {platform.icon}
              <div>
                <h3 className="font-medium text-sm">{platform.name}</h3>
                <p className="text-xs text-gray-500">
                  {platform.status === 'connected' 
                    ? '1 account connected' 
                    : platform.status === 'coming_soon'
                    ? 'Coming soon'
                    : 'No account connected'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        {instagramConnected && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-700 font-medium">
              ✅ Instagram connected successfully!
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button 
            onClick={handleContinue}
            className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-medium text-base font-inter"
          >
            Go to Dashboard
          </Button>
          
          <Button 
            onClick={handleSkip}
            variant="ghost"
            className="w-full h-12 text-gray-600 font-medium text-base font-inter"
          >
            Skip for now
          </Button>
        </div>
      </CardContent>
      
      {/* Integration Modal */}
      {selectedPlatform && (
        <IntegrationModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setSelectedPlatform(null)
          }}
          platform={selectedPlatform.strategy}
          platformName={selectedPlatform.name}
          isConnected={selectedPlatform.strategy === 'INSTAGRAM' ? !!isInstagramConnected : false}
          connectedAccountData={selectedPlatform.strategy === 'INSTAGRAM' && isInstagramConnected 
            ? data?.data?.integrations.find((integration) => integration.name === 'INSTAGRAM') 
            : null
          }
        />
      )}
    </Card>
  )
}
