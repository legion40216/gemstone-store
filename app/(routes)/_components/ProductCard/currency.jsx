"use client"
import { formatter } from '@/lib/utils'
import React from 'react'

export default function Currency({ value }) {
    // Convert value to a number before formatting
    const numericValue = Number(value); // or use parseFloat(value)
    
    return (
      <p className='font-semibold'>
        {formatter.format(numericValue)}
      </p>
    )
  }
  