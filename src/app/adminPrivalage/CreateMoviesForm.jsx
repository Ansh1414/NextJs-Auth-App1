import  { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function CreateMoviesForm({onCreateMovie}) {
    const [movie, setmovie] = useState({
        moviename: "",
        coverImage: {},
        movieInformation: "",
    })
    
  const [file, setFile] = useState(null);


  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Create Movies</h2>
           
            <form className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="moviename" className="text-base font-medium text-gray-900">
                    {' '}
                    Movie Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="text-black flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      id="moviename"
                      type="text"
                      value={movie.moviename}
                      onChange={(e) => setmovie({...movie, moviename: e.target.value})}
                      placeholder="moviename"
                     
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="coverImage" className="text-base font-medium text-gray-900">
                    {' '}
                    Cover Image{' '}
                  </label>
                  <div className="mt-2">
                    <input
                       className="text-black flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                       id="coverImage"
                       type="file"
                       //onChange={handleFileChange} 
                       onChange={(e) => setmovie({...movie, coverImage: e.target.files[0]})}
                       placeholder="coverImage"
                  
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="movieInformation" className="text-base font-medium text-gray-900">
                      {' '}
                      movieInformation{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    
                    <textarea
                      className="text-black flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      id="movieInformation"  
                      value={movie.movieInformation}
                      onChange={(e) => setmovie({...movie, movieInformation: e.target.value})}
                      rows={10}
                      cols={50}
                      placeholder="Type your movieInformation here..."
                    />
                  </div>
                </div>
                <div>
                  <button
                   type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={()=>onCreateMovie(movie)}>
                    Create Movies <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateMoviesForm