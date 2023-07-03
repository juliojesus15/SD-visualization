import { useEffect, useContext, useRef } from "react";
import * as d3 from "d3"
import * as d3Sankey from "d3-sankey";

import useColorScale from "../hooks/useColorScale";


import { StudentContext } from "../context/StudentContext";

export const CustomSankey = () => {
  const { nodes, links, semesters, setLinkStudent } = useContext(StudentContext);
  const colorScale = useColorScale()

  const sankeyDiagramRef = useRef(null);

  useEffect( () => {
    try {
    
      const drawChart = (nodes, links, semesters) => {
        const margin = { top: 10, right: 60, bottom: 25, left: 10 };
    
        const GAP = 180
        var width = sankeyDiagramRef.current.clientWidth
        var height = 245
        const NODEWIDTH = 20
        const NODEPADDING = 10
    
        d3.select(sankeyDiagramRef.current.children[0]).remove()
    
        let svg = d3.select(sankeyDiagramRef.current)
          .append("svg")
          .attr("width",  width - 10)
          .attr("height", height)
          //.attr("class", "border-test")
          .append("g")
          .attr("transform", "translate(" + margin.left  + "," + margin.top + ")")
    
        const sankeyLayout =  d3Sankey.sankey()
          .nodeId( d => d.nodeId)
          .nodeWidth(NODEWIDTH)
          .nodePadding(NODEPADDING)
          .nodeAlign(d3Sankey.sankeyLeft)
          .size([width - margin.right, height - margin.bottom])
          .nodeSort(function(a, b) { return d3.ascending(a.order, b.order) })
          
        
        sankeyLayout({ "nodes": nodes, "links": links });
    
        // Defining nodes
        let groupNodes = svg
          .append("g")
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("g")      
          .attr("class", "shadow")
    
        groupNodes
          .append("rect")
          .attr("x", (d)=> d.x0) 
          .attr("y", (d) => d.y0 )                    
          .attr("height", (d) => d.y1 - d.y0 )
          .attr("width",20)
          .style("fill", (d) => d.color )
          .style("stroke", "#FFFFFF")
          .style("stroke-width", 2)    
    
        // Adding node name when we put the mouse over the rectangle
        groupNodes
          .append("title")
          .text( (d) => d.nodeId )
    
        // Adding node name to side of rectangle
        groupNodes
          .append("text")
          .attr("x", (d) => (d.x0 + 25) )
          .attr("y", (d) => ((d.y1 + d.y0) / 2) )
          .attr("dy", "0.35em")
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .style("fill", "#374151")
          .text( (d) => d.name )
    
        const groupLinks = svg
          .append("g")
          .selectAll(".link")
          .data(links)
          .enter()
          .append("path")
          .attr('d', d3Sankey.sankeyLinkHorizontal() )
          .attr("stroke-width", (d) => d.width )
          .attr("fill", "none")
          .attr("class", d => colorScale(d.status) )   
          .on("click", d => setLinkStudent(d.students))
      
      }
      if (nodes && links && semesters ) {
        drawChart(nodes, links, semesters)
      }
    }
    catch (e) {
      console.error("ERORR =>", e)
    } 
  }, [ links, nodes, semesters, colorScale, setLinkStudent ])

  return (
    <div className="text-gray-700 dark:text-gray-100 borde border-dotted border-black">      
      <div ref={ sankeyDiagramRef } className="relative "> </div>
    </div>
  )
}