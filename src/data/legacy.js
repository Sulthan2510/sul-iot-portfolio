// Existing resume/skills/projects content, preserved verbatim from the original portfolio.
// Nexus platform content lives in ./content.js — this file holds the career history.
export const legacy = {
  de: {
    // Nav
    navLabels: { about: 'Über mich', resume: 'Lebenslauf', projects: 'Projekte', contact: 'Kontakt' },
    // About
    hiIm: "Hallo, ich bin",
    bio1: "Senior Data Engineer mit über 6 Jahren Erfahrung, derzeit im M.Sc.-Studium Erneuerbare Energien und Datentechnik an der Hochschule Offenburg. Ich entwickle Datenplattformen und ETL/ELT-Pipelines mit Python, PySpark, Spark-SQL, Azure Synapse Analytics, Azure Databricks (Delta Lake, Unity Catalog, Jobs/Workflows-Scheduler), Spark Streaming (Kafka), ADLS Gen2 und relationalen Datenbanken (PostgreSQL, MySQL). Mit einem B.E. der CEG Anna University und Erfahrung bei LTIMindtree liegt mein Schwerpunkt auf der Anwendung von Data Engineering in groß angelegter Analytik und nachhaltigen Energiesystemen.",
    bio2: "IoT-Datenpipeline an der Hochschule Offenburg mit Node‑RED, NATS JetStream, InfluxDB und Grafana für Echtzeit-Monitoring und End-to-End-Analytik, containerisiert mit Docker und aktuell in GitLab CI/CD für automatisierte Deployments integriert.",
    downloadCV: "Lebenslauf herunterladen",
    getInTouch: "Kontakt aufnehmen",
    stats: [
      { label: "Abgeschlossene Projekte", value: "10+" },
      { label: "Zufriedene Kunden", value: "4+" },
      { label: "Jahre Erfahrung", value: "6+" }
    ],
    // Resume
    myResume: "Mein Lebenslauf",
    resumeLabels: { experience: 'Erfahrung', skills: 'Kenntnisse', certifications: 'Zertifizierungen & Module', education: 'Ausbildung' },
    clientLabel: "Kunde:",
    // Experience
    jobs: [
      {
        role: "HiWi-Forschungsassistent",
        company: "Hochschule Offenburg",
        client: "Forschungsprojekt – IoT und Datentechnik",
        period: "Nov 2025 – Feb 2026",
        description: [
          { main: "Entwurf und Implementierung einer End-to-End-IoT-Pipeline von AHU-Sensordaten bis zum Monitoring-Dashboard für Zustands- und Trendanalysen.", subs: [] },
          { main: "Entwicklung eines Workflows mit Node-RED, NATS JetStream, InfluxDB (mit Chronograf-UI), Grafana und Cold Azure Blob Storage (jjjj/mm/tt/hh) einschließlich Python-Analytik für robuste, skalierbare Datenanalyse.", subs: [] },
          { main: "Betrieb der gesamten Pipeline in Docker-Containern unter Linux.", subs: [] },
          { main: "Einrichtung von GitLab-CI/CD-Pipelines für automatisierte Builds, Tests und Deployments in mehreren Umgebungen.", subs: [] },
          { main: "Erstellung von Grafana-Dashboards mit Alarmierung für das AHU-Monitoring.", subs: [] }
        ]
      },
      {
        role: "Senior Data Engineer",
        company: "LTIMindtree",
        client: "Navistar International (USA)",
        period: "Apr 2022 – Aug 2025",
        description: [
          { main: "Entwicklung von ETL-Pipelines in Azure Synapse Analytics zur Transformation und Speicherung großer Datenmengen aus ADLS Gen2 in verwertbare Erkenntnisse.", subs: [] },
          {
            main: "Datentransformation & -verarbeitung",
            subs: [
              "Implementierung von Regelmaschinen zur Transformation von Rohdaten aus verschiedenen Quellen zu verarbeiteten Daten.",
              "Haversine-Analyse von Fahrzeugen (Ziel, zurückgelegte Distanz) und letzte Kommunikationsdetails von Geräten und Fahrzeugen.",
              "Bereinigung wichtiger Merkmale der verarbeiteten Daten.",
              "Vorhersage von Dateigrößen- und -anzahlanomalien mittels Random-Forest-ML.",
              "Datenverteilungsanalyse nach Bundes- und Länderdaten.",
              "Qualitätskontrolle von Paketanzahl und Paket-Dictionary."
            ]
          },
          { main: "Implementierung von Apache Spark für verteilte Datenextraktion, -bereinigung und -transformation mit Integration von Notebooks in Pipelines.", subs: [] },
          { main: "Steigerung der Pipeline-Effizienz um 50 % durch Databricks-Job-Cluster mit dynamischer Skalierung und ephemerer Bereitstellung.", subs: [] },
          { main: "Orchestrierung von Databricks-Notebooks aus Azure-Synapse-Pipelines zur Automatisierung und Planung Spark-basierter Workflows.", subs: [] },
          { main: "Einsatz von Azure DevOps zur Implementierung von CI/CD-Pipelines für nahtlose Deployments über DEV, UAT und PROD mit Versionskontrolle.", subs: [] },
          { main: "Erstellung von Python-Wheel-Dateien zur Verbesserung der Kompatibilität und Verarbeitung von Parquet-, JSON- und Avro-Formaten.", subs: [] },
          { main: "Automatisierung von Pipelines mit Triggern, Konfiguration von Fehlerbenachrichtigungen über Azure Logic Apps sowie Überwachung von Job-Performance und Datenintegrität.", subs: [] }
        ]
      },
      {
        role: "Data Engineer",
        company: "LTIMindtree",
        client: "L&T ECC (Indien)",
        period: "Aug 2020 – Apr 2022",
        description: [
          { main: "Migration von Spark-SQL-Jobs von Azure HDInsight zur Databricks-Plattform mit Optimierung von Performance, Skalierbarkeit und Kosteneffizienz.", subs: [] },
          { main: "Überführung interaktiver MS-SQL-Tabellen zu Azure-Delta-Tabellen für verbesserte Job-Effizienz und Zuverlässigkeit.", subs: [] },
          { main: "Entwurf und Konfiguration von Azure-Databricks-Pipelines mit Job-Clustern.", subs: [] },
          { main: "Entwicklung und Optimierung von Spark-SQL-Jobs zur effizienten Verarbeitung, Transformation und Analyse täglicher Rohdaten.", subs: [] }
        ]
      },
      {
        role: "IoT-Ingenieur",
        company: "LTI",
        client: "Tampnet (Norwegen)",
        period: "Jun 2018 – Aug 2020",
        description: [
          { main: "Praktikant mit Fokus auf IoT-Sensoren, ATEX- und IECEx-Zertifizierungen sowie Datenabruf von Sensoren über NB-IoT- und CAT-M-Netze.", subs: [] },
          { main: "Mitwirkung bei der Sensorbeschaffung, Lieferantenkommunikation und Labortests.", subs: [] },
          { main: "Entwicklung Python-basierter APIs zur Verarbeitung von Echtzeit-Sensordaten für prädiktive Analyse- und Monitoring-Anwendungen.", subs: [] },
          { main: "Abschluss von Zertifizierungen in Python, SQL und Apache Spark.", subs: [] }
        ]
      }
    ],
    // Skills
    skillsTitle: "Kenntnisse",
    skillGroups: [
      { category: "Azure-Dienste – ETL/ELT", skills: "Azure Synapse Analytics, Azure Databricks, Azure KeyVault, Azure Logic Apps, ADLS Gen2, Delta Tables, Hadoop, Azure Blob Storage" },
      { category: "Big Data & Verarbeitung", skills: "Apache Spark (PySpark & Spark-SQL), Delta Lake, Kafka, Verteiltes Rechnen" },
      { category: "Daten-Monitoring & Visualisierung", skills: "Grafana, InfluxDB, Chronograf" },
      { category: "IoT & Echtzeit-Daten", skills: "MQTT, EMQX, Node-RED, NATS JetStream, Azure IoT Hub und EventHub, WebPubSub, Telegraf, Echtzeit-Streaming" },
      { category: "Programmiersprachen", skills: "Python, SQL, C#" },
      { category: "Workflow & Orchestrierung", skills: "Apache Airflow, Databricks (Job Cluster & Workflows), Synapse Analytics (Pipelines und Scheduler)" },
      { category: "Versionskontrolle & DevOps & Containerisierung", skills: "Azure DevOps, GitHub, GitLab CI/CD, Docker" },
      { category: "Betriebssysteme", skills: "Linux, MacOS, Windows" }
    ],
    languagesTitle: "Sprachen",
    spokenLanguages: [
      { language: "Tamil", level: "Muttersprache" },
      { language: "Englisch", level: "Fließend (C1)" },
      { language: "Deutsch", level: "B2.2" },
      { language: "Arabisch", level: "Lesekenntnisse" }
    ],
    // Certifications
    viewCertificate: "Zertifikat anzeigen",
    credentialOnRequest: "Zertifikat auf Anfrage",
    // Education
    education: [
      {
        degree: "M.Sc. Erneuerbare Energien und Datentechnik",
        school: "Hochschule Offenburg",
        location: "Deutschland",
        period: "Okt 2025 – Heute",
        details: "1. Semester | Gesamtnote:",
        gpa: "1,7"
      },
      {
        degree: "Bachelor of Engineering – Maschinenbau",
        school: "College of Engineering Guindy, Anna University",
        location: "Indien",
        period: "2014 – 2018",
        details: "Abschlussnote:",
        gpa: "1,6"
      }
    ],
    // Projects
    clientProjects: "Kundenprojekte",
    featuredProjects: "Ausgewählte Projekte",
    viewProject: "Projekt ansehen →",
    viewArchitecture: "Architektur ansehen",
    keyAchievements: "Wichtigste Leistungen:",
    technologiesUsed: "Verwendete Technologien:",
    closeBtn: "Schließen",
    architectureLabel: "Architektur",
    projects: [
      {
        id: 1,
        title: "IoT & Datentechnik-Pipeline – Hochschule Offenburg",
        company: "Hochschule Offenburg",
        period: "Nov 2025 – Feb 2026",
        description: "End-to-End-IoT-Pipeline von AHU-Sensordaten über MQTT-Broker, Node-RED-Workflow, NATS JetStream, InfluxDB und Grafana-Dashboards für Echtzeit-Monitoring, Zustandsanalyse und Trendvorhersage. Gesamte Pipeline containerisiert mit Docker und automatisiert über GitLab CI/CD. Produktionsreife Architektur mit Echtzeit-Monitoring und prädiktiven Fähigkeiten.",
        achievements: [
          "Entwurf und Implementierung einer End-to-End-IoT-Pipeline vom Sensor bis zum Dashboard",
          "Entwicklung des Workflows mit Node-RED, NATS JetStream, InfluxDB, Grafana und Azure Blob Storage",
          "Implementierung der Docker-Containerisierung und GitLab CI/CD für automatisierte Deployments",
          "Erstellung von Monitoring-Dashboards mit Alarmierung für Echtzeit-Asset-Tracking"
        ],
        tech: ["Node-RED", "NATS JetStream", "InfluxDB", "Grafana", "Telegraf", "Azure Blob Storage", "Docker", "Python", "GitLab CI/CD", "Linux"],
        link: "#"
      },
      {
        id: 2,
        title: "Enterprise-Datenpipeline – Navistar International",
        company: "LTIMindtree",
        period: "Apr 2022 – Aug 2025",
        description: "Hochperformante Datenplattform zur Überwachung von Fahrzeugleistung und Betriebskennzahlen. Erstellung von 20+ stündlichen ETL-Pipelines zur Verarbeitung von Rohdaten der Telematik in analysebereit aufbereitete Formate. Implementierung einer mehrschichtigen Verarbeitungsarchitektur mit Delta-Lake-Optimierung. Entwicklung von Datentransformationslösungen für komplexe Kundenanforderungen mit einer SQL-Serverless-Analyseschicht.",
        achievements: [
          "Erstellung von 20+ stündlichen ETL-Pipelines (roh zu verarbeitet) für kontinuierliche Datenverarbeitung",
          "Lösung mehrerer komplexer Kundendatenanforderungen mit individueller Transformationslogik",
          "Optimierung der stündlichen Pipeline-Ausführung mit Delta-Lake-Komprimierung und Partitionierung",
          "Integration von Azure Functions und Logic Apps für ereignisgesteuerte Pipeline-Orchestrierung",
          "Implementierung umfassenden Monitorings über Power-BI-Dashboards und Azure DevOps",
          "Entwicklung von SQL-Serverless-Abfragen für Echtzeit-Analytik auf verarbeiteten Datensätzen"
        ],
        tech: ["ADLS Gen2", "Azure Databricks", "PySpark", "Spark-SQL", "Delta Lake", "SQL Serverless", "Azure Synapse", "Azure Functions", "Logic Apps", "Power BI", "Azure DevOps", "CI/CD"],
        link: "#"
      },
      {
        id: 3,
        title: "Enterprise-Fahrzeuganalyseplattform – L&T ECC",
        company: "Mindtree",
        period: "Aug 2020 – Apr 2022",
        description: "Produktive Medaillon-Architektur zur Verarbeitung von 100.000+ täglichen Fahrzeugtelematik-Datensätzen von ca. 150 IoT-Geräten. Verwaltung von Spark-SQL-Jobs mit Hadoop-Ressourcenzuteilung. Entwurf eines SQL-Sternschemas mit Fakten-, Dimensions-, Letztstand- und Zwischentabellen sowie gespeicherten Prozeduren. Entwicklung einer Asset-Monitoring-Website. Erfolgreiche Migration des gesamten Stacks von Azure HDInsights zu Databricks mit 50 % Kostensenkung.",
        achievements: [
          "Verarbeitung von 100.000+ täglichen Fahrzeugtelematik-Datensätzen auf 150+ IoT-Geräten",
          "Implementierung von Regelmaschinen zur Datenvalidierung mit Anomalieerkennung mittels Random-Forest-ML",
          "Entwurf eines umfassenden SQL-Sternschemas (Fakten-, Dimensions-, Letztstand- und Zwischentabellen)",
          "Migration von 100+ Spark-SQL-Jobs von Azure HDInsights zu Databricks mit 50 % Effizienzsteigerung",
          "Entwicklung einer Asset-Monitoring-Website für Echtzeit-Gerätezustandsverfolgung",
          "Implementierung automatisierter ETL-Pipelines mit Databricks-Job-Clustern (Auto-Skalierung)"
        ],
        tech: ["Azure Databricks", "PySpark", "Spark-SQL", "Delta Lake", "ADLS Gen2", "SQL Serverless", "Star Schema", "Machine Learning", "Azure Synapse", "Power BI", "Azure DevOps", "CI/CD"],
        link: "#"
      },
      {
        id: 4,
        title: "IoT-Sensoren & Cloud-Integration – Tampnet",
        company: "LTI",
        period: "Jun 2018 – Aug 2020",
        description: "End-to-End-IoT-Projekt mit Schwerpunkt auf Beschaffung ATEX/IECEx-zertifizierter Sensoren, Labortests und Cloud-Integration. Verwaltung der Sensorauswahl, Lieferantenkommunikation und strenger Labortestprotokolle. Entwicklung Python-basierter APIs für Echtzeit-Sensordatenverarbeitung und Cloud-Übertragung. Implementierung mehrerer IoT-Kommunikationsprotokolle (MQTT, AMQP, LoRaWAN, NB-IoT) für diverse Gerätekonnektivität.",
        achievements: [
          "Beschaffung und Test von ATEX/IECEx-zertifizierten IoT-Sensoren für gefährliche Umgebungen",
          "Durchführung umfassender Labortests und Validierung aller Sensoren vor dem Einsatz",
          "Entwicklung von Python-APIs für Echtzeit-Sensordatenverarbeitung und Cloud-Integration",
          "Implementierung von Multi-Protokoll-Konnektivität (MQTT, AMQP, LoRaWAN, NB-IoT)",
          "Verwaltung von Lieferantenkommunikation und Sensor-Qualitätssicherungsprozessen",
          "Test von End-to-End-Cloud-Datenpipelines für Sensordatenerfassung und -analytik"
        ],
        tech: ["IoT Sensors (ATEX/IECEx)", "MQTT", "AMQP", "LoRaWAN", "NB-IoT", "Python", "Azure IoT Hub", "API Management", "Cloud Testing", "Lab Testing", "CAT-M", "Wireless Protocols"],
        link: "#"
      }
    ],
    featuredProjectsData: [
      {
        id: 1,
        title: "Grüner Wasserstoff – L&T ECC",
        company: "LTI",
        period: "Jun 2020 – Aug 2021",
        description: "Entwicklung eines End-to-End-IoT-Monitoring-Systems zur Echtzeit-Visualisierung von Anlagen-Sensordaten. Implementierung von Multi-Protokoll-Konnektivität über Azure IoT Hub und Event Hub für die Datenerfassung mit Live-WebSocket-Updates über Azure WebPubSub. Entwicklung eines Python-Skripts auf einem Linux-Rechner zur Sensordatenverarbeitung sowie Erstellung einer REST-API für die Frontend-UI.",
        achievements: [
          "Entwurf und Implementierung einer Echtzeit-Sensordaten-Pipeline von IoT-Geräten über Azure IoT Hub zur Ereignisverarbeitung",
          "Entwicklung eines Python-Skripts auf Linux-Rechner zum kontinuierlichen Lesen und Verarbeiten von Sensordaten mehrerer Anlagensensoren",
          "Implementierung von Azure Event Hub für hohen Durchsatz und niedrige Latenz beim Daten-Streaming und der Ereignisverteilung",
          "Konfiguration von Azure WebPubSub für bidirektionale Echtzeit-Kommunikation zum Übertragen von Live-Sensor-Updates an die Frontend-UI",
          "Erstellung von Python-REST-API-Endpunkten für die Frontend-Nutzung zur Echtzeit-Visualisierung von Anlagengesundheitskennzahlen",
          "Echtzeit-Datenlatenz unter 100 ms vom Sensorauslesen bis zur UI-Anzeige erreicht",
          "Implementierung von Fehlerbehandlung und Datenvalidierung für Sensorzuverlässigkeit und Systemresilienz"
        ],
        tech: ["Azure Event Hub", "Azure IoT Hub", "Azure WebPubSub", "Linux", "Python", "API"],
        link: "#"
      }
    ],
    // Contact
    contactTitle: "Kontakt aufnehmen",
    contactIntro: "Ich freue mich immer über neue Projekte und Möglichkeiten.",
    emailLabel: "E-Mail",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    formName: "Name",
    formNamePlaceholder: "Ihr Name",
    formEmail: "E-Mail",
    formEmailPlaceholder: "ihre@email.com",
    formCompany: "Unternehmen",
    formCompanyPlaceholder: "Ihr Unternehmen",
    formOptional: "(Optional)",
    formRequired: "*",
    formMessage: "Nachricht",
    formMessagePlaceholder: "Ihre Nachricht...",
    sendMessage: "Nachricht senden",
    // Footer
    footer: "© 2026 Sulthan. Alle Rechte vorbehalten.",
  },

  en: {
    navLabels: { about: 'About', resume: 'Resume', projects: 'Projects', contact: 'Contact' },
    hiIm: "Hi, I'm",
    bio1: "Senior Data Engineer with 6+ years of experience, now pursuing an M.Sc. in Renewable Energy and Data Engineering at Hochschule Offenburg. I build data platforms and ETL/ELT pipelines using Python, PySpark, Spark-SQL, Azure Synapse Analytics, Azure Databricks (Delta Lake, Unity Catalog, Jobs/Workflows scheduler), Spark Streaming (Kafka), ADLS Gen2 and relational databases (PostgreSQL, MySQL). Backed by a B.E. from CEG Anna University and experience at LTIMindtree, I focus on applying data engineering to large-scale analytics and sustainable energy systems.",
    bio2: "IoT data pipeline at Hochschule Offenburg using Node‑RED, NATS JetStream, InfluxDB and Grafana for real‑time monitoring and end‑to‑end analytics, containerized with Docker and now being integrated with GitLab CI/CD for automated deployments.",
    downloadCV: "Download CV",
    getInTouch: "Get In Touch",
    stats: [
      { label: "Projects Completed", value: "10+" },
      { label: "Happy Clients", value: "4+" },
      { label: "Years Experience", value: "6+" }
    ],
    myResume: "My Resume",
    resumeLabels: { experience: 'Experience', skills: 'Skills', certifications: 'Certifications & Modules', education: 'Education' },
    clientLabel: "Client:",
    jobs: [
      {
        role: "HiWi Research Assistant",
        company: "Hochschule Offenburg",
        client: "Research Project - IoT and Data Engineering",
        period: "Nov 2025 - Feb 2026",
        description: [
          { main: "Design and implementation of an End-to-End IoT Pipeline from AHU sensor data to monitoring dashboard for condition and trend analysis.", subs: [] },
          { main: "Development of a workflow with Node-RED, NATS JetStream, InfluxDB (with Chronograf UI), Grafana and cold Azure Blob Storage (yyyy/mm/dd/hh) including Python analytics for robust, scalable data analysis.", subs: [] },
          { main: "Operation of the entire pipeline in Docker containers under Linux.", subs: [] },
          { main: "Setup of GitLab CI/CD pipelines for automated builds, tests and deployments across multiple environments.", subs: [] },
          { main: "Creation of Grafana dashboards with alerting for AHU monitoring.", subs: [] }
        ]
      },
      {
        role: "Senior Data Engineer",
        company: "LTIMindtree",
        client: "Navistar International (USA)",
        period: "Apr 2022 - Aug 2025",
        description: [
          { main: "Developed ETL pipelines in Azure Synapse Analytics to transform and store large-scale data from ADLS Gen2 into actionable insights.", subs: [] },
          {
            main: "Data Transformation & Processing",
            subs: [
              "Implemented rule engines to perform transformation on raw data from various resources to create processed data.",
              "Haversine analysis of vehicles (Destination, Distance travelled) and last communication details of devices and vehicles.",
              "Remediation on important features of processed data.",
              "File size and count anomaly prediction using Random Forest ML.",
              "Data distribution analysis on state and country wise data.",
              "Quality controls checks on packets count and packets dictionary."
            ]
          },
          { main: "Implemented Apache Spark for distributed data extraction, cleaning, and transformation, integrating notebooks into pipelines.", subs: [] },
          { main: "Improved pipeline efficiency by 50% using Databricks Job Clusters with dynamic scaling and ephemeral provisioning.", subs: [] },
          { main: "Orchestrated Databricks notebooks from Azure Synapse pipelines to automate and schedule Spark-based workflows.", subs: [] },
          { main: "Utilized Azure DevOps to implement CI/CD pipelines, ensuring seamless deployment across DEV, UAT, and PROD with version control.", subs: [] },
          { main: "Created python wheel files to enhance utility compatibility and handled parquet, json and avro formats for efficient data processing.", subs: [] },
          { main: "Automated pipelines with triggers, configured failure notifications via Azure Logic Apps, and maintained job performance and data integrity.", subs: [] }
        ]
      },
      {
        role: "Data Engineer",
        company: "LTIMindtree",
        client: "L&T ECC (India)",
        period: "Aug 2020 - Apr 2022",
        description: [
          { main: "Migrated Spark-Sql-based jobs from Azure HDInsight to Databricks platform, optimizing performance, scalability and cost-efficiency", subs: [] },
          { main: "Transitioned interactive MS-SQL tables to Azure Delta Tables for improved job efficiency and reliability.", subs: [] },
          { main: "Designed and configured Azure Databricks pipelines using job clusters.", subs: [] },
          { main: "Developed and optimized Spark-SQL jobs to efficiently process, transform and analyze daily raw data into meaningful insights.", subs: [] }
        ]
      },
      {
        role: "IoT Engineer",
        company: "LTI",
        client: "Tampnet (Norway)",
        period: "Jun 2018 - Aug 2020",
        description: [
          { main: "Research trainee on IoT Sensors, ATEX and IECEx certifications and data retrieval from sensors using NB-IoT and CAT-M networks.", subs: [] },
          { main: "Engaged in sensors procurement, vendor interaction and lab testing.", subs: [] },
          { main: "Developed python based APIs to process real-time sensors data into analytical insights for predictive analysis monitoring applications.", subs: [] },
          { main: "Certifications completion on Python, SQL and Apache-Spark.", subs: [] }
        ]
      }
    ],
    skillGroups: [
      { category: "Azure Services - ETL/ELT", skills: "Azure Synapse Analytics, Azure Databricks, Azure KeyVault, Azure Logic Apps, ADLS Gen2, Delta Tables, Hadoop, Azure Blob Storage" },
      { category: "Big Data & Processing", skills: "Apache Spark (PySpark & Spark-SQL), Delta Lake, Kafka, Distributed Computing" },
      { category: "Data Monitoring & Visualization", skills: "Grafana, InfluxDB, Chronograf" },
      { category: "IoT & Real-time Data", skills: "MQTT, EMQX, Node-RED, NATS JetStream, Azure IoT Hub and EventHub, WebPubSub, Telegraf, Real-time Streaming" },
      { category: "Languages", skills: "Python, SQL, C#" },
      { category: "Workflow & Orchestration", skills: "Apache Airflow, Databricks (Job Clusters & Workflows), Synapse Analytics (Pipelines and Schedulers)" },
      { category: "Version Control & DevOps & Containerization", skills: "Azure DevOps, GitHub, GitLab CI/CD, Docker" },
      { category: "Operating Systems", skills: "Linux, MacOS, Windows" }
    ],
    languagesTitle: "Languages",
    spokenLanguages: [
      { language: "Tamil", level: "Native" },
      { language: "English", level: "Proficient (C1)" },
      { language: "German", level: "B2.2" },
      { language: "Arabic", level: "Reading" }
    ],
    viewCertificate: "View Certificate",
    credentialOnRequest: "Credential on request",
    education: [
      {
        degree: "M.Sc. Renewable Energy and Data Engineering",
        school: "Offenburg University of Applied Sciences",
        location: "Germany",
        period: "Oct 2025 - Present",
        details: "1st Semester | Overall Grade:",
        gpa: "1.7"
      },
      {
        degree: "Bachelor of Engineering in Mechanical Engineering",
        school: "College of Engineering Guindy, Anna University",
        location: "India",
        period: "2014 - 2018",
        details: "Final Grade:",
        gpa: "1.6"
      }
    ],
    clientProjects: "Client Projects",
    featuredProjects: "Featured Projects",
    viewProject: "View Project →",
    viewArchitecture: "View Architecture",
    keyAchievements: "Key Achievements:",
    technologiesUsed: "Technologies Used:",
    closeBtn: "Close",
    architectureLabel: "Architecture",
    projects: [
      {
        id: 1,
        title: "IoT & Data Engineering Pipeline - Hochschule Offenburg",
        company: "Hochschule Offenburg",
        period: "Nov 2025 - Feb 2026",
        description: "End-to-End IoT Pipeline from AHU sensor data through MQTT Broker, Node-RED workflow, NATS JetStream, InfluxDB, and Grafana dashboards for real-time monitoring, condition analysis, and trend prediction. Entire pipeline containerized with Docker and automated via GitLab CI/CD.  Production-ready architecture with real-time monitoring and predictive capabilities.",
        achievements: [
          "Designed and implemented End-to-End IoT pipeline from sensor to dashboard",
          "Developed workflow with Node-RED, NATS JetStream, InfluxDB, Grafana, and Azure Blob Storage",
          "Implemented Docker containerization and GitLab CI/CD for automated deployments",
          "Created monitoring dashboards with alerting for real-time asset tracking"
        ],
        tech: ["Node-RED", "NATS JetStream", "InfluxDB", "Grafana", "Telegraf", "Azure Blob Storage", "Docker", "Python", "GitLab CI/CD", "Linux"],
        link: "#"
      },
      {
        id: 2,
        title: "Enterprise Data Pipeline - Navistar International",
        company: "LTIMindtree",
        period: "Apr 2022 - Aug 2025",
        description: "High-performance data platform for monitoring vehicle performance and operational metrics. Created 20+ hourly ETL pipelines processing raw telematics data into processed analytics-ready formats. Implemented multi-layer processing architecture with Delta Lake optimization. Developed data transformation solutions addressing complex client requirements with SQL Serverless analytics layer.",
        achievements: [
          "Created 20+ hourly ETL pipelines (raw to processed) for continuous data processing",
          "Solved multiple complex client data requirements with custom transformation logic",
          "Optimized hourly pipeline execution with Delta Lake compression and partitioning",
          "Integrated Azure Functions and Logic Apps for event-driven pipeline orchestration",
          "Implemented comprehensive monitoring via Power BI dashboards and Azure DevOps",
          "Developed SQL Serverless queries for real-time analytics on processed datasets"
        ],
        tech: ["ADLS Gen2", "Azure Databricks", "PySpark", "Spark-SQL", "Delta Lake", "SQL Serverless", "Azure Synapse", "Azure Functions", "Logic Apps", "Power BI", "Azure DevOps", "CI/CD"],
        link: "#"
      },
      {
        id: 3,
        title: "Enterprise Vehicle Analytics Platform - L&T ECC",
        company: "Mindtree",
        period: "Aug 2020 - Apr 2022",
        description: "Production medallion architecture processing 100K+ daily vehicle telematics from ~150 IoT devices. Managed Spark SQL jobs with Hadoop resource allocation. Designed SQL Star Schema with fact tables, dimension tables, last-record tables, and stored procedures. Built asset monitoring website. Successfully migrated entire stack from Azure HDInsights to Databricks, achieving 50% cost reduction.",
        achievements: [
          "Processed 100K+ daily vehicle telematics records across 150+ IoT devices",
          "Implemented rule engines for data validation with anomaly detection using Random Forest ML",
          "Designed comprehensive SQL Star Schema (fact, dimension, last-record, intermediate tables)",
          "Migrated 100+ Spark SQL jobs from Azure HDInsights to Databricks with 50% efficiency gains",
          "Built asset monitoring website for real-time device health tracking",
          "Implemented automated ETL pipelines with Databricks Job Clusters (auto-scaling)"
        ],
        tech: ["Azure Databricks", "PySpark", "Spark-SQL", "Delta Lake", "ADLS Gen2", "SQL Serverless", "Star Schema", "Machine Learning", "Azure Synapse", "Power BI", "Azure DevOps", "CI/CD"],
        link: "#"
      },
      {
        id: 4,
        title: "IoT Sensors & Cloud Integration - Tampnet",
        company: "LTI",
        period: "Jun 2018 - Aug 2020",
        description: "End-to-end IoT project focusing on ATEX/IECEx certified sensor procurement, laboratory testing, and cloud integration. Managed sensor selection, vendor interactions, and rigorous lab testing protocols. Developed Python-based APIs for real-time sensor data processing and cloud transmission. Implemented multiple IoT communication protocols (MQTT, AMQP, LoRaWAN, NB-IoT) for diverse device connectivity.",
        achievements: [
          "Procured and tested ATEX/IECEx certified IoT sensors for hazardous environments",
          "Conducted comprehensive lab testing and validation of all sensors before deployment",
          "Developed Python APIs for real-time sensor data processing and cloud integration",
          "Implemented multi-protocol connectivity (MQTT, AMQP, LoRaWAN, NB-IoT)",
          "Managed vendor interactions and sensor quality assurance processes",
          "Tested end-to-end cloud data pipelines for sensor data ingestion and analytics"
        ],
        tech: ["IoT Sensors (ATEX/IECEx)", "MQTT", "AMQP", "LoRaWAN", "NB-IoT", "Python", "Azure IoT Hub", "API Management", "Cloud Testing", "Lab Testing", "CAT-M", "Wireless Protocols"],
        link: "#"
      }
    ],
    featuredProjectsData: [
      {
        id: 1,
        title: "Green Hydrogen - L&T ECC",
        company: "LTI",
        period: "Jun 2020 - Aug 2021",
        description: "Built an end-to-end IoT monitoring system for real-time plant sensor data visualization. Implemented multi-protocol connectivity using Azure IoT Hub and Event Hub for data ingestion, with live WebSocket-based updates via Azure WebPubSub. Developed a Python script running on Linux machine for sensor data processing and created a REST API for frontend UI consumption.",
        achievements: [
          "Designed and implemented real-time sensor data pipeline from IoT devices through Azure IoT Hub to event processing",
          "Developed Python script running on Linux machine to continuously read and process sensor data from multiple plant sensors",
          "Implemented Azure Event Hub for high-throughput, low-latency data streaming and event distribution",
          "Configured Azure WebPubSub for real-time bidirectional communication to push live sensor updates to frontend UI",
          "Created Python REST API endpoints for frontend consumption, enabling live plant health metrics visualization",
          "Achieved real-time data latency under 100ms from sensor reading to UI display",
          "Implemented error handling and data validation for sensor reliability and system resilience"
        ],
        tech: ["Azure Event Hub", "Azure IoT Hub", "Azure WebPubSub", "Linux", "Python", "API"],
        link: "#"
      }
    ],
    contactTitle: "Get In Touch",
    contactIntro: "I'm always interested in hearing about new projects and opportunities.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "your@email.com",
    formCompany: "Company",
    formCompanyPlaceholder: "Your company name",
    formOptional: "(Optional)",
    formRequired: "*",
    formMessage: "Message",
    formMessagePlaceholder: "Your message...",
    sendMessage: "Send Message",
    footer: "© 2026 Sulthan. All rights reserved.",
  }
};

