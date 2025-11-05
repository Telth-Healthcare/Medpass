import React, { useState, useEffect } from 'react';
import {MaterialReactTable,  MRT_ColumnDef}  from 'material-react-table';
import { Box, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
// import { getApplicationsApi, updateApplicationStatusApi } from '../../API/ApplicationApi';
import { toast } from 'react-toastify';

interface Application {
  id: number;
  student_name: string;
  email: string;
  program: string;
  course: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applied_on: string;
}

const StudentApplicationManager: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      // const data = await getApplicationsApi();
      // setApplications(data.results);
    } catch (err) {
      toast.error('Failed to fetch applications');
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      // await updateApplicationStatusApi(id, { status });
      toast.success(`Application ${status.toLowerCase()}`);
      fetchApplications();
      setOpen(false);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const columns: MRT_ColumnDef<Application>[] = [
    { accessorKey: 'student_name', header: 'Student Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'program', header: 'Program' },
    { accessorKey: 'course', header: 'Course' },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => {
        const status = cell.getValue<string>();
        return (
          <Chip
            label={status}
            color={
              status === 'APPROVED'
                ? 'success'
                : status === 'REJECTED'
                ? 'error'
                : 'warning'
            }
            size="small"
          />
        );
      },
    },
    { accessorKey: 'applied_on', header: 'Applied On' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Student Applications
      </Typography>

      <MaterialReactTable
        columns={columns}
        data={applications}
        enableRowActions
        renderRowActions={({ row }) => (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedApp(row.original);
              setOpen(true);
            }}
          >
            View
          </Button>
        )}
        initialState={{
          pagination: { pageSize: 5, pageIndex: 0 },
          sorting: [{ id: 'applied_on', desc: true }],
        }}
      />

      {/* Details Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <>
              <Typography>
                <strong>Name:</strong> {selectedApp.student_name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedApp.email}
              </Typography>
              <Typography>
                <strong>Program:</strong> {selectedApp.program}
              </Typography>
              <Typography>
                <strong>Course:</strong> {selectedApp.course}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedApp.status}
              </Typography>
              <Typography>
                <strong>Applied On:</strong> {selectedApp.applied_on}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            startIcon={<CheckCircle />}
            onClick={() => selectedApp && handleStatusUpdate(selectedApp.id, 'APPROVED')}
          >
            Approve
          </Button>
          <Button
            color="error"
            startIcon={<Cancel />}
            onClick={() => selectedApp && handleStatusUpdate(selectedApp.id, 'REJECTED')}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentApplicationManager;
