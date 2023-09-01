import React from 'react';
import { render, screen } from '@testing-library/react';

import Tabs from './Tabs';
import data from '../../../data/loans.json';
import dataEmptyList from '../../../data/loansEmptyList.json';
import dataNoActiveStatusItems from '../../../data/loansNoActiveStatusItems.json';

test('render: Loans list is empty', () => {
  const { loanRequests } = dataEmptyList;
  render(<Tabs data={loanRequests} />);

  const noDataEl = screen.getByText('No loans available');
  expect(noDataEl).toBeInTheDocument();
});

test('render: Loans list is not empty', () => {
  const { loanRequests } = data;
  render(<Tabs data={loanRequests} />);

  const tabsEl = screen.getByTestId('loans-tabs');
  expect(tabsEl).toBeInTheDocument();
});

test('render: Loans list not empty. No "active"-status items - "Active" tab is not displayed', () => {
  const { loanRequests } = dataNoActiveStatusItems;
  render(<Tabs data={loanRequests} />);

  const activeStatusTabEl = screen.getByTestId(/active/);
  expect(activeStatusTabEl).toHaveStyle({ display: 'none' });
});
