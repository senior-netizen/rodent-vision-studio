import { redirect } from 'next/navigation';
export default function LegacyPostPage({ params }: { params: { slug: string } }) { redirect(`/insights/${params.slug}`); }
