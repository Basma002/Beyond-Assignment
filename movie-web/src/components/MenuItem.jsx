import React from 'react'
import Link from "next/link";


export default function MenuItem({title, address, icon}) {
  return (
    <Link href ={address}>
        <Icon/>
        <p>{title}</p>

    </Link>
  )
}
