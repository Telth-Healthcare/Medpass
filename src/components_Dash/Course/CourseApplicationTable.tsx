import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { LinearProgress, Box, Typography, Chip } from '@mui/material';

const calculateCompletion = (application) => {
  const totalFields = [
    'name',
    'code',
    'duration',
    'fees',
    'location',
    'summary',
    'qualifications',
    'department',
    'credit_hours',
    'rating',
    'application_status',
  ];

  const filled = totalFields.filter((field) => {
    const value = application[field];
    return value !== null && value !== undefined && value !== '';
  });

  return Math.round((filled.length / totalFields.length) * 100);
};

const sampleData = [
  {
    name: 'Telthu Medical',
    code: '415424',
    duration: '4',
    fees: 32000,
    location: 'St. Lucia west',
    summary: 'Study of human body and functions',
    qualifications: 'MBBS',
    department: 'MBBS',
    credit_hours: 234,
    rating: 5.0,
    application_status: 'OPEN',
  },
  {
    name: 'Pharma Study',
    code: 'PHM-209',
    duration: '',
    fees: 15000,
    location: '',
    summary: '',
    qualifications: '',
    department: '',
    credit_hours: null,
    rating: null,
    application_status: '',
  },
];

const CourseApplicationTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 180,
      },
      {
        accessorKey: 'code',
        header: 'Code',
        size: 100,
      },
      {
        accessorKey: 'application_status',
        header: 'Status',
        Cell: ({ row }) => {
          const percent = calculateCompletion(row.original);
          const label = percent === 100 ? 'Submitted' : 'Incomplete';
          const color = percent === 100 ? 'success' : 'warning';
          return <Chip label={label} color={color} size="small" />;
        },
      },
      {
        header: 'Progress',
        accessorFn: (row) => calculateCompletion(row), // used for sorting
        Cell: ({ row }) => {
          const percent = calculateCompletion(row.original);
          return (
            <Box sx={{ width: '100%' }}>
              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  mb: 0.5,
                }}
                color={percent === 100 ? 'success' : 'primary'}
              />
              <Typography variant="body2" align="center">
                {percent}%
              </Typography>
            </Box>
          );
        },
        size: 200,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={sampleData}
      enableColumnResizing
      enableSorting
      initialState={{ density: 'compact' }}
    />
  );
};

export default CourseApplicationTable;
