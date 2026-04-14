import { Link } from '@/i18n/routing';
import pagesDataEn from '@/data/pages.json';
import pagesDataAr from '@/data/pages.ar.json';
import { LeadQuoteForm } from '@/components/ui/LeadQuoteForm';
import { TrustBadges } from '@/components/ui/TrustBadges';
import ServiceFAQ from '@/components/ui/ServiceFAQ';
import SchemaFAQ from '@/components/ui/SchemaFAQ';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { Paintbrush, LayoutGrid, CheckCircle2, ShieldCheck, MapPin, TrendingUp, Users, Calendar } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pagesData = locale === 'ar' ? pagesDataAr : pagesDataEn;
  const homeData = pagesData.find((p) => p.slug === 'index');
  if (!homeData) return {};
  return {
    title: homeData.title,
    description: homeData.meta,
    keywords: homeData.keywords,
    alternates: {
      canonical: `https://bahrainpainters.com${locale === 'ar' ? '/ar' : ''}`,
      languages: {
        'en': 'https://bahrainpainters.com',
        'ar': 'https://bahrainpainters.com/ar',
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pagesData = locale === 'ar' ? pagesDataAr : pagesDataEn;
  
  const t = await getTranslations('Index'); // Fallback if needed
  
  // Isolate the Homepage Data explicitly by its 'index' slug
  const homeData = pagesData.find((p) => p.slug === 'index');
  if (!homeData) return null;

  const services = pagesData.filter((p) => !p.slug.startsWith('painters-in-') && p.slug !== 'index');
  const paintingServices = services.filter((p) => p.slug.includes('painting') || p.slug.includes('epoxy') || p.slug.includes('waterproofing'));
  const wallpaperServices = services.filter((p) => p.slug.includes('wallpaper') || p.slug.includes('murals') || p.slug.includes('accent'));
  const locations = pagesData.filter((p) => p.slug.startsWith('painters-in-'));

  return (
    <div className="bg-background min-h-screen">
      <SchemaFAQ faqs={homeData.faqs} />

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-blue-900 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/90 text-primary font-bold text-sm mb-2 shadow-sm">
                Bahrain's #1 Rated Painters
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-md">
                {homeData.h1}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl font-light leading-relaxed">
                {homeData.meta}
              </p>
              <TrustBadges />
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-blue-400 rounded-3xl blur opacity-30 mt-8"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 text-primary mt-8 lg:mt-0">
                <LeadQuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Trust Cloud */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Trusted with Premium Brands</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <h3 className="text-2xl font-bold tracking-tight text-blue-800">JOTUN</h3>
            <h3 className="text-2xl font-bold tracking-tight text-red-700">HEMPEL</h3>
            <h3 className="text-2xl font-bold tracking-tight text-blue-900">National Paints</h3>
            <h3 className="text-2xl font-bold tracking-tight text-red-600">Sika</h3>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Painting Services</h2>
            <p className="text-lg text-gray-600">
              We offer a comprehensive range of painting services tailored to Bahrain’s unique climate and architectural styles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paintingServices.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Paintbrush size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{service.title.split('|')[0].trim()}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.meta}</p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1">Explore {service.keywords ? service.keywords.split(',')[0].trim() : 'Details'} <span className="group-hover:translate-x-1 transition-transform">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Bahrain's Most Trusted" Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Why Bahrain Trusts Us</h2>
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>What sets Bahrain Painters apart is our end-to-end service quality. Every project begins with a free on-site consultation and detailed quote—no hidden fees, no surprises.</p>
              </div>
              <ul className="space-y-4">
                {[
                  "Fully Licensed & Insured in Bahrain",
                  "Guaranteed Workmanship Warranty",
                  "On-Time Project Delivery",
                  "Clean, Protected Job Sites",
                  "Premium Heat/Humidity Resistant Paints"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle2 className="text-secondary" size={24} />
                    <span className="font-bold text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
               <div className="aspect-square bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative">
                  <Image src="/team.png" alt="Bahrain Painters Professional Team" fill className="object-cover" />
               </div>
               <div className="absolute -bottom-8 -left-8 bg-secondary p-8 rounded-2xl shadow-xl">
                  <p className="text-4xl font-bold text-primary">1,200+</p>
                  <p className="text-primary font-semibold">Projects Completed</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Wallpaper Showcase */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Wallpaper Installation & Design</h2>
              <p className="text-lg text-white/80">
                Beyond painting, we are Bahrain’s premier wallpaper installation specialists. 
                From 3D wallpapers setting depth to luxury vinyls for high-traffic commerce.
              </p>
            </div>
            <Link href="/wallpaper-bahrain" className="shrink-0 bg-secondary text-primary font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
              View All Wallpaper
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallpaperServices.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="group bg-blue-900/40 p-8 rounded-2xl border border-white/10 hover:bg-white transition-colors duration-300">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:bg-blue-50 group-hover:text-primary transition-colors">
                  <LayoutGrid size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title.split('|')[0].trim()}</h3>
                <p className="text-white/70 group-hover:text-gray-500 transition-colors mb-6 text-sm">{service.meta}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Before/After Slider */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Transform Your Indoor Spaces</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            See the difference premium materials, precision technique, and expert color matching can make in protecting & beautifying your property.
          </p>
          <div className="mx-auto max-w-4xl px-4 md:px-0">
             <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* 7. Service Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Service Areas Across Bahrain</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/${loc.slug}`} className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition shadow-sm border border-gray-100 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                   <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary">{loc.title.split('|')[0].trim()}</h3>
                  <p className="text-xs text-gray-500">Painting & Wallpaper</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Stats / Social Proof */}
      <section className="py-16 bg-primary text-white">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
               <div>
                  <div className="flex justify-center mb-4 text-secondary"><TrendingUp size={40} /></div>
                  <h4 className="text-4xl font-bold mb-2">1,200+</h4>
                  <p className="text-white/80 font-medium">Projects Completed</p>
               </div>
               <div>
                  <div className="flex justify-center mb-4 text-secondary"><ShieldCheck size={40} /></div>
                  <h4 className="text-4xl font-bold mb-2">10 Years</h4>
                  <p className="text-white/80 font-medium">Warranty Available</p>
               </div>
               <div>
                  <div className="flex justify-center mb-4 text-secondary"><MapPin size={40} /></div>
                  <h4 className="text-4xl font-bold mb-2">4</h4>
                  <p className="text-white/80 font-medium">Governorates Served</p>
               </div>
               <div>
                  <div className="flex justify-center mb-4 text-secondary"><Users size={40} /></div>
                  <h4 className="text-4xl font-bold mb-2">4.9/5</h4>
                  <p className="text-white/80 font-medium">Client Satisfaction</p>
               </div>
            </div>
         </div>
      </section>

      {/* 9. FAQ Accordion */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
           <ServiceFAQ faqs={homeData.faqs} />
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="relative py-24 bg-blue-900 overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your space?</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Contact Bahrain Painters for a free, no-obligation quote today. We typically respond within 2 hours during business days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+97335416863" className="w-full sm:w-auto bg-secondary text-primary font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.033 11.033 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              Call +973 3541 6863
            </a>
            <a href="https://wa.me/97335416863" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
