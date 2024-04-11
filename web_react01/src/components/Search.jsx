import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


//components
import Nav from './nav'
import Footer from './footer'
import Scrolltotop from './Scrolltotop'

export default function Search() {

  const [data, setDate] = useState([])
  const [loading, setloading] = useState(false)
  const [Search, setSearch] = useState("")

  console.log(Search);

  const fetchAPI = async () => {

    try {
      setloading(true);
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${Search}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDIzMjllY2M4ODk5YzQ4OWVmNTM1MTIxMWNhZThlNSIsInN1YiI6IjY2MDM3N2U4ZGJmMTQ0MDE3ZDAzMTczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hR1xJERwjQjV_NoY5SNxTL0ZrKJ3_e1ceEEQLcohr5Q'
        }
      });

      setDate(response.data.results);
    }

    catch (error) {
      console.error("Error", error);
    }

    finally {
      setloading(false);
    }

  }

  useEffect(() => {
    fetchAPI();
  }, [Search])

  console.log(data);



  return (
    <>
      <title>Search</title>
      <Scrolltotop />
      <Nav />

      <label className="input input-bordered flex items-center mt-28 mx-4 animate-fade-right">

        <input type="text" className="grow text-lg" placeholder="Search" value={Search} onChange={(e) => setSearch(e.target.value)} />

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8 opacity-100"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
      </label>

      {loading ? <div className='container mx-auto flex justify-center mt-32'><span className="loading loading-ring loading-lg"></span></div> : <div>

        <div className='flex flex-wrap justify-center'>
          {data.map((val) => (
            <div className='mt-20' key={val.id}>
              <div className='w-72 min-h-full skeleton mx-2 sm:w-72 sm:mx-6 lg:mx-8 '>

                <div className='absolute z-20'>
                  <dialog id={val.id} className="modal">
                    <div className="modal-box bg-gradient-to-r from-base-100 to-base-300 w-11/12 max-w-5xl">
                      <h3 className="font-bold text-2xl">Overview</h3>
                      <p className="py-4">{val.overview}</p>

                      <samp className='text-lg z-15'>
                        <p>Release Date</p>
                        <p>{val.first_air_date}</p>
                        <p>{val.release_date}</p>
                        <p>Media_Type: {val.media_type}</p>
                      </samp>

                      <p className='text-lg btn mx-4 mt-4'>TV <Link to={`https://www.google.com/search?q=${val.name}`}><button className="btn btn-active btn-link bg-transparent border-none"><img src="/img/analysis.png" /></button></Link></p>
                      <p className='text-lg btn mt-4'>Movie  <Link to={`https://www.google.com/search?q=${val.title}`}><button className="btn btn-active btn-link bg-transparent border-none"><img src="/img/analysis.png" /></button></Link></p>

                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <img className='size-full animate-fade-left mt-1 rounded-2xl cursor-pointer' onClick={() => document.getElementById(`${val.id}`).showModal()} src={`https://image.tmdb.org/t/p/w500${val.poster_path}`} />



                <div className="stats shadow pt-1 bg-transparent">

                  <div className="stat mt-3">
                    <p className='text-xl font-semibold'>{val.name}</p>
                    <p className='text-xl font-semibold'>{val.title}</p>
                    <div className="stat-title">Vote Average</div>
                    <div className="stat-value text-lg">{val.vote_average}</div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}


      <Footer />
    </>
  )
}
