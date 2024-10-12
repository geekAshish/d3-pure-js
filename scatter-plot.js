import {
  axisBottom,
  axisLeft,
  csv,
  extent,
  max,
  min,
  scaleLinear,
  select,
} from "d3";

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const xValue = (d) => d.petal_length;
const yValue = (d) => d.sepal_length;

const svg = select("div")
  .append("svg")
  .attr("width", innerWidth)
  .attr("height", innerHeight);

// data : https://github.com/curran/data
const main = async () => {
  const data = await csv(
    "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv",
    parseRow
  );

  // https://observablehq.com/@d3/margin-convention
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
  };

  // https://d3js.org/d3-scale
  // const x = scaleLinear().domain([min(data, xValue), max(data, yValue)]);
  const x = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, innerWidth - margin.right]);

  const y = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight - margin.bottom, margin.top]);

  const marks = data.map((d) => ({
    x: x(xValue(d)),
    y: y(yValue(d)),
  }));

  svg
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 3);

  const yAxis = axisLeft(y);
  const yAxisG = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`);

  yAxis(yAxisG);

  svg
    .append("g")
    .attr("transform", `translate(0, ${innerHeight - margin.bottom})`)
    .call(axisBottom(x));
};
main();

/*
domain
range
*/
