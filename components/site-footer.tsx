import { AtSign, Globe, Link2, Mail, type LucideIcon } from "lucide-react";

const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Twitter", href: "https://x.com/psysecboi", icon: AtSign },
  { label: "LinkedIn", href: "https://linkedin.com/in/payasv", icon: Link2 },
  { label: "GitHub", href: "https://github.com/psysecboi", icon: Globe },
  { label: "Email", href: "mailto:replypkv@gmail.com", icon: Mail },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">All rights reserved. Payas Vaishnav.</p>

        <ul className="site-footer-socials">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                <social.icon size={16} strokeWidth={1.85} aria-hidden="true" />
                <span>{social.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
