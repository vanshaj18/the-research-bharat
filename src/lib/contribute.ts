import { CONTACT_ROUTE } from "@/lib/routes";

export const REPO_URL = "https://github.com/vanshaj18/researchIndia";
export const FORTHEPEOPLE_URL = "https://forthepeople.in/en";

export const CONTRIBUTION_PATHS = [
  {
    id: "codebase",
    title: "Codebase",
    summary:
      "The Research Bharat is open source. Contribute fixes, features, data pipelines, tool logic, or documentation.",
    steps: [
      "Browse the repository and open issues for bugs or small improvements.",
      "Fork the repo, branch from main, and keep pull requests focused.",
      "Run npm run lint and npm run build locally before submitting.",
      "Describe what changed, why, and how you tested it.",
    ],
    cta: { label: "View on GitHub", href: REPO_URL, external: true },
  },
  {
    id: "topic-suggestion",
    title: "Topic suggestion",
    summary:
      "Propose a new research lane, district theme, or index we should build—especially where public data exists but synthesis does not.",
    steps: [
      "Name the topic and the decision it should inform.",
      "List datasets, government sources, or news references we should trace.",
      "Note districts or states where ground-truth validation matters.",
      "Send via the contact form with purpose “Suggestion”.",
    ],
    cta: { label: "Suggest a topic", href: CONTACT_ROUTE, external: false },
  },
  {
    id: "coauthor",
    title: "Co-author",
    summary:
      "Partner on issue briefs, method notes, or special reports. We credit every contributor and publish sources and methods openly.",
    steps: [
      "Share your domain—economics, environment, public finance, regional policy, or methods.",
      "Propose a publication outline or offer to review an in-progress draft.",
      "Commit to verifiable citations and reproducible analysis.",
      "Reach out via the contact form with purpose “Contribution”.",
    ],
    cta: { label: "Propose collaboration", href: CONTACT_ROUTE, external: false },
  },
  {
    id: "data-contributor",
    title: "Data contributor",
    summary:
      "Submit datasets, survey results, corrections, or district-level ground truth. We trace every field to its source.",
    steps: [
      "Describe the dataset: geography, time range, collection method, and license.",
      "Attach sample rows or a link; never send personal data without consent.",
      "Flag corrections to existing tools or publications with the source URL.",
      "Use the contact form with purpose 'Data Contribution' for civic submissions, or contact us for research datasets.",
    ],
    cta: {
      label: "Data Submission",
      href: CONTACT_ROUTE,
      external: false,
    },
  },
] as const;
