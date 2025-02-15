import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Stack, Card, CardContent, Switch } from "@mui/material";
import { useContent } from "../../Context/ContentContext";
import EditIcon from "../../Assets/AdminImages/EditIcon.png";
import EditSubscriptionPlan from "./SubScriptionEdit";
import { updateSubscriptionPlan } from '../../Lib/TermsPrivacyContentApi';
import "./SubscriptionPlans.css";
import { Alert } from "../../Common/Alert";
import Loader from "../../Common/Loader";

const SubscriptionPlans = () => {
    const { fetchSubscriptionPlans, subscriptionPlans } = useContent();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [loader, setLoader] = useState(false);

    // Fetch subscription plans on component mount
    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);

    const handleToggleActive = async (planId, isActive) => {
        setLoader(true)
        let response = await updateSubscriptionPlan(planId, { isActive: !isActive });
        try {
            if (response?.type === "success") {
                setTimeout(() => {
                    Alert('Success', response?.message, 'success')
                    setLoader(false)
                    fetchSubscriptionPlans(); // Refetch plans to update UI after toggling
                }, 2000);
            }
            else {
                setLoader(false)
                Alert('Info', response?.message, 'info')
            }
        } catch (error) {
            setLoader(false)
            Alert('Info', response?.message, 'info')
        }
    };

    const handleEditPlan = (plan) => {
        setSelectedPlan(plan);
        setOpenEdit(true);
    };

    const handleSavePlan = async (updatedPlan) => {
        setLoader(true)
        let response = await updateSubscriptionPlan(updatedPlan._id, updatedPlan);
        try {
            if (response?.type === "success") {
                setTimeout(() => {
                    Alert('Success', response?.message, 'success')
                    setLoader(false)
                    fetchSubscriptionPlans(); // Refetch to ensure the update reflects in UI
                    setOpenEdit(false);
                }, 2000);
            }
            else {
                setLoader(false)
                Alert('Info', response?.message, 'info')
            }
        } catch (error) {
            setLoader(false)
            Alert('Info', response?.message, 'info')
        }
    };

    const handleCancel = () => {
        setOpenEdit(false)
        fetchSubscriptionPlans()
    }

    return (
        <div className="subscription-container">
            <Typography variant="h5" className="subscription-header">
                Subscription Plans
            </Typography>

            <Grid container spacing={3}>
                {subscriptionPlans?.length > 0 ? (
                    subscriptionPlans.map((plan) => (
                        <Grid item xs={12} md={4} key={plan._id}>
                            <Card className="subscription-card">
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6">{plan.name}</Typography>
                                        <img
                                            src={EditIcon}
                                            alt="Edit Icon"
                                            className="edit-icon"
                                            onClick={() => handleEditPlan(plan)}
                                        />
                                    </Stack>

                                    <Typography variant="body2" className="plan-description">{plan.description}</Typography>

                                    <Stack spacing={1} className="plan-details">
                                        <Typography>💰 Yearly Price: ₹{plan.yearlyPrice}</Typography>
                                        <Typography>🎁 1-Year Discount: {plan.oneYearDiscount}%</Typography>
                                        <Typography>💳 1-Year Final Price: ₹{plan.yearlyPrice - (plan.yearlyPrice * plan.oneYearDiscount) / 100}</Typography>
                                        <Typography>🎁 2-Year Discount: {plan.twoYearDiscount}%</Typography>
                                        <Typography>💳 2-Year Final Price: ₹{(plan.yearlyPrice * 2) - ((plan.yearlyPrice * 2 * plan.twoYearDiscount) / 100)}</Typography>
                                        <Typography>🧾 GST(TAX): {plan.gst}%</Typography>
                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center" className="plan-footer">
                                        <Typography variant="body2">Active</Typography>
                                        <Switch
                                            checked={plan.isActive}
                                            onChange={() => handleToggleActive(plan._id, plan.isActive)}
                                        />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" className="no-plans">No subscription plans available.</Typography>
                )}
            </Grid>

            {selectedPlan && (
                <EditSubscriptionPlan
                    open={openEdit}
                    handleClose={() => handleCancel()}
                    plan={selectedPlan}
                    handleSave={handleSavePlan}
                    fetchSubscriptionPlans={fetchSubscriptionPlans}
                />
            )}
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default SubscriptionPlans;
