import { useMemo, useEffect, useContext, useState, useCallback } from "react";
import { useTable, usePagination, useSortBy } from "react-table";

import { StudentContext } from "../context/StudentContext";
import { ColorBox } from "./ColorBox";
import { CloseIcon } from "./icons/Close";
import { getRoadmapByStudentId } from "../services/studentService";

const defaultColors = [
  { bg: "bg-tab-blue",   name: 'tab-blue',   available: true, busyFor: ""}, // blue
  { bg: "bg-tab-orange", name: 'tab-orange', available: true, busyFor: ""}, // orange
  { bg: "bg-tab-green",  name: 'tab-green',  available: true, busyFor: ""}, // green
  { bg: "bg-tab-red",    name: 'tab-red',    available: true, busyFor: ""}, // red
  { bg: "bg-tab-purple", name: 'tab-purple', available: true, busyFor: ""}, // purple
  { bg: "bg-tab-brown",  name: 'tab-brown',  available: true, busyFor: ""}, // brown
  { bg: "bg-tab-pink",   name: 'tab-pink',   available: true, busyFor: ""}, // pink
  { bg: "bg-tab-gray",   name: 'tab-gray',   available: true, busyFor: ""}, // gray
  { bg: "bg-tab-olive",  name: 'tab-olive',  available: true, busyFor: ""}, // olive
  { bg: "bg-tab-cyan",   name: 'tab-cyan',   available: true, busyFor: ""}, // cyan
]

