'use client'
import { getProjectById } from '@/actions/project'
import { useSlideStore } from '@/store/useSlideStore'
import { useTheme } from 'next-themes'
import { useParams, redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Loader2 } from 'lucide-react'
import { DndProvider } from 'react-dnd'

import { themes } from '@/lib/constants'

type Props = {}

const Page = (props: Props) => {
  const params = useParams()
  const { setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const { setSlides, setProject, currentTheme, setCurrentTheme } = useSlideStore()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getProjectById(params.presentationId as string)
        if (res.status !== 200 || !res.data) {
          toast.error('Error', {
            description: 'Unable to fetch project',
          })
          redirect('/dashboard')
          return
        }

        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName
        )
        setCurrentTheme(findTheme || themes[0])
        setTheme(findTheme?.type === 'dark' ? 'dark' : 'light')
        setProject(res.data)
        setSlides(JSON.parse(JSON.stringify(res.data.slides)))
      } catch (error) {
        toast.error('Error', {
          description: 'An unexpected error occurred',
        })
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen"> 
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <DndProvider>
      {/* Add your content here */}
    </DndProvider>
  )
}

export default Page