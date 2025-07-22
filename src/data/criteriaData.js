// src/data/criteriaData.js
export const criteriaData = {
  government: [
    {
      id: "GOV1",
      title: "Legal Eligibility",
      sub: [
        {
          label: "Registered Entity Proof",
          description: "Certificate of Incorporation/Registration.",
        },
        {
          label: "Tax Compliance",
          description: "Valid GST, PAN, and income tax clearance.",
        },
        {
          label: "Blacklisting Declaration",
          description: "Affidavit of not being blacklisted.",
        },
        {
          label: "EMD Submission",
          description: "Proof of Earnest Money Deposit (if required).",
        },
        {
          label: "ESI/EPF Registration",
          description: "Proof of ESI & EPF compliance (for manpower tenders).",
        },
      ],
    },
    {
      id: "GOV2",
      title: "Technical Approach & Work Plan",
      sub: [
        {
          label: "Methodology",
          description: "Detailed approach and methodology.",
        },
        {
          label: "Implementation Timeline",
          description: "Work breakdown structure and schedule.",
        },
        {
          label: "Resource Deployment Plan",
          description: "Manpower, equipment and logistics plan.",
        },
        {
          label: "Quality Control Methods",
          description: "Proposed QC/QA processes and standards.",
        },
      ],
    },
    {
      id: "GOV3",
      title: "Relevant Experience",
      sub: [
        {
          label: "Similar Assignments",
          description:
            "List of similar government/comparable projects with documentary proof.",
        },
        {
          label: "Completion Certificates",
          description: "Valid work/completion certificates from clients.",
        },
        {
          label: "Client References",
          description:
            "Reference letters or emails from previous government customers.",
        },
      ],
    },
    {
      id: "GOV4",
      title: "Financial Capacity",
      sub: [
        {
          label: "Annual Turnover",
          description: "Audited turnovers for last 3 years.",
        },
        {
          label: "Net Worth",
          description: "Positive net worth and balance sheets.",
        },
        {
          label: "Profit/Loss Statements",
          description: "Profit & loss for three consecutive years.",
        },
        {
          label: "No Loan Default",
          description: "Banker certificate or self-declaration.",
        },
      ],
    },
    {
      id: "GOV5",
      title: "Personnel Qualification",
      sub: [
        {
          label: "Key Staff CVs",
          description: "CVs of Project Manager/Leads and domain specialists.",
        },
        {
          label: "Certifications",
          description: "Technical certifications, if required.",
        },
        {
          label: "Organizational Chart",
          description: "Roles/responsibility structure.",
        },
      ],
    },
    {
      id: "GOV6",
      title: "Legal & Statutory Compliance",
      sub: [
        {
          label: "Labour Laws Compliance",
          description: "Compliance to CLRA, Minimum Wages, etc.",
        },
        {
          label: "Contract Act Acceptance",
          description: "Acceptance of model contract terms.",
        },
        {
          label: "Insurance Cover",
          description: "Professional Liability, Workmen Compensation, etc.",
        },
        {
          label: "Indemnity",
          description: "Willingness to indemnify client against claims.",
        },
      ],
    },
    {
      id: "GOV7",
      title: "Social & Local Content",
      sub: [
        {
          label: "Local Sourcing",
          description: "Preference for local suppliers/manpower.",
        },
        {
          label: "Inclusion of Minorities",
          description: "Policies for hiring women/minorities/disabled.",
        },
      ],
    },
    {
      id: "GOV8",
      title: "Sustainability & Environment",
      sub: [
        {
          label: "Environment-Friendly Practices",
          description: "Waste management, pollution control, etc.",
        },
        {
          label: "Sustainable Materials",
          description: "Use of green or recycled materials, where applicable.",
        },
      ],
    },
    {
      id: "GOV9",
      title: "Health & Safety",
      sub: [
        {
          label: "Safety Policy",
          description: "Company OHS/Environment & Safety protocols.",
        },
        {
          label: "Incident Reporting",
          description: "Disclosure of past incidents and safety records.",
        },
      ],
    },
    {
      id: "GOV10",
      title: "Innovation/Value Added Services",
      sub: [
        {
          label: "Digital Initiatives",
          description: "Use of IT, digital solutions, cost savings.",
        },
        {
          label: "Additional Features",
          description: "Other value-additions to original scope.",
        },
      ],
    },
  ],
  business: [
    {
      id: "BUS1",
      title: "Company Credentials",
      sub: [
        {
          label: "Registration Documents",
          description: "Incorporation/partnership proof.",
        },
        { label: "GST/PAN", description: "Copy of GST, PAN, local licenses." },
        {
          label: "MSME Registration",
          description: "If applicable, MSME/enlistment registration.",
        },
      ],
    },
    {
      id: "BUS2",
      title: "Product/Service Capabilities",
      sub: [
        {
          label: "Technical Brochure",
          description: "Detailed product specifications and portfolio.",
        },
        {
          label: "Unique Features",
          description: "Highlight differentiators over competitors.",
        },
        {
          label: "Samples/Demos",
          description: "Sample submission, demo request if warranted.",
        },
      ],
    },
    {
      id: "BUS3",
      title: "Financials",
      sub: [
        {
          label: "Last 2 Years Turnover",
          description: "Audited financials for past 2 years.",
        },
        {
          label: "Bank Solvency",
          description: "Bank statement/certificate of solvency.",
        },
        {
          label: "Pricing Structure",
          description: "Unit price, discounts, escalation clauses.",
        },
      ],
    },
    {
      id: "BUS4",
      title: "Commercial Terms",
      sub: [
        {
          label: "Payment Terms",
          description: "Advance, milestone, and final payment terms.",
        },
        { label: "Warranty/Guarantee", description: "Warranty period, T&C." },
        {
          label: "Cancellation & Delivery Policy",
          description: "Penalties and delivery schedules.",
        },
      ],
    },
    {
      id: "BUS5",
      title: "Market Experience",
      sub: [
        {
          label: "Reference Projects",
          description: "Similar sector experience with PO/WO.",
        },
        {
          label: "Client Testimonials",
          description: "Feedback/references from three business clients.",
        },
        {
          label: "Awards/Certifications",
          description: "Recognition, certifications relevant to business.",
        },
      ],
    },
    {
      id: "BUS6",
      title: "Logistics/Distribution",
      sub: [
        {
          label: "Delivery Lead Time",
          description: "Typical timeline post-order.",
        },
        {
          label: "Distribution Network",
          description: "Locations, stockists, last-mile ability.",
        },
      ],
    },
    {
      id: "BUS7",
      title: "Risk & Compliance",
      sub: [
        {
          label: "Risk Mitigation",
          description: "Plan for supply chain/failure risks.",
        },
        {
          label: "Statutory Compliance",
          description: "Proof of labour, environment, tax compliance.",
        },
      ],
    },
    {
      id: "BUS8",
      title: "Support/After Sales",
      sub: [
        {
          label: "Customer Support",
          description: "Details of post-sale support.",
        },
        {
          label: "Maintenance SLAs",
          description: "SLA commitments for business services.",
        },
        {
          label: "Replacement/Return Policy",
          description: "Process & timelines for defective items.",
        },
      ],
    },
    {
      id: "BUS9",
      title: "Digital/Process Innovation",
      sub: [
        {
          label: "IT-enabled Value Add",
          description: "Online ordering, tracking, inventory automation.",
        },
      ],
    },
  ],
  healthcare: [
    {
      id: "HC1",
      title: "Regulatory Compliance",
      sub: [
        {
          label: "CDSCO/FDA Approvals",
          description:
            "Product registration (drugs/devices) with CDSCO, FDA, EU, etc.",
        },
        {
          label: "Quality Certifications",
          description: "ISO 13485, WHO-GMP, NABH accreditation proof.",
        },
        {
          label: "Essential Licenses",
          description: "Medical waste, shop/establishment, etc.",
        },
        {
          label: "No Blacklisting Declaration",
          description: "Self-declaration letter.",
        },
      ],
    },
    {
      id: "HC2",
      title: "Technical/Product Specifications",
      sub: [
        {
          label: "Detailed Specs",
          description: "Brochure/datasheet for each item.",
        },
        {
          label: "Compatibility",
          description: "Demo of compatibility with existing hospital infra.",
        },
        {
          label: "Clinical Efficacy Data",
          description: "Supporting efficacy/clinical safety trials/certs.",
        },
        {
          label: "Batch/Lot Details",
          description:
            "Manufacturing, expiry, lot number details (for consumables).",
        },
      ],
    },
    {
      id: "HC3",
      title: "Experience & Performance",
      sub: [
        {
          label: "Similar Project List",
          description: "Hospitals/healthcare installs with volume.",
        },
        {
          label: "Reference Letters",
          description: "Three references from major hospitals/past clients.",
        },
        {
          label: "Performance Certificates",
          description: "Functional performance feedback.",
        },
      ],
    },
    {
      id: "HC4",
      title: "Financial Criteria",
      sub: [
        {
          label: "Annual Turnover (Healthcare)",
          description:
            "Proof of minimum turnover in healthcare category, last 3 years.",
        },
        {
          label: "Price Competitiveness",
          description: "Offer detailed price breakup, with taxes.",
        },
        {
          label: "Net Worth",
          description: "Audited balance sheet and profit/loss.",
        },
      ],
    },
    {
      id: "HC5",
      title: "Safety & Standards",
      sub: [
        {
          label: "AERB/Radiation Clearance",
          description: "If applicable, submit AERB clearance.",
        },
        {
          label: "Infection Control",
          description: "Sterilization/disposable handling SOP.",
        },
        {
          label: "Health & Safety Policy",
          description: "OH&S system for staff & patients.",
        },
      ],
    },
    {
      id: "HC6",
      title: "Supply Chain & Logistics",
      sub: [
        {
          label: "Lead Time",
          description: "Commitment for urgent/emergency delivery.",
        },
        {
          label: "Inventory Management",
          description: "Cold chain, expiry, and stock rotation plan.",
        },
        {
          label: "Packaging & Labelling",
          description: "Details for all deliveries.",
        },
      ],
    },
    {
      id: "HC7",
      title: "After Sales & Training",
      sub: [
        {
          label: "User/Staff Training",
          description: "Detailed training for hospital/clinic staff.",
        },
        {
          label: "Maintenance/SLA",
          description: "Service uptime and AMC details.",
        },
        {
          label: "Replacement During Warranty",
          description: "Rapid replacement for failed devices.",
        },
      ],
    },
    {
      id: "HC8",
      title: "Sustainability & Waste",
      sub: [
        {
          label: "Medical Waste Management",
          description: "Policy and evidence of safe disposal.",
        },
        {
          label: "Eco-Friendly Materials",
          description: "Use of biodegradable packaging.",
        },
      ],
    },
    {
      id: "HC9",
      title: "Social & Local Contribution",
      sub: [
        {
          label: "Local Manufacture",
          description: "Preference for Indian/local production.",
        },
        {
          label: "Inclusion Initiatives",
          description:
            "Workforce policies (minority/women/disabled inclusion).",
        },
      ],
    },
  ],
  companies: [
    {
      id: "CO1",
      title: "Corporate Registration",
      sub: [
        {
          label: "Certificate of Incorporation",
          description: "Copy of ROC, MoA/AoA.",
        },
        {
          label: "Board Resolution",
          description: "Authority to sign bids/agreements.",
        },
        {
          label: "Shareholding Pattern",
          description: "Disclosures of major shareholders.",
        },
      ],
    },
    {
      id: "CO2",
      title: "Business Offer Fit",
      sub: [
        {
          label: "Proposal Scope",
          description: "Fitment to business’ RFP/SOW.",
        },
        {
          label: "Product/Service Features",
          description: "Detailed features/specifications.",
        },
        {
          label: "Proof of Concept",
          description: "Case studies or demo available.",
        },
      ],
    },
    {
      id: "CO3",
      title: "Financial Health",
      sub: [
        {
          label: "Audited Results",
          description: "Latest three audited balance sheets.",
        },
        {
          label: "Profitability Track",
          description: "EBIT/EBITDA and net profit history.",
        },
        {
          label: "Creditworthiness",
          description: "Proof of no loan default, if required.",
        },
      ],
    },
    {
      id: "CO4",
      title: "Track Record",
      sub: [
        {
          label: "Similar Clients",
          description: "Evidence of work for comparable corporates.",
        },
        {
          label: "Reference Letters",
          description: "Two previous clients’ references.",
        },
        {
          label: "Review Ratings",
          description: "Published online/third-party reviews.",
        },
      ],
    },
    {
      id: "CO5",
      title: "Technical Staff & Certifications",
      sub: [
        {
          label: "Employee Qualifications",
          description: "Lead team’s resumes/certifications.",
        },
        {
          label: "ISO/QA Systems",
          description: "Relevant ISO/QA practice certificates.",
        },
      ],
    },
    {
      id: "CO6",
      title: "Price/Value",
      sub: [
        {
          label: "Cost Structure",
          description: "Clear pricing details, all-inclusive.",
        },
        {
          label: "Discounts & Offers",
          description: "Volume/loyalty discounts.",
        },
        {
          label: "Value Additions",
          description: "Extra services beyond base scope.",
        },
      ],
    },
    {
      id: "CO7",
      title: "Contractual/Legal Compliance",
      sub: [
        {
          label: "Acceptance of T&Cs",
          description: "Acceptance of client’s model contract/ToS.",
        },
        {
          label: "Confidentiality/NDAs",
          description: "Sample NDAs or security polices.",
        },
      ],
    },
    {
      id: "CO8",
      title: "CSR/ESG Commitments",
      sub: [
        {
          label: "CSR Spends/Reports",
          description: "CSR compliance under Companies Act.",
        },
        {
          label: "Sustainability Reporting",
          description: "ESG/green commitments disclosure.",
        },
      ],
    },
    {
      id: "CO9",
      title: "Delivery, Training & Support",
      sub: [
        {
          label: "Implementation Timeline",
          description: "Timeframes and project milestones.",
        },
        { label: "Support/Helpdesk", description: "Tech/maintenance support." },
        {
          label: "End-User Training",
          description: "Training for client’s staff.",
        },
      ],
    },
  ],
  construction: [
    {
      id: "CON1",
      title: "Registration & Statutory Proofs",
      sub: [
        {
          label: "Contractor License",
          description: "CPWD, PWD, etc. registration.",
        },
        { label: "GST & PAN Proofs", description: "Current GST, PAN, etc." },
        { label: "Labour Licenses", description: "CLRA, ESI, EPF proof." },
      ],
    },
    {
      id: "CON2",
      title: "Past Project Experience",
      sub: [
        {
          label: "Similar Works List",
          description: "Details of projects (last 5 years).",
        },
        {
          label: "Completion Certificates",
          description: "Certified by reputed clients.",
        },
        {
          label: "Site Photographs",
          description: "Photographic proof of key projects.",
        },
      ],
    },
    {
      id: "CON3",
      title: "Financial Criteria",
      sub: [
        {
          label: "Turnover",
          description: "Minimum average turnover (last 3 years).",
        },
        {
          label: "Net Worth & Solvency",
          description: "CA-audited statement and banker’s certificate.",
        },
      ],
    },
    {
      id: "CON4",
      title: "Technical Plan & Methodology",
      sub: [
        {
          label: "Work Method",
          description: "Stepwise execution methodology.",
        },
        {
          label: "Materials Sourcing Plan",
          description: "Source and type of construction material.",
        },
        {
          label: "Site Management",
          description: "Safety, layout, sanitation policies.",
        },
      ],
    },
    {
      id: "CON5",
      title: "Manpower & Equipment",
      sub: [
        {
          label: "Site Engineer Credentials",
          description: "Key technical staff bio-data.",
        },
        {
          label: "Machinery Deployment",
          description: "Own/hire plan with registration.",
        },
        {
          label: "Labour Welfare",
          description: "Shelters, PPE, insurance, etc.",
        },
      ],
    },
    {
      id: "CON6",
      title: "Timelines & Penalty Clauses",
      sub: [
        {
          label: "Gantt Chart/Timeline",
          description: "Clear major milestones and schedule.",
        },
        {
          label: "Delay Penalty Acceptance",
          description: "Willingness to accept penalties.",
        },
      ],
    },
    {
      id: "CON7",
      title: "Quality Assurance",
      sub: [
        {
          label: "Test Certificates",
          description: "Materials test reports as per IS codes.",
        },
        { label: "QA/QC Plan", description: "Standard QC procedures adopted." },
      ],
    },
    {
      id: "CON8",
      title: "Health, Safety & Environment",
      sub: [
        {
          label: "Safety Protocols",
          description: "Site safety supervisor/incident register.",
        },
        {
          label: "Environmental Compliance",
          description: "Dust, noise, waste SOP.",
        },
      ],
    },
    {
      id: "CON9",
      title: "Insurance",
      sub: [
        {
          label: "Project Insurance",
          description: "Policy for site damage/third party liability.",
        },
        {
          label: "Worker Insurance",
          description: "Workmen compensation proof.",
        },
      ],
    },
    {
      id: "CON10",
      title: "After-Sale/Warranty",
      sub: [
        {
          label: "Defect Liability",
          description: "Acceptance of defect liability period/T&Cs.",
        },
      ],
    },
  ],
  transportation: [
    {
      id: "TRANS1",
      title: "Legal & Statutory Compliance",
      sub: [
        {
          label: "Transporter License",
          description: "Valid national/State permit.",
        },
        {
          label: "Vehicle Registration & Fitness",
          description: "All vehicle RC, fitness, insurance.",
        },
        {
          label: "Driver License Verification",
          description: "Drivers with valid LMV/HMV/RTO licenses.",
        },
      ],
    },
    {
      id: "TRANS2",
      title: "Fleet Details",
      sub: [
        {
          label: "Fleet Size & Model",
          description: "List of owned vehicles with make/year.",
        },
        {
          label: "GPS Tracking",
          description: "Fitted GPS, real-time tracking availability.",
        },
        {
          label: "Spare Capacity",
          description: "Ability to scale up at short notice.",
        },
      ],
    },
    {
      id: "TRANS3",
      title: "Experience in Transportation",
      sub: [
        {
          label: "Major Assignments List",
          description: "Experience with large clients/govt/PSUs.",
        },
        {
          label: "Reference Letters",
          description: "At least two letters from past clients.",
        },
      ],
    },
    {
      id: "TRANS4",
      title: "Financial Strength",
      sub: [
        {
          label: "Turnover (Logistics)",
          description: "Turnover in transportation segment.",
        },
        { label: "Profit/Loss", description: "Audited P&L for last 3 years." },
      ],
    },
    {
      id: "TRANS5",
      title: "Safety & Compliance",
      sub: [
        {
          label: "Accident Record",
          description: "Disclosure of fleet’s accident history.",
        },
        {
          label: "Vehicle Maintenance",
          description: "Preventive maintenance adherence.",
        },
        {
          label: "Cargo Insurance",
          description: "Whether goods-in-transit are insured.",
        },
      ],
    },
    {
      id: "TRANS6",
      title: "Environmental Practices",
      sub: [
        {
          label: "Pollution Under Control",
          description: "PUC certificate for each vehicle.",
        },
        {
          label: "Green Initiatives",
          description:
            "Use of fuel-efficient/alternative-fuel vehicles, if any.",
        },
      ],
    },
    {
      id: "TRANS7",
      title: "Service Level",
      sub: [
        {
          label: "Delivery Timeline",
          description: "Average transit times and reliability.",
        },
        {
          label: "24/7 Support",
          description: "Hotline, dashboard, real-time updates.",
        },
      ],
    },
    {
      id: "TRANS8",
      title: "Staff Training & Management",
      sub: [
        {
          label: "Driver Training",
          description: "Defensive driving, safety training.",
        },
        {
          label: "Background Checks",
          description: "Staff verification and escalation process.",
        },
      ],
    },
    {
      id: "TRANS9",
      title: "Innovation/Cost Saving",
      sub: [
        {
          label: "Tech Enablement",
          description: "E-POD, e-invoicing, route optimization.",
        },
        {
          label: "Value Added Services",
          description: "Warehousing, packing, tracking.",
        },
      ],
    },
  ],
  it: [
    {
      id: "IT1",
      title: "Company Registration & Certifications",
      sub: [
        {
          label: "Incorporation Certificates",
          description: "Company registration documents.",
        },
        {
          label: "IT/ISO Certifications",
          description: "ISO 9001, ISO 27001, CMMI, STQC, or similar.",
        },
        { label: "STPI/SEZ Status", description: "If applicable." },
      ],
    },
    {
      id: "IT2",
      title: "Technical Solution",
      sub: [
        {
          label: "Solution Architecture",
          description: "Detailed technical architecture documents.",
        },
        {
          label: "Tech Stack Details",
          description: "Software, hardware, middleware, etc.",
        },
        {
          label: "Scalability",
          description: "Provisions for scaling the solution.",
        },
        {
          label: "Proof of Concept",
          description: "Demo environments or POCs.",
        },
      ],
    },
    {
      id: "IT3",
      title: "Past IT Projects",
      sub: [
        {
          label: "Major Reference Sites",
          description: "Evidence of completed, similar IT projects.",
        },
        {
          label: "Client Letters",
          description: "Success stories/testimonials.",
        },
        {
          label: "Timely Completion",
          description: "Evidence of on-time project delivery.",
        },
      ],
    },
    {
      id: "IT4",
      title: "Team Experience",
      sub: [
        {
          label: "Key Personnel",
          description:
            "CVs of software architect, project manager, business analysts, developers.",
        },
        {
          label: "Certifications",
          description: "Technology certifications (AWS, Azure, SAP, etc.).",
        },
        {
          label: "Bench Strength",
          description: "Ability to allocate backup resource.",
        },
      ],
    },
    {
      id: "IT5",
      title: "Information Security",
      sub: [
        {
          label: "Data Security Plan",
          description: "Describe network/app/data security controls.",
        },
        {
          label: "GDPR/IT Act Compliance",
          description: "Ensure legal digital compliance.",
        },
      ],
    },
    {
      id: "IT6",
      title: "SLA & Support",
      sub: [
        { label: "SLA Draft", description: "Sample Service Level Agreement." },
        {
          label: "Helpdesk Support",
          description: "Support escalation mechanisms.",
        },
        {
          label: "User Training",
          description: "Training plan for client staff users.",
        },
      ],
    },
    {
      id: "IT7",
      title: "Financials & Pricing",
      sub: [
        {
          label: "Turnover (IT Only)",
          description: "Segment-wise turnover/financials.",
        },
        {
          label: "Pricing Model",
          description: "Breakup: license, AMC, customization, etc.",
        },
      ],
    },
    {
      id: "IT8",
      title: "Compliance & IP Protection",
      sub: [
        {
          label: "Licenses",
          description: "OEM/third party licenses in scope.",
        },
        {
          label: "Non-Disclosure/Confidentiality",
          description: "Sample NDA/Confidentiality agreements.",
        },
      ],
    },
    {
      id: "IT9",
      title: "Green IT/CSR",
      sub: [
        {
          label: "Energy Efficient Infra",
          description: "Commitment to sustainable IT infra.",
        },
        {
          label: "CSR Initiatives",
          description: "CSR spends on digital literacy, inclusion, etc.",
        },
      ],
    },
  ],
  retail: [
    {
      id: "RET1",
      title: "Business Credentials",
      sub: [
        {
          label: "Trade/Shop License",
          description: "Municipal/State license copy.",
        },
        { label: "GST & PAN", description: "Proof of up-to-date GST/PAN." },
        {
          label: "MSME/Udyam, if any",
          description: "Self-certification/registration as MSME.",
        },
      ],
    },
    {
      id: "RET2",
      title: "Product Assortment/Quality",
      sub: [
        {
          label: "Catalogue & Specs",
          description: "Product brochure, category-wise.",
        },
        {
          label: "Certifications (ISI/ISO etc.)",
          description: "Product quality & safety certs.",
        },
        {
          label: "Samples",
          description: "Sample product submission for select items.",
        },
      ],
    },
    {
      id: "RET3",
      title: "Market Reach",
      sub: [
        {
          label: "Stores/Franchise List",
          description: "Geographical footprint.",
        },
        {
          label: "Online/Omnichannel",
          description: "Ability for e-commerce delivery/sales.",
        },
        {
          label: "Direct Distribution",
          description: "Own distribution/last-mile supply.",
        },
      ],
    },
    {
      id: "RET4",
      title: "Experience",
      sub: [
        {
          label: "Major B2B Clients",
          description: "References from large institutional buyers.",
        },
        {
          label: "Awards & Accolades",
          description: "Retail/industry awards in last 3 years.",
        },
      ],
    },
    {
      id: "RET5",
      title: "Pricing & Offers",
      sub: [
        {
          label: "Price Breakup",
          description: "Category/product-wise detailed price list.",
        },
        {
          label: "Seasonal Offers",
          description: "Discount/bulk schemes, if applicable.",
        },
      ],
    },
    {
      id: "RET6",
      title: "Compliance",
      sub: [
        {
          label: "Customer Protection Policy",
          description: "Adherence to consumer protection regulations.",
        },
        {
          label: "FSSAI, Drug License (if reqd)",
          description: "Depending on product portfolio.",
        },
      ],
    },
    {
      id: "RET7",
      title: "Supply/Delivery Service",
      sub: [
        {
          label: "Delivery Timeline",
          description: "TAT from order to doorstep.",
        },
        {
          label: "Packaging Standards",
          description: "Quality of packaging/handling.",
        },
      ],
    },
    {
      id: "RET8",
      title: "Sustainability & Inclusion",
      sub: [
        {
          label: "Green Packaging",
          description: "Use of biodegradable/eco materials.",
        },
        {
          label: "Diversity Hiring",
          description: "Hiring & inclusion standards.",
        },
      ],
    },
    {
      id: "RET9",
      title: "Digital Capabilities",
      sub: [
        {
          label: "POS/ERP Integration",
          description: "Use of IT in supply chain, billing, etc.",
        },
        {
          label: "Tech Innovations",
          description: "Contactless/AI/online features.",
        },
      ],
    },
  ],
  manufacturing: [
    {
      id: "MAN1",
      title: "Company Credentials",
      sub: [
        {
          label: "Registration",
          description: "Factory License/MSME/ISO certification.",
        },
        {
          label: "Statutory Licenses",
          description: "Pollution Board/NOC etc., if required.",
        },
      ],
    },
    {
      id: "MAN2",
      title: "Product Standards",
      sub: [
        {
          label: "Compliance Certification",
          description: "ISI/BIS/ISO and relevant product certs.",
        },
        {
          label: "Product Brochure",
          description: "Detailed technical parameters.",
        },
      ],
    },
    {
      id: "MAN3",
      title: "Past Experience",
      sub: [
        {
          label: "Major Supplies List",
          description: "Clients/industries served with quantities.",
        },
        {
          label: "Client References",
          description: "References from three industry buyers.",
        },
      ],
    },
    {
      id: "MAN4",
      title: "Quality Assurance",
      sub: [
        {
          label: "QA/QC Plan",
          description: "In-house quality systems and standards.",
        },
        {
          label: "Test Reports",
          description: "Third-party QC/QA certificates, if any.",
        },
      ],
    },
    {
      id: "MAN5",
      title: "Financial Strength",
      sub: [
        {
          label: "Turnover",
          description: "Minimum required turnover (last 3 years).",
        },
        {
          label: "Solvency Reports",
          description: "Banker's certificate/cash-flow statement.",
        },
      ],
    },
    {
      id: "MAN6",
      title: "Capacity & Infrastructure",
      sub: [
        {
          label: "Manufacturing Plant Details",
          description: "Location, scale, FTE, capacity.",
        },
        {
          label: "Machinery List",
          description: "Production machines and setup.",
        },
      ],
    },
    {
      id: "MAN7",
      title: "Materials & Sourcing",
      sub: [
        {
          label: "Raw Material Sourcing",
          description: "Suppliers/quality check of raw materials.",
        },
        {
          label: "Sustainability Claims",
          description: "Use of recycled/green content.",
        },
      ],
    },
    {
      id: "MAN8",
      title: "Workforce Standards",
      sub: [
        {
          label: "Labour Law Compliance",
          description: "Proof of wage/law observance.",
        },
        {
          label: "Health & Safety Policy",
          description: "Accident register, safety protocols.",
        },
      ],
    },
    {
      id: "MAN9",
      title: "Delivery & Service",
      sub: [
        {
          label: "Lead Time",
          description: "Standard order-to-delivery timeline.",
        },
        { label: "AMC/Warranty", description: "Warranty or AMC offered." },
      ],
    },
    {
      id: "MAN10",
      title: "Innovation/Process Upgrades",
      sub: [
        {
          label: "Modernization Initiatives",
          description: "Investment in new tech/processes.",
        },
        { label: "Digitalization", description: "ERP/SCM/automation use." },
      ],
    },
  ],
  housing: [
    {
      id: "HOUS1",
      title: "Legal Statutory Proofs",
      sub: [
        {
          label: "Builder/Promoter License",
          description: "RERA registration, company documents.",
        },
        {
          label: "Title Deed/Ownership",
          description: "Land ownership/title deed.",
        },
      ],
    },
    {
      id: "HOUS2",
      title: "Project Experience",
      sub: [
        {
          label: "Past Developments List",
          description: "Projects completed over last 5 years.",
        },
        {
          label: "Photos/Completion Certificates",
          description: "Site photos, CCs, Occupancy Certs.",
        },
      ],
    },
    {
      id: "HOUS3",
      title: "Financial Health",
      sub: [
        {
          label: "Annual Turnover",
          description: "Min turnover in real estate sector.",
        },
        {
          label: "No Default Certificate",
          description: "From bank/financial institution.",
        },
      ],
    },
    {
      id: "HOUS4",
      title: "Technical Plan/Design",
      sub: [
        {
          label: "Project Layout",
          description: "Architectural layout, 3D design, etc.",
        },
        {
          label: "Structural Safety",
          description: "Proof of compliance to codes/standards.",
        },
        {
          label: "Material List",
          description: "Details of major materials used.",
        },
      ],
    },
    {
      id: "HOUS5",
      title: "Approvals & Certs",
      sub: [
        {
          label: "Municipal/NOC Approvals",
          description: "Local authority/statutory clearances.",
        },
        {
          label: "Environmental Clearance",
          description: "Green building/environment NOC.",
        },
      ],
    },
    {
      id: "HOUS6",
      title: "Workforce",
      sub: [
        {
          label: "Key Staff",
          description: "Lead engineer, architect resumes.",
        },
        {
          label: "Labour Welfare",
          description: "Safety, health & inclusion policies.",
        },
      ],
    },
    {
      id: "HOUS7",
      title: "Quality/Safety",
      sub: [
        {
          label: "QC/QA Plan",
          description: "QA process and handover procedures.",
        },
        {
          label: "Fire Safety Compliance",
          description: "NOC and infra for fire safety.",
        },
      ],
    },
    {
      id: "HOUS8",
      title: "Contract/Escrow",
      sub: [
        {
          label: "Sample Buyer Contract",
          description: "Escrow arrangements for buyer safety.",
        },
        {
          label: "Adherence to RERA",
          description: "RERA regulation compliance.",
        },
      ],
    },
    {
      id: "HOUS9",
      title: "After-Sale/Support",
      sub: [
        {
          label: "Defect Liability",
          description: "Warranty/defect period support.",
        },
        { label: "Customer Service Desk", description: "Support for buyers." },
      ],
    },
  ],
  education: [
    {
      id: "EDU1",
      title: "Legal & Recognition",
      sub: [
        {
          label: "School/College Registration",
          description: "Govt. affiliation: CBSE, ICSE, State, AICTE, UGC, etc.",
        },
        {
          label: "Recognized Degrees",
          description: "Affiliation/Recognition certs.",
        },
      ],
    },
    {
      id: "EDU2",
      title: "Past Experience",
      sub: [
        {
          label: "Similar Projects List",
          description: "Experience in educational sector works.",
        },
        {
          label: "Client Feedback/References",
          description: "From schools/education institutions.",
        },
      ],
    },
    {
      id: "EDU3",
      title: "Faculty/Resource Quality",
      sub: [
        {
          label: "Key Staff Bio-data",
          description: "CVs of teachers/trainers.",
        },
        { label: "Teacher Qualification", description: "B.Ed/M.Ed, PhD, etc." },
        {
          label: "Guest Faculty",
          description: "Availability of industry/guest faculty.",
        },
      ],
    },
    {
      id: "EDU4",
      title: "Infrastructure",
      sub: [
        {
          label: "List of Assets",
          description: "Classrooms, labs, library, hostels, etc.",
        },
        {
          label: "IT Facilities",
          description: "Smart classrooms, e-learning infra.",
        },
      ],
    },
    {
      id: "EDU5",
      title: "Curriculum Pedagogy",
      sub: [
        {
          label: "Syllabus Coverage",
          description: "Compliance to board/university curriculum.",
        },
        {
          label: "Teaching Methodology",
          description: "Innovative/experiential learning.",
        },
      ],
    },
    {
      id: "EDU6",
      title: "Safety & Care",
      sub: [
        {
          label: "Safety Policy",
          description: "CCTV, fire, disaster preparedness.",
        },
        {
          label: "Child Protection Policy",
          description: "Compliant with PoCSO, etc.",
        },
      ],
    },
    {
      id: "EDU7",
      title: "Financial Strength",
      sub: [
        {
          label: "Audited Statements",
          description: "Last 3 years' audited reports.",
        },
        {
          label: "Fee Transparency",
          description: "Adherence to fee norms/regulations.",
        },
      ],
    },
    {
      id: "EDU8",
      title: "Inclusion & Social Commitment",
      sub: [
        {
          label: "Scholarship Programs",
          description: "Provision for economically weaker sections.",
        },
        {
          label: "Women/Minority Inclusion",
          description: "Recruitment/policies for inclusion.",
        },
      ],
    },
    {
      id: "EDU9",
      title: "Accreditation",
      sub: [
        {
          label: "NAAC/NBA/ISO Accreditation",
          description: "NAAC/national/international accreditations.",
        },
      ],
    },
  ],
  consultancy: [
    {
      id: "CONS1",
      title: "Legal Standing",
      sub: [
        {
          label: "Firm Registration",
          description: "Certificate of Incorporation/partnership.",
        },
        { label: "PAN/GST", description: "Valid GST, PAN." },
      ],
    },
    {
      id: "CONS2",
      title: "Relevant Domain Expertise",
      sub: [
        {
          label: "Case Studies",
          description: "Past domain-specific project case studies.",
        },
        {
          label: "Reference Letters",
          description: "Letters from 2-3 clients.",
        },
        {
          label: "Publications/Thought Leadership",
          description: "Sample articles, whitepapers.",
        },
      ],
    },
    {
      id: "CONS3",
      title: "Key Personnel",
      sub: [
        {
          label: "Lead Partner Bio-data",
          description: "Profile of partner/director-in-charge.",
        },
        {
          label: "Team CVs",
          description: "Key team profiles and qualifications.",
        },
        {
          label: "Certifications",
          description: "Relevant professional certifications.",
        },
      ],
    },
    {
      id: "CONS4",
      title: "Methodology/Approach",
      sub: [
        {
          label: "Proposed Methodology",
          description: "Step-by-step approach for assignment.",
        },
        {
          label: "Workplan with Milestones",
          description: "Activities, outputs, deliverable deadlines.",
        },
      ],
    },
    {
      id: "CONS5",
      title: "Financial Bid",
      sub: [
        {
          label: "Activity-wise Fees",
          description: "Detailed bid price for each activity/milestone.",
        },
        {
          label: "Out-of-pocket Expenses",
          description: "Any reimbursable expenses or overheads.",
        },
      ],
    },
    {
      id: "CONS6",
      title: "Experience: Sectoral/Bid Type",
      sub: [
        {
          label: "Government Project Experience",
          description: "If required, details of government consulting.",
        },
        {
          label: "International Experience",
          description: "If global projects, documentary evidence.",
        },
      ],
    },
    {
      id: "CONS7",
      title: "Quality Systems",
      sub: [
        {
          label: "ISO/Process Manuals",
          description: "Quality protocols/process controls.",
        },
        {
          label: "Project Review Process",
          description: "Internal quality check methodology.",
        },
      ],
    },
    {
      id: "CONS8",
      title: "Data Security/Confidentiality",
      sub: [
        {
          label: "Confidentiality Policy",
          description: "Company policy on client data.",
        },
        {
          label: "NDA Acceptance",
          description: "Sample/standard NDA acceptance.",
        },
      ],
    },
    {
      id: "CONS9",
      title: "Deliverable Ownership",
      sub: [
        {
          label: "IP/Ownership Clauses",
          description: "Willingness to cede IP to client where needed.",
        },
        {
          label: "Editable Report Submission",
          description: "All final outputs in editable formats.",
        },
      ],
    },
  ],
};

// Create sectors array from criteriaData keys
export const sectors = [
  { id: 'government', name: 'Government', description: 'Government sector tenders and public procurement' },
  { id: 'business', name: 'Business', description: 'Business-to-business commercial tenders' },
  { id: 'healthcare', name: 'Healthcare', description: 'Healthcare and medical industry tenders' },
  { id: 'companies', name: 'Companies', description: 'Corporate and enterprise tenders' },
  { id: 'construction', name: 'Construction', description: 'Construction and infrastructure projects' },
  { id: 'transportation', name: 'Transportation', description: 'Transportation and logistics tenders' },
  { id: 'it', name: 'Information Technology', description: 'IT and technology services tenders' },
  { id: 'retail', name: 'Retail', description: 'Retail and consumer goods tenders' },
  { id: 'manufacturing', name: 'Manufacturing', description: 'Manufacturing and industrial tenders' },
  { id: 'housing', name: 'Housing', description: 'Housing and real estate development' },
  { id: 'education', name: 'Education', description: 'Educational institutions and services' },
  { id: 'consultancy', name: 'Consultancy', description: 'Consulting and professional services' }
];
