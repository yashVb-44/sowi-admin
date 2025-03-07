import React, { useCallback, useEffect, useState } from "react";
import {
  Stack,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import './Createvehicle.css';
import CloseIcon from "@mui/icons-material/Close";
import { useAddProject } from "../../AdminContext/AddProjectContext";
import { Alert } from "../../Common/Alert";
import { getAllVehicle, updateVehicle } from "../../Lib/VehicleApi";
import { getCompaniesByServiceType } from "../../Lib/CompanyApi";
import { useVehicleSection } from "../../Context/VehicleDetails";
import { useDropzone } from "react-dropzone";
import EditIcon from "../../Assets/AdminImages/EditIcon.png";
import CloudImage from "../../Assets/AdminImages/CloudImgae.png";
import SowiImage from "../../Assets/AdminImages/sowi-img.png";
import NoImage from "../../Assets/AdminImages/no-image-available.png";
const EditVehicle = ({ openVehicleEdit, handleCloseVehicleEdit }) => {
  const { editData, setEditData } = useAddProject();
  const { setVehicleData, page, rowsPerPage, searchQuery } =
    useVehicleSection();

  const [loader, setLoader] = useState(false);

  // Fields from the response
  const [vehicleName, setVehicleName] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    vehicleName: "",
  });
  const [companies, setCompanies] = useState([]);

  const handleCompanies = async () => {
    const response = await getCompaniesByServiceType({ serviceType });
    setCompanies(response?.companies || []);
    serviceType !== editData?.serviceType
      ? setCompany(response?.companies?.[0]?.companyName || "")
      : setCompany(editData?.company || "");
  };

  useEffect(() => {
    handleCompanies();
  }, [serviceType]);

  useEffect(() => {
    setVehicleName(editData?.vehicleName || "");
    setServiceType(editData?.serviceType || "");
    setIsDeleted(editData?.isDeleted ?? false);
    setIsActive(editData?.isActive ?? true);
    setCurrentImage(editData?.vehicleImage || null);
    setCompany(editData?.company || "");
    console.log(editData);
  }, [editData]);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (
      selectedFile &&
      ["image/jpeg", "image/png"].includes(selectedFile.type)
    ) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setError(""); // Clear error
    } else {
      setError("Only JPG and PNG files are allowed.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxSize: 10485760, // 10MB
    noClick: true, // Disable the default click behavior
  });

  const handleResetUpload = () => {
    setFilePreview(null);
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" })); // Clear error for the field
  };

  const handleCancelVehicle = () => {
    handleCloseVehicleEdit();
  };

  const fetchVehicle = async () => {
    let response = await getAllVehicle({
      page,
      search: searchQuery,
      limit: rowsPerPage,
    });
    setVehicleData(response?.companies || []);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!vehicleName.trim()) newErrors.vehicleName = "Vehicle Name is required";
    if (company === "") newErrors.company = "Company is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleUpdateVehicle = async () => {
    if (!validateFields()) return; // Exit if validation fails
    setLoader(true);
    try {
      let response = await updateVehicle({
        serviceType,
        company,
        isActive,
        isDeleted,
        vehicleName,
        vehicleImage: file,
        vehicleId: editData?._id,
      });

      if (response.type === "success") {
        setLoader(false);
        fetchVehicle();
        setTimeout(() => {
          handleModelClose();
          Alert("Success", "Vehicle Updated successfully", "success");
        }, 100);
      } else {
        setLoader(false);
        handleModelClose();
        Alert(
          "Info",
          "Unable to process your request, Please try later!",
          "info"
        );
      }
    } catch (error) {
      setLoader(false);
      handleModelClose();
      Alert("Error", "An error occurred. Please try again.", "error");
    }
  };

  const resetForm = () => {
    setVehicleName("");
    setCompany("");
    setIsDeleted(false);
    setErrors({});
  };

  const handleModelClose = () => {
    handleCloseVehicleEdit();
    setEditData();
    resetForm();
  };

  return (
    <div>
      <Modal
        open={openVehicleEdit}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-description"
      >
        <Box className="CreateCommonModal">
          <Stack className="CreateCommonDetail">
            <Typography
              id="modal-modal-name"
              variant="h6"
              component="h2"
              className="CreateCommonHeading"
            >
              Edit Vehicle
            </Typography>
            <Stack>
              <CloseIcon
                onClick={() => handleModelClose()}
                className="CreateCommonCloseIcon"
              />
            </Stack>
          </Stack>
          <Stack className="BorderLine"></Stack>

          <Typography
            id="modal-modal-name"
            variant="h6"
            component="h2"
            sx={{ marginTop: "3%" }}
            className="CreateCommonHeadingTwo"
          >
            Vehicle Details
          </Typography>

          <Grid container spacing={6} sx={{ paddingRight: "30px" }}>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Service Type
              </Typography>
              <Select
                value={serviceType}
                onChange={(e) => handleChange(e, setServiceType)}
                className="CreateCommonInputFiled"
                error={!!errors.serviceType}
                displayEmpty
              >
                <MenuItem value="1">2 wheeler</MenuItem>
                <MenuItem value="2">3 wheeler</MenuItem>
                <MenuItem value="3">4 wheeler</MenuItem>
                <MenuItem value="4">Heavy Vehicle</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Company
              </Typography>
              <Select
                value={company}
                onChange={(e) => handleChange(e, setCompany)}
                className="CreateCommonInputFiled"
                error={!!errors.company}
                displayEmpty
              >
                {companies.map((company) => (
                  <MenuItem
                    key={company.companyName}
                    value={company.companyName}
                  >
                    {company.companyName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={6} sx={{ paddingRight: "30px" }}>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Vehicle Name
              </Typography>
              <TextField
                id="standard-required"
                name="vehicleName"
                placeholder="Enter createBy"
                variant="standard"
                className="CreateCommonInputFiled"
                InputProps={{ disableUnderline: true }}
                value={vehicleName}
                onChange={(e) => handleChange(e, setVehicleName)}
                autoComplete="off"
                error={!!errors.vehicleName}
                helperText={errors.vehicleName}
              />
            </Grid>
          </Grid>

          <Grid container spacing={6} sx={{ paddingRight: "30px" }}>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Is Deleted
              </Typography>
              <Select
                value={isDeleted ? "Yes" : "No"}
                onChange={(e) => setIsDeleted(e.target.value === "Yes")}
                className="CreateCommonInputFiled"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Is Active
              </Typography>
              <Select
                value={isActive ? "Yes" : "No"}
                onChange={(e) => setIsActive(e.target.value === "Yes")}
                className="CreateCommonInputFiled"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={12} lg={12}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="CreateBlogHeadingTwo"
                sx={{ height: "20px" }}
              >
                Media
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateBlogInputLabel"
              >
                Upload Vehicle Image
              </Typography>

              {!filePreview && (
                <Stack {...getRootProps()} className="FileUpload">
                  <input {...getInputProps()} />
                  <Stack className="FileUploadField">
                    <img src={CloudImage} alt="Cloud Image" />
                    {isDragActive ? (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="FileUploadHeading"
                      >
                        Drop the files here ...
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="FileUploadHeading"
                        >
                          Select a file or drag and drop here
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="FileUploadPara"
                        >
                          JPG or PNG file size no more than 10MB
                        </Typography>
                        <Stack className="FileUploadDottedLine">
                          <Stack className="FileUploadDotted"></Stack>
                          <Typography>or</Typography>
                          <Stack className="FileUploadDotted"></Stack>
                        </Stack>
                        <Button
                          variant="contained"
                          className="FileUploadButton"
                          onClick={open} // Use the open method from useDropzone
                        >
                          Browse file
                        </Button>
                      </>
                    )}
                  </Stack>

                  {error && (
                    <Box mt={2}>
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              )}
              {filePreview && (
                <Stack className="PreviewUpload">
                  <Box className="PreviewUploadImageContainer">
                    <img
                      src={filePreview}
                      className="PreviewUploadImage"
                      alt="Preview"
                    />
                    <img
                      src={EditIcon}
                      alt="Edit Icon"
                      onClick={() => handleResetUpload()}
                      className="EditIconCreateBlog"
                    />
                  </Box>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Current Vehicle Image
              </Typography>
              <Box
                {...getRootProps()}
                className={`CreateUserDropzone ${isDragActive ? "active" : ""}`}
              >
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt="Profile Preview"
                    className="CreateUserImagePreview"
                    onError={(e) => (e.target.src = SowiImage)}
                    height={150}
                    width={250}
                  />
                ) : (
                  <img
                    src={NoImage}
                    alt="Default Image"
                    className="CreateUserImagePreview"
                  />
                )}

                {/* <input {...getInputProps()} /> */}
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                textTransform: "none",
                borderRadius: "4px",
                padding: "6px 20px",
              }}
              onClick={handleUpdateVehicle}
              disabled={loader}
            >
              {loader ? "Updating..." : "Update Vehicle"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditVehicle;
