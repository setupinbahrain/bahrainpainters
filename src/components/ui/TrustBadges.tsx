'use client';

import { Star, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

export function TrustBadges() {
  const t = useTranslations('TrustBadges');

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start py-8 border-y border-gray-100 my-10">
      <div className="flex flex-col items-center text-center gap-2 p-2">
        <div className="w-12 h-12 rounded-full bg-[#E8F0FE] flex items-center justify-center text-primary mb-1">
          <Star className="fill-secondary text-secondary" size={24} />
        </div>
        <h4 className="font-bold text-gray-900 leading-none">{t('rating_title')}</h4>
        <p className="text-xs text-gray-500">{t('rating_desc')}</p>
      </div>
      
      <div className="flex flex-col items-center text-center gap-2 p-2">
        <div className="w-12 h-12 rounded-full bg-[#E8F0FE] flex items-center justify-center text-primary mb-1">
          <ShieldCheck size={26} />
        </div>
        <h4 className="font-bold text-gray-900 leading-none">{t('licensed_title')}</h4>
        <p className="text-xs text-gray-500">{t('licensed_desc')}</p>
      </div>

      <div className="flex flex-col items-center text-center gap-2 p-2">
        <div className="w-12 h-12 rounded-full bg-[#E8F0FE] flex items-center justify-center text-primary mb-1">
          <CheckCircle2 size={26} />
        </div>
        <h4 className="font-bold text-gray-900 leading-none">{t('projects_title')}</h4>
        <p className="text-xs text-gray-500">{t('projects_desc')}</p>
      </div>

      <div className="flex flex-col items-center text-center gap-2 p-2">
        <div className="w-12 h-12 rounded-full bg-[#E8F0FE] flex items-center justify-center text-primary mb-1">
          <Clock size={26} />
        </div>
        <h4 className="font-bold text-gray-900 leading-none">{t('ontime_title')}</h4>
        <p className="text-xs text-gray-500">{t('ontime_desc')}</p>
      </div>
    </div>
  );
}
