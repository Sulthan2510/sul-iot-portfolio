import React from 'react';
import { C, MONO, Defs, Node, Chip, Zone, Band, Arrow, BiArrow, Label, DiagramFrame } from './primitives';
import { usePalette } from '../../theme';

/* Architecture diagrams for the four client projects, redrawn from the original
   project diagrams in src/images/architecture/ so they share one visual language.
   `L` carries the translated labels (see content.js → projectDiagrams). */

/* ── 1. Hochschule Offenburg — AHU IoT pipeline ──────────────────────────── */
export function HochschuleDiagram({ L }) {
  return (
    <DiagramFrame minWidth={1000} caption={L.caption}>
      <svg viewBox="0 0 1180 470" className="h-auto w-full" role="img" aria-label={L.caption}>
        <Defs />

        {/* field level */}
        <Zone x={14} y={64} w={450} h={130} label={L.field} />
        <Node x={28} y={100} w={130} title="Siemens" sub={L.controller} accent={C.signal} />
        <Node x={186} y={100} w={130} title="BACnet" sub={L.fieldbus} accent={C.signal} />
        <Node x={344} y={100} w={106} title="SEB" sub={L.mbus} accent={C.signal} />
        <Arrow d="M158,129 L179,129" colour={C.signal} marker="ahSignal" />
        <Arrow d="M316,129 L337,129" colour={C.signal} marker="ahSignal" />

        {/* docker container */}
        <Zone x={482} y={64} w={634} h={262} label={L.docker} colour={C.data} />
        <Node x={496} y={100} w={130} title="Mosquitto" sub="MQTT" />
        <Node x={654} y={100} w={130} title="Node-RED" sub={L.flow} />
        <Node x={812} y={100} w={130} title="NATS" sub="JetStream" />
        <Node x={970} y={100} w={130} title="InfluxDB" sub={L.hot} accent={C.data} />
        <Arrow d="M450,129 L489,129" colour={C.signal} marker="ahSignal" />
        <Arrow d="M626,129 L647,129" />
        <Arrow d="M784,129 L805,129" />
        <Arrow d="M942,129 L963,129" />

        <Node x={496} y={252} w={130} title="Chronograf" sub={L.dbAdmin} />
        <Node x={970} y={252} w={130} title="python-archiver" sub="Parquet" fontSize={11} />
        {/* influx fans out */}
        <Arrow d="M1002,158 L1002,206 L561,206 L561,245" />
        <Arrow d="M1035,158 L1035,245" />

        {/* outside the container */}
        <Node x={654} y={376} w={130} title="Grafana" sub={L.alerts} accent={C.signal} />
        <Node x={970} y={376} w={130} title="Azure Blob" sub={L.partitioned} accent={C.data} />
        <Arrow d="M1016,310 L1016,369" />
        <Arrow d="M1068,158 L1068,222 L719,222 L719,369" />

        <Label x={14} y={452} anchor="start">
          {L.note}
        </Label>
      </svg>
    </DiagramFrame>
  );
}

/* ── 2. Navistar — layered Azure lakehouse ───────────────────────────────── */
export function NavistarDiagram({ L }) {
  return (
    <DiagramFrame minWidth={1000} caption={L.caption}>
      <svg viewBox="0 0 1180 560" className="h-auto w-full" role="img" aria-label={L.caption}>
        <Defs />

        {/* Data process */}
        <Band x={14} y={30} w={1006} h={120} label={L.process} />
        <Node x={250} y={60} w={180} h={60} title="Apache Spark" sub="PySpark · Spark-SQL" />
        <Node x={460} y={60} w={180} h={60} title="Databricks" sub={L.jobCluster} />
        <Node x={670} y={60} w={200} h={60} title="SQL Serverless" sub={L.warehouse} />
        <Node x={1048} y={60} w={118} h={60} title="Power BI" accent={C.warn} />
        <Arrow d="M1020,90 L1041,90" />

        {/* Data storage — medallion */}
        <Band x={14} y={190} w={1006} h={150} label={L.storage} />
        <Node x={250} y={220} w={150} h={56} title="Bronze" accent={C.bronze} />
        <Node x={460} y={220} w={150} h={56} title="Silver" accent={C.silver} />
        <Node x={670} y={220} w={150} h={56} title="Gold" accent={C.warn} />
        <Arrow d="M400,248 L453,248" />
        <Arrow d="M610,248 L663,248" />
        <Label x={535} y={310}>
          ADLS Gen2 · Delta Lake
        </Label>

        {/* process ↔ storage */}
        <BiArrow d="M325,150 L325,214" />
        <BiArrow d="M535,150 L535,214" />
        <BiArrow d="M745,150 L745,214" />

        {/* governance */}
        <Band x={14} y={380} w={1006} h={70} label={L.governance} />
        <Node x={460} y={395} w={210} h={40} title="Unity Catalog" sub="" accent={C.violet} fontSize={12} />

        {/* platform */}
        <Band x={14} y={470} w={1006} h={76} label={L.platform} />
        <Chip x={250} y={494} w={150} label="Entra ID" />
        <Chip x={412} y={494} w={160} label="Cost Mgmt" />
        <Chip x={584} y={494} w={140} label="Key Vault" />
        <Chip x={736} y={494} w={140} label="Logic Apps" />
        <Chip x={888} y={494} w={120} label="DevOps" />
      </svg>
    </DiagramFrame>
  );
}

