// Sector-based templates mapping
export const sectors = [
  { id: 'government', name: 'Government', priority: ['C4', 'C1', 'C2', 'C8', 'C5', 'C6', 'C3', 'C9', 'C7'] },
  { id: 'business', name: 'Business', priority: ['C2', 'C3', 'C1', 'C7', 'C6', 'C4', 'C8', 'C5', 'C9'] },
  { id: 'healthcare', name: 'Healthcare', priority: ['C1', 'C8', 'C4', 'C5', 'C2', 'C6', 'C3', 'C9', 'C7'] },
  { id: 'companies', name: 'Companies', priority: ['C2', 'C3', 'C1', 'C6', 'C4', 'C7', 'C8', 'C5', 'C9'] },
  { id: 'construction', name: 'Construction', priority: ['C8', 'C1', 'C2', 'C5', 'C4', 'C6', 'C3', 'C9', 'C7'] },
  { id: 'transportation', name: 'Transportation', priority: ['C8', 'C1', 'C4', 'C2', 'C5', 'C6', 'C3', 'C9', 'C7'] },
  { id: 'it', name: 'Information Technology (IT)', priority: ['C1', 'C7', 'C2', 'C3', 'C6', 'C4', 'C8', 'C5', 'C9'] },
  { id: 'retail', name: 'Retail', priority: ['C2', 'C1', 'C3', 'C6', 'C4', 'C7', 'C8', 'C5', 'C9'] },
  { id: 'manufacturing', name: 'Manufacturing', priority: ['C1', 'C8', 'C2', 'C5', 'C4', 'C6', 'C3', 'C9', 'C7'] },
  { id: 'housing', name: 'Housing', priority: ['C1', 'C8', 'C4', 'C5', 'C2', 'C6', 'C3', 'C9', 'C7'] },
  { id: 'education', name: 'Education', priority: ['C1', 'C4', 'C2', 'C5', 'C8', 'C6', 'C3', 'C9', 'C7'] },
  { id: 'consultancy', name: 'Consultancy', priority: ['C3', 'C1', 'C2', 'C6', 'C4', 'C7', 'C8', 'C5', 'C9'] }
];

