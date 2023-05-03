import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import * as d3Sankey from "d3-sankey";

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
  },
  {
    "node": 5,
    "name": "node5"
  },
  {
    "node": 6,
    "name": "node6"
  },
  {
    "node": 7,
    "name": "node7"
  },
  {
    "node": 8,
    "name": "node8"
  },
  {
    "node": 9,
    "name": "node9"
  },
  {
    "node": 10,
    "name": "node10"
  },
  {
    "node": 11,
    "name": "node11"
  },
  {
    "node": 12,
    "name": "node12"
  },
  {
    "node": 13,
    "name": "node13"
  },
  {
    "node": 14,
    "name": "node14"
  },
  {
    "node": 15,
    "name": "node15"
  },

]

const links =  [
  {
    "source": 0,
    "target": 1,
    "value": 7
  },
  {
    "source": 0,
    "target": 2,
    "value": 3
  },
  {
    "source": 0,
    "target": 3,
    "value": 3
  },
  {
    "source": 2,
    "target": 4,
    "value": 3
  },
  {
    "source": 2,
    "target": 5,
    "value": 3
  },
  {
    "source": 3,
    "target": 5,
    "value": 3
  },
  {
    "source": 1,
    "target": 6,
    "value": 3
  },
  {
    "source": 1,
    "target": 5,
    "value": 3
  },
  {
    "source": 6,
    "target": 7,
    "value": 3
  },
  {
    "source": 7,
    "target": 8,
    "value": 3
  },
  {
    "source": 8,
    "target": 9,
    "value": 3
  },
  {
    "source": 9,
    "target": 10,
    "value": 3
  },
  {
    "source": 6,
    "target": 11,
    "value": 3
  },
  {
    "source": 3,
    "target": 11,
    "value": 3
  },

  {
    "source": 7,
    "target": 12,
    "value": 3
  },
  {
    "source": 11,
    "target": 12,
    "value": 3
  },

  {
    "source": 8,
    "target": 13,
    "value": 3
  },
  {
    "source": 12,
    "target": 13,
    "value": 3
  },

  {
    "source": 9,
    "target": 14,
    "value": 3
  },
  {
    "source": 13,
    "target": 14,
    "value": 3
  },

  {
    "source": 10,
    "target": 15,
    "value": 3
  },
  {
    "source": 14,
    "target": 15,
    "value": 3
  },
]

export const SankeyDiagram = () => {
  const sankeyRef = useRef(null)
  
  const margin = { top: 10, right: 10, bottom: 10, left: 10 }
  
  useEffect(() => {
    drawChart()
  }, [])

  const drawChart = () => {

    const dragmove = (d) => {
      d3.select(this)
        .attr("transform",
              "translate("
                 + d.x + ","
                 + (d.y = Math.max(
                    0, Math.min(height - d.dy, d3.event.y))
                   ) + ")");
      sankey.relayout();
      link.attr("d", sankey.link() );
    }
    // set the dimensions and margins of the graph

    var width = 1024 - margin.left - margin.right
    var height = 300 - margin.top - margin.bottom

    // format variables
    var formatNumber = d3.format(",.0f") // zero decimal places
    var format = function (d) { return formatNumber(d); }
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // append the svg object to the section of the page
    var svg = d3.select(sankeyRef.current)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var sample = d3Sankey.sankey()
      .nodeWidth(20)
      .nodePadding(30)
      .size([width, height]);

    var path = sample.links();

    var graph = { "nodes": nodes, "links": links };
    sample(graph);

    const strokeWidth = (d) => {
      //console.log(d)
      return d.width;
    }
    // add in the links
    var link = svg.append("g")
      .selectAll(".link")
      .data(graph.links)
      .enter()
      .append("path")
        .attr("class", "link")
        .attr("d", d3Sankey.sankeyLinkHorizontal())
        .attr("stroke-width", strokeWidth);

    // add in the nodes
    var node = svg.append("g")
      .selectAll(".node")
      .data(graph.nodes)
      .enter()
      .append("g")
        .attr("class", "node")
        .call(d3.drag()
        .subject(function(d) { return d; })
        .on("start", function() { parentNode.appendChild(); })
        .on("drag", function(d) {
          d3.select()
            .attr("transform",
                  "translate("
                     + d.x1 + ","
                     + (d.y1 = Math.max(
                        0, Math.min(height - d.y0, d3.y1))
                       ) + ")");
          d3Sankey.r.relayout();
          }
        ));

    const test = (d) => {
      console.log(d);
      return d.x0
    }
    // add the rectangles for the nodes
    node.append("rect")
      .attr("x", test)
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
        return d.name + "\n" + "sss" + format(d.value);
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