import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import React, { useState, useEffect } from "react";

import type { Project } from '@/pages/api/getProjects';

import ProjectComponent from "@/components/project";


interface FormData {
  name: string;
  email: string;
  message: string;
}

function handleFormSubmit(e: React.FormEvent) {
  e.preventDefault();
}

export default function Home() {

  const [hideTechnologies, setHideTechnologies] = useState<boolean>(false);
  const [hideProjects, setHideProjects] = useState<boolean>(false);

  const [projects, setProjects] = useState<Project[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    fetch('/api/getProjects')
      .then(r => r.json() as Promise<Project[]>)
      .then(r => setProjects(r))
      .catch(err => console.error("An error occurred: ", err))
  }, [])

  function sendEmail() {
    if(formData.email && formData.message && formData.name) {
      fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .catch(err => console.error("An error occurred: ", err))
    }
  }

  const languages = ['Python', 'Javascript', 'PHP'];
  const databases = ['MySQL', 'PostgreSQL', 'SQLite'];
  const frontend_frameworks = ['NextJS', 'React', 'Boostrap'];
  const other_web_development = ['Prisma', 'Express', 'Flask'];
  const cloud = ['RDS', 'S3', 'CloudFront'];

  return (
    <>
    <Head>
        <title>Nicola Migone - portfolio</title>
        <meta name="description" content="Portfolio website for Nicola Migone" />
      </Head>
      <main className="bg-gradient-to-tr from-[#323d52] to-[#0f124a] text-white max-w-full">
        <section className="py-7 mx-5 flex flex-col justify-center items-center text-center text-blue-100">
          <h1 className="font-bold text-6xl">
            Ciao! <span className="animate-wave duration-1000 ease-in-out inline-block">👋</span>
          </h1>
          <h2 className="font-bold text-xl p-2">
            I&apos;m Nicola Migone, also known as nicolello, a web and Python developer.
          </h2>
          <p className="container text-center p-2">
            Besides programming, my other main interest is music: I have been playing the piano for over 13 years.
            <br />
            Watch my performance of <Link target="_blank" href="https://youtu.be/0mc2nZkwsRU" className="text-white">Chopin&apos;s <i>Ballade no.1 in G minor</i></Link>.
          </p>
          <p>
            Fun fact: I can speak three languages fluently; those are 🇮🇹, 🇪🇸 and 🇺🇸
          </p>
        </section>
        <section className="m-7 flex flex-col justify-center items-center max-w-full">
          <h1 className="text-4xl m-7">
            Technologies I&apos;ve worked with: <button className="text-sm bg-white/20 rounded-md border-0 text-blue-300" onClick={_ => {setHideTechnologies(!hideTechnologies)}}>{hideTechnologies ? "show" : "hide"}</button>
          </h1>
          <article className="max-w-full" style={{ display: hideTechnologies ? "none" : "block" }}>
            {
              [
                [languages, "Programming languages"],
                [databases, "RDBMS"],
                [frontend_frameworks, "Web development frameworks"],
                [cloud, "Cloud"],
                [other_web_development, "Others for web development"]
              ].map((arr: (string | string[])[], i:number) => {
                return <div key={i}>
                <h2 key={'tech_h3_'+i.toString()} className="text-center">
                  {arr[1]}:
                </h2>
                <div className="max-w-full overflow-x-auto">
                  <div key={'teach_div_'+i.toString()} className={`my-10 mx-5 flex flex-row _3Proj:justify-center`}>
                    {
                      // useless check, for ts
                      typeof(arr[0]) != "string" && arr[0]?.map((element: string, i: number) => <div key={"tech_image_"+i.toString()} className="w-48 h-48 relative m-3">
                      <Image className="p-3 bg-gradient-to-br to-[#ffffff40] from-[#c8c8d730] rounded-xl object-contain" src={`/${element}-logo.png`} alt={element + " logo"} height={192} width={192}/>
                    </div>)
                    }
                  </div>
                </div>
                </div>
              })
            }
          </article>
        </section>
        <section className="m-7 flex flex-col justify-center items-center max-w-full">
          <h1 className="text-4xl m-7">
            Projects <button className="text-sm border-0 text-blue-300 bg-white/20 rounded-md" onClick={_ => {setHideProjects(!hideProjects)}}>{hideProjects ? "show" : "hide"}</button>
          </h1>
          {
            !hideProjects && projects.map((p, i) => <ProjectComponent key={i} project={p}/>)
          }
        </section>
        <section className="mx-7 py-7 flex flex-col justify-center items-center max-w-full">
          <h1 className="text-4xl m-7">
            Contact me
          </h1>
          <form onSubmit={(e) => handleFormSubmit(e)} className="container max-w-2xl">
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
              <input type="name" id="name" value={formData.name} onChange={(e) => setFormData(prev => {return {...prev, name: e.target.value}})} className="bg-transparent bg-gradient-to-br to-[#ffffff40] from-[#c8c8d730] text-md rounded-lg border-0 p-2.5 w-full placeholder-white/40 text-white focus-visible:outline-none focus:border-l-2 focus-visible:border-white" placeholder="John Doe" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">Your email</label>
              <input type="email" id="email" value={formData.email} onChange={(e) => setFormData(prev => {return {...prev, email: e.target.value}})} className="bg-transparent bg-gradient-to-br to-[#ffffff40] from-[#c8c8d730] text-md rounded-lg border-0 p-2.5 w-full placeholder-white/40 text-white focus-visible:outline-none focus:border-l-2 focus-visible:border-white" placeholder="johndoe@example.com" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 text-sm font-medium  text-white">Please describe your request</label>
              <textarea id="description" value={formData.message} onChange={(e) => setFormData(prev => {return {...prev, message: e.target.value}})} className="bg-transparent bg-gradient-to-br to-[#ffffff40] from-[#c8c8d730] text-md rounded-lg border-0 p-2.5 placeholder-white/40 text-white focus-visible:outline-none focus:border-l-2 focus-visible:border-white min-h-40 h-40 w-full min-w-full max-w-full"/>
            </div>
            <div className="w-full text-right">
              <button type="submit" onClick={sendEmail} className="text-base font-medium rounded-xl bg-transparent bg-gradient-to-br to-[#ffffff40] from-[#c8c8d730] border-0 p-3 text-white mx-auto cursor-pointer" style={{ fontFamily: 'Segoe UI'}}>Submit</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
