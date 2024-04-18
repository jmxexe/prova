import React, {useState } from "react";
import './App.css'
import { RouterProvider } from "react-router-dom";
import router from './Router'
import { createContext } from "react";
const App = () => {
  document.documentElement.setAttribute('data-theme',(localStorage.getItem('theme') ? localStorage.getItem('theme'): 'cupcake'))
  
  const [animeName,setAnimeName] = useState('onepiece')
  return (
    <DataContext.Provider value={{animeName,setAnimeName}}>
      <RouterProvider router={router}/>
    </DataContext.Provider>
  );
};

export default App;

export const DataContext = createContext(null);