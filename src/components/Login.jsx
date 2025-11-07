import {
  useTheme,
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/dashboard");
  // };

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    if (data.userName.trim()) {
      alert(t("toast.welcome", { name: data.userName }));
      navigate("/dashboard");
      reset();
    } else {
      alert(t("toast.pleaseEnter"));
    }
  };

  const helperText = {
    userName: {
      required: t("errors.required"),
      minLength: t("errors.minLength"),
      maxLength: t("errors.maxLength"),
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const theme = useTheme();

  return (
    <div>
      {loading ? (
        <Typography
          variant="h3"
          component={"h3"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            gap: 2,
            px: { xs: 2, sm: 3 },
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          {t("loading")}
          <CircularProgress size={28} />
        </Typography>
      ) : (
        <Container
          sx={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component={"form"}
            sx={(theme) => ({
              width: {
                xs: "100%",
                sm: "92%",
                md: 840,
                lg: 960,
              },
              height: {
                xs: "auto",
                md: 520,
                lg: 560,
              },
              color: theme.palette.mode === "dark" ? "white" : "black",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "white"
                  : theme.palette.background.darkPaper,
              borderRadius: { xs: 2, md: "10px" },
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
            })}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: { xs: "auto", md: "100%" },
                py: { xs: 3, sm: 4 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: { xs: "auto", md: "100%" },
                    width: "100%",
                    py: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography
                    component={"h5"}
                    variant="h5"
                    sx={{
                      mb: { xs: "12px", sm: "16px", md: "20px" },
                      fontWeight: "bold",
                      fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    {t("login.title")}
                  </Typography>
                  <TextField
                    sx={{ width: { xs: "100%", sm: "85%", md: "80%" } }} // ← پهنای ریسپانسیو
                    id="outlined-basic"
                    label={t("login.label")}
                    variant="outlined"
                    error={!!errors.userName}
                    {...register("userName", {
                      required: true,
                      maxLength: 31,
                      minLength: 2,
                    })}
                  />
                  {errors.userName && (
                    <Typography
                      color="error"
                      sx={{ mt: 1, fontSize: { xs: 12, sm: 13 } }}
                    >
                      {helperText.userName[errors.userName.type]}
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: { xs: "100%", sm: "85%", md: "80%" },
                    bgcolor: "#2196f3",
                    color: "white",
                    py: { xs: 1, sm: 1.1 },
                  }}
                >
                  {t("login.submit")}
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: { xs: "none", md: "block" },
              }}
            >
              {theme.palette.mode === "light" ? (
                <img
                  src="/Login.png"
                  alt="weather"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <img
                  src="/loginD.png"
                  alt="weather"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </Box>
          </Box>
        </Container>
      )}
    </div>
  );
}
