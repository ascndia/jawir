"use client";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, ArrowUpIcon, FilterIcon, MoreHorizontalIcon } from 'lucide-react';
import TrendBadge from './TrendBadge';
import MiniTrendChart from './MiniTrendChart';
import { generateMockFinancialData } from './mockData';



export interface FinancialData {
    id: string;
    name: string;
    symbol: string;
    value: number;
    change: number;
    trendData: number[];
    allocation: number;
}

  
interface TableCase1Props {
  data?: FinancialData[];
}

type SortKey = keyof FinancialData | null;
type SortDirection = 'asc' | 'desc';

export const TableCase1 = ({ data = generateMockFinancialData() }: TableCase1Props) => {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: keyof FinancialData) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <span>Asset</span>
                {sortKey === 'name' && (
                  <span>{sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}</span>
                )}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => handleSort('value')}
              >
                <span>Current Value</span>
                {sortKey === 'value' && (
                  <span>{sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}</span>
                )}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => handleSort('change')}
              >
                <span>Change</span>
                {sortKey === 'change' && (
                  <span>{sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}</span>
                )}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <span>Trend (30d)</span>
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => handleSort('allocation')}
              >
                <span>Allocation</span>
                {sortKey === 'allocation' && (
                  <span>{sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}</span>
                )}
              </div>
            </TableHead>
            <TableHead className="w-[50px]">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.symbol}</span>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(item.value)}</TableCell>
              <TableCell>
                <TrendBadge value={item.change} />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MiniTrendChart 
                    data={item.trendData} 
                    positive={item.change > 0} 
                    negative={item.change < 0} 
                  />
                </div>
              </TableCell>
              <TableCell>{item.allocation}%</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit allocation</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Sell</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

