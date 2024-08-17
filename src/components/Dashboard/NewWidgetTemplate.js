import { Card, CardContent, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NewWidgetTemplate = ({ categoryType, handleClickOpen }) => (
    <Card sx={{ minWidth: 350, maxWidth: 350, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
        <CardContent>
            <Box mt={2} display='flex' alignItems='center' justifyContent='center'>
                <Button sx={{ border: '1px solid gray' }} className='header-btn' variant="text" endIcon={<AddIcon />} onClick={(e) => handleClickOpen(e, categoryType)}>
                    Add Widget
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default NewWidgetTemplate;