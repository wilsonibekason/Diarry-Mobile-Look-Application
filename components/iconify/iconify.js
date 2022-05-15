import PropTypes from "prop-types";
// icons
import { Icon } from "@iconify/react";
// mui
import { Box } from "@mui/material";

Iconify.proptypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
};

export default function Iconify() {
  return <Box component={Icon} />;
}
