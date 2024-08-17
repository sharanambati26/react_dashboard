import { FormControl, Select, Tooltip, Typography, Button, InputLabel, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const Header = ({ handleClickOpen, openCategoryPopup }) => {
    return (
        <header className='dashboard-header'>
            <section>
                <Typography variant='h6' className='heading'>CNAPP Dashboard</Typography>
            </section>
            <section className='actions-bg'>
                <Tooltip title='Add Widget' arrow>
                    <Button className='header-btn' variant="text" endIcon={<AddIcon />} onClick={handleClickOpen}>
                        Add Widget
                    </Button>
                </Tooltip>
                <Tooltip title='Refresh' arrow>
                    <Button className='header-btn refresh-btn' variant='text'>
                        <AutorenewIcon />
                    </Button>
                </Tooltip>
                <Tooltip title='Manage Categories' arrow>
                    <Button className='header-btn more-btn' variant='text' onClick={openCategoryPopup}>
                        <MoreVertIcon />
                    </Button>
                </Tooltip>
                <span className='header-btn dropdown-bg'>
                    <WatchLaterIcon className='watch-icon' />
                    <Select
                        defaultValue='2'
                        sx={{fontSize: 12, height: '25px', border: 'none', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }}}
                    >
                        <MenuItem value='2'>Last 2 Days</MenuItem>
                        <MenuItem value='7'>Last Week</MenuItem>
                        <MenuItem value='30'>Last Month</MenuItem>
                    </Select>
                </span>
            </section>
        </header>
    )
};

export default Header;