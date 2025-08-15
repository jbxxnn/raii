'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, Link } from 'lucide-react'
import { onOAuthInstagram } from '@/actions/integrations'
import Image from 'next/image'

interface IntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  platform: 'INSTAGRAM' | 'TIKTOK' | 'WHATSAPP' | 'MESSENGER' | 'TELEGRAM'
  platformName: string
}

export function IntegrationModal({ isOpen, onClose, platform, platformName }: IntegrationModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (platform === 'INSTAGRAM') {
      setIsConnecting(true)
      onOAuthInstagram('INSTAGRAM', '/onboarding')
    } else {
      // For other platforms, show coming soon message
      alert(`${platformName} integration coming soon!`)
      onClose()
    }
  }

  const renderPlatformIcons = () => {
    const instagramIcon = (
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>
    )

    const slideIcon = (
      <div className="w-16 h-16 flex items-center justify-center rounded-lg">
        <Image src="/s.png" alt="Slide" width={100} height={100} className='w-10 h-10' />
      </div>
    )

         return (
       <div className="flex items-center justify-center gap-2 mb-6">
         {platform === 'INSTAGRAM' && instagramIcon}
         <div className="flex items-center">
            <Link className="w-8 h-6 ml-2" fill="none" stroke="currentColor" strokeWidth="2" />
         </div>
         {slideIcon}
       </div>
     )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl w-[800px] p-10 [&>button]:hidden">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-semibold text-black">
            Add {platformName}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 p-0 border-none ring-0 focus:ring-0 focus:outline-none focus:bg-transparent"
            onClick={onClose}
          >
            <X className="h-8 w-8 text-black" />
          </Button>
        </DialogHeader>
        
        <div className="py-6">
          {renderPlatformIcons()}
          
          <div className="text-center space-y-4">
            <h2 className="text-lg font-bold text-black">
              Connect {platformName} account with Slide
            </h2>
            <p className="text-black text-sm">
              Log in with {platformName} and set your permissions. Once that&apos;s done, you&apos;re all set to connect to slide.
            </p>
          </div>
        </div>

        <div className="space-y-3 flex flex-col items-center justify-center">
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-auto h-12 bg-brand-500 hover:bg-brand-600 text-white font-medium"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Connecting...
              </>
            ) : (
              <>
                Connect with {platformName}
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </>
            )}
          </Button>
          
          {/* {platform === 'INSTAGRAM' && (
            <Button
              variant="ghost"
              className="w-auto text-brand-500 hover:text-brand-600"
              onClick={onClose}
            >
              Continue with Meta Business Suite Instead
            </Button>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
