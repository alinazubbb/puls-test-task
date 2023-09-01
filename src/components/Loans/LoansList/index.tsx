import { Typography } from '@mui/material';
import React from 'react';

import LoanTabs from './Tabs';
// eslint-disable-next-line import/extensions
import data from '../../../data/loans.json';

const LoansList: React.FC = () => {
  const { loanRequests: loans }: any = data;

  const loansSorted = loans.reduce((acc: any, loan: any) => {
    const status: string = loan.status?.replaceAll(' ', '_');

    if (!acc.hasOwnProperty(status)) {
      acc[status] = [loan];
    } else {
      acc[status].push(loan);
    }
    return acc;
  }, {});

  return (
    <>
      <Typography variant='h2' sx={{ marginBottom: 8 }}>
        Financing
      </Typography>
      <LoanTabs data={loansSorted} />
    </>
  );
};

export default LoansList;
