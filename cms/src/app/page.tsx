import { redirect } from 'next/navigation'
export const metadata = { title: 'Rodent Lab CMS', robots: { index: false, follow: false } }
export default function Home() { redirect('/admin') }
