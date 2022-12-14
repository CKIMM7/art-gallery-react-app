import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams , NavLink, Outlet } from 'react-router-dom'

const Artist = () => {
    const { name, artistId } = useParams();
    const [artist, setArtist] = useState('');
    const [altTitles, setAltTitles] = useState([]);
    console.log('Artist jsx')

    useEffect(() => {

        function getArtist () {
        axios(`https://api.artic.edu/api/v1/artists/${artistId}`, {
            method: 'GET',
          })
          .then (artist => {
            setArtist(artist.data.data)
            setAltTitles(artist.data.data.alt_titles)
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
            return (<li
            key={index}>
            {alt}
            </li>)
      })

    return(
        <div className='artist'>
            <h2>{artist.title}</h2>
            <p>Birth Date: {artist.birth_date}</p>
            <p>Deseased: {artist.death_date}</p>
            <ul>{altTitlesArray}</ul>
            <p>Artist: {artistId}</p>
        </div>
    )
}

export default Artist
