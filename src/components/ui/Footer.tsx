import { useTranslations } from 'next-intl';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              Bahrain's premier painting and wallpaper installation specialists. 
              Transforming residential and commercial spaces with premium craftsmanship.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t('services')}</h4>
            <ul className="space-y-3">
              <li><a href="/services/interior-painting" className="text-gray-500 hover:text-primary text-sm transition-colors">Interior Painting</a></li>
              <li><a href="/services/exterior-painting" className="text-gray-500 hover:text-primary text-sm transition-colors">Exterior Painting</a></li>
              <li><a href="/wallpaper-bahrain" className="text-gray-500 hover:text-primary text-sm transition-colors">Wallpaper Installation</a></li>
              <li><a href="/services/commercial-painting" className="text-gray-500 hover:text-primary text-sm transition-colors">Commercial Projects</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t('quick_links')}</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-500 hover:text-primary text-sm transition-colors">About Us</a></li>
              <li><a href="/projects" className="text-gray-500 hover:text-primary text-sm transition-colors">Our Portfolio</a></li>
              <li><a href="/faq" className="text-gray-500 hover:text-primary text-sm transition-colors">FAQ</a></li>
              <li><a href="/blog" className="text-gray-500 hover:text-primary text-sm transition-colors">Blog & Design Ideas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t('contact')}</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <strong>Phone:</strong> <a href="tel:+97335416863" className="hover:text-primary">+973 35416863</a>
              </li>
              <li className="flex items-center gap-2">
                <strong>Email:</strong> <a href="mailto:info@bahrainpainters.com" className="hover:text-primary">info@bahrainpainters.com</a>
              </li>
              <li className="flex items-center gap-2">
                <strong>Location:</strong> Kingdom of Bahrain
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Bahrain Painters. {t('copyright')}
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-gray-600 transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
