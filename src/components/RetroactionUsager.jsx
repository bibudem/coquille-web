import { useEffect } from 'react';
import { Alert } from '@mui/material';

export default function RetroactionUsager() {
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
