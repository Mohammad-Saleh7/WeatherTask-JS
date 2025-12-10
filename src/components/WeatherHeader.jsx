import { Box, Container, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";

export default function WeatherHeader({
  cityName,
  day,
  date,
  hour,
  Temperature,
  high,
  low,
  img,
  Status,
  feels,
  monthlyData = [],
}) {
  const { t, i18n } = useTranslation();
  const NF = new Intl.NumberFormat(i18n.language === "fa" ? "fa-IR" : "en-US");

  const months = monthlyData;
  const values = months.map((m) => m?.avgTemp).filter((v) => v != null);

  const w = 704;
  const h = 140;
  const pad = 10;
  const step = months.length > 1 ? (w - 2 * pad) / (months.length - 1) : 0;
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 0;
  const normY = (v) =>
    maxVal === minVal ? 0.5 : 1 - (v - minVal) / (maxVal - minVal);
  const points = months.length
    ? months
        .map(
          (m, i) =>
            `${pad + i * step},${pad + normY(m.avgTemp) * (h - 2 * pad)}`
        )
        .join(" ")
    : "";

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Stack
        sx={(theme) => ({
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 3, lg: 5 },
          mt: { xs: 2, sm: 3, md: 5 },
          color: theme.palette.mode === "dark" ? "white" : "#003464",
        })}
      >
        {/* Left card */}
        <Box
          sx={(theme) => ({
            flex: 1,
            minWidth: 0,
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.background.darkPaper
                : theme.palette.background.lightPaper,
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
          })}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box
              sx={{
                bgcolor: "#cdd9e0",
                width: { xs: 160, sm: 180 },
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <LocationOnIcon sx={{ color: "#3d4852" }} />
              <Typography sx={{ color: "#3d4852", ml: 0.5 }}>
                {cityName}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontSize: { xs: 22, sm: 26, md: 30 } }}
              >
                {day}
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Typography>{date}</Typography>
                <Typography>{hour}</Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }}
                >
                  {Temperature}
                </Typography>
                <Typography>
                  {t("weather.high")}: {high} {t("weather.low")}: {low}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <img
              // src={img}
              alt={Status || "weather"}
              style={{ width: 96, height: 96, objectFit: "contain" }}
            />
            <Box>
              <Typography sx={{ textAlign: "end" }}>{Status}</Typography>
              <Typography sx={{ textAlign: "end" }}>
                {t("weather.feelsLike")} {feels}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            flex: 1.2,
            minWidth: 0,
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.background.darkPaper
                : theme.palette.background.lightPaper,
            borderRadius: 2,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 1,
          })}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 } }}
          >
            {t("weather.avgMonthly")}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <svg
              width="100%"
              height={h}
              viewBox={`0 0 ${w} ${h}`}
              preserveAspectRatio="none"
            >
              {[0.25, 0.5, 0.75].map((p) => (
                <line
                  key={p}
                  x1={0}
                  x2={w}
                  y1={p * h}
                  y2={p * h}
                  stroke="currentColor"
                  strokeDasharray="4 6"
                  // opacity="0.25"
                />
              ))}
              {points && (
                <polyline
                  points={points}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.9"
                />
              )}
              {months.map((m, i) => {
                const cx = pad + i * step;
                const cy = pad + normY(m.avgTemp) * (h - 2 * pad);
                return (
                  <circle
                    key={m.month || i}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="currentColor"
                  />
                );
              })}
            </svg>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}
            >
              <Typography variant="caption">
                {months[0]?.label || t("months.jan")}
              </Typography>
              <Typography variant="caption">
                {months[11]?.label || t("months.dec")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
