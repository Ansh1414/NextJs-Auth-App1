import  { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function CreateMoviesForm({onCreateCrew}) {
    const [crewMember, setCrewMember] = useState({
        personName: "",
        personImage: {},
        personRole: "",
        movieName:""
    })


  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Create Movies</h2>
           
            <form className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="movieName" className="text-base font-medium text-gray-900">
                    {' '}
                    Movie Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="text-black flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      id="movieName"
                      type="text"
                      value={crewMember.movieName}
                      onChange={(e) => setCrewMember({...crewMember, movieName: e.target.value})}
                      placeholder="movie Name"
                     
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="personName" className="text-base font-medium text-gray-900">
                    {' '}
                    Member Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="text-black flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      id="personName"
                      type="text"
                      value={crewMember.personName}
                      onChange={(e) => setCrewMember({...crewMember, personName: e.target.value})}
                      placeholder="Person Name"
                     
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="personRole" className="text-base font-medium text-gray-900">
                    {' '}
                    Member Role{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="text-black flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      id="personRole"
                      type="text"
                      value={crewMember.personRole}
                      onChange={(e) => setCrewMember({...crewMember, personRole: e.target.value})}
                      placeholder="person Role"
                     
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="personImage" className="text-base font-medium text-gray-900">
                    {' '}
                    Crew Member Image{' '}
                  </label>
                  <div className="mt-2">
                    <input
                       className="text-black flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                       id="personImage"
                       type="file"
                       //onChange={handleFileChange} 
                       onChange={(e) => setCrewMember({...crewMember, personImage: e.target.files[0]})}
                       placeholder="person Image"
                  
                    ></input>
                  </div>
                </div>
                
                <div>
                  <button
                   type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={()=>onCreateCrew(crewMember)}>
                    Create Movie Crew <ArrowRight className="ml-2" size={16} />
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