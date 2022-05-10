import * as React from "react";
import { Box, styled } from "@mui/material";
import { DashboardNavbar } from "./Dashboard-Navbar";
import { DashboardSidebar } from "./Dashboard-Sidebar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingTop: 280,
  },
}));

const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setIsSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

export default DashboardLayout;
