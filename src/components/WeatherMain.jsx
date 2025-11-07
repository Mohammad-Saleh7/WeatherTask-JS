import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function WeatherMain({ forecast = [] }) {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Stack
        justifyContent="center"
        alignItems="stretch"
        sx={{ mt: { xs: 2, sm: 3 } }}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.background.darkPaper
                : theme.palette.background.lightPaper,
            borderRadius: 3,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
          })}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 } }}
          >
            {t("forecast.title2w")}
          </Typography>

          <Box
            sx={(theme) => ({
              mt: 2,
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              scrollSnapType: { xs: "x mandatory", md: "none" },
              "& > *": { scrollSnapAlign: { xs: "start", md: "none" } },
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": {
                background:
                  theme.palette.mode === "dark" ? "#39424a" : "#cfd8e0",
                borderRadius: 8,
              },
            })}
          >
            {forecast.length === 0 ? (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.7,
                }}
              >
                <Typography>{t("forecast.empty")}</Typography>
              </Box>
            ) : (
              forecast.map((d, i) => (
                <Box
                  key={d.date || i}
                  aria-label={i === 0 ? t("forecast.today") : d.weekday}
                  sx={(theme) => ({
                    minWidth: { xs: 88, sm: 96, md: 110 },
                    height: { xs: 220, sm: 240, md: 260 },
                    borderRadius: 2.5,
                    px: 2,
                    py: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.06)",
                  })}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, fontWeight: 600 }}
                    >
                      {i === 0 ? t("forecast.today") : d.weekday}
                    </Typography>
                  </Box>

                  <Box
                    aria-hidden
                    sx={{
                      fontSize: { xs: 34, sm: 38, md: 42 },
                      lineHeight: 1,
                      my: 1,
                    }}
                  >
                    {d.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 18 } }}
                  >
                    {d.maxTemp}°C
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
