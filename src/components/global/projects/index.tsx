import { Project } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/constants";
import ProjectCard from "../project-card";

type Props = {
  projects: Project[];
};

function Projects({ projects }: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id} // Fixed: `id` is not defined; use project.id
          title={project?.title}
          projectId={project?.id}
          createdAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project.themeName}
          
        />
      ))}
    </motion.div>
  );
}

export default Projects;