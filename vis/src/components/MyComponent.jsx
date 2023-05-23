import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    /*
    axios.get('/api/products') // URL de tu servidor Node.js
      .then(response => {
        console.log("Response: ", response)
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      */
  }, [setData]);

  return (
    <div className='bg-principal-600'>
      {/* Renderizar los datos obtenidos */}
      <pre> {data&&
        JSON.stringify(data)
        }
        </pre>
    </div>
  );
};

export default MyComponent;
