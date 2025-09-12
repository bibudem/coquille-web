import { Alert } from '@mui/material';

export default function RetroactionUsager() {
  return (
    <Alert
      severity="info"
      sx={{
        my: 4,
        width: {
          xs: '100%', // mobile
          sm: '40%',  // à partir de sm (600px)
        },
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