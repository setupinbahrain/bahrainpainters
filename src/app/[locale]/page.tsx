import { useTranslations } from 'next-intl';
import { LeadQuoteForm } from '@/components/ui/LeadQuoteForm';
import { TrustBadges } from '@/components/ui/TrustBadges';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 pt-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              {t('subtitle')}
            </p>
            <TrustBadges />
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-25"></div>
            <div className="relative">
              <LeadQuoteForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
