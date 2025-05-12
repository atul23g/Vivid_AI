import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  redirect('/dashboard')
  
}

export default Page