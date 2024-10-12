import { csv, select } from "d3";
import { scatterPlot } from "./reusable-charts";

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

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

  // https://d3js.org/d3-scale
  // const x = scaleLinear().domain([min(data, xValue), max(data, yValue)]);

  const plot = scatterPlot()
  .width(innerWidth)
  .height(innerHeight)
  .data(data)
  .xValue((d) => d.petal_length)
  .yValue((d) => d.sepal_length)
  .margin({
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
  })
  .radius(5)

  svg.call(plot);

  const columns = [
    'petal_width',
    'sepal_width',
    'petal_length',
    'sepal_length',
  ];

  let i = 0;
  setInterval(() => { // instead of setInterval you should use requestAnimationFrame
    plot.xValue((d) => d[columns[i % columns.length]]); // i%columns.length will give value between array
    svg.call(plot);
    i++;
  }, 3000);
};
main();

/*
domain
range
*/
