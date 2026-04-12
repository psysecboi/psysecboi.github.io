import { Mail } from "lucide-react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const socials: { label: string; href: string; icon: IconType }[] = [
  { label: "Twitter", href: "https://x.com/psysecboi", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://linkedin.com/in/payasv", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/psysecboi", icon: FaGithub },
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
                <social.icon size={16} aria-hidden="true" />
                <span>{social.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
