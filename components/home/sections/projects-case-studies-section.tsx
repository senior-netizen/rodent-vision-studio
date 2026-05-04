'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '@/data/projects';
import { scaleReveal } from './home-section-motion';

export function ProjectsCaseStudiesSection({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
  return <motion.div className="gallery-wrap" {...scaleReveal} id="projects"><div className="gallery-grid gallery-grid-desktop">{projects.map((project)=><button key={project.id} className="g-card" type="button" onClick={()=>onOpenProject(project.id)}>{project.name}</button>)}</div><div className="gallery-carousel"><button type="button" onClick={()=>setMobileProjectIndex((p)=>(p-1+projects.length)%projects.length)}>←</button><button type="button" onClick={()=>onOpenProject(projects[mobileProjectIndex].id)}>{projects[mobileProjectIndex].name}</button><button type="button" onClick={()=>setMobileProjectIndex((p)=>(p+1)%projects.length)}>→</button></div></motion.div>;
}
