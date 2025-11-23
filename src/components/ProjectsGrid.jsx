import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid(){
  return (
    <section id="projects" className="mt-16">
      <h2 className="text-2xl font-semibold">Selected Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}
