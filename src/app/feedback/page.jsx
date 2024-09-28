"use client"
import React from 'react'

export default function page({searchParams}) {
  console.log('searchParams--',searchParams);
  return (
    <section className="h-screen px-2 bg-black text-white">
      <div className="mx-auto max-w-7xl py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h1 className="text-2xl font-bold text-gray-200">Instructions</h1>
            <p className="mt-6 text-sm">
            Need to participate
            </p>
          </div>
          <div className=" mt-10 lg:col-span-7 lg:mt-0">
            <dl>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mt-10 first:mt-0">
                  <dt className="text-lg font-semibold leading-6 ">
                    How do I get started?
                  </dt>
                  <dd className="mt-2 text-sm">
                    Need to participate
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
