import { useEffect } from 'react';

const Menus = () => {
  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/menus');
    console.log(await response.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h1>Menus</h1>;
};

export default Menus;
