import Navigation from './components/navigation'
import useSWR from 'swr'
import VideoOverview from './components/videoOverview'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/videos', fetcher)

  if (error) return <div>Failed to load videos</div>
  if (!data) return <div>Loading</div>
  const videos = data.videos

  return (
    <div className='container p-4 mx-auto'>
      <Navigation />
      <main className='mt-10 md:mt-20'>
        <article className='text-center'>
          <h1 className='text-5xl font-extrabold text-black'>
            Hello to the
            <span className='relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500'> best
              <svg width="142" height="23" viewBox="0 0 142 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 1.5L73.5 1.5C129 1.5 189.8 12.2 73 21" stroke="url(#paint0_linear_0_3)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="paint0_linear_0_3" x1="70.8664" y1="1.5" x2="70.8664" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>videos
          </h1>
        </article>
        <article className='grid grid-cols-1 gap-6 mt-10 md:mt-20 md:grid-cols-2 lg:grid-cols-3'>
          {videos.map(video => {
            return (
              <VideoOverview
                key={video.id}
                videoId={video.id}
                youtubeId={video.youtubeId}
                previewImage={video.previewImage}
              />
            )
          })}
        </article>
      </main>
    </div>
  )
}
