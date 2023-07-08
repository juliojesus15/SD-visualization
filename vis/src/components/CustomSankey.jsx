import { useEffect, useContext, useRef } from "react";
import * as d3 from "d3"
import * as d3Sankey from "d3-sankey";

import useColorScale from "../hooks/useColorScale";

import { StudentContext } from "../context/StudentContext";

export const CustomSankey = () => {
  const { nodes, links, semesters, setLinkStudent, setPCloudNode } = useContext(StudentContext);
  const colorScale = useColorScale()

  const sankeyDiagramRef = useRef(null);

  useEffect( () => {
    try {        
      if (nodes && links && semesters ) {
        drawChart(nodes, links, semesters)
      }
    }
    catch (e) {
      console.error("Error in CustomSankey", e)
    } 
  }, [ links, nodes, semesters ])


 

  const drawChart = (nodes, links, semesters) => {
    const margin = { top: 20, right: 20, bottom: 40, left: 0 };

    const GAP = 180
    //var width = sankeyDiagramRef.current.clientWidth   
    const width = semesters.length <= 8  ? 1200 : sankeyDiagramRef.current.clientWidth   
    const height = sankeyDiagramRef.current.clientHeight
    const NODEWIDTH = 25
    const NODEPADDING = 10

    d3.select(sankeyDiagramRef.current.children[0]).remove()

    let svg = d3.select(sankeyDiagramRef.current)
      .append("svg")
      .attr("width",  width - 20)
      .attr("height", height - 10)
      //.attr("class", "border-test")
      .append("g")
      .attr("transform", "translate(" + margin.left  + "," + margin.top + ")")

    const sankeyLayout =  d3Sankey.sankey()
      .nodeId( d => d.nodeId)
      .nodeWidth(NODEWIDTH)
      .nodePadding(NODEPADDING)
      .nodeAlign(d3Sankey.sankeyLeft)
      .size([width - margin.right, height - margin.bottom])
      .nodeSort(function(a, b) { return d3.ascending(a.vertical_order, b.vertical_order) })
      
    sankeyLayout({ "nodes": nodes, "links": links });

    const semesterSpacing = (_, i) => {
      if ( i == 0 ) return 0
      else if ( i == (semesters.length-1) ) return (width - 70) 
      return (i * (width/(semesters.length - 1)) ) - ( i * 12) 
    }

    // Agregando las etiquetas de tiempo (semestre) en el top del SVG
    const groupSemesters = svg
      .selectAll("text")
      .data(semesters)
      .enter()
      .append("text")
      .text( d => d )
      .attr( "x", semesterSpacing )
      .attr( "y", -5  )
      .attr( "class", "font-roboto font-medium text-xs fill-gray-700 dark:fill-gray-100" ) // Tailwind
      .attr("text-anchor", "start") 
      
    // Nodos
    const groupNodes = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")            

    // Definiendo propiedades del nodo
    groupNodes
      .append("rect")
      .attr("x", (d)=> d.x0) 
      .attr("y", (d) => d.y0 )                    
      .attr("height", (d) => (d.y1 - d.y0) )
      .attr("width", NODEWIDTH )
      .attr("class", "cursor-pointer fill-gray-600 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-300 shadow-box dark:shadow-box-none") // tailwind      
      .style("stroke-width", 2)
      .on("click", d => setPCloudNode(d.nodeId))
      

    // Por terminar, hover sobre el rectangulo
    groupNodes
      .append("title")
      .text( (d) => d.nodeId )      

    // Agregando nombre de cada nodo, el nombre representa el semestre
    groupNodes
      .append("text")
      .attr("x", (d) => (d.x1 + d.x0) / 2 )
      .attr("y", (d) => (d.y1 + d.y0) / 2 )
      .attr("dy", "0.35em")
      .attr("class", "text-xs font-medium fill-white") // tailwind
      .attr("text-anchor", "middle")       
      .text( (d) => d.name )
      
    // Links
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

  return (
    <div className="text-gray-700 h-[calc(100%-2.5rem)] dark:text-gray-100 ">      
      <div ref={ sankeyDiagramRef } className="relative h-full"> </div>
    </div>
  )
}