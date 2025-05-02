const Project = require("./project");
const Documentation = require("./documentation");
const ProjectCategory = require("./project_category");
const ExperienceCategory = require("./experience_category");
const ProjectSkill = require("./project_skill");
const Skill = require("./skill");
const Experience = require("./experience");
const ExperienceSkill = require("./experience_skill");
const Award = require("./award");

// === Projects ===
Project.belongsTo(ProjectCategory, {
    foreignKey: "projectCategoryId",
    as: "category",
});
Project.belongsTo(Experience, {
    foreignKey: "experienceId",
    as: "experience",
});
Project.hasMany(Documentation, {
    foreignKey: "projectId",
    as: "documentations",
});
Project.hasMany(ProjectSkill, {
    foreignKey: "projectId",
    as: "projectSkills",
});

// === Documentations ===
Documentation.belongsTo(Project, {
    foreignKey: "projectId",
    as: "project",
});

// === Project Categories ===
ProjectCategory.hasMany(Project, {
    foreignKey: "projectCategoryId",
    as: "projects",
});

// === Project Skills ===
ProjectSkill.belongsTo(Project, {
    foreignKey: "projectId",
    as: "project",
});
ProjectSkill.belongsTo(Skill, {
    foreignKey: "skillId",
    as: "skill",
});

// === Skills ===
Skill.hasMany(ProjectSkill, {
    foreignKey: "skillId",
    as: "projectSkills",
});
Skill.hasMany(ExperienceSkill, {
    foreignKey: "skillId",
    as: "experienceSkills",
});

// === Experiences ===
Experience.hasMany(Project, {
    foreignKey: "experienceId",
    as: "projects",
});
Experience.hasMany(Award, {
    foreignKey: "experienceId",
    as: "awards",
});
Experience.hasMany(ExperienceSkill, {
    foreignKey: "experienceId",
    as: "experienceSkills",
});
Experience.belongsTo(ExperienceCategory, {
    foreignKey: "experienceCategoryId",
    as: "category",
});

// === Experience Categories ===
ExperienceCategory.hasMany(Experience, {
    foreignKey: "experienceCategoryId",
    as: "experiences",
});

// === Experience Skills ===
ExperienceSkill.belongsTo(Experience, {
    foreignKey: "experienceId",
    as: "experience",
});
ExperienceSkill.belongsTo(Skill, {
    foreignKey: "skillId",
    as: "skill",
});

// === Awards ===
Award.belongsTo(Experience, {
    foreignKey: "experienceId",
    as: "experience",
});

module.exports = {
    Project,
    Documentation,
    ProjectCategory,
    ExperienceCategory,
    ProjectSkill,
    Skill,
    Experience,
    ExperienceSkill,
    Award,
};
