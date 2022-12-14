import React, { useRef, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { artsActions } from '../../store/store';
import useSearchArts from '../../api/useSearchArts';

import ArtTest from '../Art/ArtTest';

export default function ArtSearch() {

  const params = useParams()
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.cart.isLoading);
  const isError = useSelector((state) => state.cart.isError);
  const searchValue = useSelector((state) => state.cart.searchValue);
  const searchArray = useSelector((state) => state.cart.searchArray);
  const error = useSelector((state) => state.cart.error);
  const pageNumSearch = useSelector((state) => state.cart.pageNumSearch);


const intObserver = useRef()

  const lastPostRef = useCallback(article => {
      if (isLoading) return
  
      if (intObserver.current) intObserver.current.disconnect()
  
      intObserver.current = new IntersectionObserver(lastArticle => {

          if (lastArticle[0].isIntersecting) {
              console.log('We are near the last post!')
              dispatch(artsActions.setPageNumSearch(1))
              //dispatch(artsActions.getMoreArts())

          } 

      })
  
      if (article) intObserver.current.observe(article)
  }, [isLoading])
  
  
  if (isError) return <p className='center'>Error: {error.message}</p>
  
  const content = searchArray.map((art, i) => {

    if(searchArray.length === i + 1) {
      return <ArtTest ref={lastPostRef} key={i} art={art} />
    }
    return <ArtTest key={i} art={art} />
  })

  console.log(params)

  useEffect(() => {

    if(searchValue === '')
    console.log(`searchValue does not exist`)
    dispatch(artsActions.setSearchValue(params.query))

    return () => {
      console.log('artsActions.setSearchArray([])')
      dispatch(artsActions.setSearchValue(''))
      dispatch(artsActions.setSearchArray([]))
    }

  }, [])


  return (
    <div>
      <h1>search</h1>
      <section id='arts'>{content}</section>
    </div>
  )
}