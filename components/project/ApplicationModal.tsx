'use client';

import { useState, useRef } from 'react';
import { FiX, FiUpload, FiFile, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectId: string;
}

// Demo CV'ler
const savedCVs = [
  { id: '1', name: 'DeryaArslan_CV_2024.pdf', date: '15.03.2025', size: '2.3 MB' },
  { id: '2', name: 'DeryaArslan_Portfolio_2024.pdf', date: '20.03.2025', size: '4.1 MB' },
];

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
  projectId
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [saveCV, setSaveCV] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  if (!isOpen) return null;
  
  const handleCVSelect = (cvId: string) => {
    setSelectedCV(cvId);
    setUploadedCV(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setUploadedCV(file);
      setSelectedCV(null);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleNextStep = () => {
    setStep(2);
  };
  
  const handlePreviousStep = () => {
    setStep(1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada gerçek bir API çağrısı yapılacak
    // Demo için sadece tamamlandı mesajı gösterip kapatıyoruz
    alert(`${projectTitle} projesine başvurunuz alındı!`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-medium">{projectTitle} - Başvuru</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {step === 1 ? (
            <div className="space-y-4">
              <h4 className="font-medium text-lg">CV Seçin</h4>
              <p className="text-sm text-gray-500">Önceden yüklediğiniz bir CV seçebilir veya yeni bir CV yükleyebilirsiniz.</p>
              
              {savedCVs.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-gray-700">Kayıtlı CV'ler</h5>
                  
                  {savedCVs.map(cv => (
                    <div
                      key={cv.id}
                      onClick={() => handleCVSelect(cv.id)}
                      className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                        selectedCV === cv.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${selectedCV === cv.id ? 'bg-primary/10' : 'bg-gray-100'}`}>
                          <FiFile className={selectedCV === cv.id ? 'text-primary' : 'text-gray-500'} />
                        </div>
                        <div>
                          <p className="font-medium">{cv.name}</p>
                          <p className="text-xs text-gray-500">{cv.size} · Yükleme: {cv.date}</p>
                        </div>
                      </div>
                      {selectedCV === cv.id && (
                        <FiCheck className="text-primary" size={18} />
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Yeni CV Yükle</h5>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                
                {uploadedCV ? (
                  <div className="border rounded-lg p-3 flex items-center justify-between border-primary bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <FiFile className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{uploadedCV.name}</p>
                        <p className="text-xs text-gray-500">
                          {(uploadedCV.size / (1024 * 1024)).toFixed(1)} MB · Yeni
                        </p>
                      </div>
                    </div>
                    <FiCheck className="text-primary" size={18} />
                  </div>
                ) : (
                  <div
                    onClick={handleUploadClick}
                    className="border border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="mb-3">
                      <FiUpload size={28} className="mx-auto text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      CV dosyanızı sürükleyip bırakın veya tıklayın
                    </p>
                    <p className="text-xs text-gray-400">
                      Desteklenen formatlar: PDF, DOC, DOCX
                    </p>
                  </div>
                )}
              </div>
              
              {uploadedCV && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="save-cv"
                    checked={saveCV}
                    onChange={() => setSaveCV(!saveCV)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="save-cv" className="text-sm text-gray-700">
                    Bu CV'yi gelecekteki başvurular için kaydet
                  </label>
                </div>
              )}
              
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextStep}
                  disabled={!selectedCV && !uploadedCV}
                  className={`btn-primary ${!selectedCV && !uploadedCV ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Devam Et
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-medium text-lg">Ek Bilgiler</h4>
              
              <div>
                <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700 mb-1">
                  Ön Yazı (İsteğe Bağlı)
                </label>
                <textarea
                  id="cover-letter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                  className="input"
                  placeholder="Neden bu projede yer almak istediğinizi ve projeye nasıl katkı sağlayabileceğinizi belirtin..."
                />
                <div className="text-[10px] text-gray-500 mt-1 w-full text-end">
                {coverLetter.length} / 200
              </div>
              </div>
              
              <div className="bg-blue-50 text-blue-700 p-3 rounded-lg flex items-start gap-2">
                <FiAlertCircle className="mt-0.5 flex-shrink-0" size={16} />
                <p className="text-xs">
                  Başvurunuz projeyi yöneten kişi tarafından incelenecektir. Size bildirim aracılığıyla dönüş yapılacaktır.
                </p>
              </div>
              
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="btn-outline"
                >
                  Geri
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Başvuruyu Gönder
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;