import React, { useState, useRef, useCallback } from 'react'
import useGetArts from '../../api/useGetArts'
import ArtTest from '../Art/ArtComponent';
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from '../../store/store';

export default function ArtsContent() {

  const dispatch = useDispatch();
  const pageNum = useSelector((state) => state.cart.pageNum);

    const {
      isLoading,
      isError,
      error,
      results,
      arrayLength
  } = useGetArts(pageNum)
  
  const intObserver = useRef()
  const lastPostRef = useCallback(article => {
      if (isLoading) return
  
      if (intObserver.current) intObserver.current.disconnect()
  
      console.log(arrayLength)
  
      intObserver.current = new IntersectionObserver(lastArticle => {
        console.log(arrayLength)
  
          if (lastArticle[0].isIntersecting && arrayLength % 100 === 0 && arrayLength !== 0) {
              console.log('We are near the last post!')
              dispatch(artsActions.setPageNum(1))
          } else if (lastArticle[0].isIntersecting) {
            dispatch(artsActions.getMoreArts())
          }
      })
  
      if (article) intObserver.current.observe(article)
  }, [isLoading])
  
  
  if (isError) return <p className='center'>Error: {error.message}</p>
  
  const content = results.map((post, i) => {
    if(results.length === i + 1) {
      return <ArtTest ref={lastPostRef} key={i} post={post} />
    }
    return <ArtTest key={i} post={post} />
  })
  
    return (
            <>
              <h1 id="top">&infin; Infinite Query &amp; Scroll<br />&infin; Ex. 1 - React only</h1>
              {content}
              {isLoading && <p className="center">Loading More Posts...</p>}
              <p className="center"><a href="#top">Back to Top</a></p>
          </>
    )
  }
