import React, { useEffect, useRef, useContext, } from "react";
import * as d3 from 'd3'
import * as d3Sankey from "d3-sankey";

import { FilterContext } from "../context/FilterContext"
import { times } from "../constant/filter";

const COLORS = {
  blue: "#08008B",
  red: "#D60000",
  yellow: "#F2F200",
  green: "#007C00"
}

const nodes = [
  { "node": 0, "name": "0", "color": COLORS.blue, "x":10, "y":100 },  
  { "node": 1, "name": "1", "color": COLORS.blue, "x": 200, "y": 100}, 
  { "node": 2, "name": "2", "color": COLORS.red, "x": 100, "y": 100},
  { "node": 3, "name": "3", "color": COLORS.red, "x": 400, "y": 100 },
  { "node": 4, "name": "4", "color": COLORS.red, "x": 200, "y": 100 },


]

const links =  [
  { source: 0, target: 1, value: 20 }, // Link from Node 1 to Node 2  
  { source: 0, target: 4, value: 20 }, // Link from Node 1 to Node 2  

  { source: 2, target: 3, value: 51 },  // Link from Node 2 to Node 4
  { source: 1, target: 3, value: 5 },  // Link from Node 2 to Node 4

]

export const SankeyDiagram = () => {

  const { setStudents, timelapse } = useContext(FilterContext)


  const filterTimes = timelapse.begin && timelapse.end && times.filter( ( _, key) => ( timelapse.begin <= key && key <= timelapse.end  ) )

  //console.log("Timelapse", filterTimes)

  const sankeyRef = useRef(null)
  
  const margin = { top: 0, right: 0, bottom: 20, left: 0 }
  
  useEffect(() => {
    drawChart()
  }, [ timelapse, ])

  const drawChart = () => {

    const clientWidth = sankeyRef.current.clientWidth;
    const clientHeight = sankeyRef.current.clientHeight

    //console.log("*** ", clientWidth)
    //console.log("*** ", clientHeight)

    var width = 1300 - margin.left - margin.right
    var height = 350 - margin.top - margin.bottom

    // format variables
    var formatNumber = d3.format(",.0f") // zero decimal places
    var format = function (d) { return formatNumber(d); }

    // append the svg object to the section of the page
    d3.select(sankeyRef.current.children[0]).remove()

    var svg = d3.select(sankeyRef.current)
      .append("svg")
      .attr("width",  width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "border-test")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       
    const sankeyLayout = d3Sankey.sankey()
      .nodeWidth(22)
      .nodePadding(50)
      .nodeAlign(d3Sankey.sankeyJustify)
      .size([width, height]);
   
    sankeyLayout({ "nodes": nodes, "links": links });


    // Adding timelapse tags
    const gap =filterTimes && ( width / (filterTimes.length - 1) ) 

    const settingX = (_, i) => {
      if ( i == 0 ) return 0
      else if ( i == (filterTimes.length-1) ) return (i * gap) - 50
      return (i * gap) - 20
    }
    
    filterTimes && svg
      .selectAll("text")
      .data(filterTimes)
      .enter()
      .append("text")
      .text( d => d.name )
      .attr( "x", settingX )
      .attr( "y", height + 20 )
      .attr( "fill", "#656768")
      .attr( "class", "timelapse__tag" )

    // add in the nodes
    var node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")      
      .attr("class", "shadow")      

    const testX = (d) => {
      //console.log("BEFORE => ", d);
      d.x0 = d.x
      //console.log("after => ", d);

      //d.y0 = d.y
      
      //d.y1 = d.y_1
      return d.x0
    }

    const strokeWidth = (d) => {
      //console.log("strokeWidth ", d)
      return d.width;
    }

    const testY = (d) => {
      //console.log("Y => ", d.y);
      //d.y0 = d.y
      //console.log("Y0 => ", d.y0);
      return d.y0
    }

    const testZ= (d) => { 
      //console.log("* ",d.y0)
      //d.y1 = d.y_1
      return d.y1 - d.y0
    }

    //console.log(sankeyLayout.nodeWidth()  )
    // add the rectangles for the nodes
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
        return d.name + "\n" + "sss" + format(d.value);
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


   const testingD = (d) =>{
    console.log('d3Sankey', d3Sankey)
    return d3Sankey.sankeyLinkHorizontal()
   }

  
  const linkPath = d3Sankey.sankeyLinkHorizontal()
    .source((d) => {
      console.log("d => ", d)
      d.source.x1 = d.source.x + 22
      //return [d.source.x1, d.y0 + (d.y1 - d.y0) / 2]
      return [d.source.x1, d.y0];
    })
    .target((d) => {
      //[d.target.x0, d.y0 + (d.y1 - d.y0) / 2])
      return [d.target.x0, d.y1];
    });
  
  
  
   // add in the links
  svg.append("g")
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
      .attr("class", "link")
      //.attr("d",linkPath)
      .attr('d', linkPath)
      //.attr("d",d3Sankey.sankeyLinkHorizontal())    
      //.attr("stroke-width", strokeWidth)        
      .attr("stroke-width", strokeWidth)     
      /*
      .attr('d', (d) => {
        const curvature = 0.5; // Ajusta el valor de la curvatura (0 a 1)
        const x0 = d.source.x1;
        const x1 = d.target.x0;
        const xi = d3.interpolateNumber(x0, x1);
        const x2 = xi(curvature);
        const x3 = xi(1 - curvature);
        const y0 = d.y0 + (d.y1 - d.y0) / 2;
        const y1 = y0;
        return `M${x0},${y0}C${x2},${y0} ${x3},${y1} ${x1},${y1}`;
      })*/   
      .on("click", function(d,i){
        //console.log("+++", d)
        
        d.id = i;
        //console.log(d.i)
        //console.log(i.students)
        setStudents([]);
        //console.log(i.test)

        //console.log("*", d.id)
        return "link-"+i;
      })

   
  }


  

  return (
    <div ref={sankeyRef}> </div>
  )
}   