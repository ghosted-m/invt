'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { styled } from '@mui/material/styles';
// Re-using the same content as I believe Box is the safest correct implementation for now.
// I will just trigger a re-render/save to be sure.
// Actually, I will add a border to debug visibility if it persists.
import { DataGrid, GridToolbarQuickFilter, Toolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledQuickFilter = styled(GridToolbarQuickFilter)({
    '& .MuiInputBase-root': {
        backgroundColor: '#f1f5f9',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        '&:before': { display: 'none' }, // Remove underline
        '&:after': { display: 'none' },  // Remove underline
    },
    '& .MuiSvgIcon-root': {
        color: '#64748b',
    },
});

function CustomToolbar({ totalAmount = 0, onDelete, selectedCount = 0, ...other }) {
    console.log("Rendering CustomToolbar", { totalAmount, selectedCount });
    return (
        <Toolbar
            {...other}
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderBottom: '1px solid #e2e8f0',
                ...other.sx
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <StyledQuickFilter
                    quickFilterParser={(searchInput) =>
                        searchInput
                            .split(',')
                            .map((value) => value.trim())
                            .filter((value) => value !== '')
                    }
                    placeholder="Search..."
                />
                {selectedCount > 0 && (
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={onDelete}
                        size="small"
                    >
                        Delete ({selectedCount})
                    </Button>
                )}
            </Box>
            <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#f0fdf4', color: '#15803d', borderRadius: 2 }}>
                <Typography variant="subtitle1" component="div" fontWeight="bold">
                    Selected Amount: ₹{totalAmount.toLocaleString()}
                </Typography>
            </Paper>
        </Toolbar>
    );
}

export default function ReportTable() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectionModel, setSelectionModel] = React.useState({ type: 'include', ids: new Set() });
    const { user } = useAuth();

    React.useEffect(() => {
        if (!user) return;

        const username = user.email.split('@')[0];
        // Defaulting to 'my_side' as per plan, could be made dynamic later
        const collectionName = 'my_side';
        const q = query(collection(db, username, 'user_data', collectionName));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(data);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const getSelectedIds = React.useCallback(() => {
        if (Array.isArray(selectionModel)) {
            return selectionModel;
        }
        if (!selectionModel) {
            return [];
        }
        if (selectionModel.type === 'include') {
            return Array.from(selectionModel.ids);
        }
        if (selectionModel.type === 'exclude') {
            const excludedSet = selectionModel.ids;
            return rows
                .filter((r) => !excludedSet.has(r.id))
                .map((r) => r.id);
        }
        return [];
    }, [selectionModel, rows]);

    const totalAmount = React.useMemo(() => {
        const selectedIds = getSelectedIds();
        return selectedIds.reduce((sum, id) => {
            const row = rows.find((r) => r.id === id);
            const amount = row ? parseFloat(row.amount) || 0 : 0;
            return sum + amount;
        }, 0);
    }, [getSelectedIds, rows]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'event', headerName: 'Event', width: 130 },
        { field: 'full_name', headerName: 'Full Name', width: 180 },
        { field: 'address', headerName: 'Address', width: 200 },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 110,
            valueFormatter: (value) => {
                if (value == null) return '';
                return `₹${Number(value).toLocaleString()}`;
            }
        },
        { field: 'additional_note', headerName: 'Note', width: 200 },
    ];

    if (loading) {
        return (
            <Paper sx={{ height: 700, width: '100%', borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>Loading data...</Typography>
            </Paper>
        );
    }

    const handleDelete = async () => {
        const selectedIds = getSelectedIds();

        if (selectedIds.length === 0) return;

        if (window.confirm(`Are you sure you want to delete ${selectedIds.length} item(s)?`)) {
            const username = user.email.split('@')[0]; // Assuming user is logged in if we are here
            const collectionName = 'my_side';

            try {
                await Promise.all(selectedIds.map(id =>
                    deleteDoc(doc(db, username, 'user_data', collectionName, id))
                ));
                // Clear selection after delete
                setSelectionModel({ type: 'include', ids: new Set() });
            } catch (error) {
                console.error("Error deleting documents: ", error);
                alert("Error deleting items");
            }
        }
    };

    const selectedCount = React.useMemo(() => {
        return getSelectedIds().length;
    }, [getSelectedIds]);

    return (
        <Paper sx={{ height: 700, width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                rowSelectionModel={selectionModel}
                slots={{ toolbar: CustomToolbar }}
                slotProps={{
                    toolbar: { totalAmount, onDelete: handleDelete, selectedCount }
                }}
                pageSizeOptions={[5, 10, 25, 100]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 100 } },
                }}
                showToolbar
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #f0f0f0',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                    },
                }}
            />
        </Paper>
    );
}
