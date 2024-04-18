import React, { useState, useEffect, useContext } from 'react'
import Loading from './Loading';
import { DataContext } from '../App';
import backgroundImageOnePiece from '../assets/onepiece.jpg'
import backgroundImageNaruto from '../assets/naruto.jpg'
import Error from './Error'
const Page = () => {
  const { animeName } = useContext(DataContext)
  const [data, setData] = useState({})
  const [moreinfo, setMoreinfo] = useState(null)
  const informations = ["type", "episodes", "status", "source", "duration", "rating"]
  const [isLoading, setIsLoading] = useState(true)

  let list = [{ nome: "onepiece", id: 21 }, { nome: "naruto", id: 1735 }]
  let id = ((list.find(item => item.nome == animeName)) == undefined) ? null : list.find(item => item.nome == animeName).id


  console.log(animeName)


  useEffect(() => {
    setIsLoading(true)
    let ignore = false;
    if (id != undefined && animeName != null) {
      fetch('http://localhost:5000/api/anime/' + animeName)
        .then(res => res.json())
        .then(data => {
          if (!ignore) setData(data)
        })
        .catch(err => console.log(err))


      fetch('https://api.jikan.moe/v4/anime/' + id + '/moreinfo')
        .then(res => res.json())
        .then(({ data }) => setMoreinfo(data.moreinfo))
        .catch(err => console.log(err))
    }

    setIsLoading(false)

    return () => { ignore = true; }

  }, [animeName])

  if (isLoading) {
    return <Loading />
  }


  return (
    <>
      {!(Object.keys(data).length == 0) ?
        <div style={{ width: '100%', height: '200%', background: `url(${animeName === 'naruto' ? backgroundImageNaruto : backgroundImageOnePiece})`, }} >
          <div className="container m-4 flex flex-col mx-auto p-2 rounded-lg gap-5 h-fit place-content-center ">
            {/* grid m-4  gap-4 lg:grid-cols-3 */}
            <div className="flex justify-center p-5 gap-6  bg-base-100 shadow-xl h-min rounded-lg">
              <figure><img className="rounded-lg" src={data.images.jpg.large_image_url} alt="One Piece Image" /></figure>
              <div>
                <div className="divider">
                  <h2 className="card-title">Informations</h2>
                </div>
                <ul className="list-disc p-2 text-base">
                  {
                    informations.map((key, i) => (
                      <li key={i}>{key}: {!data[key] ? "Unknown" : data[key]}</li>
                    ))
                  }
                  <li>aired: {data['aired'].from}</li>
                  <li>broadcast: {data['broadcast'].string}</li>
                  <li>producers: {data['producers'].map(producer => (`${producer.name}`)).join(",")}</li>
                  <li>licensors: {data['licensors'].map(licensor => (`${licensor.name}`)).join(",")}</li>
                  <li>studios: {data['studios'][0].name}</li>
                  <li>genres: {data['genres'].map(genre => (`${genre.name}`)).join(",")}</li>
                  <li>demographic: {data['demographics'][0].name}</li>

                </ul>
                <div className="badge badge-primary font-mono m-3">Score: <p>{data['score']}</p></div>
                <p>by {data.members} members of <a href={"https://myanimelist.net/anime/" + id} className="text-sky-400 after:content-['_↗']" target='_blank'>MyAnimeList</a></p>
              </div>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-xl w-fit">
              <div className="card-body">
                <div className="divider">
                  <h2 className="card-title">Synopsis</h2>
                </div>
                <div className="card-body">
                  <article>
                    <p className='w-auto'>{data.synopsis.substring(0, 200)}</p>
                  </article>

                  <div className="card-actions justify-end">
                    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>more text</button>
                    {moreinfo != null && <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>more info</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">More Text</h3>
              <p className="py-4">{data.synopsis}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {moreinfo != null && <dialog id="my_modal_2" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">More Info</h3>
              <p className="py-4">{moreinfo}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>}
          {/* Open the modal using document.getElementById('ID').showModal() method */}


        </div>


        :
        <Error />
      }
    </>
  )
}

export default Page