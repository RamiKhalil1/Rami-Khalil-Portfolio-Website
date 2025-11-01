import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { FaQrcode, FaTimes, FaDownload, FaShare } from 'react-icons/fa';
import './QRCodeContact.css';

interface QRCodeContactProps {
  contactInfo: {
    name: string;
    email: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    location?: string;
  };
}

const QRCodeContact: React.FC<QRCodeContactProps> = ({ contactInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate vCard format string
  const generateVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contactInfo.name}`,
      `EMAIL:${contactInfo.email}`,
      contactInfo.phone ? `TEL:${contactInfo.phone}` : '',
      contactInfo.website ? `URL:${contactInfo.website}` : '',
      contactInfo.linkedin ? `URL;TYPE=LinkedIn:${contactInfo.linkedin}` : '',
      contactInfo.github ? `URL;TYPE=GitHub:${contactInfo.github}` : '',
      contactInfo.location ? `ADR:;;${contactInfo.location};;;;` : '',
      'END:VCARD'
    ].filter(line => line !== '').join('\n');
    
    return vcard;
  };

  // Generate QR code when modal opens
  useEffect(() => {
    if (isModalOpen && !qrCodeDataURL) {
      setIsGenerating(true);
      const vcard = generateVCard();
      
      QRCode.toDataURL(vcard, {
        width: 300,
        margin: 2,
        color: {
          dark: '#0d1117',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      })
      .then(url => {
        setQrCodeDataURL(url);
        setIsGenerating(false);
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
        setIsGenerating(false);
      });
    }
  }, [isModalOpen, qrCodeDataURL, contactInfo]);

  const handleDownload = () => {
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.download = `${contactInfo.name.replace(/\s+/g, '_')}_contact_qr.png`;
      link.href = qrCodeDataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && qrCodeDataURL) {
      try {
        // Convert data URL to blob
        const response = await fetch(qrCodeDataURL);
        const blob = await response.blob();
        const file = new File([blob], `${contactInfo.name}_contact.png`, { type: 'image/png' });
        
        await navigator.share({
          title: `${contactInfo.name} - Contact Information`,
          text: `Scan this QR code to add ${contactInfo.name}'s contact information`,
          files: [file]
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to download
        handleDownload();
      }
    } else {
      // Fallback to download if share API not available
      handleDownload();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* QR Code Trigger Button */}
      <button
        className="qr-trigger-btn"
        onClick={openModal}
        aria-label="Generate QR code for contact sharing"
        title="Share contact via QR code"
      >
        <FaQrcode />
        <span>QR Contact</span>
      </button>

      {/* QR Code Modal */}
      {isModalOpen && (
        <div className="qr-modal-overlay" onClick={closeModal}>
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal-header">
              <h3>Contact QR Code</h3>
              <button 
                className="qr-close-btn"
                onClick={closeModal}
                aria-label="Close QR code modal"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="qr-modal-body">
              <div className="qr-code-container">
                {isGenerating ? (
                  <div className="qr-loading">
                    <div className="qr-spinner"></div>
                    <p>Generating QR Code...</p>
                  </div>
                ) : (
                  qrCodeDataURL && (
                    <img 
                      src={qrCodeDataURL} 
                      alt="Contact QR Code" 
                      className="qr-code-image"
                    />
                  )
                )}
              </div>
              
              <div className="qr-instructions">
                <p>Scan this QR code with your phone's camera to quickly add my contact information!</p>
                <div className="qr-contact-preview">
                  <strong>{contactInfo.name}</strong>
                  <span>{contactInfo.email}</span>
                  {contactInfo.phone && <span>{contactInfo.phone}</span>}
                </div>
              </div>
              
              <div className="qr-actions">
                <button 
                  className="qr-action-btn download"
                  onClick={handleDownload}
                  disabled={!qrCodeDataURL}
                >
                  <FaDownload />
                  Download
                </button>
                <button 
                  className="qr-action-btn share"
                  onClick={handleShare}
                  disabled={!qrCodeDataURL}
                >
                  <FaShare />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodeContact;
