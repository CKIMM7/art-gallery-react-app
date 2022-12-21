import React, { useRef, useCallback, useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Header from "./Pages/layouts/Header"

import axios from 'axios';

import Art from './Pages/Art'
import Arts from './Pages/Arts'
import Welcome from './Pages/Welcome'
import Artist from "./Pages/Artist";
import ArtTest from "./Pages/Art/ArtTest";
import ArtSearch from "./Pages/ArtSearch/ArtSearch";

import ArtsContent from "./Pages/Arts/ArtsContent";
import useGetArts from "./api/useGetArts";
import { artsActions } from "./store/store";


function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.cart.isLoading);
  const pageNum = useSelector((state) => state.cart.pageNum);
  const {
    isError,
    error,
    results,
    arrayLength,
    setResults
} = useGetArts(pageNum)

const intObserver = useRef()
  const lastPostRef = useCallback(article => {
      if (isLoading) return
  
      if (intObserver.current) intObserver.current.disconnect()
  
      intObserver.current = new IntersectionObserver(lastArticle => {

          if (lastArticle[0].isIntersecting) {
              dispatch(artsActions.setPageNum(1))
          } 
          // else if (lastArticle[0].isIntersecting) {
          //   dispatch(artsActions.getMoreArts())
          // }
      })
  
      if (article) intObserver.current.observe(article)
  }, [isLoading])
  
  
  if (isError) return <p className='center'>Error: {error.message}</p>
  
  const content = results.map((art, i) => {

    if(results.length === i + 1) {
      return <ArtTest ref={lastPostRef} key={i} art={art} />
    }
    return <ArtTest key={i} art={art} />
  })

return (
  <Routes>
    <Route path='/' element={<Header></Header>} >
  
      <Route path='arts' element={<section id='arts'>{content}</section>} >
      </Route>
      
      <Route path='arts/:name' element={<Art/>} >
        <Route path=':artist/:artistId' element={<Artist />} ></Route>
      </Route>

      <Route path='arts/search/:query' element={<ArtSearch />}>
      </Route>


      <Route path='*' element={<h1>Not Found</h1>} ></Route>
      <Route index element={<Welcome />} ></Route>


    </Route>
  </Routes>
) 
}

export default App
