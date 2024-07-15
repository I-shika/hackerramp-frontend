'use client'

import React from 'react'
import Link from 'next/link'
import Dropdown from './dropdown'// Ensure the path is correct

export default function Navbar() {
  return (
    <div className='bg-pink-100'>
    <div className="flex justify-evenly h-20 items-center bg-pink-100 w-8/12">
      <div>
        <Link href="/">WOMEN</Link>
      </div>
      <div>
        <Link href="/">MEN</Link>
      </div>
      <div>
        <Link href="/">KIDS</Link>
      </div>
      <div>
        <Link href="/">HOME & LIVING</Link>
      </div>
      <div>
        <Link href="/">BEAUTY</Link>
      </div>
      <div>
        <Dropdown />
      </div>
    </div>
    </div>
  )
}
