import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { artsActions } from "../../store/store";
import axios from 'axios';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom'

const Cohort = ({ data }) => {
    const navigate = useNavigate()
    const { name } = useParams();
    const params = useParams();
    const [img, setImg] = useState('');
    const [art, setArt] = useState('');
    const { state } = useLocation();
    const location = useLocation(); 
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.cart.isLoading);
    console.log(isLoading)

    function getArtist () {

      // if (!location.pathname.includes('search')) return navigate(`artist/${art.artist_id}`, { state: { artist: art.artist_id } })

      // if (location.pathname.includes('search')) return navigate(`${params.artist}/${params.artistId}/artist/${art.artist_id}`, { state: { artist: art.artist_id } })

      navigate(`artist/${art.artist_id}`, { state: { artist: art.artist_id } })
    }

    console.log(params)

    useEffect(() => {

      let url
      if (params.name === 'search') {url = `https://api.artic.edu/api/v1/artworks/${params.artistId}`}
      else {url = `https://api.artic.edu/api/v1/artworks/${params.name}`}

        function getArts () {
        console.log('getarts')
        axios(`${url}`, {
            method: 'GET',
          })
          .then (art => {
            setArt(art.data.data) 
            setImg(art.data.data.image_id)
            dispatch(artsActions.setIsLoading(false))
          })
          .catch(err => {
            console.warn(err)
          })           
      }
      getArts();
      
      }, [name])

    return(

      <div className='art-details'>
        <div className='frame-details'>
        {img ? <img src={`https://www.artic.edu/iiif/2/${img}/full/400,/0/default.jpg`}></img> : <h1>Loading</h1> }
        </div>

        {art.title ? <p>{art.title}</p> : <p>Art Title Not available</p>}
        {art.category_titles ? <p>{art.category_titles}</p> : <p>Art Category Not available</p>}
        {art.credit_line ? <p>{art.credit_line}</p>: <p>Credit Line Not available</p>}
        <p>{art.artist_id}</p>
      {art.artist_title ? <button onClick={getArtist}>By {art.artist_title}</button> : <p>Artist Title Not available</p>}

      <Outlet />
      </div>
    )
}

export default Cohort
