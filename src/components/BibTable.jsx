// src/components/BibTable.jsx
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledTable = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  borderRadius: theme.shape?.corner?.small || '12px',
  overflow: 'hidden',
  border: `1px solid ${theme.palette?.divider || '#c3ccd5'}`,
  margin: '1.5rem 0',
  fontFamily: theme.typography?.fontFamily || '"Figtree", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  fontSize: theme.typography?.body2?.fontSize || '0.875rem',
  fontWeight: theme.typography?.fontWeightMedium || 500,
  color: theme.palette?.text?.primary || '#0b113a',
  lineHeight: 1.5,

  // En-tête
  '& thead tr': {
    backgroundColor: theme.palette?.bleu200?.main || '#cce2f3',
  },
  '& thead th': {
    padding: '14px 24px',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: theme.typography?.fontWeightBold || 600,
    color: theme.palette?.bleu600?.main || '#00407f',
    borderBottom: `2px solid ${theme.palette?.primary?.main || '#0057ac'}`,
    whiteSpace: 'nowrap',
  },

  // Corps
  '& tbody tr': {
    backgroundColor: theme.palette?.background?.default || '#f8fafb',
    transition: `background-color ${theme.transitions?.duration?.md3?.medium1 || 250}ms ${theme.transitions?.easing?.md3?.emphasized || 'cubic-bezier(0.2, 0, 0, 1)'}`,
    '&:hover': {
      backgroundColor: '#e7ebeeb7',
    },
    '&:not(:last-child) td': {
      borderBottom: `1px solid ${theme.palette?.divider || '#c3ccd5'}`,
    },
  },
  '& tbody td': {
    padding: '12px 24px',
    verticalAlign: 'middle',
  },

  // Première colonne
  '& tbody td:first-of-type': {
    fontWeight: theme.typography?.fontWeightBold || 600,
    color: theme.palette?.primary?.main || '#0057ac',
    whiteSpace: 'nowrap',
  },

  // Responsive md
  '@media (max-width:899px)': {
    '& thead th, & tbody td': {
      padding: '10px 16px',
      fontSize: '1rem',
    },
  },

  // Responsive sm
  '@media (max-width:599px)': {
    display: 'block',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: theme.shape?.corner?.['extra-small'] || '8px',
    '& thead th, & tbody td': {
      padding: '10px 12px',
      fontSize: '0.8125rem',
    },
    '& tbody td': {
      whiteSpace: 'normal',
    },
  },
}));

const BibTable = ({ children, ...props }) => {
  return (
    <StyledTable {...props}>
      {children}
    </StyledTable>
  );
};

export default BibTable;