import { Link } from '@/i18n/routing';
import pagesDataEn from '@/data/pages.json';
import pagesDataAr from '@/data/pages.ar.json';
import { getTranslations } from 'next-intl/server';
import { Paintbrush, PaintRoller, Droplet, LayoutGrid, Palette, HandMetal, Sparkles } from 'lucide-react';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pagesData = locale === 'ar' ? pagesDataAr : pagesDataEn;
  const t = await getTranslations('Nav');

  // Filter out location pages and the home page
  const services = pagesData.filter((p) => !p.slug.startsWith('painters-in-') && p.slug !== 'index');

  // Separate Wallpaper from Painting services
  const paintingServices = services.filter((p) => p.slug.includes('painting') || p.slug.includes('epoxy') || p.slug.includes('waterproofing'));
  const wallpaperServices = services.filter((p) => p.slug.includes('wallpaper') || p.slug.includes('murals') || p.slug.includes('accent'));

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Professional painting, waterproofing, and luxury wallpaper installation across the Kingdom of Bahrain.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl font-bold text-primary mb-10 border-b pb-4">Painting & Surface Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {paintingServices.map((service) => (
              <Link 
                key={service.slug} 
                href={`/${service.slug}`}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-[#E8F0FE] rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                  <Paintbrush size={30} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title.split('|')[0].trim()}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {service.meta.substring(0, 100)}...
                </p>
                <div className="text-primary font-semibold flex items-center gap-2 mt-auto">
                  Learn More 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-primary mb-10 border-b pb-4">Wallpaper & Design Installation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallpaperServices.map((service) => (
              <Link 
                key={service.slug} 
                href={`/${service.slug}`}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={30} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title.split('|')[0].trim()}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {service.meta.substring(0, 100)}...
                </p>
                <div className="text-primary font-semibold flex items-center gap-2 mt-auto">
                  Learn More 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-secondary py-16 text-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need help choosing the right service?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our experts are on hand to provide a free consultation and exact quote. Let our team understand your requirements.
          </p>
          <a 
            href="tel:+97335416863" 
            className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-900 transition-colors"
          >
            Contact Support Team
          </a>
        </div>
      </section>
    </>
  );
}
