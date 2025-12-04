import { useState, useEffect } from 'react';
import { getTransparentLogo } from '@/utils/removeBackground';
import rodentLogo from '@/assets/rodent-logo.jpeg';

export const useTransparentLogo = () => {
  const [logoSrc, setLogoSrc] = useState(rodentLogo);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    getTransparentLogo(rodentLogo)
      .then((url) => {
        if (mounted) {
          setLogoSrc(url);
          setIsProcessing(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setIsProcessing(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { logoSrc, isProcessing };
};
