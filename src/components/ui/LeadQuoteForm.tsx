'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Paintbrush, FileImage, Home, Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LeadQuoteForm() {
  const t = useTranslations('QuoteForm');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    description: '',
    name: '',
    phone: '',
    email: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    { id: 'interior_paint', icon: <Paintbrush className="w-6 h-6"/>, label: t('service_interior') },
    { id: 'exterior_paint', icon: <Home className="w-6 h-6"/>, label: t('service_exterior') },
    { id: 'wallpaper', icon: <FileImage className="w-6 h-6"/>, label: t('service_wallpaper') },
    { id: 'commercial', icon: <Building2 className="w-6 h-6"/>, label: t('service_commercial') }
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSuccess(true), 800);
  };

  if (isSuccess) return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-accent animate-in fade-in duration-500">
      <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('success_title')}</h3>
      <p className="text-gray-600 mb-6">{t('success_desc')}</p>
      <button onClick={() => {setIsSuccess(false); setStep(1);}} className="text-primary font-medium hover:underline">
        {t('submit_another')}
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= i ? 'bg-secondary' : 'bg-gray-100'}`} />
        ))}
      </div>

      <form onSubmit={submitForm}>
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t('step1_title')}</h3>
            <p className="text-sm text-gray-500 mb-6">{t('step1_desc')}</p>
            <div className="grid grid-cols-2 gap-4">
              {services.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => { setFormData({...formData, service: s.id}); handleNext(); }}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${formData.service === s.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={formData.service === s.id ? 'text-primary' : 'text-gray-500'}>{s.icon}</div>
                  <span className="font-semibold text-sm text-gray-800">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t('step2_title')}</h3>
            <p className="text-sm text-gray-500 mb-6">{t('step2_desc')}</p>
            <textarea 
              autoFocus
              className="w-full rounded-lg border border-gray-300 p-4 min-h-[140px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
              placeholder={t('placeholder_desc')}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={handleBack} className="px-5 py-3 rounded-md border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center flex-1">
                {t('btn_back')}
              </button>
              <button type="button" onClick={handleNext} disabled={!formData.description.trim()} className="px-5 py-3 rounded-md bg-primary text-white font-medium hover:bg-[#153e5a] transition-colors flex items-center justify-center flex-[2] disabled:opacity-50 disabled:cursor-not-allowed">
                {t('btn_next')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t('step3_title')}</h3>
            <p className="text-sm text-gray-500 mb-6">{t('step3_desc')}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('label_name')}</label>
                <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-primary outline-none" placeholder={t('placeholder_name')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('label_phone')}</label>
                <input required type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-primary outline-none" placeholder={t('placeholder_phone')} />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={handleBack} className="p-3 rounded-md border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center">
                  <ArrowLeft size={20} />
                </button>
                <button type="submit" className="w-full px-5 py-3 rounded-md bg-secondary text-white font-bold hover:bg-[#e08e0b] shadow-md transition-colors flex items-center justify-center gap-2 text-lg">
                  {t('btn_submit')}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
