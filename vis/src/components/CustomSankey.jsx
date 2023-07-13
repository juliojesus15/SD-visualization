import { useEffect, useContext, useRef, useState } from "react";

import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";

import { StudentContext } from "../context/StudentContext";

import useColorScale from "../hooks/useColorScale";

import { getPointCloudData } from "../services/pcloudService";

const selectNodeDefault = { period: "", semester: "" }

export const CustomSankey = () => {
  const { 
    nodes, links, semesters, // Sankey
    setLinkStudent, 
    semesterFrom, 
    setPoints, setLabels, setStudentToPCloud, setIsLoadingPCloud // PCloud
  } = useContext(StudentContext);  
  
  const [ selectedNode, setSelectedNode ] = useState(selectNodeDefault);
  const colorScale = useColorScale();

  const sankeyDiagramRef = useRef(null);
  const contextMenuRef = useRef(null);

  useEffect( () => {
    try {        
      if (nodes && links && semesters ) {
        drawChart(nodes, links, semesters);
      }
    }
    catch (e) {
      console.error("Error in CustomSankey", e)
    } 
  }, [ links, nodes, semesters, selectedNode ])


  const getPCloudPoints = () => {
    const { period, semester } = selectedNode;
    const enrollment = semesterFrom;    

    console.log("getPCloudPoints -- Period: ", period, " semester: ", semester, " enrollment: ", enrollment )
   
    
    if (enrollment.length>0 && period.length>0 && semester.length>0) {
      console.log("EJECUTAR QUERY")
      setIsLoadingPCloud(true); 
      getPointCloudData(period, semester, enrollment)
        .then((response) => {          
          setPoints(response.data.points);
          setLabels(response.data.class);
          setStudentToPCloud(response.data.students);
          setIsLoadingPCloud(false); 
        })
        .catch((error) => {
          console.error("Getting data ", error);          
          setIsLoadingPCloud(false); 
        })
        .finally(() => {
          setIsLoadingPCloud(false); // Ocultar estado de carga
        });              
    }           
    
  }

  const drawChart = (nodes, links, semesters) => {
    const margin = { left: 15, bottom: 35, x: 5, y: 25 };
    
    const clientWidth = sankeyDiagramRef.current.clientWidth * 0.98
    const width = semesters.length < 11 ? clientWidth : (clientWidth + (200 * (semesters.length - 11)))
    const pagginInner = 1 - ( 0.05 * semesters.length)
    const height = 250
    const NODEWIDTH = 25
    const NODEPADDING = 10
 
    // Asignando el espacio de representacion 
    const xScale = d3
      .scaleBand()
      .domain(d3.range(semesters.length))
      .range([ 0, width ])
      .paddingInner(pagginInner)
      .paddingOuter(0)
      .align(0.5)
      .round(true)
                  
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
    d3.select(contextMenuRef.current.children[0]).remove()

    
    // Menu contextual
    const contextMenu = d3.select(contextMenuRef.current)
      .append("g")
      .attr("class", "context_menu border border-gray-200 dark:border-gray-500 shadow shadow-black/30")
      .style("display", "none");

    // Opciones
    contextMenu.append("div")
      .text("Unir")
      .attr("class", "context_menu_child border-b border-gray-300 dark:border-gray-500")
      .on("click", () => {
        console.log("Unir opción seleccionada");
      });

    contextMenu.append("div")
      .text("Separar")
      .attr("class", "context_menu_child border-b border-gray-300 dark:border-gray-500")
      .on("click", () => {
        console.log("Separar opción seleccionada");
      });
    
    contextMenu.append("div")
      .text("Proyectar")
      .attr("class", "context_menu_child")
      .on("click", getPCloudPoints );

    const svg = d3.select(sankeyDiagramRef.current)
      .append("svg")
      .attr("width",  width )
      .attr("height", height)
      //.attr("class", "border-test")
      .on("contextmenu", (event) => {        
        event.preventDefault()        
        const x = event.clientX - 10;
        const y = event.clientY - 65;
                
        contextMenu
          .style("left", `${x}px`)
          .style("top", `${y}px`)
          .style("display", "block");                    
      })    
      .append("g")
      .attr("transform", "translate(" + margin.left  + "," + margin.y + ")")

      d3.select("body").on("click", () => {
        contextMenu.style("display", "none");
      });
      

    const sankeyLayout =  d3Sankey.sankey()
      .nodeId( d => d.nodeId)
      .nodeWidth(NODEWIDTH)
      .nodePadding(NODEPADDING)
      .nodeAlign(d3Sankey.sankeyLeft)      
      .size([ width - 20, height - margin.bottom ])
      .nodeSort( (a, b) => { return d3.ascending(a.vertical_order, b.vertical_order) })
      
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
      .attr("class", "stroke-gray-400/50 dark:stroke-gray-500 fill-gray-200 dark:fill-slate-800") // tailwind
      .attr("rx", 4) 
      .attr("ry", 4)
      
    groupSemesters
      .append("text")
      .text((d) => d)
      .attr("x", 5) 
      .attr("y", 11)
      .attr("class", "font-roboto font-medium text-[0.6rem] fill-gray-700 dark:fill-gray-300") // tailwind
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
      .attr("width", sankeyLayout.nodeWidth())
      .attr("class", "cursor-pointer fill-gray-600 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-300 shadow-box dark:shadow-box-none") // tailwind      
      .style("stroke-width", 2)      
      .on("click", (event, d)=>  {       

        if (event.altKey) {                              
          console.log("===> ", d);
          d3.select(event.target)          
            .classed("stroke-gray-300 dark:stroke-gray-300", false)
            .classed("stroke-lime-500 dark:stroke-lime-400", true)
            .style("stroke-width", 4)

          setSelectedNode({            
            period: d.nodeId.slice(-7),
            semester: d.nodeId.substring(0, d.nodeId.indexOf('-'))
          })

        } else {            
          d3.select(event.target)
            .classed("stroke-lime-500 dark:stroke-lime-400", false)
            .classed("stroke-gray-300 dark:stroke-gray-300", true)
            .style("stroke-width", 2)

          setSelectedNode(selectNodeDefault)
        }
      })
        
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
      //.attr("d", d3Sankey.sankeyLinkHorizontal() )
      .attr("d", customSankeyLinkHorizontal )
      .attr("stroke-width", (d) => d.width )
      .attr("fill", "none")      
      .attr("class", d => colorScale(d.status))
      .on("click", (clicked, data) => setLinkStudent(data.students) )  
  }  

  return (
    <div className="h-[calc(100%-3.5rem)] overflow-auto">
      <div ref={ contextMenuRef } className="relative"> </div>
      <div ref={ sankeyDiagramRef } className="relative h-full"> </div>
    </div>
  )
}