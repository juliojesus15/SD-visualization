import { useMemo, useContext, useState, useCallback } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

import { StudentContext } from "../context/StudentContext";

const Table = () => {  
  const { linkStudent } = useContext(StudentContext)

  const [ data, setData ] = useState([])


  useMemo(() => {
    const updatedData = linkStudent.map(student => ({ ...student, 'color': 'bg-tab-white' }));
    setData(updatedData);
  }, [linkStudent]);
  

  const handlePopup = useCallback((student) => {
    const idx = student.index;
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[idx] = { ...updatedData[idx], color: 'bg-tab-blue' };
      return updatedData;
    });
  }, []);

  const columns = useMemo(
    () => [      
      {
        Header: 'N°',
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>; // Accede al índice y lo muestra
        },
        width: '30px'
      },
      {
        Header: 'Ruta',
        accessor: 'modal',
        Cell: ({ row }) => {
          return <div onClick={()=> handlePopup(row) } className={`w-4 h-4 rounded-full ${row.original.color}`}>  </div>
        },
        width: '20px'
      },
      {
        Header: 'Alumno',
        accessor: 'lastname',
        Cell: ({ row }) => {
          const { name, lastname } = row.original;
          return `${lastname} ${name}`;
        },
        sortable: true
      },      
      { Header: 'Genero', accessor: 'gender' },
      { Header: 'Color', accessor: 'color' },
      { Header: 'Matricula', accessor: 'enrollment' },
      
    ],
    [ handlePopup ]
  );
  
  const pageSize = 9

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize } }, useSortBy ,usePagination);

  return (
    <div className='relative w-full h-full font-roboto'>
      <table {...getTableProps()} className="table relative font-roboto text-xs text-gray-800 dark:text-gray-300 w-full bg-gray-50 dark:bg-dark-100">
        <thead className='font-bold tracking-tight uppercase text-xs bg-gray-300 dark:bg-dark-200 h-8 sticky top-0 right-0 left-0 z-20'>
          {headerGroups.map((headerGroup, index) => (
            <tr key={ index } {...headerGroup.getHeaderGroupProps()} className='order border-black'>
              {headerGroup.headers.map((column, index) => (                                
                <th 
                  key={ index }
                  { ...column.getHeaderProps( column.sortable ? column.getSortByToggleProps() : {} ) }
                  style={{ width: column.width }}
                  className={column.sortable ? 'cursor-pointer order border-red-500' : 'order border-red-500 '}
                >
                  { column.render('Header') }
                  {
                    column.sortable && (
                      <span className='ml-1 my-auto'>
                      { column.isSorted 
                        ? column.isSortedDesc 
                          ? "▼"
                          : "▲"
                        : '↑↓'
                      }
                      </span>
                    )
                  }                   
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="font-normal">
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={ index } {...row.getRowProps()} className="even:bg-gray-300 dark:even:bg-dark-200 h-6">
                {row.cells.map((cell, index) => (
                  <td key={ index }  className='text-center ' {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div className="font-medium text-xs pagination w-full flex justify-around h-5 bg-gray-300 dark:bg-dark-200 text-gray-800 dark:text-gray-300 absolute bottom-0">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className='hover:text-gray-800 hover:scale-105 active:scale-95 cursor-pointer '>
          Anterior
        </button>
        <span className='my-auto'>
          Página{' '}
          <strong>
            {pageIndex + 1} de {Math.ceil(data.length / pageSize)}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className='hover:text-gray-800 hover:scale-105 active:scale-95 cursor-pointer '>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Table;
