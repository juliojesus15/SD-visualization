import React, { useEffect, useRef, useContext, useState, } from "react";
import * as d3 from 'd3'
import * as d3Sankey from "d3-sankey";

import { FilterContext } from "../context/FilterContext"
import { times } from "../constant/filter";

import { getSankeyDiagram, getSankeyDiagramOnlyFreshmen } from "../services/sankeyService"

const COLORS = {
  blue: "#08008B",
  red: "#D60000",
  yellow: "#F2F200",
  green: "#007C00"
}

export const Sankey = () => {

  const { setStudents, timelapse, nodes, links, setNodes, setLinks } = useContext(FilterContext)


  const filterTimes = timelapse.begin && timelapse.end && times.filter( ( _, key) => ( timelapse.begin <= key && key <= timelapse.end  ) )

  //console.log("Timelapse", filterTimes)

  const sankeyRef = useRef(null)
  
  const margin = { top: 20, right: 0, bottom: 0, left: 0 }

  //const [ nodes, setNodes ] = useState()
  //const [ links, setLinks ] = useState()
  
  useEffect( () => {
    const fechtData = async () => {
      //const response = await getSankeyDiagram(times[timelapse.begin].name,times[timelapse.end].name)
      const response = await getSankeyDiagramOnlyFreshmen(times[timelapse.begin].name,times[timelapse.end].name)
      setNodes(response.nodes)
      setLinks(response.links)      
    }    
    fechtData();
  }, [ timelapse, setLinks, setNodes, ])

  useEffect( () => {
    if (nodes && links ) {
      drawChart()
    }
  }, [ nodes, links])

  const drawChart = () => {

    const clientWidth = sankeyRef.current.clientWidth;
    //const clientHeight = sankeyRef.current.clientHeight

    //console.log("*** ", clientWidth)
    //console.log("*** ", clientHeight)

    const GAP = 180
    var width = GAP * ( timelapse.end - timelapse.begin) + 100
    var height = 270 - margin.top - margin.bottom
    const NODEWIDTH = 15
    const NODEPADDING = 14

    // format variables
    var formatNumber = d3.format(",.0f") // zero decimal places
    var format = function (d) { return formatNumber(d); }

    // append the svg object to the section of the page
    d3.select(sankeyRef.current.children[0]).remove()

    var svg = d3.select(sankeyRef.current)
      .append("svg")
      .attr("width",  width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      //.attr("class", "border-test")
      .append("g")
      .attr("transform", "translate(" + 10 + "," + margin.top + ")");

           
    const sankeyLayout =  d3Sankey.sankey()
      .nodeId( d => d.nodeId)
      .nodeWidth(NODEWIDTH)
      .nodePadding(NODEPADDING)
      .nodeAlign(d3Sankey.sankeyCenter)
      .size([width, height])
      //.linkSort(function(a, b) { return a.value - b.value;  })
      .nodeSort(function(a, b) {
        //console.log("A: ", a)
        return d3.ascending(a.order, b.order); // Ordenar los enlaces por valor descendente
      })
      
    sankeyLayout({ "nodes": nodes, "links": links });
      
    // Adding timelapse tags
    const gap =filterTimes && (GAP ) 

    const settingX = (_, i) => {
      if ( i == 0 ) return 0
      //else if ( i == (filterTimes.length-1) ) return (i * gap) - 50
      else if ( i == (filterTimes.length-1) ) return (i * gap) 
      return (i * gap) 
      //return (i * gap) - 20
    }
    
    filterTimes && svg
      .selectAll("text")
      .data(filterTimes)
      .enter()
      .append("text")
      .text( d => d.name )
      .attr( "x", settingX )
      .attr( "y", -10  )
      .attr( "fill", "#656768")
      .attr( "class", "timelapse__tag" )

    //const nodesLayer = nodes.map( element => console.log(element))

    // add in the nodes
    var node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")      
      .attr("class", "shadow")      

    const testX = (d) => {      
      d.x0 = d.x * GAP       
      return d.x0
    }

    const strokeWidth = (d) => {
      //console.log("strokeWidth ", d)
      return d.width;
    }
    
    const testY = (d) => {      
      return d.y0
    }

    const testZ= (d) => { return d.y1 - d.y0 }


    node.append("rect")
      .attr("x", testX)
      .attr("y", testY)            
      .attr("height",testZ)
      .attr("width", sankeyLayout.nodeWidth())
      .style("fill", function (d) {
        return d.color;
      })
      .style("stroke", "#FFFFFF")
      .style("stroke-width", 2)
      .append("title")
      .text(function (d) {
        return d.name + " => " + d.nodeId + "\n" + " => " + "\n" + "order: " + d.order + "\n" +   format(d.value);
      });

   // Node name
   node.append("text")
   .attr("x", (d) => (d.x0 - 6) )
   .attr("y", (d) => ((d.y1 + d.y0) / 2) )
   .attr("dy", "0.35em")
   .attr("text-anchor", "end")
   .style("font-size", "11px")
   .style("fill", "#374151")
   .text( (d) => d.name )
   .filter( (d) => (d.x0 < (width / 10)) )
   .attr("x", (d) => (d.x1 + 6) )
   .attr("text-anchor", "start");   



 
  const linkPath = d3Sankey.sankeyLinkHorizontal()
    .source((d) => {           
      d.source.x1 = (d.source.x * GAP)+ d.source.x + NODEWIDTH
      return [d.source.x1, d.y0];
    })
    .target((d) => {       
      return [d.target.x0, d.y1];
    });
  
  
  const setLinkColor = (d) => {
    //console.log(d.color)
    if ( d.color == "links__link--dropout")
      return "links__link--dropout"
    if ( d.color == "links__link--success")
      return "links__link--success"
    if ( d.color == "links__link--repeat")
      return "links__link--repeat"
    if ( d.color == "links__link--student")
      return "links__link--student"
      
    if (d.color == null)
      return "link"
    
    
  }
  
   // add in the links
  svg.append("g")
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
      //.attr("class", "link")
      .attr("class", setLinkColor)
      //.attr("d",linkPath)
      .attr('d', linkPath)
      //.attr("d",d3Sankey.sankeyLinkHorizontal())    
      //.attr("stroke-width", strokeWidth)        
      .attr("stroke-width", strokeWidth)     
 
      .on("click", function(d,i){
        //console.log("+++", d)
        
        d.id = i;
        //console.log(d.i)
        //console.log(i.students)
        setStudents(d.students);
        //console.log(i.test)

        //console.log("*", d.id)
        return "link-"+i;
      })
   

   
  }


  return (   <div className="w-00px]" ref={sankeyRef}> </div>
  )
}   