export const criteriaData = [
  {
    id: "C1",
    title: "C1. Technical Requirements",
    sub: [
      {
        label: "C1.1 Product/Service Specifications",
        description: "Detailed technical specifications required for the product or service, including all relevant parameters, tolerances, and performance criteria."
      },
      {
        label: "C1.2 Compliance with Industry Standards (e.g., ISO, BIS)",
        description: "Bidder must demonstrate compliance with applicable international or national standards such as ISO, BIS, or equivalent."
      },
      {
        label: "C1.3 Technical Documentation Provided",
        description: "Complete set of technical documents, datasheets, drawings, and manuals must be submitted with the bid."
      },
      {
        label: "C1.4 Compatibility with Existing Infrastructure",
        description: "The proposed solution must be compatible with the organization's current infrastructure, systems, and workflows."
      },
      {
        label: "C1.5 Quality Assurance Process",
        description: "Bidder must outline their quality assurance and control processes, including certifications and testing procedures."
      },
      {
        label: "C1.6 Warranty and Support Details",
        description: "Details regarding warranty period, coverage, and after-sales technical support must be specified."
      }
    ]
  },
  {
    id: "C2",
    title: "C2. Financial Evaluation",
    sub: [
      {
        label: "C2.1 Total Bid Price (Including Taxes)",
        description: "The complete price offered by the bidder, inclusive of all applicable taxes, duties, and levies."
      },
      {
        label: "C2.2 Cost Breakdown (Unit Cost, Labor, Equipment)",
        description: "A detailed breakdown of costs including unit prices, labor charges, equipment costs, and any other relevant expenses."
      },
      {
        label: "C2.3 Price Competitiveness",
        description: "Assessment of the bid price compared to prevailing market rates and other competing bids."
      },
      {
        label: "C2.4 Payment Terms (Milestones, Advance, Retention)",
        description: "Proposed payment schedule, including milestones, advance payments, and retention amounts."
      },
      {
        label: "C2.5 Financial Stability of the Bidder (e.g. audited reports)",
        description: "Bidder must provide evidence of financial stability, such as audited balance sheets and profit & loss statements."
      }
    ]
  },
  {
    id: "C3",
    title: "C3. Vendor Experience and Capability",
    sub: [
      {
        label: "C3.1 Years in Operation",
        description: "Number of years the bidder has been operational in the relevant field or industry."
      },
      {
        label: "C3.2 Past Project References",
        description: "List of similar projects completed by the bidder, including client references and contact details."
      },
      {
        label: "C3.3 Sector-Specific Experience",
        description: "Bidder’s experience in projects specific to the sector or domain relevant to this tender."
      },
      {
        label: "C3.4 Project Completion Rate",
        description: "Percentage of projects completed successfully and on time by the bidder."
      },
      {
        label: "C3.5 Resource Availability (Manpower, Equipment)",
        description: "Availability of skilled manpower, equipment, and other resources required for the project."
      },
      {
        label: "C3.6 Awards or Certifications Held",
        description: "Awards, recognitions, or certifications received by the bidder relevant to the project."
      }
    ]
  },
  {
    id: "C4",
    title: "C4. Legal and Statutory Compliance",
    sub: [
      {
        label: "C4.1 Valid Company Registration",
        description: "Bidder must provide proof of valid company registration under applicable laws."
      },
      {
        label: "C4.2 Tax Registration (GST, PAN, etc.)",
        description: "Bidder must submit valid tax registration documents such as GST, PAN, or equivalent."
      },
      {
        label: "C4.3 Labor Law Compliance",
        description: "Bidder must comply with all applicable labor laws and provide supporting documentation."
      },
      {
        label: "C4.4 Non-Blacklisting Declaration",
        description: "Declaration that the bidder has not been blacklisted by any government or private agency."
      },
      {
        label: "C4.5 EMD (Earnest Money Deposit) Submission",
        description: "Proof of submission of the required Earnest Money Deposit as per tender terms."
      }
    ]
  },
  {
    id: "C5",
    title: "C5. Sustainability and Environmental Standards",
    sub: [
      {
        label: "C5.1 Use of Eco-Friendly Materials",
        description: "Preference for products and solutions that utilize eco-friendly and sustainable materials."
      },
      {
        label: "C5.2 Waste Management Plan",
        description: "A comprehensive plan for managing waste generated during project execution."
      },
      {
        label: "C5.3 Energy Efficiency Standards",
        description: "Compliance with energy efficiency standards and guidelines."
      },
      {
        label: "C5.4 Carbon Footprint Reduction Measures",
        description: "Measures proposed by the bidder to minimize carbon footprint during and after project execution."
      },
      {
        label: "C5.5 Compliance with Environmental Laws",
        description: "Adherence to all applicable environmental laws, rules, and regulations."
      }
    ]
  },
  {
    id: "C6",
    title: "C6. Delivery and Implementation Plan",
    sub: [
      {
        label: "C6.1 Delivery Timeline and Milestones",
        description: "Detailed timeline for delivery, including major milestones and deadlines."
      },
      {
        label: "C6.2 Implementation Methodology",
        description: "Description of the methodology and approach for implementing the project."
      },
      {
        label: "C6.3 Risk Mitigation Strategy",
        description: "Plan for identifying, assessing, and mitigating potential risks during the project."
      },
      {
        label: "C6.4 After-Sales Support & Maintenance Plan",
        description: "Details of after-sales support, maintenance services, and escalation procedures."
      }
    ]
  },
  {
    id: "C7",
    title: "C7. Innovation and Value Addition",
    sub: [
      {
        label: "C7.1 Additional Functional Features",
        description: "Any additional features or functionalities offered beyond the minimum requirements."
      },
      {
        label: "C7.2 Technology Upgrades Offered",
        description: "Proposals for technology upgrades and future-proofing the solution."
      },
      {
        label: "C7.3 Long-Term Cost Savings",
        description: "Potential for long-term cost savings and total cost of ownership benefits."
      },
      {
        label: "C7.4 Training or Knowledge Transfer",
        description: "Provision for training, documentation, and knowledge transfer to the client’s team."
      }
    ]
  },
  {
    id: "C8",
    title: "C8. Health, Safety, and Risk Compliance",
    sub: [
      {
        label: "C8.1 Safety Protocols and Equipment",
        description: "Details of safety protocols and equipment to be used during project execution."
      },
      {
        label: "C8.2 Risk Management Plan",
        description: "Comprehensive plan for managing health, safety, and operational risks."
      },
      {
        label: "C8.3 Emergency Response Mechanisms",
        description: "Procedures and resources for emergency response and crisis management."
      },
      {
        label: "C8.4 Past Safety Incident Records",
        description: "Record of past safety incidents and corrective actions taken by the bidder."
      }
    ]
  },
  {
    id: "C9",
    title: "C9. Localization and Social Inclusion",
    sub: [
      {
        label: "C9.1 Use of Local Manpower",
        description: "Preference for use of local manpower and resources in project execution."
      },
      {
        label: "C9.2 Collaboration with Local Vendors/SMEs",
        description: "Collaboration with local vendors, small and medium enterprises (SMEs), or startups."
      },
      {
        label: "C9.3 Inclusion of Women/Minority Workforce",
        description: "Efforts to include women and minority groups in the workforce."
      },
      {
        label: "C9.4 CSR (Corporate Social Responsibility) Commitments",
        description: "Corporate Social Responsibility initiatives and commitments relevant to the project."
      }
    ]
  }
];
