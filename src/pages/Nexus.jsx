import React from 'react';
import Platform from '../components/Platform';
import StackLayers from '../components/StackLayers';
import Dashboards from '../components/Dashboards';
import Analytics from '../components/Analytics';

/* The whole Nexus story on one page: overview + architecture, the four stack
   layers, the staff/customer dashboard split, and the analytics pipelines. */
export default function Nexus({ t }) {
  return (
    <>
      <Platform t={t} />
      <StackLayers t={t} />
      <Dashboards t={t} />
      <Analytics t={t} />
    </>
  );
}
