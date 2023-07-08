import { useMemo, useEffect, useContext, useState, useCallback } from "react";
import { useTable, usePagination, useSortBy } from "react-table";

import { StudentContext } from "../context/StudentContext";

const Table = () => {  
  const { linkStudent } = useContext(StudentContext);

  const [ data, setData ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0); // Estado local para almacenar la pagina actual

  const pageSize = 9
  
  useMemo(() => {
    const updatedData = linkStudent
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
  }, [linkStudent]);


  const handlePopup = useCallback((student) => {
    const idx = student.index;
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[idx] = { ...updatedData[idx], color: "bg-tab-blue" };
      return updatedData;
    });
  }, []);
         
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
  }, [pageIndex, currentPage, gotoPage]);

  return (
    <div className="relative h-full font-roboto text-xs text-gray-700 dark:text-gray-300">
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

export default Table;
