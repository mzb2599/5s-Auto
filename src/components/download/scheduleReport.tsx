import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface ScheduleReportProps {
  onSchedule: () => void;
}

const ScheduleReport: React.FC<ScheduleReportProps> = ({ onSchedule }) => {
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState('monthly');
  const [scheduledTime, setScheduledTime] = useState<Dayjs | null>(dayjs());
  const [dayOfMonth, setDayOfMonth] = useState('1');

  const handleSchedule = () => {
    const now = new Date();
    const scheduleDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      parseInt(dayOfMonth),
      scheduledTime?.hour() || 0,
      scheduledTime?.minute() || 0
    );

    // If the scheduled date is in the past, move to next month
    if (scheduleDate < now) {
      scheduleDate.setMonth(scheduleDate.getMonth() + 1);
    }

    const timeUntilSchedule = scheduleDate.getTime() - now.getTime();

    // Schedule the download
    setTimeout(() => {
      onSchedule();
      // Reschedule for next month
      if (frequency === 'monthly') {
        handleSchedule();
      }
    }, timeUntilSchedule);

    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Schedule Report
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Schedule Report Download</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                label="Frequency"
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="once">One Time</MenuItem>
              </Select>
            </FormControl>

            {frequency === 'monthly' && (
              <TextField
                label="Day of Month"
                type="number"
                value={dayOfMonth}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 31) {
                    setDayOfMonth(e.target.value);
                  }
                }}
                InputProps={{ inputProps: { min: 1, max: 31 } }}
              />
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time"
                value={scheduledTime}
                onChange={(newValue) => setScheduledTime(newValue)}
              />
            </LocalizationProvider>

            <Typography variant="body2" color="textSecondary">
              Report will be downloaded {frequency === 'monthly' ? 'every' : ''} on day {dayOfMonth} at{' '}
              {scheduledTime?.format('HH:mm')}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSchedule} variant="contained">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScheduleReport;