import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import * as d3Sankey from "d3-sankey";

import * as input from "./sankey.json";


// 20230429155857
// https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json
const nodes = [
  {
    "node": 0,
    "name": "node0"
  },
  {
    "node": 1,
    "name": "node1"
  },
  {
    "node": 2,
    "name": "node2"
  },
  {
    "node": 3,
    "name": "node3"
  },
  {
    "node": 4,
    "name": "node4"
  }
]

const links = [
  {
    "source": 0,
    "target": 3,
    "value": 4
  },
  {
    "source": 0,
    "target": 2,
    "value": 2
  },
  {
    "source": 1,
    "target": 2,
    "value": 2
  },
  {
    "source": 1,
    "target": 3,
    "value": 2
  },
  {
    "source": 0,
    "target": 4,
    "value": 2
  },
  {
    "source": 2,
    "target": 3,
    "value": 2
  },
  {
    "source": 2,
    "target": 4,
    "value": 2
  },
  {
    "source": 3,
    "target": 4,
    "value": 4
  }
]

export const SankeyDiagram = () => {

  const sankeyRef = useRef(null)


  

  useEffect(() => {
    drawSankey()

  }, [])

  const drawSankey = () => {
    // set the dimensions and margins of the graph
  var margin = { top: 10, right: 10, bottom: 10, left: 10 }
  var width = 900 - margin.left - margin.right
  var height = 300 - margin.top - margin.bottom

  // format variables
  var formatNumber = d3.format(",.0f") // zero decimal places
  var format = function (d) { return formatNumber(d); }
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // append the svg object to the body of the page
  var svg = d3.select(sankeyRef.current).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
    var sample = d3Sankey.sankey()
      .nodeWidth(36)
      .nodePadding(40)
      .size([width, height]);

    var path = sample.links();


    sample({ "nodes": nodes, "links": links });
    var graph = { "nodes": nodes, "links": links };



    // add in the links
    var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d3Sankey.sankeyLinkHorizontal())
      .attr("stroke-width", function (d) { return d.width; });

    // add the link titles
    link.append("title")
      .text(function (d) {
        return d.source.name + " → " +
          d.target.name + "\n" + format(d.value);
      });


    // add in the nodes
    var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node");


    // add the rectangles for the nodes
    node.append("rect")
      .attr("x", function (d) { return d.x0; })
      .attr("y", function (d) { return d.y0; })
      .attr("height", function (d) { return d.y1 - d.y0; })
      .attr("width", sample.nodeWidth())
      .style("fill", function (d) {
        return d.color = color(d.name.replace(/ .*/, ""));
      })
      .style("stroke", function (d) {
        return d3.rgb(d.color).darker(2);
      })
      .append("title")
      .text(function (d) {
        return d.name + "\n" + format(d.value);
      });

    // add in the title for the nodes
    node.append("text")
      .attr("x", function (d) { return d.x0 - 6; })
      .attr("y", function (d) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function (d) { return d.name; })
      .filter(function (d) { return d.x0 < width / 2; })
      .attr("x", function (d) { return d.x1 + 6; })
      .attr("text-anchor", "start");

  }


  return (
    <div ref={sankeyRef}></div>

  )
} 