import { Box, Typography, Card, CardContent, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Widget = ({ data, removeWidget, categoryType }) => {
    return (
        <Card sx={{ minWidth: 325, maxWidth: 325, height: 200, borderRadius: 5, margin: 0 }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }} variant='h6'>{data.name}</Typography>
                    <Tooltip title='Remove Widget' arrow>
                        <CloseIcon onClick={() => removeWidget(data.id, categoryType)} sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Box>
                <Box mt={2} sx={{ height: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12, textAlign: 'justify' }} variant='body1'>{data.content}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

export default Widget;
