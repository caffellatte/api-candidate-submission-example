export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "API Candidate Submission Example",
  description:
    "Minimal example of a app that submits a candidate application to an API endpoint.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Form",
      href: "/form",
    },
  ],

  links: {
    github: "https://github.com/caffellatte/api-candidate-submission-example",
  },
};
