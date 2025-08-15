'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SocialMediaStep } from './social-media-step'
import { ProgressIndicator } from './progress-indicator'

export function OnboardingFlow() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3 // Will expand as we add more steps
  
  // Check if Instagram was just connected
  const instagramConnected = searchParams.get('instagram') === 'connected'

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SocialMediaStep 
            onNext={() => setCurrentStep(2)}
            instagramConnected={instagramConnected}
          />
        )
      case 2:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Step 2 Coming Soon</h2>
            <p className="text-gray-600">More onboarding steps will be added here.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <ProgressIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
      />
      {renderCurrentStep()}
    </div>
  )
}
