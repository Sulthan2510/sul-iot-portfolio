import React, { useMemo } from 'react';
import ProjectLayout from '../components/ProjectLayout';
import {
  Overview,
  Architecture,
  Configuration,
  DashboardsSection,
  AnalyticsSection,
} from '../components/nexus/sections';

export default function NexusPage({ t }) {
  const sections = useMemo(
    () => [
      { id: 'overview', label: t.sections.overview, element: <Overview t={t} /> },
      { id: 'architecture', label: t.sections.architecture, element: <Architecture t={t} /> },
      { id: 'configuration', label: t.sections.configuration, element: <Configuration t={t} /> },
      { id: 'dashboards', label: t.sections.dashboards, element: <DashboardsSection t={t} /> },
      { id: 'analytics', label: t.sections.analytics, element: <AnalyticsSection t={t} /> },
    ],
    [t]
  );

  return (
    <ProjectLayout t={t} kicker={t.platform.eyebrow} title={t.platform.title} sections={sections} />
  );
}
