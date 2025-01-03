import React from 'react'
import MenuItem from './MenuItem'
import {AiFillHome} from 'react-icons/ai'
import { BsFill0CircleFill } from 'react-icons/bs'

export default function 

() {
  return (
    <div>
        <div className=''>
            <MenuItem title="home" address="/" Icon={AiFillHome}/>
            <MenuItem title="about" address="/about" Icon={AiFillHome}/>

        </div>
        <div className=''>

        </div>
    </div>
  )
}
