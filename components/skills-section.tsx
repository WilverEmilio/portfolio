const skillCategories = [
  {
    category: "Cloud Platforms",
    skills: ["AWS", "Azure", "Google Cloud", "DigitalOcean"],
  },
  {
    category: "Containers & Orchestration",
    skills: ["Docker", "Kubernetes", "Helm", "Podman"],
  },
  {
    category: "Infrastructure as Code",
    skills: ["Terraform", "Ansible", "Pulumi", "CloudFormation"],
  },
  {
    category: "CI/CD & DevOps",
    skills: ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"],
  },
  {
    category: "Monitoring & Observability",
    skills: ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
  },
  {
    category: "Programming & Scripting",
    skills: ["Python", "Bash", "Go", "TypeScript"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-foreground hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
