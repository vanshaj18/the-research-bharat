# The Research Bharat

**Building a new India, one data point at a time.**

---

## Refined Foundational Philosophy

The Research Bharat is an independent think tank dedicated to uncovering the realities shaping India through data, systems analysis, and public research.

We believe that meaningful national progress begins with clarity — understanding how our infrastructure, economy, environment, institutions, and civic systems truly function beyond headlines and political narratives.

But our mission extends beyond publishing reports.

We aim to contribute to the rebuilding of India’s intellectual and civilizational strength — in science, technology, governance, culture, environmental responsibility, and collective social thinking.

India once stood for deep inquiry, scientific curiosity, philosophical depth, and long-term societal vision. We believe those foundations still matter.

Through open research, public data tools, district-level transparency, and evidence-driven analysis, The Research Bharat works toward a future where development is intelligent, accountable, sustainable, and rooted in responsibility to both people and nature.

We do not believe growth must come through destruction.  
We believe progress and preservation can coexist.

Our work is built on one principle:

> **A stronger nation is built when citizens can clearly see the systems that shape their lives.**

---

## Aims

The Research Bharat pursues a long-horizon vision: a **data-literate India from 2026 to 2050** — research growth, civic clarity, and national advancement.

### What we work toward

- **Transparency at district scale** — machine-readable public data citizens can trace
- **Research acceleration** — independent analysis that enters classrooms, newsrooms, and policy debate
- **Evidence in government** — legislation and programs with published assumptions and open scrutiny
- **Live accountability** — comparable indices across districts for safety, health, and infrastructure
- **Regional knowledge leadership** — open standards shared across South Asia
- **A data-sovereign democracy by 2050** — where every citizen can read the budget that shapes their life

### How we pursue it

| Aim | Description |
|-----|-------------|
| **Uncover what is buried** | Surface datasets, filings, and indicators that never make the headline—but shape outcomes for millions |
| **Publish with rigor** | Source every claim, state every method, write for decision-makers who need clarity, not spin |
| **Scale through tools** | Offer interactive indices and open instruments so anyone can verify and extend our work |

We stand alongside India’s established research institutions—ORF, CPR, ICRIER, Gateway House, CSDS—while focusing on **subnational transparency** and **citizen-scale data**.

---

## Content topics

Our research is organised around four core areas. Each topic connects to open data, published analysis, and—where relevant—interactive tools.

### Technology

Digital public infrastructure, AI governance, connectivity gaps, and how technology reshapes access to state services at district scale.

### Infrastructure

Roads, power, transit, and the built environment—budget lines, delivery delays, and equity across rural and urban districts.

### Water · Trees · Air

Groundwater, forest cover, air quality, and climate stressors tracked against policy commitments and on-the-ground outcomes.

### Indexes

Composite measures built for verification and extension—household income, fiscal burden, public safety, and policy history. This lane links directly to our open instruments below.

---

## Tools

Public, interactive instruments for hands-on analysis. Each tool states its assumptions and invites replication.

| Tool | Path | Purpose |
|------|------|---------|
| **Household Income Index** | `/tools/ghi` | Poverty benchmarks and household economics—run scenarios from income and household size |
| **Tax Policy Estimator** | `/tools/tax` | Estimate tax burden under filing status, income, and deductions |
| **Public Safety Data** | `/tools/crime` | Explore crime-rate data by city and state; read what official series show beneath headlines |
| **Policy History Lab** | `/tools/history` | Guided lessons through policy evolution and the data trail behind major shifts |

Tools are accessible from the site navigation under **Tools**, and from the **Indexes** topic on the home page.

---

## Pages

The Research Bharat site brings philosophy, research, and instruments together in one place.

| Page | Path | What you’ll find |
|------|------|------------------|
| **Home** | `/` | Hero, core research topics, and the 2026–2050 vision timeline |
| **Publications** | `/publications` | Issue briefs, research papers, special reports, and working papers |
| **LookPublic** | `/lookpublic` | District-level civic data via our partner [ForThePeople.in](https://forthepeople.in/en)—budgets, schemes, crop prices, water levels, and more |
| **Blog** | `/blog` | Research notes and essays on transparency, methodology, and India’s research landscape |
| **Contact** | `/contact` | Inquiries, collaborations, corrections, and early access requests |
| **Household Income Index** | `/tools/ghi` | Open income and poverty analysis |
| **Tax Policy Estimator** | `/tools/tax` | Fiscal burden calculator |
| **Public Safety Data** | `/tools/crime` | Crime-rate explorer |
| **Policy History Lab** | `/tools/history` | Interactive policy history lessons |

### Home sections

On the landing page, anchored sections include:

- **Core topics** — Technology, Infrastructure, Water · Trees · Air, Indexes
- **Vision** — Milestones from 2026 to 2050 and our three operational pillars

### Publications (current catalogue)

- *The District Fiscal Transparency Gap in India* — Issue Brief
- *Household Income and Poverty Benchmarks: A Method Note* — Research Paper
- *Public Safety Trends: Reading the Data Beneath Headlines* — Special Report
- *Open Data and District Governance in India* — Working Paper

### LookPublic · data partner

**ForThePeople.in** is an independent citizen transparency platform—not a government service. Through LookPublic, researchers access district-level budgets, schemes, and verified public sources built for ground-truth analysis.

---

*The Research Bharat · Independent think tank · Open research for a data-literate India*

---

## Development

```bash
npm install
cp env.example .env.local   # add GOOGLE_CHAT_WEBHOOK_URL; optional NEXT_PUBLIC_SITE_URL
npm run dev
```

## Hosting (not deployed yet)

The app is **hosting-ready** (production build, env template, security headers, sitemap/robots). See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the go-live checklist when you are ready to deploy.
