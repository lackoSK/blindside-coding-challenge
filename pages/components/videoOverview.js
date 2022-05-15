import { PlayIcon } from "@heroicons/react/outline";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import VideoContent from './videoContent';

export default function VideoOverview({ videoId, previewImage, youtubeId }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
    <div className='w-full h-full group'>
      <button
        onClick={openModal}
        className="relative block rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <img
          className="rounded"
          src={`https://images.unsplash.com/${previewImage}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=750&q=80`}
          alt=""
        />
        <div className='absolute inset-0 z-10 flex items-end p-4 transition bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 aboslute'>
          <a className='flex items-center'>
            <PlayIcon className='w-6 h-6 text-white' />
          </a>
        </div>
        <span className="absolute inset-0 z-0 flex items-center justify-center">
          <svg className="w-20 h-20 text-blue-500" fill="currentColor" viewBox="0 0 84 84">
            <circle opacity="full" cx={42} cy={42} r={42} fill="white" />
            <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
          </svg>
        </span>
      </button>
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
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div>
                  <aside className='relative w-screen pb-4'>
                    <span className='text-white text-opacity-75'>Click away to close the dialog.</span>
                  </aside>
                  <Dialog.Panel className="max-w-5xl mx-auto align-middle transition-all transform">
                    {/* Main content */}
                    <VideoContent youtubeId={youtubeId}/>
                    {/* Button */}
                    <Link href={`/video/${videoId}/`}>
                      <a onClick={closeModal} className="inline-flex items-center px-4 py-2 mt-4 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600">
                        Open video page
                        <ArrowNarrowRightIcon className="w-5 h-5 ml-3 -mr-1" aria-hidden="true" />
                      </a>
                    </Link>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}