'use client';

import { useState } from 'react';
import { FiX, FiArrowRight, FiCheck } from 'react-icons/fi';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({
    experience: '',
    project_count: '',
    role: '',
    interests: []
  });
  
  if (!isOpen) return null;
  
  // Soru listesi
  const questions = [
    {
      id: 'experience',
      title: 'Film veya dizi setlerinde çalışma tecrübeniz ne kadar?',
      type: 'single',
      options: [
        { value: 'none', label: 'Hiç tecrübem yok' },
        { value: 'beginner', label: '1 yıldan az' },
        { value: 'intermediate', label: '1-3 yıl' },
        { value: 'advanced', label: '3-5 yıl' },
        { value: 'expert', label: '5 yıldan fazla' }
      ]
    },
    {
      id: 'project_count',
      title: 'Bugüne kadar kaç projede yer aldınız?',
      type: 'single',
      options: [
        { value: '0', label: 'Henüz bir projede yer almadım' },
        { value: '1-3', label: '1-3 proje' },
        { value: '4-10', label: '4-10 proje' },
        { value: '10+', label: '10\'dan fazla proje' }
      ]
    },
    {
      id: 'role',
      title: 'Genellikle hangi rolde çalışıyorsunuz?',
      type: 'single',
      options: [
        { value: 'director', label: 'Yönetmen/Yapımcı' },
        { value: 'assistant_director', label: 'Yardımcı Yönetmen' },
        { value: 'set_assistant', label: 'Reji Asistanı' },
        { value: 'lighting_chief', label: 'Işık Şefi' },
        { value: 'other', label: 'Diğer' }
      ]
    },
    {
      id: 'interests',
      title: 'Hangi alanlarda kendinizi geliştirmek istiyorsunuz?',
      type: 'multiple',
      options: [
        { value: 'directing', label: 'Yönetmenlik' },
        { value: 'script', label: 'Senaryo Yazımı' },
        { value: 'cinematography', label: 'Görüntü Yönetmenliği' },
        { value: 'lighting', label: 'Işık Tasarımı' },
        { value: 'editing', label: 'Kurgu' },
        { value: 'sound', label: 'Ses Tasarımı' },
        { value: 'production', label: 'Yapımcılık' }
      ]
    }
  ];
  
  const currentQuestionData = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  
  const handleSingleSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: value
    }));
  };
  
  const handleMultipleSelect = (value: string) => {
    setAnswers(prev => {
      const currentValues = prev[currentQuestionData.id] as string[] || [];
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [currentQuestionData.id]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [currentQuestionData.id]: [...currentValues, value]
        };
      }
    });
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    // Demo için sadece localStorage'a kaydet
    localStorage.setItem('setflow_survey_completed', 'true');
    localStorage.setItem('setflow_survey_answers', JSON.stringify(answers));
    onClose();
  };
  
  // Mevcut soru için cevap seçildi mi kontrolü
  const isAnswered = () => {
    const currentAnswer = answers[currentQuestionData.id];
    
    if (currentQuestionData.type === 'single') {
      return Boolean(currentAnswer);
    } else if (currentQuestionData.type === 'multiple') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    
    return false;
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto my-4 mx-4 ">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-medium">Hızlı Anket</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {/* İlerleme çubuğu */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Soru {currentQuestion + 1}/{questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Soru içeriği */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">{currentQuestionData.title}</h2>
            
            <div className="space-y-3">
              {currentQuestionData.type === 'single' && (
                <>
                  {currentQuestionData.options.map(option => (
                    <div
                      key={option.value}
                      onClick={() => handleSingleSelect(option.value)}
                      className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer ${
                        answers[currentQuestionData.id] === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        answers[currentQuestionData.id] === option.value
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestionData.id] === option.value && (
                          <FiCheck size={12} />
                        )}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </>
              )}
              
              {currentQuestionData.type === 'multiple' && (
                <>
                  {currentQuestionData.options.map(option => {
                    const isSelected = Array.isArray(answers[currentQuestionData.id]) && 
                                       (answers[currentQuestionData.id] as string[]).includes(option.value);
                    
                    return (
                      <div
                        key={option.value}
                        onClick={() => handleMultipleSelect(option.value)}
                        className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${
                          isSelected
                            ? 'border-primary bg-primary text-white'
                            : 'border border-gray-300'
                        }`}>
                          {isSelected && (
                            <FiCheck size={12} />
                          )}
                        </div>
                        <span>{option.label}</span>
                      </div>
                    );
                  })}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Birden fazla seçenek işaretleyebilirsiniz
                  </p>
                </>
              )}
            </div>
          </div>
          
          {/* Alt kısım */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            <div>
              {currentQuestion === questions.length - 1 && (
                <p className="text-xs text-gray-500">
                  Yanıtlarınız deneyiminizi kişiselleştirmemize yardımcı olacak
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              {currentQuestion > 0 && (
                <button
                  onClick={handleBack}
                  className="btn-outline px-3 py-1 text-sm max-h-fit"
                >
                  Geri
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!isAnswered()}
                className={`btn-primary px-4 py-1 text-sm flex items-center gap-1 max-h-fit
                  ${!isAnswered() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLastQuestion ? 'Tamamla' : 'Devam Et'}
                {!isLastQuestion && <FiArrowRight size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;