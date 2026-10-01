export const metadata = { title: 'Rodent Lab API', robots: { index: false, follow: false } }
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body style={{ fontFamily: 'system-ui', maxWidth: 760, margin: '64px auto', padding: 24, color: '#171717' }}>{children}</body></html> }
