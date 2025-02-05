import DashboardNav from "@/app/__components/DashboardNav";
import DeleteExperienceDialog from "@/app/__components/ExperienceDeleteDialog";
import EditExperienceDialog from "@/app/__components/ExperienceEditDialog";
import NewExperienceDialog from "@/app/__components/ExperienceNewDialog";
import { getExperiences } from "@/app/_actions/experience_actions";
import React from "react";

const ExperiencePage = async () => {
  const experiences = await getExperiences();

  return (
    <div>
      <DashboardNav />

      <div className=" max-w-5xl my-8 mx-auto">
        <NewExperienceDialog />
        <div className=" flex flex-col gap-2">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className=" rounded-xl bg-slate-50 border border-slate-300  px-5 py-3 w-full flex flex-wrap items-center justify-between"
            >
              <div>
                <h2 className=" font-bold mb-2">{experience.company}</h2>
                <h4 className=" mb-2">{experience.title}</h4>
                <span className=" text-slate-500 text-sm font-light">
                  {experience.period}
                </span>
              </div>
              <div className=" flex gap-2">
                <DeleteExperienceDialog id={experience.id} />
                <EditExperienceDialog
                  experience={JSON.parse(JSON.stringify(experience))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
