import heroImage from '@/public/landing/Group 21.png'
import Image from 'next/image'

export default function HeroSection() {
    return (
        <>
            <h1>Hero Section</h1>
            <Image src={heroImage} alt="Hero Image" />
            
        </>
    )
}