import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import {
  ButtonGroup,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppAccount, useAppLanguage, useOnKeyPress } from "../hooks";
import { AppModalService } from "./AppModal";

const LogoutModal = ({ onClick }) => {
  useOnKeyPress("Enter", onClick);
  return <div style={{ textAlign: "center" }}>Logout?</div>;
};

const AppHeader = () => {
  const { Strings, setLanguage, language } = useAppLanguage();
  const { setAccount } = useAppAccount();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onHandleLogout = () => {
    handleCloseUserMenu();
    setAccount({});
    AppModalService.close();
  };
  const onLogout = () => {
    AppModalService.set({
      children: <LogoutModal onClick={onHandleLogout} />,
      onConfirm: onHandleLogout,
      wrapperStyle: { width: 220 },
    });
  };

  const pages = [
    { label: Strings.users, path: "/user-info" },
    // { label: Strings.history_test, path: "/history-test" },
    { label: Strings.pl_table, path: "/submission-history" },
  ];
  const settings = [
    {
      label: Strings.logout,
      onClick: onLogout,
    },
  ];

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              cursor: "pointer",
              display: { xs: "none", md: "flex" },
            }}
            onClick={() => navigate("")}
          >
            {Strings.app_name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem
                key={"home"}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("");
                }}
              >
                <Typography textAlign="center">{Strings.home}</Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem
                  key={page.path}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                key={"logout"}
                onClick={() => {
                  handleCloseNavMenu();
                  onLogout();
                }}
              >
                <Typography textAlign="center">{Strings.logout}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer", display: { xs: "flex", md: "none" } }}
            onClick={() => navigate("")}>
            {Strings.app_name}
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.path);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <ButtonGroup sx={{ mr: 2 }} variant="contained" size="small">
              <Button
                color={language === "EN" ? "secondary" : "disabled"}
                onClick={() => setLanguage("EN")}
              >
                {Strings.english}
              </Button>
              <Button
                color={language === "VI" ? "secondary" : "disabled"}
                onClick={() => setLanguage("VI")}
              >
                {Strings.vietnamese}
              </Button>
            </ButtonGroup>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: 1 }}
              anchorEl={anchorElUser}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { AppHeader };
