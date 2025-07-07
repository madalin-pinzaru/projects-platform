import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Menu() {
  const { t } = useTranslation();

  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: "flex-start" }}>
        <Button
          component={RouterLink}
          to="/projects"
          color="inherit"
          data-testid="menu-projects"
        >
          {t("menu.projects")}
        </Button>
        <Button
          component={RouterLink}
          to="/organizations"
          color="inherit"
          data-testid="menu-organizations"
        >
          {t("menu.organizations")}
        </Button>
        <Button
          component={RouterLink}
          to="/users"
          color="inherit"
          data-testid="menu-users"
        >
          {t("menu.users")}
        </Button>
        <Button
          component={RouterLink}
          to="/statistics"
          color="inherit"
          data-testid="menu-statistics"
        >
          {t("menu.statistics")}
        </Button>
        <Button
          component={RouterLink}
          to="/exercise"
          color="inherit"
          data-testid="menu-exercise"
        >
          {t("menu.exercise")}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
