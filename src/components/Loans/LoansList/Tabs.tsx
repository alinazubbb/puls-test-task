import { Box, Tabs, Tab, Typography } from '@mui/material';
import React from 'react';

import LoanCard from '../LoanCard';
import { LoanTabConfigType } from '../../../types';
import { tabA11yProps } from '../../../utils';

const loanTabsOrderAndAssociatedStatuses: LoanTabConfigType[] = [
  { title: 'Approved Loans', statuses: ['waiting_approval'] },
  { title: 'Requests', statuses: ['pending_settlement', 'to_be_disbursed'] },
  { title: 'Active', statuses: ['active'] },
  { title: 'Closed', statuses: ['closed'] },
  { title: 'Rejected', statuses: ['rejected'] },
];

const LoanTabs: React.FC<{ data: any }> = ({ data: loans }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, value: number) => {
    setSelectedTab(value);
  };

  return Object.keys(loans).length ? (
    <>
      <Box data-testid='loans-tabs' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChangeTab} aria-label='basic tabs example'>
          {loanTabsOrderAndAssociatedStatuses.map((tab: LoanTabConfigType, index: number) => {
            const isVisible = !!tab.statuses.filter((status) => loans[status]?.length).length;
            const quantity = tab.statuses.reduce((acc, status) => { 
              return acc + loans[status]?.length;
            }, 0);

            const labelEl = (
              <>
                <span>{tab.title}</span>
                <Box component="span" ml={2} color="#999">
                  {quantity}
                </Box>
              </>
            );

            return (
              <Tab
                data-testid={tab.statuses.concat('-')}
                key={index}
                style={{ display: isVisible ? 'block' : 'none' }}
                label={labelEl}
                {...tabA11yProps(index)}
              />
            );
          })}
        </Tabs>
      </Box>
      {loanTabsOrderAndAssociatedStatuses.map((tab: LoanTabConfigType, index: number) => {
        const statuses = tab.statuses;
        const isVisible = !!tab.statuses.filter((status) => loans[status]?.length).length;

        return (
          <div
            style={{ display: isVisible ? 'block' : 'none' }}
            key={index}
            role='tabpanel'
            hidden={selectedTab !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            {selectedTab === index && (
              <Box sx={{ p: 3 }}>
                {statuses.map((status: string) => loans[status]?.map((loanItem: any) => <LoanCard key={loanItem.externalId} loan={loanItem} />))}
              </Box>
            )}
          </div>
        );
      })}
    </>
  ) : (
    <Typography variant='h6'>No loans available</Typography>
  );
};

export default LoanTabs;
