import Image from 'next/image'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const links = [
  {
    title: "Home",
    link: "/"
  },
]

export default function Navigation() {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div>
            <div className="relative flex justify-between">
              <div className="flex items-center justify-between flex-1">
                <Link href="/" className='flex items-center'>
                  <a><Image src="/logo.svg" alt="logo" width={144} height={48} /></a>
                </Link>
                <div className="hidden md:flex md:space-x-8">
                  {links.map((link) => (
                    <Link href={link.link} key={`full-${link.link}-${link.title}`}>
                      <a className='inline-flex items-center transition hover:text-blue-500'>
                        {link.title}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className='items-center hidden md:flex'>
                  <Link href="/login">
                    <a className='px-4 py-2 font-semibold text-white transition bg-blue-500 rounded hover:bg-blue-600'>Login</a>
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 bottom-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center focus:outline-none">
                  {open ? (
                    <XIcon className="block w-6 h-6" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {links.map((link) => (
                <Disclosure.Button
                  key={`mobile-${link.link}-${link.title}`}
                  as={Link}
                  href={link.link}
                >
                  <a className='block py-2 pl-3 pr-4'>{link.title}</a>
                </Disclosure.Button>
              ))}
            </div>
            <Disclosure.Button
              as={Link}
              href="#"
            >
              <a className='block px-4 py-2 font-semibold text-center text-white transition bg-blue-500 rounded hover:bg-blue-600'>Login</a>
            </Disclosure.Button>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
