import { useState } from 'react'
import ContentLoader from 'react-content-loader'

export default function VideoContent({youtubeId}) {
  let [isLoaded, setIsLoaded] = useState(false);

  function loaded() {
    setIsLoaded(true)
  }


  const VideoLoader = (props) => (
    <ContentLoader
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="2500" height="2500" />
    </ContentLoader>
  )

  return (
    <div className='relative w-full h-[25vh] sm:h-[45vh] md:h-[60vh] p-2 overflow-hidden bg-white rounded shadow-xl'>
      {!isLoaded ? <VideoLoader className="w-full h-full rounded" /> : null}
      <iframe onLoad={loaded} className={'w-full h-full rounded' + (!isLoaded ? "h-0 hidden" : "")} src={`https://www.youtube.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}