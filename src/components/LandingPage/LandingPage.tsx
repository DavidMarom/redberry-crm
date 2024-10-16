import React from 'react'
import { Strip01, BulletRow, Hero, HeroText } from './LandingPage.style.js';
import Image from 'next/image';
import { Btn } from "@/components";
import { signupHandler } from "@/utils/userUtils";

export default function LandingPage({ }) {
    return (
        <Strip01>
            <div>
                <h1>Lightweight CRM</h1>
                <h2>for your business</h2>

                <HeroText>Feel like you're starting to lose track of your clients? Try Redberry-CRM! It was made especially for small businesses like yours!</HeroText>

                <Btn onclick={signupHandler} width="225px" margintop="70px">
                    <div className="text-color-white f-size-22">Get Started</div>
                    <Image src="icons/arrow-right.svg" alt="arrow" width={14} height={14} priority />
                </Btn>
                <br />

                <BulletRow>
                    <Image src="icons/Green-V.svg" alt="logo" width={18} height={18} />
                    <p>No credit card needed</p>
                </BulletRow>

                <BulletRow>
                    <Image src="icons/Green-V.svg" alt="logo" width={18} height={18} />
                    <p>Unlimited time <b>on free plan</b></p>
                </BulletRow>
            </div>
            <Hero><Image src="icons/Hero.svg" alt="strip01" width={760} height={100} priority /></Hero>
        </Strip01>
    )
}

