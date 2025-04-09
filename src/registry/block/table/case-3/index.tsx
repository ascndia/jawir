"use client";
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LogEntry {
  id: number;
  activityType: string;
  dateTime: string;
  user: string;
  status: 'Success' | 'Failed' | 'Pending' | 'Warning';
  details: {
    [key: string]: string;
  };
}

interface TableCase3Props {
  data?: LogEntry[];
  title?: string;
}

const logData: LogEntry[] = [
    {
      id: 1,
      activityType: 'Login',
      dateTime: '2025-04-09 14:32:00',
      user: 'John Doe',
      status: 'Success',
      details: {
        'IP Address': '192.168.0.1',
        'Browser': 'Chrome',
        'Location': 'USA',
        'Device': 'MacBook'
      }
    },
    {
      id: 2,
      activityType: 'Data Update',
      dateTime: '2025-04-09 14:33:00',
      user: 'Jane Doe',
      status: 'Failed',
      details: {
        'Error': 'Unauthorized Access',
        'IP': '192.168.0.2',
        'Location': 'UK'
      }
    },
    {
      id: 3,
      activityType: 'Logout',
      dateTime: '2025-04-09 14:34:00',
      user: 'John Doe',
      status: 'Pending',
      details: {}
    },
    {
      id: 4,
      activityType: 'Login',
      dateTime: '2025-04-09 14:35:00',
      user: 'Jane Doe',
      status: 'Success',
      details: {
        'IP Address': '192.168.0.3',
        'Browser': 'Firefox',
        'Location': 'Canada',
        'Device': 'iPhone'
      }
    },
    {
      id: 5,
        activityType: 'Data Export',
        dateTime: '2025-04-09 14:36:00',
        user: 'John Doe',
        status: 'Warning',
        details: {
          'File Type': 'CSV',
          'Size': '2.5 MB',
          'Destination': 'Email',
        }    
    }
  ];

export function TableCase3({ data = logData }: TableCase3Props) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prev) => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Warning':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Activity Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry) => {
              const isExpanded = expandedRows.includes(entry.id);
              return (
                <React.Fragment key={entry.id}>
                  <TableRow>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleRowExpansion(entry.id)}
                        aria-label={isExpanded ? "Collapse row" : "Expand row"}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                    <TableCell>{entry.id}</TableCell>
                    <TableCell>{entry.activityType}</TableCell>
                    <TableCell>{entry.dateTime}</TableCell>
                    <TableCell>{entry.user}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-2">
                        {Object.keys(entry.details).length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {Object.entries(entry.details).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-sm font-medium">{key}</div>
                                <div className="text-sm">{value}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm">No additional details available.</div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
  );
}
