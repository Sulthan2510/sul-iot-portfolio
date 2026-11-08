import digitalCompeteEu from '../certificates/digital_compete_eu.pdf';
import datacampAssociate from '../certificates/DEA0012510788623.pdf';

// NOTE: entries with link: null render as "Credential on request".
// Four certificates previously pointed at placeholder URLs
// (your-coursera-link-here.com / your-udemy-certificate-link.com).
// They are set to null here so the site never shows a dead link to a recruiter —
// drop the real URL in when you have it.
export const certifications = [
  {
    name: { en: 'Data Engineer', de: 'Data Engineer' },
    issuer: 'DataCamp',
    date: '2026',
    link: null,
  },
  {
    name: { en: 'Data Engineer Associate', de: 'Data Engineer Associate' },
    issuer: 'DataCamp',
    date: '2026',
    link: datacampAssociate,
  },
  {
    name: {
      en: 'Azure Databricks workload automation module',
      de: 'Azure Databricks Workload-Automatisierung',
    },
    issuer: 'Microsoft Azure',
    date: '2026',
    link: 'https://learn.microsoft.com/en-gb/users/sulthanmd-1289/achievements/kczfknzb',
  },
  {
    name: {
      en: 'Spark Structured Streaming — incremental processing',
      de: 'Spark Structured Streaming – inkrementelle Verarbeitung',
    },
    issuer: 'Microsoft Azure',
    date: '2026',
    link: 'https://learn.microsoft.com/api/achievements/share/en-gb/sulthanMD-1289/YPU5XFPR?sharingId=2C7179B2FFF326F6',
  },
  {
    name: {
      en: 'Spark Masters — PySpark and Spark SQL',
      de: 'Spark Masters – PySpark und Spark SQL',
    },
    issuer: 'Udemy',
    date: '2024',
    link: 'https://www.udemy.com/certificate/UC-e5c4df70-3d0e-4531-bf44-1d440b611742/',
  },
  {
    name: { en: 'Apache Airflow', de: 'Apache Airflow' },
    issuer: 'Udemy',
    date: '2023',
    link: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-b6aa708e-bda2-4f6e-aca0-939d79627627.pdf',
  },
  {
    name: { en: 'Azure Data Fundamentals — DP-900', de: 'Azure Data Fundamentals – DP-900' },
    issuer: 'Microsoft Azure',
    date: '2023',
    link: null,
  },
  {
    name: { en: 'Azure Fundamentals — AZ-900', de: 'Azure Fundamentals – AZ-900' },
    issuer: 'Microsoft Azure',
    date: '2023',
    link: null,
  },
  {
    name: { en: 'Docker & Kubernetes', de: 'Docker & Kubernetes' },
    issuer: 'Udemy',
    date: '2024',
    link: null, // was a placeholder URL
  },
  {
    name: { en: 'GenAI — LTIMindtree', de: 'GenAI – LTIMindtree' },
    issuer: 'LTIMindtree / Coursera',
    date: '2024',
    link: null, // was a placeholder URL
  },
  {
    name: {
      en: 'Data Science and Machine Learning',
      de: 'Data Science und maschinelles Lernen',
    },
    issuer: 'Coursera',
    date: '2023',
    link: null, // was a placeholder URL
  },
  {
    name: { en: 'Python Programming', de: 'Python-Programmierung' },
    issuer: 'Udemy',
    date: '2023',
    link: null, // was a placeholder URL
  },
  {
    name: { en: 'SQL Mastery', de: 'SQL-Meisterschaft' },
    issuer: 'Udemy',
    date: '2023',
    link: null, // was a placeholder URL
  },
  {
    name: {
      en: 'Digital skills self-assessment',
      de: 'Digitale Kompetenz-Selbsteinschätzung',
    },
    issuer: 'Europa.eu',
    date: '2024',
    link: digitalCompeteEu,
  },
];
