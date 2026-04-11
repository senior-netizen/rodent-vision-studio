'use client';

import { motion } from 'framer-motion';
import { featuredClients } from '@/data/clients';
import { reveal, stagger, staggerChild } from '@/lib/animations/reveal';

export function FeaturedClientsSection() {
  return (
    <section id="clients" className="section-shell pt-20 md:pt-24">
      <div className="container-wide">
        <div className="editorial-grid mb-12 md:mb-14">
          <motion.div {...reveal} viewport={{ once: true }} className="col-span-12 md:col-span-1">
            <span className="section-number">01</span>
          </motion.div>
          <motion.div {...reveal} viewport={{ once: true }} className="col-span-12 md:col-span-6">
            <h2 className="text-heading text-[clamp(2rem,4vw,3.5rem)]">
              Demonstrated to
              <br />
              <span className="text-fg-muted">Industry Leaders</span>
            </h2>
          </motion.div>
          <motion.p
            {...reveal}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-5 text-body max-w-md text-sm"
          >
            We&apos;ve presented tailored demo systems to organisations operating
            real-world infrastructure — showcasing what&apos;s possible with modern tooling.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredClients.map((client) => (
            <motion.div key={client.name} variants={staggerChild}>
              <div className="card-glass p-5">
                <div className="font-display text-xl tracking-tight">{client.logoText}</div>
                <p className="text-caption mt-2">{client.sector}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
