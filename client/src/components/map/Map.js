import React, { useState } from "react";
import "./style.css";
import "leaflet/dist/leaflet.css";
import MapView from "./MapView";
import { RoomRent } from "./parameter/RoomRent";
import { Deposit } from "./parameter/Deposit";
import Aside from "../landingcomponent/Home/Aside";
import {connect, useDispatch} from "react-redux";
import { Loader } from "../Loader/Loader";


import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";
import {FcDepartment, FcGenericSortingDesc} from "react-icons/fc";
import {IoOptionsOutline} from "react-icons/io5";
import {CONFIG_CHANGE, FACING_CHANGE, PARAMETER_CHANGE} from "../../action/type";


const MapHexa = ({ current_parameter, loading }) => {
  const [state, setState] = useState({
    parameter: "Rent",
  });
  // const parametersChange = (e) => {
  //   setState({
  //     ...state,
  //     parameter: e.target.value,
  //   });
  // };

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

  console.log(current_parameter);

  return (
    <div>
      <div className="row ">
        <div className="col-12 col-lg-12 col-md-8">
          <MapView parameter={state.parameter} />
          <div className="container filterContainer">
            <div className="panel-group" id="accordionMenu" role="tablist" aria-multiselectable="true">
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingOne">
                  <h4 className="panel-title">
                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionMenu" href="#collapseOne" style={{display: 'flex'}}
                       aria-expanded="false" aria-controls="collapseOne" onClick={firstAccordion}>
                      <SubMenu title="Property" icon={<FcDepartment className="fs-4" />}></SubMenu>
                      <span id="first-right-arrow" className="right-arrow">&#8594;</span>
                      <span id="first-down-arrow" className="right-arrow d-none">&#8595;</span>
                    </a>
                  </h4>
                </div>
                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel"
                     aria-labelledby="headingOne">
                  <div className="panel-body">
                    <ul className="nav accordion-panel">
                      <li><p>Flat</p></li>
                      <li><p>Plot</p></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingTwo">
                  <h4 className="panel-title">
                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionMenu" href="#collapseTwo" style={{display: 'flex'}}
                       aria-expanded="false" aria-controls="collapseTwo" onClick={secondAccordion}>
                      <SubMenu title="Sort By" icon={<FcGenericSortingDesc className="fs-4" />}></SubMenu>
                      <span id="second-right-arrow" className="right-arrow">&#8594;</span>
                      <span id="second-down-arrow" className="right-arrow d-none">&#8595;</span>
                    </a>
                  </h4>
                </div>
                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                  <div className="panel-body">
                    <ul className="nav accordion-panel">
                      <li  onClick={(e) => {
                        parametersChange("rent");
                      }}><p>Rent</p></li>
                      <li  onClick={() => {
                        parametersChange("deposit");
                      }}><p>Deposit</p></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingThree">
                  <h4 className="panel-title">
                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionMenu" href="#collapseThree" style={{display: 'flex'}}
                       aria-expanded="false" aria-controls="collapseThree" onClick={thirdAccordion}>
                      <SubMenu title="Filter" icon={<IoOptionsOutline className="fs-4" />}></SubMenu>
                      <span id="third-right-arrow" className="right-arrow">&#8594;</span>
                      <span id="third-down-arrow" className="right-arrow d-none">&#8595;</span>
                    </a>
                  </h4>
                </div>
                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel"
                     aria-labelledby="headingThree">
                  <div className="panel-body">
                    <ul className="nav accordion-panel">
                      <li>
                        <p className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionMenu" href="#collapseThreeOne" style={{display: 'flex'}}
                           aria-expanded="false" aria-controls="collapseThreeOne" onClick={thirdOneAccordion}>
                          Facing
                          <span id="third-one-right-arrow" className="right-arrow">&#8594;</span>
                          <span id="third-one-down-arrow" className="right-arrow d-none">&#8595;</span>
                        </p>
                      </li>
                      <div id="collapseThreeOne" className="panel-collapse collapse" role="tabpanel"
                           aria-labelledby="headingThreeOne">
                        <div className="panel-body">
                          <ul className="nav accordion-panel-sub">
                            <li  onClick={(e) => {
                              filterFacing("South");
                            }}><p>South</p></li>
                            <li   onClick={(e) => {
                              filterFacing("North");
                            }}><p>North</p></li>
                            <li   onClick={(e) => {
                              filterFacing("East");
                            }}><p>East</p></li>
                            <li   onClick={(e) => {
                              filterFacing("West");
                            }}><p>West</p></li>
                          </ul>
                        </div>
                      </div>
                      <li>
                        <p className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionMenu" href="#collapseThreeTwo" style={{display: 'flex'}}
                           aria-expanded="false" aria-controls="collapseThreeTwo" onClick={thirdTwoAccordion}>
                          Room Config
                          <span id="third-two-right-arrow" className="right-arrow">&#8594;</span>
                          <span id="third-two-down-arrow" className="right-arrow d-none">&#8595;</span>
                        </p>
                      </li>
                      <div id="collapseThreeTwo" className="panel-collapse collapse" role="tabpanel"
                           aria-labelledby="headingThreeTwo">
                        <div className="panel-body">
                          <ul className="nav accordion-panel-sub">
                            <li    onClick={(e) => {
                              filterConfig("1BHK");
                            }}><p>1BHK</p></li>
                            <li   onClick={(e) => {
                              filterConfig("2BHK");
                            }}><p>2BHK</p></li>
                            <li   onClick={(e) => {
                              filterConfig("2BHK+");
                            }}><p>2BHK+</p></li>
                          </ul>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="rangesContainer">
              <MenuItem>
                {state.parameter === "rent" ? <RoomRent /> : <Deposit />}
              </MenuItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.Map.loading,
  current_parameter: state.Map.current_parameter,
});

