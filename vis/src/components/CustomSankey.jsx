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
    const margin = { x: 5, y: 25 };

    //const width = sankeyDiagramRef.current.clientWidth   
    //const height = sankeyDiagramRef.current.clientHeight 
    const width = sankeyDiagramRef.current.clientWidth - 25
    const height = 250
    const NODEWIDTH = 25
    const NODEPADDING = 10

    const xScale = d3.scaleBand()
      .domain(d3.range(semesters.length))
      .range([0, width])
      .padding(0.1); // Ajusta el valor de padding según lo que se necesite

    // Recalculando las coordenadas de los links, despues de aplicar xScale en los nodos
    const customSankeyLinkHorizontal = d3Sankey.sankeyLinkHorizontal()
      .source((d) => {                   
        d.source.x1 = xScale(d.source.depth) + NODEWIDTH
        return [d.source.x1, d.y0];
      })
      .target((d) => {
        d.target.x0 = xScale(d.target.depth)
        return [d.target.x0, d.y1];
      });

    d3.select(sankeyDiagramRef.current.children[0]).remove()

    let svg = d3.select(sankeyDiagramRef.current)
      .append("svg")
      .attr("width",  width )
      .attr("height", height)
      //.attr("class", "border-test")
      .append("g")
      .attr("transform", "translate(" + margin.x  + "," + margin.y + ")")

    const sankeyLayout =  d3Sankey.sankey()
      .nodeId( d => d.nodeId)
      .nodeWidth(NODEWIDTH)
      .nodePadding(NODEPADDING)
      .nodeAlign(d3Sankey.sankeyLeft)      
      .size([ width - 20, height - 30 ])
      .nodeSort(function(a, b) { return d3.ascending(a.vertical_order, b.vertical_order) })
      
    sankeyLayout({ "nodes": nodes, "links": links });
    
    // Periodos academicos
    const groupSemesters = svg
      .append("g")
      .selectAll("g")
      .data(semesters)
      .enter()
      .append("g")
      .attr("transform", (d,i) => `translate(${xScale(i)}, -20)`)

    groupSemesters
      .append("rect")
      .attr("width", 45) 
      .attr("height", 14)
      .attr("class", "stroke-gray-400/50 dark:stroke-gray-500 fill-gray-200 dark:fill-slate-800")
      .attr("rx", 4) 
      .attr("ry", 4)
      
    groupSemesters
      .append("text")
      .text((d) => d)
      .attr("x", 5) 
      .attr("y", 11)
      .attr("class", "font-roboto font-medium text-[0.6rem] fill-gray-700 dark:fill-gray-300")
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
      .attr("x", d => xScale(d.depth) ) 
      .attr("y", (d) => d.y0 ) 
      .attr("height", (d) => (d.y1 - d.y0)) 
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
      .attr("x", (d) => xScale(d.depth) + (NODEWIDTH / 2) )
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
      //.attr('d', d3Sankey.sankeyLinkHorizontal() )
      .attr('d', customSankeyLinkHorizontal )
      .attr("stroke-width", (d) => d.width )
      .attr("fill", "none")      
      .attr("class", d => colorScale(d.status))
      .on("click", (clicked, data) => setLinkStudent(data.students) )  

  }

  return (
    <div className="h-[calc(100%-3.5rem)] overflow-auto">
      <div ref={ sankeyDiagramRef } className="relative h-full"> </div>
    </div>
  )
}