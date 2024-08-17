import React, { useState, useEffect } from 'react';
import { FormControl, Select, InputLabel, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { getWidgets, addWidget, deleteWidget, hideWidgets } from '../../api/ApiService'; 
import Header from './Header';
import Category from './Category';
import ManageCategoryPopup from './ManageCategoryPopup';
import './Dashboard.css'; 
import Alerts from './Alerts';

export const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [widget, setWidget] = useState({ widgetName: '', widgetContent: '', widgetType: '' });
    const [errors, setErrors] = useState({});
    const [data, setData] = useState([]);
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [checkboxState, setCheckboxState] = useState({});
    const [alert, setAlert] = useState({ alertStatus: false, alertMsg: '', alertType: '' });
    const [isDisabled, setButtonDisable] = useState(false);

    // fetch the data initially
    useEffect(() => {
        const fetchWidgets = async () => {
            try {
                const result = await getWidgets();
                if (result.data.status) {
                    setData(result.data.data);
                    setAlert({ alertStatus: true, alertMsg: 'Data Successfully Fetched!', alertType: 'success' });
                } else {
                    setAlert({ alertStatus: true, alertMsg: 'Unable to fetch data!', alertType: 'error' });
                }
            } catch (err) {
                setAlert({ alertStatus: true, alertMsg: 'Something went wrong!', alertType: 'error' });
            }
        };
        fetchWidgets();
    }, []);

    
    const handleTabChange = (event, newValue) => setSelectedTab(newValue);

    // storing the manage categories actions
    const handleCheckboxChange = (e, categoryId, widgetId) => {
        setCheckboxState((prev) => ({ ...prev, [categoryId]: { ...prev[categoryId], [widgetId]: e.target.checked } }));
    };

    // updating the manage categories actions in DB
    const handleConfirm = async () => {
        try {
            await hideWidgets(checkboxState);
            const results = await getWidgets();
            setData(results.data.data);
        } catch (err) {
            console.log('failed', err);
        }
        setCheckboxState({});
        setCategoryOpen(false);
        setSelectedTab(0);
    };

    // shows New Widget Popup
    const handleClickOpen = (e, categoryType = '') => {
        setButtonDisable(false);
        setErrors({});
        setWidget({ widgetName: '', widgetType: '', widgetContent: '' });
        if (categoryType) {
            setWidget(prev => ({ ...prev, widgetType: categoryType }));
        }
        setOpen(true);
    };

    // Hide New Widget Popup
    const handleClose = () => setOpen(false);

    // validates the new widget form
    const validate = () => {
        const newErrors = {};
        let isValid = true;
        if (!widget.widgetName) {
            newErrors.widgetName = 'This Field is Required';
            isValid = false;
        }
        if (!widget.widgetContent) {
            newErrors.widgetContent = 'This Field is Required';
            isValid = false;
        }
        if (!widget.widgetType) {
            newErrors.widgetType = 'This Field is Required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    // saving the widget in DB after validation
    const handleAddWidget = async () => {
        if (validate()) {
            setButtonDisable(true)
            try {
                await addWidget({
                    name: widget.widgetName,
                    content: widget.widgetContent,
                    type: widget.widgetType,
                });
                const results = await getWidgets();
                setData(results.data.data);
                setAlert({
                    alertStatus: true, 
                    alertMsg: 'Widget Added',
                    alertType: 'success'
                });
                setButtonDisable(false);
            } catch (err) {
                console.log('failed', err);
            }
            handleClose();
            setWidget({ widgetName: '', widgetContent: '', widgetType: '' });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setWidget(prev => ({ ...prev, [name]: value }));
    };

    // removes widget from DB
    const handleRemoveWidget = async (widgetId, categoryId) => {
        if (widgetId && categoryId) {
            try {
                await deleteWidget({ categoryId, widgetId });
                setAlert({
                    alertStatus: true,
                    alertMsg: 'Widget Removed',
                    alertType: 'success'
                });
                const results = await getWidgets();
                setData(results.data.data);
            } catch (err) {
                console.log(err);
                setAlert({
                    alertStatus: true,
                    alertMsg: 'Unable to delete!',
                    alertType: 'error'
                });
            }
        } else {
            setAlert({
                alertStatus: true,
                alertMsg: 'Data is missing',
                alertType: 'error'
            });
        }
    };

    // Shows Category Popup
    const openCategoryPopup = () => {
        setCategoryOpen(true);
        setSelectedTab(data[0].id);
    };

    // Hide Category Popup
    const handleCategoryClose = () => {
        setCategoryOpen(false);
        setCheckboxState({});
    };

    // Hide Alerts
    const handleAlertClose = () => {
        setAlert({ alertStatus: false, alertMsg: '', alertType: '' });
    };

    return (
        <section className='dashboard-bg'>
            <Header handleClickOpen={handleClickOpen} openCategoryPopup={openCategoryPopup} />
            {/* Loads Categories */}
            {data.map(category =>
                <Category key={category.id} categoryData={category} handleClickOpen={handleClickOpen} removeWidget={handleRemoveWidget} />
            )}
            {/* New Widget Popup */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Widget</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Widget Name"
                        type="text"
                        fullWidth
                        value={widget.widgetName}
                        onChange={handleChange}
                        name='widgetName'
                        error={!!errors.widgetName}
                        // helperText={errors.widgetName}
                    />
                    <TextField
                        margin="dense"
                        label="Widget Content"
                        type="text"
                        fullWidth
                        value={widget.widgetContent}
                        onChange={handleChange}
                        name='widgetContent'
                        error={!!errors.widgetContent}
                        // helperText={errors.widgetContent}
                    />      
                    <FormControl fullWidth margin="dense" error={!!errors.widgetType}>
                        <InputLabel id="widget-type-label">Widget Type</InputLabel>
                        <Select
                            labelId="widget-type-label"
                            name="widgetType"
                            onChange={handleChange}
                            label="Widget Type"
                            value={widget.widgetType}
                        >
                            {data.map(category => (
                                <MenuItem key={category.id} value={category.id} >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* Remove the FormHelperText if not needed */}
                    </FormControl> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={isDisabled} onClick={handleAddWidget}>Add</Button>
                </DialogActions>
            </Dialog>
            {/* Manage Categories Popup */}
            <ManageCategoryPopup isCategoryOpen={isCategoryOpen} handleCategoryClose={handleCategoryClose} selectedTab={selectedTab} handleTabChange={handleTabChange}  data={data} checkboxState={checkboxState} handleCheckboxChange={handleCheckboxChange} handleConfirm={handleConfirm}/>
            <Alerts alert={alert} handleAlertClose={handleAlertClose} />
        </section>
    );
};
