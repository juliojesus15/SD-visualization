import React, { useEffect, useRef, useContext, useState, } from "react";
import * as d3 from 'd3'
import * as d3Sankey from "d3-sankey";

import { FilterContext } from "../context/FilterContext"
import { times } from "../constant/filter";

import { getSankeyDiagram } from "../services/sankeyService"

const COLORS = {
  blue: "#08008B",
  red: "#D60000",
  yellow: "#F2F200",
  green: "#007C00"
}
/*

const nodes = [
  {
    "nodeId": "1N-2011-01",
    "name": "1er sem.",
    "color": "#007C00",
    "x": 0
  },
  {
    "nodeId": "1-2011-01",
    "name": "1 sem.",
    "color": "#08008B",
    "x": 0
  },
  {
    "nodeId": "2-2011-01",
    "name": "2 sem.",
    "color": "#08008B",
    "x": 0
  },
  {
    "nodeId": "3-2011-01",
    "name": "3 sem.",
    "color": "#08008B",
    "x": 0
  },
  {
    "nodeId": "2-2011-02",
    "name": "2 sem.",
    "color": "#08008B",
    "x": 1
  },
  {
    "nodeId": "1-2011-02",
    "name": "1 sem.",
    "color": "#08008B",
    "x": 1
  },
  {
    "nodeId": "3-2011-02",
    "name": "3 sem.",
    "color": "#08008B",
    "x": 1
  },
  {
    "nodeId": "4-2011-02",
    "name": "4 sem.",
    "color": "#08008B",
    "x": 1
  },
  {
    "nodeId": "0-2011-02",
    "name": "Drop.",
    "color": "#D60000",
    "x": 1
  }
]

const links = [
  {
    "source": "1N-2011-01",
    "target": "1-2011-02",
    "value": 44.44,
    "students": [
      {
        "id": "441ddad3-25a1-40ea-8a48-ae13eda5ddb5",
        "name": "Laverna",
        "lastname": "Breitenberg",
        "gender": "female",
        "enrollment": "2011-01"
      },
      {
        "id": "9f2fcff1-f7b5-4824-8e1a-a32b8f86217b",
        "name": "Braxton",
        "lastname": "Mann",
        "gender": "female",
        "enrollment": "2011-01"
      },
      {
        "id": "9a67e106-c58c-4590-bf50-d0d7f5630457",
        "name": "Beverly",
        "lastname": "Morar",
        "gender": "female",
        "enrollment": "2011-01"
      },
      {
        "id": "6dba1607-08bc-4ee1-bb10-4b3b835b47d3",
        "name": "Evelyn",
        "lastname": "Frami",
        "gender": "female",
        "enrollment": "2011-01"
      }
    ]
  },
  {
    "source": "1N-2011-01",
    "target": "2-2011-02",
    "value": 44.44,
    "students": [
      {
        "id": "a73bdcb0-d1ca-460f-8a17-37a0876dd223",
        "name": "Lowell",
        "lastname": "Legros",
        "gender": "male",
        "enrollment": "2011-01"
      },
      {
        "id": "d3d1abed-081b-47b7-bda1-7ed8143ce9fb",
        "name": "Darian",
        "lastname": "Runte",
        "gender": "female",
        "enrollment": "2011-01"
      },
      {
        "id": "3e3f0fa0-9a79-40f1-9b7f-7538965a1aab",
        "name": "Ivory",
        "lastname": "Lehner",
        "gender": "female",
        "enrollment": "2011-01"
      },
      {
        "id": "fbc1328a-569c-4e14-8c90-b4e3ce42978d",
        "name": "Alyson",
        "lastname": "Parisian",
        "gender": "male",
        "enrollment": "2011-01"
      }
    ]
  },
  {
    "source": "1N-2011-01",
    "target": "0-2011-02",
    "value": 11.11,
    "students": [
      {
        "id": "0b464c17-fa7d-46b1-9a86-7062710acaa6",
        "name": "Elva",
        "lastname": "Auer",
        "gender": "male",
        "enrollment": "2011-01"
      }
    ]
  },
  {
    "source": "1-2011-01",
    "target": "1-2011-02",
    "value": 33.33,
    "students": [
      {
        "id": "3e2df169-04f2-41e5-924b-431dbd3f27a2",
        "name": "Nicole",
        "lastname": "Padberg",
        "gender": "female",
        "enrollment": "2010-01"
      }
    ]
  },
  {
    "source": "1-2011-01",
    "target": "2-2011-02",
    "value": 66.67,
    "students": [
      {
        "id": "2ad837c2-f15e-4cda-a1cc-a7cbcd8e144a",
        "name": "Benjamin",
        "lastname": "Reichel",
        "gender": "female",
        "enrollment": "2010-02"
      },
      {
        "id": "d4d6e1f7-c9fd-49bd-89ba-e29413afdddd",
        "name": "Tad",
        "lastname": "Howell",
        "gender": "female",
        "enrollment": "2010-02"
      }
    ]
  },
  {
    "source": "2-2011-01",
    "target": "2-2011-02",
    "value": 33.33,
    "students": [
      {
        "id": "66786316-683c-4b6a-a43d-9ceede5722a3",
        "name": "Brendan",
        "lastname": "O'Kon",
        "gender": "female",
        "enrollment": "2010-01"
      },
      {
        "id": "13f0d462-4dda-4de1-aab6-2030c222e037",
        "name": "Geovanny",
        "lastname": "Tremblay",
        "gender": "female",
        "enrollment": "2010-02"
      }
    ]
  },
  {
    "source": "2-2011-01",
    "target": "3-2011-02",
    "value": 66.67,
    "students": [
      {
        "id": "e751365d-7e36-41fc-8b6b-d79f9bb1831e",
        "name": "Danial",
        "lastname": "Bednar",
        "gender": "female",
        "enrollment": "2010-02"
      },
      {
        "id": "c73900c4-b9fa-47d4-b9aa-7c10f5386ab8",
        "name": "Libby",
        "lastname": "Halvorson",
        "gender": "male",
        "enrollment": "2010-01"
      },
      {
        "id": "3df80707-b0a3-46d2-b212-1529558d05a1",
        "name": "Reese",
        "lastname": "Ortiz",
        "gender": "male",
        "enrollment": "2010-02"
      },
      {
        "id": "8174179d-ba12-47c8-a94f-45010f0ff0dc",
        "name": "Jocelyn",
        "lastname": "Kutch",
        "gender": "male",
        "enrollment": "2010-02"
      }
    ]
  },
  {
    "source": "3-2011-01",
    "target": "3-2011-02",
    "value": 50,
    "students": [
      {
        "id": "0349976d-cf3b-4e43-b64d-300fead6cf25",
        "name": "Eula",
        "lastname": "Paucek",
        "gender": "male",
        "enrollment": "2010-01"
      },
      {
        "id": "e5d80e2a-47d9-40ef-aad4-62502dfbba7f",
        "name": "Darrion",
        "lastname": "Grady",
        "gender": "female",
        "enrollment": "2010-01"
      }
    ]
  },
  {
    "source": "3-2011-01",
    "target": "4-2011-02",
    "value": 50,
    "students": [
      {
        "id": "4697ed32-c42f-40e8-b950-dd79645b3c72",
        "name": "Brennon",
        "lastname": "Ortiz",
        "gender": "female",
        "enrollment": "2010-01"
      },
      {
        "id": "3eb58b2e-7752-4d7d-a2f7-c3970c3e5289",
        "name": "Maude",
        "lastname": "Murray",
        "gender": "male",
        "enrollment": "2010-01"
      }
    ]
  }
]
*/
export const SankeyDiagram = () => {

  const { setStudents, timelapse } = useContext(FilterContext)


  const filterTimes = timelapse.begin && timelapse.end && times.filter( ( _, key) => ( timelapse.begin <= key && key <= timelapse.end  ) )

  //console.log("Timelapse", filterTimes)

  const sankeyRef = useRef(null)
  
  const margin = { top: 0, right: 0, bottom: 20, left: 0 }

  const [ nodes, setNodes ] = useState()
  const [ links, setLinks ] = useState()

  
  useEffect( () => {
    const fechtData = async () => {
      const response = await getSankeyDiagram('2010-02','2011-01')
      //console.log(response)
      setNodes(response.nodes)
      setLinks(response.links)
      drawChart()
    }    
    fechtData();
  }, [ timelapse, setLinks, setNodes])
//}, [ timelapse])

  const drawChart = () => {

    //const clientWidth = sankeyRef.current.clientWidth;
    //const clientHeight = sankeyRef.current.clientHeight

    //console.log("*** ", clientWidth)
    //console.log("*** ", clientHeight)

    var width = 1700 - margin.left - margin.right
    var height = 350 - margin.top - margin.bottom
    const GAP = 200
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
      .attr("class", "border-test")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

           
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
    let containerOldNodes = {}
    sankeyLayout({ "nodes": nodes, "links": links }).nodes.forEach( node => {
      //console.log(node.nodeId)
      const key = node.nodeId
      containerOldNodes[ key ] = node
    })
    
    //console.log("*** ", containerOldNodes)
  
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
      // nodes
      //console.log("BEFORE => ", d);
      //d.depth = d.x
      //d.layer = d.x
      //d.height = 3
      d.x0 = d.x * GAP
 
      
      //console.log("CURRENT => ", d.nodeId, " : ", d);

      //d.y0 = d.y
      
      //d.y1 = d.y_1
      return d.x0
    }

    const strokeWidth = (d) => {
      //console.log("strokeWidth ", d)
      return d.width;
    }


    const verticalGap =  10
    let heights = {
      "0": 0,
      "1": 0,      
      "2": 0,
      "3": 0,      
      "4": 0,
      "5": 0,      
      "6": 0,
      "7": 0,      
      "8": 0,
      "9": 0,      

    }

    
    const testY = (d) => {
      
      //d.y0 = (d.index* d.order) + verticalGap
      /*
      const columnId = d.x
      if (d.order == 1) {
        const newHeight =  heights[ columnId ] + (d.y1 - d.y0)
        d.y0 = heights[ columnId ]
        d.y1 = newHeight
        heights[ columnId ] = d.y1 + verticalGap
        
      }    
      else if (d.order == 2) {
        const newHeight = heights[ columnId ] + (d.y1 - d.y0)
        d.y0 = heights[ columnId ]

        console.log("New init: ", d.y0, " = stored: ", heights[ columnId ])
        d.y1 = newHeight
        heights[ columnId ] = d.y1 + verticalGap
        console.table(heights)
      }*/
      const columnId = d.x
      const newHeight = heights[ columnId ] + (d.y1 - d.y0)
      d.y0 = heights[ columnId ]

      //console.log("New init: ", d.y0, " = stored: ", heights[ columnId ])
      d.y1 = newHeight
      heights[ columnId ] = d.y1 + verticalGap


      

      //else ()
   
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



   let linkConfig = {
    "0": {"width": 0, "height": 0},
    "1": {"width": 0, "height": 0},      
    "2": {"width": 0, "height": 0},
    "3": {"width": 0, "height": 0},      
    "4": {"width": 0, "height": 0},
    "5": {"width": 0, "height": 0},      
    "6": {"width": 0, "height": 0},
    "7": {"width": 0, "height": 0},      
    "8": {"width": 0, "height": 0},
    "9": {"width": 0, "height": 0},
  }
  
  const linkPath = d3Sankey.sankeyLinkHorizontal()
    .source((d) => {
      
      //d.source.x1 =  d.source.x + 22
      d.source.x1 = (d.source.x * GAP)+ d.source.x + NODEWIDTH
      //d.y0 = d.source.y0 - verticalGap
      //d.y0= 30
      //d.width = 10

      if ( d.source.nodeId == "1N-2010-02") {
        /*
        const columnId = d.x
          const newHeight = heights[ columnId ] + (d.y1 - d.y0)
          d.y0 = heights[ columnId ]

          //console.log("New init: ", d.y0, " = stored: ", heights[ columnId ])
          d.y1 = newHeight
          heights[ columnId ] = d.y1 + verticalGap
        */ 
        
        console.log("d => ", d)
        const columnId = d.source.x
        //const newHeight = linkHeightContainer[ columnId ] 
        //const width = 
        console.log("Inicio: ")
        if ( linkConfig[ columnId ].width == 0 && linkConfig[ columnId ].height == 0) {
          linkConfig[ columnId ].width = d.y0
          d.y0 = 10
          linkConfig[ columnId ].height = d.y0
          console.table(linkConfig[ columnId ]) 
        }
        else {
          const newWidth = d.y0 - linkConfig[ columnId ].width
          
          linkConfig[ columnId ].width = d.y0
          
          d.y0 = linkConfig[ columnId ].height + newWidth 
          linkConfig[ columnId ].height = d.y0
          console.table(linkConfig[ columnId ]) 

          
        }        
      }
      
     
      

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


  

  return (
    <div className="w-[1700px]" ref={sankeyRef}> </div>
  )
}   