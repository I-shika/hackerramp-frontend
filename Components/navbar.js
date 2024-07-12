'use client'

import React from 'react'
import Link from 'next/link'
import Dropdown from './dropdown'// Ensure the path is correct

export default function Navbar() {
  return (
    <div className="flex justify-evenly h-20 items-center bg-pink-100">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Dropdown />
      </div>
    </div>
  )
}
