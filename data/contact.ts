/** Canonical public contact details used across the Rodent website. */
export const contact = {
  email: 'anesu@rodent.co.zw',
  phone: {
    display: '+263 78 528 6530',
    href: 'tel:+263785286530',
  },
  whatsapp: {
    display: '+263 78 700 8238',
    href: 'https://wa.me/263787008238',
  },
  site: {
    domain: 'rodent.co.zw',
    url: 'https://rodent.co.zw',
  },
} as const;

export const contactEmailHref = `mailto:${contact.email}`;
