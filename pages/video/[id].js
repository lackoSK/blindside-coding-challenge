import { useRouter } from 'next/router'
import Navigation from '../components/navigation'
import useSWR from 'swr'
import VideoContent from '../components/videoContent'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import VideoOverview from '../components/videoOverview'

const fetcher = (url) => fetch(url).then((res) => res.json())

const VideoPage = () => {
  const router = useRouter()
  const { id } = router.query

  let [isOpen, setIsOpen] = useState(false)
  let [textarea, setTextArea] = useState('')
  let [showComments, setShowComments] = useState(true);
  let [commentList] = useState([]);

  function sendComment() {
    const object = {
      id: commentList.length + 1,
      text: textarea
    };

    commentList.push(object)

    setTextArea('')
    closeModal()
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  function toggleComments() {
    setShowComments(!showComments);
  }

  // Very ugly way of filtering, should be done on backend instead (request for specific ID), however, we are working with dummy "API"
  const { data, error } = useSWR('/api/videos', fetcher)
  if (error) return <div>Failed to load videos</div>
  if (!data) return <div>Loading</div>

  const videos = data.videos
  const video = videos.find((entry) => entry.id == id);

  if (!video) return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <h1 className='text-5xl font-extrabold'>
        Loading video
        <span className='block animate-bounce'>...</span>
      </h1>
    </div>
  )

  return (
    <>
      <div className='container p-4 mx-auto'>
        <Navigation />
        {/* Actual content */}
        <header className='mt-10'>
          <VideoContent youtubeId={video.youtubeId} />
        </header>
        <main className='mt-5'>
          <aside>
            <a
              href="#"
              className="inline-flex items-center p-1 pr-2 text-white rounded-full sm:text-base lg:text-sm xl:text-base"
            >
              <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">
                Tag
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center p-1 pr-2 text-white rounded-full sm:text-base lg:text-sm xl:text-base"
            >
              <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-red-500 to-orange-600 rounded-full">
                Funny
              </span>
            </a>
          </aside>
          <article className='mt-2'>
            <h2 className="text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl">Video title</h2>
            <p className="max-w-3xl mt-2 text-xl text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in,
              accusamus quisquam.
            </p>
          </article>
          <button
            onClick={toggleComments}
            className="mt-5 text-sm font-medium text-gray-700 transition hover:text-gray-900 focus:outline-none"
          >
            {showComments ? (
              <div className='inline-flex items-center'>
                <EyeOffIcon className='className="w-5 h-5 mr-2 -ml-1"' />
                Showing {commentList.length} comment(s) - Hide
              </div>
            ) : (
              <div className='inline-flex items-center'>
                <EyeIcon className='className="w-5 h-5 mr-2 -ml-1"' />
                Show comments
              </div>
            )}
          </button>
          {showComments ? (
            <article className='mt-5 space-y-8'>
              {commentList.map(comment => (
                <div key={comment.id}>
                  <div className='flex items-center space-x-2'>
                    <img className="w-8 h-8 rounded-full" src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80' alt='profile_pic' />
                    <p className='text-lg font-semibold'>John Doe</p>
                  </div>
                  <p className='mt-4 ml-2 text-gray-700 md:w-3/4'>
                    {comment.text}
                  </p>
                </div>
              ))}
              <button
                onClick={openModal}
                type="button"
                className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
                <span className="block mt-2 text-sm font-medium text-gray-900">Write a comment</span>
              </button>
            </article>
          ) : null}
          <aside className='mt-10'>
            <h3 className="text-2xl font-extrabold leading-8 tracking-tight sm:text-3xl">Related videos</h3>
            <div className='mt-5'>
              <Swiper
                spaceBetween={20}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1.1
                  },
                  768: {
                    slidesPerView: 2.1
                  },
                  1024: {
                    slidesPerView: 2.5
                  },
                  1536: {
                    slidesPerView: 3.5
                  }
                }}
              >
                {videos.map(element => (
                  <SwiperSlide key={`slider-${element.id}`}>
                    <VideoOverview previewImage={element.previewImage} videoId={element.id} youtubeId={element.youtubeId} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </aside>
        </main>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter your comment
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea onChange={event => setTextArea(event.target.value)} className='w-full transition border border-gray-400 border-dashed min-h-5 p-2 focus:outline-none focus:border-gray-600 rounded min-h-[150px]' />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none"
                      onClick={sendComment}
                    >
                      Send it!
                    </button>
                    <button className='ml-4 text-sm' onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default VideoPage