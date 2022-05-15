import { useState } from "react";
import { useRouter } from 'next/router'


export default function LoginPage() {
  const router = useRouter()
  
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  function sendRequest() {  
    // check with backend, get JWT or Cookie, store it and fetch user information
    // skip as we don't have backend
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-w-xs mx-auto">
      <form onSubmit={sendRequest} className="w-full space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1">
            <input
              onChange={event => setUsername(event.target.value)}
              type="email"
              name="email"
              id="email"
              className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              onChange={event => setPassword(event.target.value)}
              type="password"
              name="password"
              id="password"
              className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-black transition bg-blue-100 border border-blue-500 rounded-md shadow-sm hover:bg-blue-200 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  )
}