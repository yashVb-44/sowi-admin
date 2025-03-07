import React, { useState } from "react";
import "../Common/CommonStyle.css";
import { Grid, Typography, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VehicleManagementTabel from "./VehicleManagementTable";
import EditVehicle from "./EditVehicle";
import CreateVehicle from "./CreateVehicle";

const VehicleManagement = () => {
  const [openVehicleCreate, setOpenVehicleCreate] = useState(false);
  const handleOpenVehicleCreate = () => setOpenVehicleCreate(true);
  const handleCloseVehicleCreate = () => setOpenVehicleCreate(false);

  const [openVehicleEdit, setOpenVehicleEdit] = useState(false);
  const handleOpenVehicleEdit = () => setOpenVehicleEdit(true);
  const handleCloseVehicleEdit = () => setOpenVehicleEdit(false);

  return (
    <div className="Common">
      <Grid item xs={12} md={12} lg={12}>
        <Stack className="CommonText">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="CommonHeading"
          >
            Vehicle Management
          </Typography>
          <Button
            onClick={() => handleOpenVehicleCreate()}
            variant="outlined"
            className="AddProjectButton"
            sx={{ textTransform: "none" }}
            startIcon={<AddIcon />}
          >
            Add Vehicle
          </Button>
        </Stack>
        <VehicleManagementTabel handleOpenVehicleEdit={handleOpenVehicleEdit} />
      </Grid>
      <CreateVehicle
        openVehicleCreate={openVehicleCreate}
        handleCloseVehicleCreate={handleCloseVehicleCreate}
      />
      <EditVehicle
        openVehicleEdit={openVehicleEdit}
        handleCloseVehicleEdit={handleCloseVehicleEdit}
      />
    </div>
  );
};

export default VehicleManagement;
