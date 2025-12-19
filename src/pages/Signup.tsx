import React, { useState, useEffect } from "react";
import { getInviteMail, signUp } from "../API/UserApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleApiError } from "../utils/ApiHepler";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

const Signup: React.FC = () => {
  const getInitialState = () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    token: "",
    phone: "",
    loading: false,
    fetchingData: true,
    error: "",
  });

  const [state, setState] = useState(getInitialState());
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  /* =========================
     FETCH INVITE DATA
  ========================== */
  useEffect(() => {
    const token = searchParam.get("token");

    if (!token) {
      setState((prev) => ({
        ...prev,
        fetchingData: false,
        error: "Invalid or missing invitation token.",
      }));
      return;
    }

    sessionStorage.setItem("tokenId", token);
    navigate('/register/email-verification', {replace: true})
    setState((prev) => ({ ...prev, token }));
    fetchInviteData(token);
  }, []);

  const fetchInviteData = async (token: string) => {
    try {
      const response = await getInviteMail(token);

      if (response.is_used) {
        setState((prev) => ({
          ...prev,
          error: "This invitation has already been used.",
        }));
        return;
      }

      if (response.expires_at) {
        const expiresAt = new Date(response.expires_at);
        if (expiresAt < new Date()) {
          setState((prev) => ({
            ...prev,
            error: "This invitation has expired.",
          }));
          return;
        }
      }

      setState((prev) => ({
        ...prev,
        email: response.email || "",
        role: response.role || "",
      }));
    } catch (err) {
      handleApiError(err);
      setState((prev) => ({
        ...prev,
        error: "Invalid or expired invitation link.",
      }));
    } finally {
      setState((prev) => ({ ...prev, fetchingData: false }));
    }
  };

  /* =========================
     SUBMIT
  ========================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setState((prev) => ({ ...prev, error: "" }));

    const { firstName, lastName, email, password, token, role, phone } = state;

    if (!firstName || !lastName || !email || !password || !token || !role) {
      setState((prev) => ({
        ...prev,
        error: "All fields are required.",
      }));
      return;
    }

    if (password.length < 6) {
      setState((prev) => ({
        ...prev,
        error: "Password must be at least 6 characters long.",
      }));
      return;
    }

    if (phone && phone.length < 10) {
      setState((prev) => ({
        ...prev,
        error: "Phone number must be at least 10 digits.",
      }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));

      const payload = {
        first_name: firstName,
        last_name: lastName,
        username: `${firstName} ${lastName}`.trim(),
        email,
        password,
        role: role.toUpperCase(),
        token,
        phone,
      };

      const res = await signUp(payload);

      if (res && res?.id) {
        navigate('/login')
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    loading,
    fetchingData,
    error,
  } = state;

  if (fetchingData) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" height="100vh">
      {/* LEFT FORM */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: "5px 5px 10px 2px rgba(7, 66, 143, 0.58)",
          }}
          className="p-8 w-full"
        >
          {/* <Box width={380} bgcolor="white" p={4} borderRadius={2} boxShadow={3}> */}

          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center mb-6">
              Complete Your Signup
            </h1>
            <h4 style={{ textAlign: "center", color: "green" }}>{email}</h4>
            <TextField
              label="First Name"
              fullWidth
              size="medium"
              margin="normal"
              value={firstName}
              onChange={handleInputChange("firstName")}
              disabled={loading}
            />

            <TextField
              label="Last Name"
              fullWidth
              size="medium"
              margin="normal"
              value={lastName}
              onChange={handleInputChange("lastName")}
              disabled={loading}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              size="medium"
              margin="normal"
              value={password}
              onChange={handleInputChange("password")}
              disabled={loading}
            />

            <TextField
              label="Mobile Number"
              fullWidth
              size="medium"
              margin="normal"
              value={phone}
              onChange={handleInputChange("phone")}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                "&:disabled": {
                  backgroundColor: "#90caf9",
                },
              }}
              disabled={loading || !state.token}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          {/* </Box> */}
        </Box>
      </div>
      {/* RIGHT SIDE */}
      <Box
        flex={1}
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
        alignItems="center"
        bgcolor="primary.main"
        color="white"
      >
        <Box textAlign="center" maxWidth={400}>
          <h1>Welcome!</h1>
          <p>
            You've been invited to join us. Create your account and get started!
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
