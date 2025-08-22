import { useEffect } from 'react';
import { Alert } from '@mui/material';

export default function RetroactionUsager() {
  useEffect(() => {
    const hidePrivacyLink = () => {
      const retroaction = document.querySelector('bib-retroaction-usager');
      const link = retroaction?.shadowRoot?.querySelector(
        'a[href*="confidentialite"], a.privacy-link'
      );
      if (!link) return false;
      link.style.display = 'none';
      return true;
    };

    const initObserver = () => {
      const retroaction = document.querySelector('bib-retroaction-usager');
      if (retroaction?.shadowRoot) {
        new MutationObserver(hidePrivacyLink).observe(retroaction.shadowRoot, {
          childList: true,
          subtree: true,
        });
      }
    };

    const tryHide = (attempts = 0) => {
      if (hidePrivacyLink()) return initObserver();
      if (attempts < 30) requestAnimationFrame(() => tryHide(attempts + 1));
    };

    tryHide();
  }, []);

  return (
    <Alert
      severity="info"
      sx={{
        my: 4,
        '--bib-comp-retroaction-usager-title-weight': 600,
        '--md-sys-typescale-label-large-size': '.875em',
        backgroundColor: '#EEF4F7',
        borderRadius: '8px',
        display: 'flex',
      }}
    >
      <bib-retroaction-usager />
    </Alert>
  );
}
