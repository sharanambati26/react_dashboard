import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,  Tabs, Tab, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ManageCategoryPopup = (props) => {
    const { isCategoryOpen, selectedTab, handleCategoryClose, handleTabChange, data, checkboxState, handleCheckboxChange, handleConfirm} = props;
    return (
        <>
        <Dialog
            open={isCategoryOpen}
            onClose={handleCategoryClose}
            PaperProps={{
                style: {
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    margin: 0,
                    minWidth: 700,
                    minHeight: '100vh'
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 15px',
                    backgroundColor: '#110564',
                    color: '#fff',
                    marginBottom: 2
                }}
            >
                <Typography variant="h6">Manage Categories</Typography>
                <IconButton edge="end" color="inherit" onClick={handleCategoryClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ width: 900, padding: 2 }}>
                <Typography variant="body1">Personalize your dashboard by adding the following widget</Typography>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        {data.map(category => <Tab key={category.id} label={category.name} value={category.id} />)}
                    </Tabs>
                    <Box sx={{ padding: 3 }}>
                        {data.map(category =>
                            selectedTab === category.id &&
                            category.widgets.map(widget => (
                                <Box key={widget.id} display="flex" alignItems="center">
                                    <Checkbox
                                        checked={checkboxState[selectedTab]?.[widget.id] ?? widget.isActive === 1}
                                        onChange={(e) => handleCheckboxChange(e, selectedTab, widget.id)}
                                    />
                                    <Typography variant="body1">{widget.name}</Typography>
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleCategoryClose}>Cancel</Button>
                <Button sx={{ backgroundColor: '#110564' }} onClick={handleConfirm} variant='contained'>Confirm</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default ManageCategoryPopup;