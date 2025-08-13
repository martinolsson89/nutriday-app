import React from 'react'
import {Routes, Route } from "react-router-dom";

import Home from '../pages/home';
import About from '../pages/about';
import { Products } from '../pages/products';
import { ViewProduct } from '../components/viewproduct';
export function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/viewproduct/:id' element={<ViewProduct/>}></Route>
    </Routes>
  )
}
