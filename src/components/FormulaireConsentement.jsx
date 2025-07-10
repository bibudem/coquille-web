import { useEffect, useState } from 'react';
import IframeResizer from '@iframe-resizer/react';

const FORMULAIRE_URL = 'https://api.bib.umontreal.ca/usagers/formulaire/';
const CAS_LOGIN_URL = 'https://identification.umontreal.ca/cas/login.ashx';

export default function FormulaireConsentement() {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const urlParams = new URLSearchParams(window.location.search);
      const ticket = urlParams.get('ticket');
      const cleanUrl = `${window.location.origin}/pret-renouvellement-avis`;

      //console.log('Ticket CAS:', ticket);

      if (!ticket) {
        const serviceParam = encodeURIComponent(cleanUrl);
        window.location.href = `${CAS_LOGIN_URL}?service=${serviceParam}`;
        return;
      }

      const src = new URL(FORMULAIRE_URL);
      src.searchParams.set('ticket', ticket);
      src.searchParams.set('hostPageUrl', cleanUrl);
      src.searchParams.set('successUrl', cleanUrl);

      urlParams.forEach((value, key) => {
        if (key !== 'ticket') {
          src.searchParams.set(key, value);
        }
      });

      console.log('➡️ URL de l’iframe construite:', src.toString());
      setIframeUrl(src.toString());
    } catch (err) {
      console.error('Erreur dans FormulaireConsentement:', err);
    }
  }, []);

  function handleMessage(event) {
    const { data } = event;

    if (typeof data === 'object') {
      if (data?.authenticate) {
        const serviceUrl = encodeURIComponent(window.location.href);
        window.location.href = `${CAS_LOGIN_URL}?service=${serviceUrl}`;
        return;
      }

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
