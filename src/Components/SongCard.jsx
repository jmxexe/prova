import React from 'react';

const SongCard = ({external_urls, album, name, track_number, duration_ms, popularity,artists }) => {


    const parseDuration_ms = () => {
        var ms = duration_ms;
        var secondsTot = Math.floor(ms / 1000);
        var minutes = Math.floor(secondsTot / (60));
        var seconds = Math.floor(secondsTot % 60)
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }
    //implementare more info per ogni traccia
    return (
        <>
            <div className="card w-64 bg-base-100 shadow-xl">
                <figure><a href={external_urls.spotify} target='_blank'><img src={album.images[0].url} alt={"album image: " + name}/></a> </figure>
                <div className="card-body">
                    <h2 className="card-title text-primary">{name}</h2> {/*| Song n.{track_number}*/}
                    {artists.map(artist => <a href={artist.external_urls.spotify} className='link text-accent' target='_blank' key={artist.id}>by {artist.name}</a>)}
                    <div>
                    <div className="badge badge-secondary">Popularity {popularity}%</div> <span className="badge badge-outline">{parseDuration_ms()} min</span>
                    </div>
                </div>
                {/* <div className="card-actions justify-start ">
                        <div className="badge badge-outline">{parseDuration_ms()} min</div>
                    </div> */}
            </div>

        </>
    )
}

export default SongCard;