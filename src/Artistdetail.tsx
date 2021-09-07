import "./styles/artist-detail.scss";

function Artistdetail({artistDetail, artistCallback} : {artistDetail: any, artistCallback:any}) {

    const data:any = artistDetail;

    function returnToSearch(){
        artistCallback(artistDetail);
    }

    return (
        null != artistDetail ?
            <div id="musician">
                <div>
                    <button type="button" onClick={returnToSearch}>Back to Artist List</button>
                    <h4>{data.artist.name}</h4>
                    {data.artist.bio.summary.length < 100 ? <p className="summary">Summary not available</p> : <p className="summary">{data.artist.bio.summary}</p>}
                    <a className="see-more" href={data.artist.bio.links.link.href} target="_blank">Read more about {data.artist.name}</a>
                    <small>Published {data.artist.bio.published}</small>

                    {data.artist.similar.artist.length > 0 ?
                        <div>
                            <h4>Similar Artists</h4>
                            <div className="similar-artists">
                            {  data.artist.similar.artist.map((val:any, index:number) => {
                                return <div key={index}><span className="names">{val.name}</span><a href={val.url} className="names-links" target="_blank">Last FM Profile</a></div>
                            }) }
                            </div> 
                        </div> :
                        <div className="names">No similar artists to show</div>}

                    <h4>Tags</h4>
                    <div className="tags">
                        { data.artist.tags.tag.map((val:any, index:number) => {
                                return <div key={index}>#{val.name}</div>
                            }) }
                    </div>
                 </div>
            </div> : null
    )
}

export default Artistdetail;