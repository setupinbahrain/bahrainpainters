import { notFound } from 'next/navigation';
import pagesDataEn from '@/data/pages.json';
import pagesDataAr from '@/data/pages.ar.json';
import { LeadQuoteForm } from '@/components/ui/LeadQuoteForm';
import { TrustBadges } from '@/components/ui/TrustBadges';
import ServiceFAQ from '@/components/ui/ServiceFAQ';
import SchemaFAQ from '@/components/ui/SchemaFAQ';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths = [];
  for (const page of pagesDataEn) {
    if (page.slug === 'index') continue;
    paths.push({ locale: 'en', slug: page.slug });
  }
  for (const page of pagesDataAr) {
    if (page.slug === 'index') continue;
    paths.push({ locale: 'ar', slug: page.slug });
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const pagesData = locale === 'ar' ? pagesDataAr : pagesDataEn;
  const page = pagesData.find((p) => p.slug === decodedSlug);
  
  if (!page) {
    return {};
  }

  // Calculate hreflang paths
  let enSlug = decodedSlug;
  let arSlug = decodedSlug;

  if (locale === 'ar') {
    enSlug = (page as any).englishSlug || 'index';
    arSlug = decodedSlug;
  } else {
    enSlug = decodedSlug;
    const arPage = pagesDataAr.find((p) => p.englishSlug === decodedSlug);
    arSlug = arPage ? arPage.slug : 'index';
  }

  return {
    title: page.title,
    description: page.meta,
    keywords: page.keywords,
    alternates: {
      canonical: `https://bahrainpainters.com/${locale === 'ar' ? 'ar/' : ''}${decodedSlug}`,
      languages: {
        'en': `https://bahrainpainters.com/${enSlug === 'index' ? '' : enSlug}`,
        'ar': `https://bahrainpainters.com/ar/${arSlug === 'index' ? '' : arSlug}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.meta,
      url: `https://bahrainpainters.com/${slug}`,
      type: 'website',
    }
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const pagesData = locale === 'ar' ? pagesDataAr : pagesDataEn;
  const page = pagesData.find((p) => p.slug === decodedSlug);
  
  if (!page) {
    notFound();
  }

  const t = await getTranslations('Hero');

  return (
    <>
      <SchemaFAQ faqs={page.faqs} />
      
      {/* Dynamic Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-blue-900 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {page.h1 || page.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed">
              {page.meta}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href={`/${locale === 'ar' ? 'ar' : ''}#quote-form`} 
                className="bg-secondary text-primary font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-1"
              >
                {t('cta1')}
              </Link>
            </div>
            <div className="pt-8">
               <TrustBadges />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
             <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-2xl relative text-primary">
                <div className="absolute -top-4 -right-4 bg-secondary text-primary font-bold px-4 py-2 rounded-full shadow-lg transform rotate-3">
                  Fast ROI
                </div>
                <LeadQuoteForm />
             </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 lg:p-16">
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
               {page.body.map((block, idx) => {
                 if (block.type === 'h2') {
                   return <h2 key={idx} className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">{block.text}</h2>
                 }
                 if (block.type === 'p') {
                   return <p key={idx} className="mb-6 leading-relaxed">{block.text}</p>
                 }
                 return null;
               })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <ServiceFAQ faqs={page.faqs} title={locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'} />
          </div>
        </section>
      )}

      {/* Final CTA Strip */}
      <section className="py-12 bg-secondary text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-start">
             <h2 className="text-2xl md:text-3xl font-bold">
               {locale === 'ar' ? 'هل أنت مستعد للتفوق على منافسيك؟' : 'Ready to outrank the competition?'}
             </h2>
             <p className="opacity-90 mt-2">
               {locale === 'ar' ? 'احصل على تسعيرة مجانية لمشروعك اليوم.' : 'Get your rapid turnaround project started today.'}
             </p>
          </div>
          <Link href={`tel:+97335416863`} className="bg-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-900 transition flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.033 11.033 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
            +973 3541 6863
          </Link>
        </div>
      </section>
    </>
  );
}
