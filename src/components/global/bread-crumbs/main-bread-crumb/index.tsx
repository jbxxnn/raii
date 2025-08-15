'use client'

import { PAGE_ICON } from '@/constants/pages'
import { useUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
  page: string
}

const MainBreadCrumb = ({ page }: Props) => {
  const { user } = useUser()
  const userName = user ? `${user.firstName} ${user.lastName}` : 'User'

  return (
    <div className="flex flex-col items-start">
      {page === 'Home' && (
        <div className="flex justify-center w-full">
          <div className="radial--gradient w-4/12 py-5 lg:py-10 flex flex-col items-center">
            <p className="text-text-secondary text-lg">Welcome back</p>
            <h2 className="capitalize text-4xl font-medium">{userName}!</h2>
          </div>
        </div>
      )}
      <span className="radial--gradient inline-flex py-5 lg:py-10 pr-16 gap-x-2 items-center">
        {PAGE_ICON[page.toUpperCase()]}
        <h2 className="font-semibold text-3xl capitalize">{page}</h2>
      </span>
    </div>
  )
}

export default MainBreadCrumb
