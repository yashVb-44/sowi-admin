import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Switch, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditSubscriptionPlan = ({ open, handleClose, plan, handleSave }) => {
    const [updatedPlan, setUpdatedPlan] = useState(plan);

    useEffect(() => {
        setUpdatedPlan(plan);
    }, [plan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPlan({ ...updatedPlan, [name]: (value) });
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...updatedPlan.features];
        updatedFeatures[index] = value;
        setUpdatedPlan({ ...updatedPlan, features: updatedFeatures });
    };

    const handleAddFeature = () => {
        setUpdatedPlan({ ...updatedPlan, features: [...updatedPlan.features, ""] });
    };

    const handleRemoveFeature = (index) => {
        const updatedFeatures = updatedPlan.features.filter((_, i) => i !== index);
        setUpdatedPlan({ ...updatedPlan, features: updatedFeatures });
    };

    const handleToggleActive = () => {
        setUpdatedPlan({ ...updatedPlan, isActive: !updatedPlan.isActive });
    };

    // Calculate discounted prices
    const oneYearPrice = updatedPlan.yearlyPrice - (updatedPlan.yearlyPrice * updatedPlan.oneYearDiscount) / 100;
    const twoYearPrice = (updatedPlan.yearlyPrice * 2) - ((updatedPlan.yearlyPrice * 2) * updatedPlan.twoYearDiscount) / 100;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Edit Subscription Plan
                <IconButton style={{ position: "absolute", right: 10, top: 10 }} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    <TextField label="Plan Name" name="name" value={updatedPlan.name} onChange={handleChange} fullWidth />
                    <TextField label="Description" name="description" value={updatedPlan.description} onChange={handleChange} fullWidth multiline rows={2} />

                    {/* Pricing Section */}
                    <Typography variant="h6" sx={{ mt: 2 }}>Pricing Details</Typography>

                    <TextField label="Yearly Price (₹)" name="yearlyPrice" type="number" value={updatedPlan.yearlyPrice} onChange={handleChange} fullWidth />

                    <TextField label="1-Year Discount (%)" name="oneYearDiscount" type="number" value={updatedPlan.oneYearDiscount} onChange={handleChange} fullWidth />
                    <TextField disabled label="Price After 1-Year Discount (₹)" type="number" value={oneYearPrice.toFixed(2)} fullWidth />

                    <TextField label="2-Year Discount (%)" name="twoYearDiscount" type="number" value={updatedPlan.twoYearDiscount} onChange={handleChange} fullWidth />
                    <TextField disabled label="Price After 2-Year Discount (₹)" type="number" value={twoYearPrice.toFixed(2)} fullWidth />

                    <TextField label="GST(TAX) (%)" name="gst" type="number" value={updatedPlan.gst} onChange={handleChange} fullWidth />

                    {/* <Stack spacing={1}>
                        <strong>Features:</strong>
                        {updatedPlan.features.map((feature, index) => (
                            <Stack key={index} direction="row" spacing={1} alignItems="center">
                                <TextField fullWidth value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} />
                                <Button variant="contained" color="error" onClick={() => handleRemoveFeature(index)}>-</Button>
                            </Stack>
                        ))}
                        <Button variant="contained" color="primary" onClick={handleAddFeature}>+ Add Feature</Button>
                    </Stack> */}

                    {/* Active Status */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        <Typography variant="body1">Active Status</Typography>
                        <Switch checked={updatedPlan.isActive} onChange={handleToggleActive} />
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={() => handleSave(updatedPlan)} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSubscriptionPlan;
