"use client"

import { useState, useEffect } from 'react';
export default function usePwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log('beforeinstallprompt event fired'); // Debugging log
      // Prevent the default mini-infobar
      event.preventDefault();
      // Save the event for later use
      setDeferredPrompt(event);
      // Show your custom UI for the install prompt
      setIsPromptVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log('User choice:', choiceResult); // Debugging log
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed');
      } else {
        console.log('PWA installation declined');
      }
      setDeferredPrompt(null);
      setIsPromptVisible(false);
    }
  };

  return { isPromptVisible, handleInstallClick };
}
