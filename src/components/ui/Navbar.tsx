'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Logo } from './Logo';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLang = locale === 'en' ? 'ar' : 'en';

  const handleLangToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    router.replace(pathname, { locale: toggleLang });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium text-sm transition-colors">{t('home')}</Link>
            <Link href="/services" className="text-gray-700 hover:text-primary font-medium text-sm transition-colors">{t('services')}</Link>
            <Link href="/projects" className="text-gray-700 hover:text-primary font-medium text-sm transition-colors">{t('projects')}</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium text-sm transition-colors">{t('contact')}</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={handleLangToggle}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Globe size={16} />
              {locale === 'en' ? 'العربية' : 'English'}
            </button>
            
            <a href="tel:+97335416863" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md hover:bg-[#153e5a] transition-colors shadow-sm font-medium text-sm">
              <Phone size={16} />
              {t('get_quote')}
            </a>
          </div>

          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium">{t('home')}</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium">{t('services')}</Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium">{t('projects')}</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium">{t('contact')}</Link>
            
            <hr className="border-gray-100" />
            
            <button 
              onClick={handleLangToggle}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600"
            >
              <Globe size={16} />
              {locale === 'en' ? 'العربية' : 'English'}
            </button>
            
            <a href="tel:+97335416863" className="flex items-center justify-center gap-2 bg-secondary text-white px-5 py-3 rounded-md font-medium">
              <Phone size={16} />
              {t('get_quote')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
