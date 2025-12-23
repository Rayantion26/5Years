import React from 'react';

const ProjectCard = ({ title, description, tags, delay }) => {
    return (
        <div
            className="
            group relative p-8 rounded-xl
            bg-white/5 backdrop-blur-md border border-white/10
            hover:bg-white/10 hover:border-neon-cyan/50
            transition-all duration-500
            flex flex-col gap-4
            transform hover:-translate-y-2
        "
        >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

            <h3 className="text-2xl font-bold font-display text-white group-hover:text-neon-cyan transition-colors z-10">{title}</h3>
            <p className="text-gray-400 font-mono text-sm leading-relaxed z-10">{description}</p>

            <div className="flex flex-wrap gap-2 mt-auto z-10">
                {tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;