/* ── 3. L&T ECC — HDInsight → Databricks migration ───────────────────────── */
export function LtDiagram({ L }) {
  const c = usePalette();
  return (
    <DiagramFrame minWidth={1000} caption={L.caption}>
      <svg viewBox="0 0 1180 500" className="h-auto w-full" role="img" aria-label={L.caption}>
        <Defs />

        {/* after */}
        <Zone x={14} y={30} w={1006} h={170} label={L.after} colour={C.signal} />
        <Node x={60} y={80} w={150} title="ADLS Gen2" accent={C.signal} />
        <Node x={240} y={80} w={150} title="Apache Spark" />
        <Node x={420} y={80} w={190} title="Databricks" sub={L.jobCluster} accent={C.signal} />
        <Node x={640} y={80} w={150} title="SQL Database" />
        <Node x={820} y={80} w={150} title="GitHub" sub="CI/CD" />
        <Node x={1048} y={80} w={118} title="Power BI" accent={C.warn} />
        <Arrow d="M970,109 L1041,109" />

        {/* migration */}
        <Arrow d="M520,300 L520,207" colour={C.signal} marker="ahSignal" width={2} />
        <rect x={430} y={228} width={180} height={34} rx="8" fill={c.surface} stroke={c.signal} />
        <text
          x={520}
          y={250}
          textAnchor="middle"
          fill={c.signal}
          fontSize="12"
          fontWeight="700"
          fontFamily={MONO}
        >
          {L.migration}
        </text>
        <Label x={660} y={250} anchor="start">
          {L.migrationNote}
        </Label>

        {/* before */}
        <Zone x={14} y={300} w={1006} h={170} label={L.before} />
        <Node x={60} y={350} w={150} title="ADLS Gen1" />
        <Node x={240} y={350} w={150} title="Apache Spark" />
        <Node x={420} y={350} w={190} title="HDInsight" sub="Hadoop / YARN" />
        <Node x={640} y={350} w={150} title="SQL Database" />
        <Node x={1048} y={350} w={118} title="Power BI" accent={C.warn} />
        <Arrow d="M790,379 L1041,379" />
      </svg>
    </DiagramFrame>
  );
}

/* ── 4. Tampnet — certified sensor evaluation to cloud ───────────────────── */
export function TampnetDiagram({ L }) {
  const sensors = ['NB-IoT', 'LTE-M', 'LoRaWAN', '4G', 'MQTT · AMQP'];
  const certs = ['ATEX', 'IECEx'];

  return (
    <DiagramFrame minWidth={1000} caption={L.caption}>
      <svg viewBox="0 0 1180 420" className="h-auto w-full" role="img" aria-label={L.caption}>
        <Defs />

        {/* sensors */}
        <Zone x={14} y={30} w={250} h={356} label={L.sensors} colour={C.signal} />
        {sensors.map((s, i) => (
          <Chip key={s} x={40} y={70 + i * 42} w={198} label={s} accent={C.line} />
        ))}
        <Label x={139} y={302} weight="600">
          {L.certification}
        </Label>
        {certs.map((s, i) => (
          <Chip key={s} x={40 + i * 104} y={316} w={94} label={s} accent={C.warn} />
        ))}

        {/* lab */}
        <Zone x={330} y={110} w={260} h={200} label={L.onPrem} />
        <Node x={370} y={170} w={180} h={80} title={L.labTesting} sub={L.vendor} />
        <Arrow d="M264,208 L323,208" colour={C.signal} marker="ahSignal" />

        {/* pipeline out */}
        <Node x={660} y={180} w={170} h={60} title="Python API" sub={L.archiver} accent={C.data} />
        <Node x={900} y={180} w={170} h={60} title="ADLS Gen1" sub={L.coldStore} accent={C.data} />
        <Arrow d="M590,210 L653,210" />
        <Arrow d="M830,210 L893,210" />

        <Label x={745} y={266}>
          {L.realtime}
        </Label>
        <Label x={14} y={404} anchor="start">
          {L.note}
        </Label>
      </svg>
    </DiagramFrame>
  );
}

export const PROJECT_DIAGRAMS = {
  1: HochschuleDiagram,
  2: NavistarDiagram,
  3: LtDiagram,
  4: TampnetDiagram,
};
