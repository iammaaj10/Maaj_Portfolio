import React from 'react';

export default function Contact(){
  return (
    <section id="contact" className="mt-14">
      <div className="glass p-6 rounded-xl">
        <h3 className="text-xl font-semibold">Contact</h3>
        <p className="text-slate-300 mt-2">Email: maajb1122@gmail.com • Phone: 9130304068</p>
        <form className="mt-4 grid md:grid-cols-2 gap-4">
          <input className="p-2 rounded bg-transparent border border-white/6" placeholder="Name" />
          <input className="p-2 rounded bg-transparent border border-white/6" placeholder="Email" />
          <textarea className="md:col-span-2 p-2 rounded bg-transparent border border-white/6" placeholder="Message" rows="4"></textarea>
          <button className="md:col-span-2 px-4 py-2 bg-neon/10 rounded">Send</button>
        </form>
      </div>
    </section>
  );
}
