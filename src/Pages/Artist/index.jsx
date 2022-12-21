import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams , NavLink, Outlet, useLocation } from 'react-router-dom'

const Artist = (data) => {
    const { name, artistId } = useParams();
    const [artist, setArtist] = useState('');
    const [altTitles, setAltTitles] = useState([]);
    const { state } = useLocation();
    const location = useLocation();
    
    console.log(artistId)

    useEffect(() => {

      console.log('get artist!!!')

      function getArtist () {
        axios(`https://api.artic.edu/api/v1/artists/${artistId}`, {
            method: 'GET',
          })
          .then (artist => {
            console.log('get artist!!!')
            console.log(artist)
            setArtist(artist.data.data)

            if(!artist.data.data.alt_titles) setAltTitles(['Not available'])
            else {
              setAltTitles(artist.data.data.alt_titles)
            }
            console.log(artist.data.data.alt_titles)
          })
          .catch(err => {
            console.warn(err)
          })           
      }
      getArtist();

      }, [artistId])

       //console.log(altTitles.map((alt, index) => console.log(alt)))
      const altTitlesArray = altTitles.map((alt, index)=> {

            return (
            <li
              key={index}>
              {alt}
            </li>)
      })

    return(
        <div className='artist'>
            <h2>{artist.title}</h2>
            {/* {artist.birth_date ? <p>Birth Date: {artist.birth_date}</p>: <p>Not available</p>}
            {artist.death_date ?<p>Deseased: {artist.death_date}</p>: <p>Not available</p>}  */}
            {/* {altTitlesArray ? <ul>{altTitlesArray}</ul> : <p>No Alt titles</p>} */}
            <ul>{altTitlesArray}</ul>
        </div>
    )
}

export default Artist
