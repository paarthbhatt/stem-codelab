import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "STEM CodeLab - Interactive Learning Platform",
  description: "Explore STEM concepts through interactive coding and simulations",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='6' fill='url(%23grad)'/%3E%3Ccircle cx='16' cy='16' r='2' fill='white'/%3E%3Cellipse cx='16' cy='16' rx='10' ry='4' stroke='white' strokeWidth='1.5' fill='none' transform='rotate(0 16 16)'/%3E%3Cellipse cx='16' cy='16' rx='10' ry='4' stroke='white' strokeWidth='1.5' fill='none' transform='rotate(60 16 16)'/%3E%3Cellipse cx='16' cy='16' rx='10' ry='4' stroke='white' strokeWidth='1.5' fill='none' transform='rotate(120 16 16)'/%3E%3Ccircle cx='8' cy='8' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='24' cy='8' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='8' cy='24' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='24' cy='24' r='1' fill='white' opacity='0.8'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
    shortcut: [
      {
        url: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='6' fill='url(%23grad)'/%3E%3Ccircle cx='16' cy='16' r='2' fill='white'/%3E%3Cellipse cx='16' cy='16' rx='10' ry='4' stroke='white' strokeWidth='1.5' fill='none' transform='rotate(0 16 16)'/%3E%3Cellipse cx='16' cy='16' rx='10' ry='4' stroke='white' strokeWidth='1.5' fill='none' transform='rotate(60 16 16)'/%3E%3Cellipse cx='16' cy='16' rx='10' ry='4' stroke='white' strokeWidth='1.5' fill='none' transform='rotate(120 16 16)'/%3E%3Ccircle cx='8' cy='8' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='24' cy='8' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='8' cy='24' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='24' cy='24' r='1' fill='white' opacity='0.8'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='180' height='180' rx='40' fill='url(%23grad)'/%3E%3Ccircle cx='90' cy='90' r='12' fill='white'/%3E%3Cellipse cx='90' cy='90' rx='55' ry='20' stroke='white' strokeWidth='6' fill='none' transform='rotate(0 90 90)'/%3E%3Cellipse cx='90' cy='90' rx='55' ry='20' stroke='white' strokeWidth='6' fill='none' transform='rotate(60 90 90)'/%3E%3Cellipse cx='90' cy='90' rx='55' ry='20' stroke='white' strokeWidth='6' fill='none' transform='rotate(120 90 90)'/%3E%3Ccircle cx='45' cy='45' r='6' fill='white' opacity='0.8'/%3E%3Ccircle cx='135' cy='45' r='6' fill='white' opacity='0.8'/%3E%3Ccircle cx='45' cy='135' r='6' fill='white' opacity='0.8'/%3E%3Ccircle cx='135' cy='135' r='6' fill='white' opacity='0.8'/%3E%3C/svg%3E",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
