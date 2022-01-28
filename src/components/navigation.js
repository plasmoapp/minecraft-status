import React from "react"
import styles from './navigation.module.scss'
import Link from 'next/link'
import Image from "next/image"

export default function Navigation() {
    return (
        <div className = {styles.navigation}>
            
            <div>
                <Image src="/peepoG.png" width="48" height="39"/>
            </div>

            <Link href='/'>
                <a>Сервера</a>
            </Link>

            <Link href='/about/'>
                <a>О сайте</a>
            </Link>
            
            <a href="https://github.com/plasmoapp/minecraft-status" target="_blank">GitHub</a>
        </div>
    )
}