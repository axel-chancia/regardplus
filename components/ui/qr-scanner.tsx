"use client"

import { useState, useRef, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { Camera, X, CheckCircle, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

interface QRScannerProps {
  onClose: () => void;
  onScanSuccess: (result: string) => void;
}

export function QRScanner({ onClose, onScanSuccess }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle')
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const { employees } = useAppStore()

  console.log('QRScanner initialized');

  useEffect(() => {
    if (isScanning) {
      console.log('Starting QR scanner...');
      
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          console.log('QR Code scanned:', decodedText);
          setScanResult(decodedText);
          setIsScanning(false);
          verifyEmployee(decodedText);
        },
        (error) => {
          console.log('QR scan error (normal):', error);
        }
      );

      scannerRef.current = scanner;

      return () => {
        if (scannerRef.current) {
          console.log('Cleaning up QR scanner');
          scannerRef.current.clear();
        }
      };
    }
  }, [isScanning]);

  const verifyEmployee = async (qrCode: string) => {
    console.log('Verifying employee with QR code:', qrCode);
    setVerificationStatus('verifying');

    // Simulation d'une vérification
    await new Promise(resolve => setTimeout(resolve, 2000));

    const employee = employees.find(emp => emp.qrCode === qrCode);
    
    if (employee) {
      console.log('Employee verified successfully:', employee);
      setVerificationStatus('success');
      toast.success(`Employé vérifié: ${employee.prenom} ${employee.nom}`);
      onScanSuccess(qrCode);
    } else {
      console.log('Employee verification failed for QR:', qrCode);
      setVerificationStatus('failed');
      toast.error('Code QR non reconnu ou employé non trouvé');
    }
  };

  const startScanning = () => {
    console.log('User clicked start scanning');
    setIsScanning(true);
    setScanResult(null);
    setVerificationStatus('idle');
  };

  const stopScanning = () => {
    console.log('Stopping QR scanner');
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Scanner QR Code</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {!isScanning && !scanResult && (
          <div className="text-center py-8">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Cliquez sur le bouton ci-dessous pour commencer le scan
            </p>
            <Button onClick={startScanning} className="bg-blue-600 hover:bg-blue-700">
              <Camera className="w-4 h-4 mr-2" />
              Commencer le scan
            </Button>
          </div>
        )}

        {isScanning && (
          <div className="space-y-4">
            <div id="qr-reader" className="w-full"></div>
            <div className="text-center">
              <Button variant="outline" onClick={stopScanning}>
                Arrêter le scan
              </Button>
            </div>
          </div>
        )}

        {scanResult && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mb-4">
                {verificationStatus === 'verifying' && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">Vérification en cours...</span>
                  </div>
                )}
                {verificationStatus === 'success' && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-medium">Employé vérifié avec succès!</span>
                  </div>
                )}
                {verificationStatus === 'failed' && (
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <AlertCircle className="w-6 h-6" />
                    <span className="font-medium">Échec de la vérification</span>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Code QR scanné:</p>
                <p className="font-mono text-sm bg-white p-2 rounded border">
                  {scanResult}
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setScanResult(null);
                    setVerificationStatus('idle');
                    startScanning();
                  }}
                  className="flex-1"
                >
                  Scanner à nouveau
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}