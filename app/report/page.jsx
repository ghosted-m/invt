import ReportTable from '@/components/ReportTable';
import { Box, Typography, Container } from '@mui/material';

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <Container maxWidth="xl">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: '#1e293b', mb: 1 }}>
                        Data Report
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        View, filter, and calculate totals for your data.
                    </Typography>
                </Box>
                <ReportTable />
            </Container>
        </div>
    );
}
