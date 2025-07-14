import { useEffect, useState } from 'react';
import IframeResizer from '@iframe-resizer/react';

const FORMULAIRE_URL = 'https://api.bib.umontreal.ca/usagers/formulaire/';

export default function FormulaireConsentement() {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const urlParams = new URLSearchParams(window.location.search);
      const cleanUrl = `${window.location.origin}/formulaire-consentement-inscription`;

      const src = new URL(FORMULAIRE_URL);
      src.searchParams.set('hostPageUrl', cleanUrl);
      src.searchParams.set('successUrl', cleanUrl);

      urlParams.forEach((value, key) => {
        src.searchParams.set(key, value);
      });

      setIframeUrl(src.toString());
    } catch (err) {
      console.error('Erreur dans FormulaireConsentement:', err);
    }
  }, []);

  function handleMessage(event) {
    const { data } = event;

    if (typeof data === 'object') {
      if (data?.navigate) {
        window.location.href = data.navigate;
      }
    }
  }

  if (!iframeUrl || !iframeUrl.startsWith('http')) {
    return <div>Chargement du formulaire…</div>;
  }

  return (
    <IframeResizer
      license="GPLv3"
      src={iframeUrl}
      style={{
        width: '100%',
        minHeight: '160vh',
        border: 'none',
      }}
      checkOrigin={[
        'https://bib.umontreal.ca',
        'https://bib-pp.umontreal.ca',
        'http://localhost:8000',
        'https://api.bib.umontreal.ca',
      ]}
      onMessage={handleMessage}
      scrolling={true}
    />
  );
}