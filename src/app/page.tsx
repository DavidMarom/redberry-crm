"use client"
import type { Metadata } from 'next'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <p>HOME</p>
      <Image src="/lichi.svg" alt="Lichi Logo" width={100} height={24} priority />
      {/* <form>

        <button onClick={() => {
          localStorage.setItem('loggedin', 'yes');
          window.location.reload();
        }
        }>Login</button>
      </form> */}
    </div>


  )
}
