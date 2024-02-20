import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InboxIcon from "@mui/icons-material/Inbox";
import CreateIcon from "@mui/icons-material/Create";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import TaskIcon from "@mui/icons-material/Task";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CreateIcon />
      </ListItemIcon>
      <ListItemText primary="Create Organization" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CollectionsIcon />
      </ListItemIcon>
      <ListItemText primary="Create Collection" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonAddAltIcon />
      </ListItemIcon>
      <ListItemText primary="Add User" />
    </ListItemButton>
    <ListItemButton href="/user/verifyConcepts">
      <ListItemIcon>
        <TaskIcon />
      </ListItemIcon>
      <ListItemText primary="Verify Concepts"  />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Generate Report" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Full Year Report" />
    </ListItemButton>
  </React.Fragment>
);
