'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { services } from '@/data/services';
import { revealMotion } from './home-section-motion';

export function ServicesListSection({ onOpenService }: { onOpenService: (slug: string) => void }) {
  const [mobileServiceIndex, setMobileServiceIndex] = useState(0);
  return <motion.div className="marketplace-wrap" {...revealMotion} id="services"><div className="marketplace-inner"><div className="mp-grid mp-grid-desktop">{services.map((card)=><button key={card.slug} className="mp-card mp-card-large" type="button" onClick={()=>onOpenService(card.slug)}><div className="mp-card-label">{card.name}</div></button>)}</div><div className="mp-carousel"><button type="button" onClick={()=>setMobileServiceIndex((p)=>(p-1+services.length)%services.length)}>←</button><button type="button" onClick={()=>onOpenService(services[mobileServiceIndex].slug)}>{services[mobileServiceIndex].name}</button><button type="button" onClick={()=>setMobileServiceIndex((p)=>(p+1)%services.length)}>→</button></div></div></motion.div>;
}
