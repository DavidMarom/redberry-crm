'use-client'

import { Button } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null


    return (

        theme == "light" ?
            <Button size="sm" variant="flat"
                onClick={() => setTheme("dark")}>
                Dark
            </Button> :
            <Button size="sm" variant="flat" 
                onClick={() => setTheme("light")}>
                Light
            </Button>

    );

}