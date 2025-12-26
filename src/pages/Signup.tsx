import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
  Fade,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowForward,
  School,
  Business,
  Phone,
  Email,
} from "@mui/icons-material";
import { signUp } from "../API/UserApi";
import { handleApiError } from "../utils/ApiHepler";

const Signup: React.FC = () => {
  const getInitialState = () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    token: "",
    phone: "",
    name: "",
    address: "",
    country: "",
    website: "",
    loading: false,
    fetchingData: true,
    error: "",
    isVisible: false,
  });

  const [state, setState] = useState(getInitialState());
  const [step, setStep] = useState(1);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const isTwoStep = state.role === "UNIVERSITY" || state.role === "AGENT";
  const isUniversity = state.role === "UNIVERSITY";
  const isAgent = state.role === "AGENT";

  useEffect(() => {
    const token = searchParam.get("token");
    const type = searchParam.get("type");

    if (!token || !type) {
      setState((prev) => ({
        ...prev,
        fetchingData: false,
        error: "Invalid or missing invitation link.",
      }));
      return;
    }

    sessionStorage.setItem("tokenId", token);
    sessionStorage.setItem("inviteRole", type);

    navigate(
      { pathname: "/register/email-verification", search: "" },
      { replace: true }
    );

    setState((prev) => ({
      ...prev,
      token,
      role: type,
      fetchingData: false,
    }));
  }, []);

  const validateStep1 = () => {
    const { firstName, lastName, password, phone } = state;
    const errors: string[] = [];

    if (!firstName.trim()) errors.push("First name is required");
    if (!lastName.trim()) errors.push("Last name is required");
    if (!password) errors.push("Password is required");

    if (firstName.trim().length < 2)
      errors.push("First name must be at least 2 characters");
    if (lastName.trim().length < 2)
      errors.push("Last name must be at least 2 characters");
    if (password.length < 8)
      errors.push("Password must be at least 8 characters");
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.push(
        "Password must contain uppercase, lowercase letters and numbers"
      );
    }

    // Phone validation (optional but if provided, validate format)
    if (phone && !/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\D/g, ""))) {
      errors.push("Please enter a valid phone number");
    }

    return errors;
  };

  const validateStep2 = () => {
    const { name, address, country, website } = state;
    const errors: string[] = [];

    // Common validations for both university and agent
    if (!name.trim()) errors.push("Organization name is required");
    if (!address.trim()) errors.push("Address is required");
    if (!country.trim()) errors.push("Country is required");

    if (name.trim().length < 3)
      errors.push("Organization name must be at least 3 characters");
    if (address.trim().length < 10)
      errors.push("Please provide a complete address");

    // University-specific validations
    if (isUniversity) {
      if (name.trim().length < 5)
        errors.push("University name must be at least 5 characters");
      if (!website.trim()) errors.push("University website is required");
    }

    // Agent-specific validations
    if (isAgent) {
      if (name.trim().length < 3)
        errors.push("Agency name must be at least 3 characters");
    }

    // Website validation (optional but if provided, validate format)
    if (website && !/^https?:\/\/.+\..+/.test(website)) {
      errors.push(
        "Please enter a valid website URL starting with http:// or https://"
      );
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, error: "" }));

    // STEP 1 VALIDATION
    if (step === 1) {
      const errors = validateStep1();
      if (errors.length > 0) {
        setState((prev) => ({ ...prev, error: errors.join(". ") + "." }));
        return;
      }

      // If it's a two-step process (university/agent), go to step 2
      if (isTwoStep) {
        setStep(2);
        return;
      }

      // If not two-step (regular user), proceed to API call
      // This would be for other roles like STUDENT, ADMIN, etc.
    }

    // STEP 2 VALIDATION (only for university/agent)
    if (step === 2 && isTwoStep) {
      const errors = validateStep2();
      if (errors.length > 0) {
        setState((prev) => ({ ...prev, error: errors.join(". ") + "." }));
        return;
      }
    }

    // FINAL SUBMISSION
    try {
      setState((prev) => ({ ...prev, loading: true }));

      const payload: any = {
        first_name: state.firstName.trim(),
        last_name: state.lastName.trim(),
        password: state.password,
        token: state.token,
      };

      // Add phone if provided
      if (state.phone.trim()) {
        payload.phone = state.phone.trim();
      }

      // Add email if exists (from invitation)
      if (state.email.trim()) {
        payload.email = state.email.trim();
      }

      // Add organization details for university/agent
      if (isTwoStep) {
        payload.organization = {
          name: state.name.trim(),
          address: state.address.trim(),
          country: state.country.trim(),
          website: state.website.trim() || null, // Send null if empty
          type: state.role, // Send the role as organization type
        };
      }

      const res = await signUp(payload);

      if (res) {
        // Clear session storage after successful signup
        sessionStorage.removeItem("tokenId");
        sessionStorage.removeItem("inviteRole");

        // Show success message and redirect
        setState((prev) => ({ ...prev, error: "" }));
        alert("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err: any) {
      // Handle specific API errors
      if (err.response?.data?.error) {
        setState((prev) => ({
          ...prev,
          error: err.response.data.error,
        }));
      } else {
        handleApiError(err);
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  // Predefined list of countries for dropdown
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
    "South Africa",
    // Add more countries as needed
  ];

  if (state.fetchingData) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: "white", mb: 2 }} />
          <Typography variant="h6" color="white" fontWeight={500}>
            Loading invitation...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, md: 6 },
          background: "white",
        }}
      >
        <Container maxWidth="sm">
          <Fade in={true}>
            <Box
              sx={{
                maxWidth: 520,
                mx: "auto",
              }}
            >
              {/* Header */}
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Complete Your Signup
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  You've been invited as a{" "}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: "#667eea",
                      textTransform: "capitalize",
                    }}
                  >
                    {state.role?.toLowerCase()}
                  </Box>
                </Typography>
              </Box>

              {/* Progress Stepper */}
              {isTwoStep && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%)",
                    border: "1px solid rgba(102, 126, 234, 0.1)",
                  }}
                >
                  <Stepper activeStep={step - 1} alternativeLabel>
                    <Step>
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label": {
                            fontWeight: 500,
                          },
                        }}
                      >
                        Personal Details
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label": {
                            fontWeight: 500,
                          },
                        }}
                      >
                        {isUniversity ? "University Details" : "Agency Details"}
                      </StepLabel>
                    </Step>
                  </Stepper>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    color="primary"
                    fontWeight={500}
                    mt={1}
                  >
                    Step {step} of 2
                  </Typography>
                </Paper>
              )}

              {/* Error Alert */}
              {state.error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      alignItems: "center",
                    },
                  }}
                >
                  {state.error}
                </Alert>
              )}

              {/* Form */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: "white",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Step 1 */}
                  {step === 1 && (
                    <Box>
                      <Typography variant="h6" fontWeight={600} mb={2}>
                        Personal Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <TextField
                            label="First Name"
                            fullWidth
                            required
                            value={state.firstName}
                            onChange={handleInputChange("firstName")}
                            helperText="At least 2 characters"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={6} md={6}>
                          <TextField
                            label="Last Name"
                            fullWidth
                            required
                            value={state.lastName}
                            onChange={handleInputChange("lastName")}
                            helperText="At least 2 characters"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        label="Phone Number"
                        fullWidth
                        margin="normal"
                        value={state.phone}
                        onChange={handleInputChange("phone")}
                        helperText="Optional"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />

                      <TextField
                        label="Password"
                        type={state.isVisible ? "text" : "password"}
                        fullWidth
                        required
                        margin="normal"
                        value={state.password}
                        onChange={handleInputChange("password")}
                        helperText="At least 8 characters with uppercase, lowercase & numbers"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setState((p) => ({
                                    ...p,
                                    isVisible: !p.isVisible,
                                  }))
                                }
                                edge="end"
                              >
                                {state.isVisible ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  )}

                  {/* Step 2 */}
                  {step === 2 && isTwoStep && (
                    <Box>
                      <Typography variant="h6" fontWeight={600} mb={3}>
                        {isUniversity
                          ? "University Information"
                          : "Agency Information"}
                      </Typography>

                      <TextField
                        label={isUniversity ? "University Name" : "Agency Name"}
                        fullWidth
                        required
                        margin="normal"
                        value={state.name}
                        onChange={handleInputChange("name")}
                        helperText={
                          isUniversity
                            ? "Official university name (min. 5 characters)"
                            : "Agency name (min. 3 characters)"
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />

                      <TextField
                        label="Address"
                        fullWidth
                        required
                        margin="normal"
                        multiline
                        rows={2}
                        value={state.address}
                        onChange={handleInputChange("address")}
                        helperText="Complete address including street, city, and postal code"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />

                      <FormControl fullWidth margin="normal" required>
                        <InputLabel>Country</InputLabel>
                        <Select
                          value={state.country}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              country: e.target.value,
                            }))
                          }
                          label="Country"
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          <MenuItem value="">
                            <em>Select a country</em>
                          </MenuItem>
                          {countries.map((country) => (
                            <MenuItem key={country} value={country}>
                              {country}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        label="Website"
                        fullWidth
                        margin="normal"
                        value={state.website}
                        onChange={handleInputChange("website")}
                        helperText={
                          isUniversity
                            ? "Required for university (e.g., https://university.edu)"
                            : "Optional for agency"
                        }
                        placeholder="https://example.com"
                        required={isUniversity}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={state.loading}
                    sx={{
                      mt: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5a6fd8 0%, #6b4090 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    endIcon={!state.loading && <ArrowForward />}
                  >
                    {state.loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : isTwoStep && step === 1 ? (
                      "Continue to Organization Details"
                    ) : (
                      `Complete ${
                        isUniversity ? "University" : isAgent ? "Agency" : ""
                      } Signup`
                    )}
                  </Button>

                  {/* Back Button for Step 2 */}
                  {step === 2 && isTwoStep && (
                    <Button
                      fullWidth
                      variant="text"
                      size="medium"
                      onClick={() => setStep(1)}
                      sx={{
                        mt: 2,
                        color: "text.secondary",
                        "&:hover": {
                          background: "transparent",
                          color: "#667eea",
                        },
                      }}
                    >
                      ← Back to Personal Details
                    </Button>
                  )}
                </form>
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Right Side - Welcome Panel */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: "#2f53f3be",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: 480,
            px: 4,
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {isUniversity ? (
              <School sx={{ fontSize: 48, color: "white", opacity: 0.9 }} />
            ) : (
              <Business sx={{ fontSize: 48, color: "white", opacity: 0.9 }} />
            )}
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: 42,
              fontWeight: 800,
              color: "white",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Welcome {isUniversity ? "University" : "Agency"}!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            {isUniversity
              ? "Join our network of prestigious educational institutions. Connect with students worldwide."
              : "Partner with us to help students find their perfect educational path. Access exclusive tools and resources."}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
