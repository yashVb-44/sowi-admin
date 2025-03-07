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
// import './CreateCompany.css';
import CloseIcon from "@mui/icons-material/Close";
import { useAddProject } from "../../AdminContext/AddProjectContext";
import { Alert } from "../../Common/Alert";
import { getAllCompany, updateCompany } from "../../Lib/CompanyApi";
import { useCompanySection } from "../../Context/CompanyDetails";
import { useDropzone } from "react-dropzone";
import EditIcon from "../../Assets/AdminImages/EditIcon.png";
import CloudImage from "../../Assets/AdminImages/CloudImgae.png";
import SowiImage from "../../Assets/AdminImages/sowi-img.png";
import NoImage from "../../Assets/AdminImages/no-image-available.png";
const EditCompany = ({ openCompanyEdit, handleCloseCompanyEdit }) => {
  const { editData, setEditData } = useAddProject();
  const { setCompanyData, page, rowsPerPage, searchQuery } =
    useCompanySection();

  const [loader, setLoader] = useState(false);

  // Fields from the response
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    companyName: "",
  });

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

  useEffect(() => {
    setName(editData?.name || "");
    setCompanyName(editData?.companyName || "");
    setServiceType(editData?.serviceType || "");
    setIsDeleted(editData?.isDeleted ?? false);
    setIsActive(editData?.isActive ?? true);
    setCurrentImage(editData?.companyImage || null);
    console.log(editData);
  }, [editData]);

  const handleChange = (e, setter) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" })); // Clear error for the field
  };

  const handleCancelCompany = () => {
    handleCloseCompanyEdit();
  };

  const fetchCompany = async () => {
    let response = await getAllCompany({
      page,
      search: searchQuery,
      limit: rowsPerPage,
    });
    setCompanyData(response?.companies || []);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!companyName.trim()) newErrors.companyName = "Company Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleUpdateCompany = async () => {
    if (!validateFields()) return; // Exit if validation fails
    setLoader(true);
    try {
      let response = await updateCompany({
        name,
        serviceType,
        isActive,
        isDeleted,
        companyName,
        companyImage: file,
        companyId: editData?._id,
      });

      if (response.type === "success") {
        setLoader(false);
        fetchCompany();
        setTimeout(() => {
          handleModelClose();
          Alert("Success", "Company Updated successfully", "success");
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
    setName("");
    setCompanyName("");
    setIsDeleted(false);
    setErrors({});
  };

  const handleModelClose = () => {
    handleCloseCompanyEdit();
    setEditData();
    resetForm();
  };

  return (
    <div>
      <Modal
        open={openCompanyEdit}
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
              Edit Company
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
            Company Details
          </Typography>
          <Grid container spacing={6} sx={{ paddingRight: "30px" }}>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Name
              </Typography>
              <TextField
                id="standard-required"
                name="name"
                placeholder="Enter name"
                variant="standard"
                className="CreateCommonInputFiled"
                InputProps={{ disableUnderline: true }}
                value={name}
                onChange={(e) => handleChange(e, setName)}
                autoComplete="off"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
              <Typography
                variant="body2"
                color="text.secondary"
                className="CreateCommonInputLabel"
              >
                Company Name
              </Typography>
              <TextField
                id="standard-required"
                name="companyName"
                placeholder="Enter createBy"
                variant="standard"
                className="CreateCommonInputFiled"
                InputProps={{ disableUnderline: true }}
                value={companyName}
                onChange={(e) => handleChange(e, setCompanyName)}
                autoComplete="off"
                error={!!errors.companyName}
                helperText={errors.companyName}
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
                Vehicle Type
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
                Upload Company Image
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
                Current Company Image
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
              onClick={handleUpdateCompany}
              disabled={loader}
            >
              {loader ? "Updating..." : "Update Company"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCompany;
