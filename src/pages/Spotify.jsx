import React, { useEffect, useMemo, useState } from 'react';
import SongCard from '../Components/SongCard';
import Loading from '../pages/Loading';

const Spotify = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  const [infoTracks, setInfoTracks] = useState({
    tracks: [],
    orderMode: 'p',
    quantity: 5
  });
  const inputsQuantity = [{ value: 5 }, { value: 10 }, { value: 20 }]

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    if (url.get('access_token') && url.get('refresh_token')) {
      setToken(url.get('access_token'));
      setRefreshToken(url.get('refresh_token'))
    }

  }, [])

  useEffect(() => {
    let ignore = false;
    const fetchTopArtistsTracks = async () => {
      fetch(`http://localhost:5000/spotify/favouriteSongs?quantity=${infoTracks.quantity}&token=${token}`)
        .then(response => response.json())
        .then(data => {
          if (data != null && !ignore) {
            console.log(data)
            data.sort(function (a, b) {
              return a.popularity - b.popularity;
            })
            setInfoTracks({
              ...infoTracks,
              tracks: data
            })
          }
        })
        .catch(err => console.log(err));
      setLoading(false);
    }

    fetchTopArtistsTracks()

    return () => {ignore = true}
  }, [infoTracks.quantity, token])

  const logoutFromSpotify = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {

    return <p>Si è verificato un errore: {error}</p>;
  }

  const handleOrder = e => {
    if (e.target.value == 'p') {
      infoTracks.tracks.sort(function (a, b) {
        return a.popularity - b.popularity;
      })
    } else {
      infoTracks.tracks.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    }
    setInfoTracks({
      ...infoTracks,
      orderMode: e.target.value
    })
  }
  const handleQuantity = e => {
    setInfoTracks({
      ...infoTracks,
      quantity: e.target.value
    })
  }
  return (
    <div className='grid grid-cols-1 gap-3 place-items-center'>
      {token ?
        <>
          <div className=''>
            <div className="dropdown dropdown-left">
              <div tabIndex={0} role="button" className="btn m-1">Ordina</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <div className="join flex-col">
                  <input className="join-item btn" type="radio" name="optionsOrder" aria-label="Per popolarità" onChange={handleOrder} value={'p'} checked={infoTracks.orderMode === "p"} />
                  <input className="join-item btn" type="radio" name="optionsOrder" aria-label="Per Nome" onChange={handleOrder} value={'n'} checked={infoTracks.orderMode === "n"} />
                </div>
              </ul>
            </div>
            <div className="dropdown dropdown-right">
              <div tabIndex={0} role="button" className="btn m-1">Quantità</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <div className="join flex-col"> 
                  {inputsQuantity.map(input => 
                  <input className="join-item btn" type="radio" name="optionsQuantity" key={input.value} aria-label={input.value} onChange={handleQuantity} value={input.value} checked={input.value==infoTracks.quantity}/>
                  )}
                
                </div>
              </ul>
            </div>
            <button className='btn btn-primary' onClick={logoutFromSpotify}>Logout from Spotify</button>
          </div>
          <div className='grid grid-cols-4 gap-10'>
            {infoTracks.tracks !== undefined || infoTracks.tracks.length !== 0 ?
              infoTracks.tracks.map((track) => (
                <SongCard {...track} key={track.id} />
              ))
              :
              <h1>nessun dato</h1>
            }
          </div>
        </>
        :
        <a href='http://localhost:5000/spotify/auth' className='btn btn-link'>Authorize</a>
      }

    </div>

  )
}

export default Spotify
