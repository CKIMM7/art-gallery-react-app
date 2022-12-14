import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate, Outlet } from 'react-router-dom'

const Cohort = ({ data }) => {
    const navigate = useNavigate()
    const { name } = useParams();
    const [img, setImg] = useState('');
    const [art, setArt] = useState('');
    console.log(name)

    function getArtist () {
      return navigate(`artist/${art.artist_id}`)
    }

    useEffect(() => {

        function getArts () {
        axios(`https://api.artic.edu/api/v1/artworks/${name}`, {
            method: 'GET',
          })
          .then (art => {
            //console.log(art.data.data)
            setArt(art.data.data)
            setImg(art.data.data.image_id)
          })
          .catch(err => {
            console.warn(err)
          })           
      }
      getArts();
      
      }, [name])

    return(

      <div className='art-details'>
        <div className='frame'>
        {img ? <img src={`https://www.artic.edu/iiif/2/${img}/full/400,/0/default.jpg`}></img> : <h1>Loading</h1> }
        </div>

        {art.title ? <p>{art.title}</p> : <p>Art Title Not available</p>}
        {art.category_titles ? <p>{art.category_titles}</p> : <p>Art Category Not available</p>}
        {art.credit_line ? <p>{art.credit_line}</p>: <p>Credit Line Not available</p>}

      {art.artist_title ? <button onClick={getArtist}>By {art.artist_title}</button> : <p>Artist Title Not available</p>}
      <Outlet />
      </div>
    )
}

export default Cohort