let firstAccordionStatus = true;
let secondAccordionStatus = true;
let thirdAccordionStatus = true;
let thirdOneAccordionStatus = true;
let thirdTwoAccordionStatus = true;
function firstAccordion(){
  if(firstAccordionStatus){
    firstAccordionStatus = false;
    document.getElementById('first-right-arrow').classList.add('d-none');
    document.getElementById('collapseOne').style.display = 'block';
    document.getElementById('first-down-arrow').classList.remove('d-none');
  }else{
    firstAccordionStatus = true;
    document.getElementById('first-right-arrow').classList.remove('d-none');
    document.getElementById('collapseOne').style.display = 'none';
    document.getElementById('first-down-arrow').classList.add('d-none');
  }
}

function secondAccordion(){
  if(secondAccordionStatus){
    secondAccordionStatus = false;
    document.getElementById('second-right-arrow').classList.add('d-none');
    document.getElementById('collapseTwo').style.display = 'block';
    document.getElementById('second-down-arrow').classList.remove('d-none');
  }else{
    secondAccordionStatus = true;
    document.getElementById('second-right-arrow').classList.remove('d-none');
    document.getElementById('collapseTwo').style.display = 'none';
    document.getElementById('second-down-arrow').classList.add('d-none');
  }
}
function thirdAccordion(){
  if(thirdAccordionStatus){
    thirdAccordionStatus = false;
    document.getElementById('third-right-arrow').classList.add('d-none');
    document.getElementById('collapseThree').style.display = 'block';
    document.getElementById('third-down-arrow').classList.remove('d-none');
  }else{
    thirdAccordionStatus = true;
    document.getElementById('third-right-arrow').classList.remove('d-none');
    document.getElementById('collapseThree').style.display = 'none';
    document.getElementById('third-down-arrow').classList.add('d-none');
  }
}
function thirdOneAccordion(){
  if(thirdOneAccordionStatus){
    thirdOneAccordionStatus = false;
    document.getElementById('third-one-right-arrow').classList.add('d-none');
    document.getElementById('collapseThreeOne').style.display = 'block';
    document.getElementById('third-one-down-arrow').classList.remove('d-none');
  }else{
    thirdOneAccordionStatus = true;
    document.getElementById('third-one-right-arrow').classList.remove('d-none');
    document.getElementById('collapseThreeOne').style.display = 'none';
    document.getElementById('third-one-down-arrow').classList.add('d-none');
  }
}
function thirdTwoAccordion(){
  if(thirdTwoAccordionStatus){
    thirdTwoAccordionStatus = false;
    document.getElementById('third-two-right-arrow').classList.add('d-none');
    document.getElementById('collapseThreeTwo').style.display = 'block';
    document.getElementById('third-two-down-arrow').classList.remove('d-none');
  }else{
    thirdTwoAccordionStatus = true;
    document.getElementById('third-two-right-arrow').classList.remove('d-none');
    document.getElementById('collapseThreeTwo').style.display = 'none';
    document.getElementById('third-two-down-arrow').classList.add('d-none');
  }
}




export default connect(mapStateToProps, null)(MapHexa);
