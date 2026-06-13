import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="dark:bg-card bg-card-light border-t dark:border-border border-border-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-surface">
                  <path d="M6.5 6.5L17.5 17.5M6.5 6.5V12.5M6.5 6.5H12.5M17.5 17.5V11.5M17.5 17.5H11.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-heading text-xl font-bold uppercase tracking-wider">
                Fit<span className="text-accent">Hire</span>
              </span>
            </Link>
            <p className="dark:text-textSecondary text-textSecondary-light max-w-sm text-sm leading-relaxed">
              Pakistan&apos;s premier platform connecting you with certified fitness trainers 
              and dieticians. Find your perfect health professional today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-widest text-accent mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/browse', label: 'Browse Professionals' },
                { href: '/hire', label: 'Hire Now' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="dark:text-textSecondary text-textSecondary-light hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-widest text-accent mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/923323145866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-textSecondary text-textSecondary-light hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li className="dark:text-textSecondary text-textSecondary-light text-sm">
                Rawalpindi, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t dark:border-border border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="dark:text-textSecondary text-textSecondary-light text-xs">
            © {new Date().getFullYear()} FitHire. All rights reserved.
          </p>
          <p className="dark:text-textSecondary text-textSecondary-light text-xs">
            Built with 💪 for Pakistan&apos;s fitness community
          </p>
        </div>
      </div>
    </footer>
  );
}
