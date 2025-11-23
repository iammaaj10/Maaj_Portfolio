import React from 'react';
import resumePath from '../assets/MaajResume.pdf';

export default function About(){
  return (
    <section id="about" className="mt-14">
      <div className="glass p-6 rounded-xl grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold">About Me</h3>
          <p className="mt-2 text-slate-300">
            Full-Stack developer with MERN expertise, cloud certifications, and extensive real-time app experience.
            Built MechHelp, NewsBlog and more. Strong in frontend, backend, and system design.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="/MaajResume.pdf" download className="px-4 py-2 glass rounded">Download Resume</a>
          </div>
        </div>

        <div className="flex justify-center">
          <img src="/profile.jpg" alt="Maaj" className="rounded-xl w-44 h-44 object-cover border-2 border-neon"/>
        </div>
      </div>
    </section>
  );
}
