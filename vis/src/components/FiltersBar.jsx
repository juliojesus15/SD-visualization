import { useContext } from 'react'
import { times } from '../constant/filter'

import { FilterContext } from "../context/FilterContext"

export const FiltersBar = () => {
  const { handleBeginTime, handleEndTime, timelapse } = useContext(FilterContext)

  const filterTimes = timelapse.begin && times.filter( ( _, key) => key >timelapse.begin )

  return (
    <section className="flex gap-10 p-2 border-b mb-4">
      {
        //timelapse.begin && <pre> { timelapse.begin }</pre>
      }
      {
        //timelapse.end && <pre> { timelapse.end }</pre>
      }
      
      <div className='flex gap-3 font-roboto text-xs text-gray-600'>
        <label className='font-medium my-auto'> Periodo Inicio: </label>        
        <select onChange={ handleBeginTime } name="beginTime" className='font-medium border border-gray-300 rounded-lg px-3 py-1'>
        <option value={10} defaultValue> 2015-01 </option>
        {
          times.map( ({id, name}, key) => { 
            return <option key={ key } value={ id } > { name } </option>
          })
        }
        </select>
      </div>
      
      <div className='flex gap-3 font-roboto text-xs text-gray-600'>
        <label className='font-medium my-auto'> Periodo Final: </label>        
        <select onChange={handleEndTime} id="endTime" name="endTime" className='font-medium border border-gray-300 rounded-lg px-3 py-1'>
        <option value={10} defaultValue> seleccionar </option>
        {
          timelapse.begin && filterTimes.map( ({id, name}, key) => { 
            return <option key={ key } value={ id } > { name } </option>
          })
        }
        </select>
      </div>
  
    </section>
  )
}