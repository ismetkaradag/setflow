'use client';

import { useState } from 'react';
import { FiX, FiArrowRight, FiCheck, FiInfo, FiUsers, FiCalendar, FiCamera } from 'react-icons/fi';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  
  if (!isOpen) return null;
  
  const totalSteps = 4;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleClose = () => {
    // Kullanıcı tercihini local storage'a kaydet
    if (dontShowAgain) {
      localStorage.setItem('setflow_show_onboarding', 'false');
    }
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-medium">SetFlow'a Hoş Geldiniz</h3>
          <button 
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {/* İlerleme çubuğu */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Adım {currentStep}/{totalSteps}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Adım içeriği */}
          {currentStep === 1 && (
            <div className=" space-y-6">
              <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
                <FiInfo size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-medium">Film ve Dizi Setlerine Hoş Geldiniz</h2>
              <p className="text-gray-600">
                SetFlow, film ve dizi setlerinde çalışan ekip üyelerinin iş akışını kolaylaştırmak için tasarlanmış bir platformdur. Projeler bulun, başvurun ve set sürecinin her aşamasını yönetin.
              </p>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className=" space-y-6">
              <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
                <FiUsers size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-medium">Ekip İşbirliği</h2>
              <p className="text-gray-600">
                Yönetmen, yardımcı yönetmen, reji asistanı ve ışık şefi rolleriyle ekip içinde sorunsuz iletişim kurun. Her rolün kendi yetkileri ve görevleri vardır.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h3 className="font-medium text-blue-700 mb-2">Rol Bazlı Erişim</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Yönetmen/Yapımcı: Tüm özelliklere tam erişim</li>
                  <li>• Yardımcı Yönetmen: Callsheet, senaryo ve hazırlık yönetimi</li>
                  <li>• Reji Asistanı: Timecode, devamlılık ve set hazırlıkları</li>
                  <li>• Işık Şefi: Ekipman listesi ve moodboard</li>
                </ul>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className=" space-y-6">
              <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
                <FiCalendar size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-medium">Proje Yönetimi</h2>
              <p className="text-gray-600">
                Projelerinizi oluşturun, ekibinizi kurun ve her aşamayı takip edin. Açık pozisyonlara başvurular alın ve ekibinizi en uygun kişilerle oluşturun.
              </p>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiCheck size={16} className="text-green-500 mr-2" />
                    <h4 className="font-medium">Callsheet</h4>
                  </div>
                  <p className="text-xs text-gray-600">Günlük çekim planları ve saatler</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiCheck size={16} className="text-green-500 mr-2" />
                    <h4 className="font-medium">Senaryo</h4>
                  </div>
                  <p className="text-xs text-gray-600">Senaryo versiyonlarının paylaşımı</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiCheck size={16} className="text-green-500 mr-2" />
                    <h4 className="font-medium">Timecode</h4>
                  </div>
                  <p className="text-xs text-gray-600">Sahne başlangıç ve bitiş süreleri</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiCheck size={16} className="text-green-500 mr-2" />
                    <h4 className="font-medium">Ekipman</h4>
                  </div>
                  <p className="text-xs text-gray-600">Çekim ekipmanları listesi</p>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className=" space-y-6">
              <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
                <FiCamera size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-medium">Hazırsınız!</h2>
              <p className="text-gray-600">
                Artık SetFlow'yu keşfetmek için hazırsınız. Projeler bulmak, başvurmak veya kendi projenizi oluşturmak için hemen başlayın.
              </p>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-green-700">Başarılı çekimler dileriz!</p>
              </div>
            </div>
          )}
          
          {/* Alt kısım */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dont-show-again"
                checked={dontShowAgain}
                onChange={() => setDontShowAgain(!dontShowAgain)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="dont-show-again" className="ml-2 text-sm text-gray-700">
                Bir daha gösterme
              </label>
            </div>
            
            <div className="flex gap-2">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="btn-outline px-3 py-1 text-sm"
                >
                  Geri
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="btn-primary px-4 py-1 text-sm flex items-center gap-1 text-nowrap"
              >
                {currentStep === totalSteps ? 'Tamamla' : 'Devam Et'}
                {currentStep !== totalSteps && <FiArrowRight size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;