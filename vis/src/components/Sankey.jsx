import React, { useEffect, useRef, useContext, useState, } from "react";
import * as d3 from 'd3'
import * as d3Sankey from "d3-sankey";

import { FilterContext } from "../context/FilterContext"
import { times } from "../constant/filter";

import { getSankeyDiagram, getSankeyDiagramOnlyFreshmen } from "../services/sankeyService"

import { ColorButton } from "./ColorButtom";

const COLORS = {
  blue: "#08008B",
  red: "#D60000",
  yellow: "#F2F200",
  green: "#007C00"
}

export const Sankey = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  

  const { setStudents, timelapse, nodes, links, setNodes, setLinks,  selectedNodes, setSelectedNodes, setSelectedTimes, selectedTimes } = useContext(FilterContext)

  const [ test, setTest ] = useState([])

  const filterTimes = timelapse.begin && timelapse.end && times.filter( ( _, key) => ( timelapse.begin <= key && key <= timelapse.end  ) )



  //console.log("Timelapse", filterTimes)

  const sankeyRef = useRef(null);
  const contextMenuRef = useRef(null);
  
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


  const updateNodes = (d) => {      
    const key = d.slice(-7)    
    setSelectedTimes(prevData => {
      const tmp =  selectedTimes    
      const idx = selectedTimes.findIndex(objeto => objeto.name === key)    
      let tmpObj = tmp[idx]
      //console.log("TMP ", tmpObj)

      if (tmpObj.semesters.includes( d)) {          
        return [...prevData]
      }
      else {
        tmpObj.semesters.push(d)
        tmp[idx].semesters = tmpObj.semesters
        return [...tmp]
      }
    })
    
  } 

  const unselectNode = (d) => {
    const key = d.slice(-7)    
    setSelectedTimes(prevData => {
      const tmp =  selectedTimes    
      const idx = selectedTimes.findIndex(objeto => objeto.name === key)    
      let tmpObj = tmp[idx]
      //console.log("TMP ", tmpObj)

      if (tmpObj.semesters.includes( d)) { 
        const tmpIdx = tmpObj.semesters.indexOf(d)

        const newArray = [...tmpObj.semesters.slice(0, tmpIdx), ...tmpObj.semesters.slice(tmpIdx + 1)];

        
        tmp[idx].semesters = newArray
        return [...tmp]
      }
      else {
        return [...prevData]
      }
    })
  }

  const joinNodes = async () => {
    //console.log("JOIN NODES")
    const tmpNodes = nodes
    let deletingNodes = nodes
    //console.log("JOIN NODES: ", nodes)

    //console.log(selectedTimes)
    const containerNewNodes = []
    selectedTimes.forEach( time => {
      //console.log("TIME" ,time)
      if ( time.semesters.length >= 2) {
        const filterNodes = time.semesters
        const filtered = tmpNodes.filter( node => filterNodes.includes( node.nodeId ) )
        deletingNodes = deletingNodes.filter(node => !filterNodes.includes(node.nodeId));
        //console.log("filtered: ", filtered)
        

        let newNodeId = ""
        let newNodeName = ""
        let newOrder = 0
        let newX = 0
        filtered.forEach( node => {
          const key = node.nodeId.slice(0, -8);

          //console.log(node)
          newNodeId = newNodeId + key + "-"
          newX = node.x
          newOrder = node.order
          
        })
        newNodeId = newNodeId + time.name
        newNodeName = newNodeId
        const joinedNodes = {
          "nodeId": newNodeId,
          "name": newNodeName,
          "color": "#EA906C",
          "x": newX,
          "order": newOrder,
          nodes: filtered  
        }
        //console.log(joinedNodes)
        containerNewNodes.push(joinedNodes)
      }
    })

    
    
    //console.log("**=> ", containerNewNodes)
    //console.log("**=> ", tmpNodes)
    //console.log("**=> ", tmpLinks)

    //const response = await getSankeyDiagram(times[timelapse.begin].name,times[timelapse.end].name)
    //console.log(response.links)
    // {source: '1N-2015-01', target: '1-2015-02', value: 27.27, students: Array(3)}
    const tmpLinks = links
    //console.log("Example Link: ", tmpLinks[0])

    // FROM
    const containerNewLinks = []
    containerNewNodes.forEach( newNode => {
      //console.log("***", newNode)
      const tmpNodes = newNode.nodes
      //console.log(newNode.nodes)
      //const tmp = newNode.nodes
      tmpNodes.forEach( node => {
        //console.log("NODE", node.nodeId)
        const id = node.nodeId

        const filterFrom = tmpLinks.filter( link => link.source.nodeId == id)
        //console.log("FILTER FROM ", filterFrom)
        filterFrom.forEach( item => {
          containerNewLinks.push({source: newNode.nodeId, color: item.color, target: item.target.nodeId, value: item.value, students: item.students, joined: true})
        })
      })
      
    })

    // TO
    //const containerNewLinks = []
    containerNewNodes.forEach( newNode => {
      //console.log("***", newNode)
      const tmpNodes = newNode.nodes
      //console.log(newNode.nodes)
      //const tmp = newNode.nodes
      tmpNodes.forEach( node => {
        //console.log("NODE", node.nodeId)
        const id = node.nodeId

        const filterFrom = tmpLinks.filter( link => link.target.nodeId == id)
        //console.log("FILTER FROM ", filterFrom)
        filterFrom.forEach( item => {
          containerNewLinks.push({source: item.source.nodeId, color: item.color, target: newNode.nodeId, value: item.value, students: item.students, joined: true })
        })
      })
      
    })

    // deleting nodes 
    let containerTimes = []
    selectedTimes.forEach( time => {
      //console.log("TIME" ,time)
      if ( time.semesters.length >= 2) {
        const tmpTimes = time.semesters
        containerTimes = [...containerTimes, ...tmpTimes]    
      }
    })

    
    // deleting nodes joined
    const filtered = nodes.filter(node => !containerTimes.includes(node.nodeId));
    console.log("===> ", filtered)

    

    // delting links
    // FROM
    //console.log("LINKS ", links)
    const filteredLinksFrom = links.filter( link => !containerTimes.includes(link.source.nodeId))
    const filteredLinksTo = filteredLinksFrom.filter( link => !containerTimes.includes(link.target.nodeId))
    //console.log("filteredLinksTo ", filteredLinksTo)

    //const testLinks = [filteredLinksFrom, filteredLinksTo]
    

    setNodes([...filtered, ...containerNewNodes])
    setLinks([...filteredLinksTo, ...containerNewLinks])

    const tmp = selectedTimes.map( time => {
      return {...time, semesters:[]}
    })
    setSelectedTimes(tmp)




  }

  


  const drawChart = () => {

    const clientWidth = sankeyRef.current.clientWidth;
    const clientHeight = sankeyRef.current.clientHeight

    const GAP = 180
    var width = GAP * ( timelapse.end - timelapse.begin) + 100
    var height = 300 - margin.top - margin.bottom
    const NODEWIDTH = 20
    const NODEPADDING = 10

    // format variables
    var formatNumber = d3.format(",.0f") // zero decimal places
    var format = function (d) { return formatNumber(d); }

  
  d3.select(sankeyRef.current.children[0]).remove()
  d3.select(contextMenuRef.current.children[0]).remove()
  

  const contextMenu = d3.select(contextMenuRef.current)
      .append("div")
      .attr("class", "context-menu")
      .style("display", "none");

    contextMenu.append("div")
      .text("Unir")
      .on("click", joinNodes );

    contextMenu.append("div")
      .text("Separar")
      .on("click", function() {
        console.log("Separar opción seleccionada");
      });


  let svg = d3.select(sankeyRef.current)
    .append("svg")
    .attr("width",  width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr("class", "border-test")
  
    .on("contextmenu", function() {        
        d3.event.preventDefault()
        
        const x = d3.event.clientX - 10;
        const y = d3.event.clientY - 65;
                
        contextMenu
          .style("left", `${x}px`)
          .style("top", `${y}px`)
          .style("display", "block");
          
        //console.log("Menú contextual activado");
    })
    .append("g")
    .attr("transform", "translate(" + 10 + "," + margin.top + ")")    ;
    

    d3.select("body").on("click", function() {
      contextMenu.style("display", "none");
    });
    

    const sankeyLayout =  d3Sankey.sankey()
      .nodeId( d => d.nodeId)
      .nodeWidth(NODEWIDTH)
      .nodePadding(NODEPADDING)
      .nodeAlign(d3Sankey.sankeyCenter)
      .size([width, height])
      .nodeSort(function(a, b) { return d3.ascending(a.order, b.order);  })
      
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
    
  let groupTimelapse = svg
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

  // Custom functions to modify diagram behavior
  const customX = (d) => {      
    d.x0 = d.x * GAP       
    return d.x0
  }

  const customSankeyLinkHorizontal = d3Sankey.sankeyLinkHorizontal()
    .source((d) => {           
      d.source.x1 = (d.source.x * GAP)+ d.source.x + NODEWIDTH
      return [d.source.x1, d.y0];
    })
    .target((d) => {       
      return [d.target.x0, d.y1];
    });

  // setting color of links (provisional)
  const setLinkColor = (d) => {
    const from = d.source.nodeId.slice(0, -8);
    const to = d.target.nodeId.slice(0, -8);
    console.log(d)
    console.log("From ", from)
    console.log("To ", to)
    if ( d.color == "links__link--student") return "links__link--student"    

    if(!d.joined){

      if ('color' in d){
        if("#1f77b4" ==d.color) return "blue"  
        if("#ff7f0e" ==d.color) return "orange"
        if("#2ca02c" ==d.color) return "green"
        if("#d62728" ==d.color) return "red"
        if("#9467bd" ==d.color) return "purple"
        if("#8c564b" ==d.color) return "brown"
        if("#e377c2" ==d.color) return "pink"
        if("#7f7f7f" ==d.color) return "gray"
        if("#bcbd22" ==d.color) return "olive"
        if("#17becf" ==d.color) return "cyan"
        return d.color
      }

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
    
 
    
    

    //console.log(d.color)
    //if ( d.color == "links__link--dropout") return "links__link--dropout"
    //if ( d.color == "links__link--success") return "links__link--success"
    //if ( d.color == "links__link--repeat") return "links__link--repeat"
    //if ( d.color == "links__link--student") return "links__link--student"      
    //if (d.color == null) return "link"      
  }
    

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
    .attr("x", customX )
    .attr("y", (d) => d.y0 )            
    //.attr("y", testY )
    
    .attr("height", (d) => d.y1 - d.y0 )
    .attr("width", sankeyLayout.nodeWidth())
    .style("fill", (d) => d.color )
    .style("stroke", "#FFFFFF")
    .style("stroke-width", 2)    
    .on("click", function(d) {
      if (d3.event.altKey) {
        // Select the node        
          d3.select(this)
            .style("stroke", "#DF2D64")
            .style("stroke-width", 4)
          //console.log("* ", d)
        updateNodes(d.nodeId)
      } else {
        // Deselect the node        
        d3.select(this)
          .style("stroke", "#FFFFFF")
          .style("stroke-width", 2)
        unselectNode(d.nodeId)
      }
    })
    
    

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
    

  let groupLinks = svg
    .append("g")
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", setLinkColor)
    .attr('d', customSankeyLinkHorizontal)      
    .attr("stroke-width", (d) => d.width )      
    .on("click", d => setStudents(d.students))
  }

 

  return ( 
    <div>
      <div ref={contextMenuRef} className="relative"> </div>
      <div ref={sankeyRef} className="relative"> </div>
    </div>
      

    
  )
}   