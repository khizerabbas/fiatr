import DonutChart from "react-donut-chart";

const reactDonutChartdata = [
  {
    label: "FLATS",
    value: 25,
    color: "#00E396",
  },
  {
    label: "LANDS",
    value: 65,
    color: "#FEB019",
  },
  {
    label: "others",
    value: 100,
    color: "#FF4560",
  },
];
const reactDonutChartBackgroundColor = ["#00E396", "#FEB019", "#FF4560"];
const reactDonutChartInnerRadius = 0.5;
const reactDonutChartSelectedOffset = 0.04;
const reactDonutChartHandleClick = (item, toggled) => {
  if (toggled) {
    console.log(item);
  }
};
let reactDonutChartStrokeColor = "#FFFFFF";
const reactDonutChartOnMouseEnter = (item) => {
  let color = reactDonutChartdata.find((q) => q.label === item.label).color;
  reactDonutChartStrokeColor = color;
};

export default function ChartCircle() {
  return (
    <div className="App">
      <DonutChart
        width={320}
        height={300}
        onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
        strokeColor={reactDonutChartStrokeColor}
        data={reactDonutChartdata}
        colors={reactDonutChartBackgroundColor}
        innerRadius={reactDonutChartInnerRadius}
        selectedOffset={reactDonutChartSelectedOffset}
        onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
      />
    </div>
  );
}
