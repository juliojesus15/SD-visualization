import { useEffect, useContext, useRef } from "react";
import * as d3 from "d3"
import * as d3Sankey from "d3-sankey";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


import { StudentContext } from "../context/StudentContext";

export const CustomSankey = () => {
  const { nodes, links, semesters, errorData } = useContext(StudentContext);

  const sankeyDiagramRef = useRef(null);

  useEffect( () => {
    if (nodes && links && semesters ) {
      try {
        drawChart(nodes, links, semesters)

      }
      catch (e) {
        console.error("ERORR =>", e)
      } 
    }
  }, [ nodes, links, semesters])


  const drawChart = (nodes, links, semesters) => {


    const margin = { top: 0, right: 100, bottom: 0, left: 0 }

    const GAP = 180
    var width = 1024
    var height = 245
    const NODEWIDTH = 20
    const NODEPADDING = 10

    d3.select(sankeyDiagramRef.current.children[0]).remove()


    let svg = d3.select(sankeyDiagramRef.current)
    .append("svg")
    .attr("width",  width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + 10 + "," + margin.top + ")")
    .attr("class", "border-test");


    const sankeyLayout =  d3Sankey.sankey()
    .nodeId( d => d.nodeId)
    .nodeWidth(NODEWIDTH)
    .nodePadding(NODEPADDING)
    .size([width, height])
    .nodeAlign(d3Sankey.sankeyLeft)
      .size([width, height])
      .nodeSort(function(a, b) { return d3.ascending(a.order, b.order);  })
    
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
    

// setting color of links (provisional)
 const setLinkColor = (d) => {
  const from = d.source.nodeId.slice(0, -8);
  const to = d.target.nodeId.slice(0, -8);
  console.log(d)
  console.log("From ", from)
  console.log("To ", to)
  if ( d.color == "links__link--student") return "links__link--student"    

  if(!d.joined){

  

    if (from === "1N"){
      if( to === "1") {
        return "links__link--repeat"
      }
      if( to === "2") {
        return "links__link--success"
      }
      if( to === "0") {
        return "links__link--dropout"
      }
    }
    else if( from == to) {
      return "links__link--repeat"
    }
    else if( to!="0" && from != to) {
      return "links__link--success"
    }
    else if(to==="0") {
      return "links__link--dropout"
    }
  }
  else {      
      return "links__link--success"
  }
}
  


  const t = "links__link--success"

  let groupLinks = svg
    .append("g")
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr('d', d3Sankey.sankeyLinkHorizontal())  
    .attr("stroke-width", (d) => d.width )      
    .attr("fill", "none")
    .attr("stroke", d => d.color)
    //.attr("class", "stroke-red-500/50	 cursor-pointer dark:stroke-yellow-500/50") 
    .attr("class", setLinkColor)     
    .attr("stroke-opacity", 0.99);
    
      
  }

  return (
    <div className="text-gray-700 dark:text-gray-100 border-yellow-500 border">
      <div className="flex gap-10 hidden">
        { !errorData ? semesters : errorData }      
        <hr/>
        { !errorData ? nodes.length : errorData }      
        <hr/>
        { !errorData ? links.length : errorData }
      </div>
      <div ref={ sankeyDiagramRef } className="relative"> </div>
    </div>
  )
}