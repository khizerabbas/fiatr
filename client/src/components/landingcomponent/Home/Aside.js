import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";
import { FaHome } from "react-icons/fa";
import { IoOptionsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { ImBlogger } from "react-icons/im";
import { GrServices } from "react-icons/gr";
import { RiContactsLine } from "react-icons/ri";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { FcGenericSortingDesc } from "react-icons/fc";
import logo from "../img/logo.png";
import MapHexa from "../../map/Map";
import { useDispatch } from "react-redux";
import {
  CONFIG_CHANGE,
  FACING_CHANGE,
  PARAMETER_CHANGE,
} from "../../../action/type";
import { RoomRent } from "../../map/parameter/RoomRent";
import { Deposit } from "../../map/parameter/Deposit";

const Aside = ({
  image,
  collapsed,
  rtl,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const [state, setState] = useState({
    parameter: "rent",
  });

  const dispatch = useDispatch();
  const parametersChange = (value) => {
    dispatch({ type: PARAMETER_CHANGE, data: value });
    setState({
      ...state,
      parameter: value,
    });
  };
  const filterFacing = (facing) => {
    dispatch({ type: FACING_CHANGE, data: facing });
  };
  const filterConfig = (config) => {
    dispatch({ type: CONFIG_CHANGE, data: config });
  };

  return (
    <ProSidebar
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      // breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <div className="text-center">
            {collapsed ? (
              <svg
                onClick={handleCollapsedChange}
                viewBox="0 0 100 80"
                width="40"
                height="25"
              >
                <rect width="100" height="15" fill="#fff"></rect>
                <rect y="30" width="100" height="15" fill="#fff"></rect>
                <rect y="60" width="100" height="15" fill="#fff"></rect>
              </svg>
            ) : (
              <div>
                <svg
                  onClick={handleCollapsedChange}
                  data-name="Layer 1"
                  viewBox="0 0 64 64"
                  width="40"
                  height="25"
                >
                  <line
                    x1="9.37"
                    x2="54.63"
                    y1="9.37"
                    y2="54.63"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    stroke-width="12"
                  />
                  <line
                    x1="9.37"
                    x2="54.63"
                    y1="54.63"
                    y2="9.37"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    stroke-width="12"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <SubMenu title="Property" icon={<FcDepartment className="fs-4" />}>
            <MenuItem>Flat</MenuItem>
            <MenuItem>Plot</MenuItem>
          </SubMenu>

          <SubMenu
            title="Sort By"
            icon={<FcGenericSortingDesc className="fs-4" />}
          >
            <MenuItem
              onClick={(e) => {
                parametersChange("rent");
              }}
            >
              Rent
            </MenuItem>
            <MenuItem
              onClick={() => {
                parametersChange("deposit");
              }}
            >
              deposit
            </MenuItem>
          </SubMenu>
          <SubMenu title="Filter" icon={<IoOptionsOutline className="fs-4" />}>
            <SubMenu title="Facing">
              <MenuItem
                onClick={(e) => {
                  filterFacing("South");
                }}
              >
                South
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  filterFacing("North");
                }}
              >
                North
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  filterFacing("East");
                }}
              >
                East
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  filterFacing("West");
                }}
              >
                West
              </MenuItem>
            </SubMenu>
            <SubMenu title="Room Config">
              <MenuItem
                onClick={(e) => {
                  filterConfig("1BHK");
                }}
              >
                1BHK
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  filterConfig("2BHK");
                }}
              >
                2BHK
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  filterConfig("2BHK+");
                }}
              >
                2BHK+
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <MenuItem>
            {state.parameter === "rent" ? <RoomRent /> : <Deposit />}
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Aside;

// intl.formatMessage
