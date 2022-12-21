import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams , Link, Outlet, useNavigate } from 'react-router-dom'


const Cohorts = ({ data }) => {

    const [image, setImage] = useState([]);
    const navigate =  useNavigate()

    function checkArt () {
        navigate(`${data.id}`)
    }

    return(
    <div id='art'>
        <img src={`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`}></img>
        <p>{data.artist_title}</p>
        <p>{data.title}</p>
        <p>{data.category_titles}</p>
        <p>{data.credit_line}</p>
        <button onClick={checkArt}>Check out full img</button>
    </div>
    )
}

export default Cohorts
