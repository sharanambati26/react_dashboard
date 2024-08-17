import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const Alerts = ({alert, handleAlertClose}) => {
    return (
        <>
        <Snackbar
            open={alert.alertStatus}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={handleAlertClose} severity={alert.alertType} sx={{ width: '100%' }}>
                {alert.alertMsg}
            </Alert>
        </Snackbar>
        </>
    )
}

export default Alerts;