export const Table = () => {  
  const { linkStudent, semesterFrom, semesterTo, setNodes, setLinks } = useContext(StudentContext);

  const [ isOpen, setIsOpen ] = useState(false);
  const [ selectedRow, setSelectedRow ] = useState({});
  const [ selectedIndex, setSelectedIndex ] = useState(0);
  const [ colors, setColors ] = useState(defaultColors);

  const [ data, setData ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0); // Estado local para almacenar la pagina actual

  // Numero de filas para la paginación
  const pageSize = 9;
  
  useMemo(() => {
    const updatedData = linkStudent && linkStudent
                          .map( student => ( { ...student, "color": "bg-tab-white" } ) )
                          .sort( (a, b) => {
                              if (a.lastname < b.lastname) return -1;
                              if (a.lastname > b.lastname) return 1;

                              // Si los apellidos son iguales, ordenar por nombre
                              if (a.name < b.name) return -1;
                              if (a.name > b.name) return 1;
                              return 0;
                            }
                          );
    setData(updatedData);
  }, [ linkStudent ]);

  // busca el color (nameColor) y procede a cambiar su disponibilidad
  const updateColor = useCallback((nameColor, statusColor, studentId) => {
    const updatedColors = colors.map((color) => ( color.bg === nameColor ? {...color, available: statusColor, busyFor: studentId} : color));
    setColors(updatedColors);
  }, [ colors ]) 

  const handleColorSelection = useCallback((color) => {
    getRoadmapByStudentId(selectedRow.id, semesterFrom, semesterTo, color.name )
      .then((sources) => {
        console.log("AQUI: ", sources.data.nodes)
        setLinks( prev => [...prev, ...sources.data.links] )
        setNodes( prev => {
          console.log("PREV ", [...prev, ...sources.data.nodes])
          return [...prev, ...sources.data.nodes]
        })
      })
      .catch((error) => {
        console.error("Getting data ", error);         
    })
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[selectedIndex] = { ...updatedData[selectedIndex], color: color.bg };
      return updatedData;
    });
    updateColor(color.bg, false, selectedRow.id);   // actualizando los colores y ponerlo no disponible para otros
    setIsOpen(!isOpen);
  }, [ selectedIndex, isOpen, updateColor, selectedRow, semesterFrom, semesterTo, setLinks, setNodes ] )

  const handlePopup = useCallback( ({index, original}) => {
    const isWhite = original.color === 'bg-tab-white';

    // en caso de que el estudiante no tenga asignado un color
    if(isWhite) {
      setIsOpen(!isOpen);         
      setSelectedIndex(index);    // guardando el indice de la fila, correspondiente a la data
      setSelectedRow(original);   // guardano la columna (Opcional)
    }
    // caso de estudiante que ya tiene un asignado un color, lo pasamos a blanco
    else {
      updateColor(original.color, true, "");  // actualizando los colores y quede disponible para volver a ser pickeado
      setData(prevData => {
        const updatedData = [...prevData];
        updatedData[index] = { ...updatedData[index], color: 'bg-tab-white' };
        return updatedData;
      });      
    } 

  }, [ isOpen, updateColor ]);
         
  const columns = useMemo(
    () => [      
      {
        Header: "Ruta",
        accessor: "roadmap",
        Cell: ({ row }) => {
          return (
            <div className={`w-full h-full flex justify-center items-center`}>  
              <div onClick={()=> handlePopup(row) } className={`w-4 h-4  border border-gray-400 cursor-pointer rounded-full ${row.original.color}`}>
              </div>
            </div>
          )
        },
        width: "5px"
      },
      { 
        Header: "Matrícula", 
        accessor: "enrollment",
        width: "20px" 
      },
      {
        Header: "Alumno",
        accessor: "lastname",
        Cell: ({ row }) => {
          const { name, lastname } = row.original;
          return `${lastname} ${name}`;
        },
        width: "100px"
      },      
      { 
        Header: "Género", 
        accessor: "gender",
        width: "20px" 
      },
      {
        Header: <div className="flex flex-col text-[0.5rem]"> todos <input type="checkbox"/> </div>,
        accessor: "projection",
        Cell: ({ row }) => {
          return <input type="checkbox"/>
        },
        width: "5px"
      },
      
    ],
    [ handlePopup ]
  );
  
  const changePage = (pageIndex) => {
    setCurrentPage(pageIndex); 
    gotoPage(pageIndex);
  };
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },    
    canNextPage,
    canPreviousPage,
    gotoPage, 
  } = useTable({ columns, data, initialState: { pageSize } }, useSortBy, usePagination );

  useEffect(() => {
    if (pageIndex !== currentPage) gotoPage(currentPage);
  }, [ pageIndex, currentPage, gotoPage ]);

  return (
    <div className="relative h-full font-roboto text-xs text-gray-700 dark:text-gray-300">
      {
        isOpen && (          
          <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-10">
            <div className="
              relative
              flex flex-col items-center justify-center gap-2 
              bg-gray-100 dark:bg-dark-200 
              border border-gray-300 dark:border-gray-700
              shadow-lg 
              rounded-md 
              w-44 h-32
            ">
              <div className="absolute top-2 right-2 w-5 h-5" onClick={() => setIsOpen(false)} >
                <CloseIcon className="w-full h-full fill-gray-600 dark:fill-gray-300 cursor-pointer"/>
              </div>
              <div className="flex flex-col items-center font-roboto font-medium text-gray-700 dark:text-gray-300">
                <span>{ selectedRow.lastname } { selectedRow.name }</span>
                <span> Selector de color: </span>
              </div>
              <div className="flex flex-wrap gap-1 justify-around px-2">
              {
                colors.map( (color, key) => {
                  return (
                    <div key={ key } onClick={ color.available &&( () => handleColorSelection(color)) }>
                      <ColorBox color={color} />
                    </div>
                  )
                })
              }
            </div>
            </div>
          </div>
        )
      }
      <table {...getTableProps()} className="table relative w-full">
        <thead className="font-bold  uppercase text-xs bg-gray-300 dark:bg-dark-200 h-8">
        {
          headerGroups.map( (headerGroup, index) => (
              <tr key={ index } {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map( (column, index) => (                                
                    <th key={ index } { ...column.getHeaderProps() } style={{ width: column.width }} className="">
                      { column.render("Header") }                              
                    </th>
                  )
                )
              }
              </tr>
            )
          )
        }
        </thead>
        <tbody {...getTableBodyProps()} className="font-normal">
        {
          page.map( (row, index) => {
            prepareRow(row);
            return (
              <tr key={ index } {...row.getRowProps() } className="even:bg-gray-300 dark:even:bg-dark-200 h-6">
              {
                row.cells.map((cell, index) => 
                  <td key={ index }  className="text-center" {...cell.getCellProps()}>
                    { cell.render("Cell") }
                  </td>
              )}
              </tr>
            )
          })
        }
        </tbody>
      </table>
      
      <footer className="font-bold bg-gray-300 dark:bg-dark-200 flex justify-around items-center absolute bottom-0 w-full h-5">
        <button 
          onClick={() => changePage(currentPage - 1)} 
          disabled={ !canPreviousPage }
          className="active:scale-95 cursor-pointer "
        >
          Anterior
        </button>
        <span>          
            Página {pageIndex + 1} de {Math.ceil(data.length / pageSize)}
        </span>
        <button 
          onClick={() => changePage(currentPage + 1)} 
          disabled={ !canNextPage } 
          className="active:scale-95 cursor-pointer"
        >
          Siguiente
        </button>
      </footer>
    </div>
  );
};
