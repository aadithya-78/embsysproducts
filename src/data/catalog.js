const product = (sku, name, description, keySpec, priceInr, availability = 'Build to order') => ({
  sku, name, description, keySpec, priceInr, availability,
})

const sheet = (id, name, eyebrow, description, products) => ({
  id, name, eyebrow, description, products,
})

export const workbooks = [
  {
    id: 'plc-control',
    name: 'PLC & Control Systems',
    file: 'plc-control-systems.xlsx',
    summary: 'Controllers for standalone machines, modular production cells and deterministic motion.',
    sheets: [
      sheet('compact-plc', 'Compact PLC', 'Machine control', 'All-in-one controllers for small machines and retrofit panels.', [
        product('AXC-120', 'AXC-120 Compact PLC', 'Compact controller with onboard digital I/O and two high-speed counter channels.', '24 DI / 16 DO · 2× RS485 · 100–240 VAC', 18400, 'In stock'),
        product('AXC-160E', 'AXC-160E Ethernet PLC', 'Ethernet-enabled PLC for conveyors, packaging machines and utility skids.', '32 DI / 24 DO · Modbus TCP · 24 VDC', 26900, 'In stock'),
        product('AXC-080R', 'AXC-080R Relay PLC', 'Entry controller with relay outputs for pumps, contactors and lighting loads.', '12 DI / 8 relay DO · RTC · 24 VDC', 12900),
      ]),
      sheet('modular-plc', 'Modular PLC', 'Scalable automation', 'Expandable CPUs and I/O for multi-station equipment and process lines.', [
        product('MXC-310', 'MXC-310 Modular CPU', 'Deterministic CPU with removable memory and independent service Ethernet port.', '1.2 ns instruction · 8 MB · dual Ethernet', 48500, 'In stock'),
        product('MXC-DI32', 'MXC 32-Channel Digital Input', 'Slim expansion module with grouped isolation and field-removable terminals.', '32× 24 VDC inputs · 4 groups · 18 mm', 11200, 'In stock'),
        product('MXC-AI08U', 'MXC Universal Analog Input', 'Eight-channel module for voltage, current, RTD and thermocouple signals.', '8 AI · 16-bit · channel-to-channel isolation', 23800),
      ]),
      sheet('safety-control', 'Safety Controllers', 'Functional safety', 'Configurable safety control for guards, e-stops and compact robot cells.', [
        product('SFC-16', 'SFC-16 Safety Controller', 'Configurable base unit for dual-channel safety devices and EDM feedback.', '16 safe inputs · 4 safe outputs · SIL 3 / PL e', 42600),
        product('SFC-IO8', 'SFC-IO8 Safety Expansion', 'Local expansion block for safety mats, light curtains and interlock switches.', '8 safe inputs · 2 test outputs · DIN rail', 19400),
        product('SRM-24D', 'SRM-24D Dual Safety Relay', 'Universal safety relay with monitored manual or automatic restart.', '2 NO safety contacts · 24 VDC · 22.5 mm', 7400, 'In stock'),
      ]),
      sheet('motion-control', 'Motion Control', 'Precision movement', 'Coordinated positioning modules for indexing and electronic gearing.', [
        product('MOT-4E', 'MOT-4E EtherCAT Motion CPU', 'Four-axis motion controller with cam tables and PLCopen function blocks.', '4 axes · EtherCAT · 1 ms cycle', 67500),
        product('MOT-P2', 'MOT-P2 Pulse Positioner', 'Two-axis pulse and direction module for economical indexing applications.', '2 axes · 500 kHz · linear interpolation', 21800),
        product('ENC-2H', 'ENC-2H Encoder Interface', 'High-speed quadrature interface for position, speed and cut-to-length control.', '2 channels · 1 MHz · 5/24 V encoder', 15600),
      ]),
    ],
  },
  {
    id: 'industrial-io',
    name: 'Industrial I/O & Sensing',
    file: 'industrial-io-and-sensing.xlsx',
    summary: 'Signal acquisition, distributed I/O and sensing hardware for harsh field environments.',
    sheets: [
      sheet('remote-io', 'Remote I/O', 'Distributed signals', 'Field I/O stations for reducing panel wiring and commissioning time.', [
        product('RIO-16D', 'RIO-16D Modbus I/O Block', 'Mixed digital I/O block for distributed machine signals over RS485.', '8 DI / 8 DO · Modbus RTU · −20 to 70 °C', 9800, 'In stock'),
        product('RIO-8A', 'RIO-8A Analog Acquisition Block', 'Precision input block for process transmitters and voltage signals.', '8 AI · 0/4–20 mA · 16-bit · isolated', 16400),
        product('RIO-EC32', 'RIO-EC32 EtherCAT Coupler', 'Fast remote I/O coupler with tool-free slice module connection.', '100 Mbps · 100 μs update · 32 modules', 28900),
      ]),
      sheet('process-sensors', 'Process Sensors', 'Plant measurement', 'Transmitters for pressure, level and temperature monitoring.', [
        product('PTX-16B', 'PTX-16B Pressure Transmitter', 'Stainless-steel pressure transmitter for hydraulic and utility systems.', '0–16 bar · 4–20 mA · G1/4 · IP67', 6200, 'In stock'),
        product('LVT-6M', 'LVT-6M Ultrasonic Level Sensor', 'Non-contact level transmitter with configurable blanking distance.', '0.3–6 m · 4–20 mA + RS485 · IP67', 13800),
        product('TTX-PT100', 'TTX-PT100 Head Transmitter', 'DIN-B temperature transmitter with sensor-break diagnostics.', 'Pt100 / RTD · 4–20 mA · ±0.15 °C', 3900, 'In stock'),
      ]),
      sheet('machine-sensors', 'Machine Sensors', 'Presence & position', 'Rugged sensors for counting, positioning and machine protection.', [
        product('PRX-M18I', 'PRX-M18I Inductive Sensor', 'Flush-mount inductive proximity sensor with visible status indication.', 'M18 · 8 mm · PNP NO · IP67', 1450, 'In stock'),
        product('PHE-R30', 'PHE-R30 Retroreflective Sensor', 'Polarized photoelectric sensor for reliable object detection on conveyors.', '0.1–7 m · PNP/NPN · light/dark select', 2950, 'In stock'),
        product('VIB-4M', 'VIB-4M Vibration Monitor', 'Machine vibration transmitter for motors, pumps and fan assemblies.', '0–25 mm/s RMS · 4–20 mA · M8 stud', 11800),
      ]),
    ],
  },
  {
    id: 'drives-motion',
    name: 'Drives & Motor Control',
    file: 'drives-and-motor-control.xlsx',
    summary: 'Energy-efficient speed, torque and positioning products for industrial machinery.',
    sheets: [
      sheet('variable-frequency', 'Variable Frequency Drives', 'Speed control', 'General-purpose and application-specific AC motor drives.', [
        product('VFD-2K2', 'VectorDrive 2.2 kW', 'Compact vector drive for pumps, fans, mixers and conveyors.', '3-phase 400 V · 2.2 kW · STO · Modbus', 18600, 'In stock'),
        product('VFD-7K5', 'VectorDrive 7.5 kW', 'Heavy-duty VFD with sensorless vector control and integrated braking unit.', '3-phase 400 V · 7.5 kW · 150% / 60 s', 36800),
        product('PMP-11K', 'PumpDrive 11 kW', 'Pump-focused drive with multi-pump sequencing and dry-run protection.', '3-phase 400 V · 11 kW · PID · sleep mode', 49500),
      ]),
      sheet('servo-systems', 'Servo Systems', 'Closed-loop motion', 'Matched servo drive and motor packages for precise machine axes.', [
        product('SVP-400', 'SVP-400 Servo Package', 'Low-inertia servo package for labeling, pick-and-place and indexing.', '400 W · 3000 rpm · 17-bit encoder', 42800),
        product('SVP-750E', 'SVP-750E EtherCAT Servo', 'Networked servo package with cyclic synchronous position mode.', '750 W · EtherCAT · 23-bit encoder · STO', 68900),
        product('SVR-2K0', 'SVR-2K0 Regenerative Servo', 'High-dynamic servo system with shared DC bus and braking recovery.', '2 kW · 300% peak torque · EtherCAT', 114000),
      ]),
      sheet('motor-starters', 'Motor Starters', 'Protected switching', 'Motor switching and electronic protection for control panels.', [
        product('DOL-12A', 'DOL-12A Motor Starter', 'Enclosed direct-on-line starter with phase-failure protection.', '4–12 A · 415 VAC · IP55 enclosure', 5800, 'In stock'),
        product('SST-30A', 'SST-30A Soft Starter', 'Three-phase soft starter for smooth acceleration and reduced mechanical stress.', '15 kW / 30 A · current limit · bypass relay', 22800),
        product('MPR-32', 'MPR-32 Electronic Motor Relay', 'Panel relay with adjustable overload, underload and stall detection.', '1–32 A · Modbus RTU · event memory', 9600),
      ]),
    ],
  },
  {
    id: 'industrial-networking',
    name: 'Industrial Networking',
    file: 'industrial-networking.xlsx',
    summary: 'Managed Ethernet, protocol conversion and secure remote connectivity for OT networks.',
    sheets: [
      sheet('ethernet-switches', 'Ethernet Switches', 'OT infrastructure', 'Industrial switches with redundant power and plant-floor diagnostics.', [
        product('IES-08G', 'IES-08G Gigabit Switch', 'Unmanaged DIN-rail switch for reliable machine-level connections.', '8× Gigabit RJ45 · dual 12–48 VDC · −40 to 75 °C', 8400, 'In stock'),
        product('IES-6P2F', 'IES-6P2F Managed PoE Switch', 'Managed PoE+ switch for cameras, HMIs and wireless access points.', '6× PoE+ · 2× SFP · VLAN · RSTP/MRP', 32600),
        product('IES-16M', 'IES-16M Managed Core Switch', 'Layer-2 managed switch with ring recovery and SNMP monitoring.', '12× Gigabit RJ45 · 4× SFP · <20 ms ring', 54800),
      ]),
      sheet('protocol-gateways', 'Protocol Gateways', 'Data translation', 'Deterministic protocol bridges for PLC, SCADA and metering systems.', [
        product('GW-MB2E', 'GW-MB2E Modbus Gateway', 'Multi-port gateway linking Modbus RTU devices to redundant Ethernet networks.', '2× RS485 · 2× Ethernet · 32 TCP clients', 17800, 'In stock'),
        product('GW-PNEC', 'GW-PNEC PROFINET–EtherCAT Gateway', 'Transparent cyclic I/O exchange between PROFINET and EtherCAT cells.', '512-byte cyclic I/O · 1 ms minimum cycle', 46500),
        product('GW-CANM', 'GW-CANM CANopen–Modbus Gateway', 'Configurable gateway for integrating CANopen devices with Modbus controllers.', 'CANopen master · Modbus TCP/RTU · 126 nodes', 39800),
      ]),
      sheet('edge-connectivity', 'Edge Connectivity', 'Secure remote access', 'Industrial routers and edge gateways for remote assets and analytics.', [
        product('EDG-4L', 'EDG-4L LTE Edge Router', 'Dual-SIM cellular router with automatic WAN failover and VPN.', '4G LTE · 2× LAN · Wi-Fi · WireGuard/IPsec', 28900),
        product('EDG-200', 'EDG-200 IIoT Gateway', 'Fanless edge computer for protocol collection and containerized applications.', 'Quad-core · 4 GB RAM · 32 GB eMMC · MQTT/OPC UA', 46500),
        product('WAP-AC12', 'WAP-AC12 Industrial Access Point', 'Dual-band access point for production floors and mobile operator stations.', '802.11ac · 2×2 MIMO · roaming · IP30', 21200),
      ]),
    ],
  },
  {
    id: 'power-panel',
    name: 'Power & Panel Components',
    file: 'power-and-panel-components.xlsx',
    summary: 'Reliable power conversion, protection and operator-interface components for control panels.',
    sheets: [
      sheet('dc-power', 'DC Power Supplies', 'Control power', 'High-efficiency DIN-rail power supplies for automation loads.', [
        product('PSU-0245', 'PSU-0245 Slim Power Supply', 'Compact supply for PLCs, sensors and relay loads.', '24 VDC / 5 A · 120 W · 90–264 VAC', 5200, 'In stock'),
        product('PSU-2410R', 'PSU-2410R Redundant Supply', 'Parallel-capable supply with active load sharing and DC-OK relay.', '24 VDC / 10 A · 240 W · 150% boost', 9800),
        product('DUPS-10', 'DUPS-10 DC UPS Controller', 'Battery-backed controller for orderly PLC and IPC shutdown.', '24 VDC / 10 A · lead-acid/LiFePO₄ · USB', 12600),
      ]),
      sheet('protection', 'Circuit Protection', 'Panel safety', 'Selective protection and power monitoring for branch circuits.', [
        product('ECB-08', 'ECB-08 Electronic Breaker', 'Eight-channel electronic circuit breaker with per-channel current setting.', '8× 0.5–6 A · Modbus RTU · remote reset', 14800),
        product('SPD-3P40', 'SPD-3P40 Surge Protector', 'Three-phase Type 2 surge protection with remote status contact.', '40 kA · 385 VAC · pluggable modules', 6900, 'In stock'),
        product('PMT-96', 'PMT-96 Power Meter', 'Panel power meter with harmonic measurement and energy logging.', '3-phase · class 0.5S · RS485 Modbus', 11800),
      ]),
      sheet('operator-controls', 'Operator Controls', 'Human-machine interface', 'Durable switches, indicators and stack lights for machine panels.', [
        product('PBS-22R', 'PBS-22R Illuminated Pushbutton', 'Metal-bezel momentary pushbutton with replaceable contact blocks.', '22 mm · red LED · 1 NO + 1 NC · IP65', 780, 'In stock'),
        product('EST-40', 'EST-40 Emergency Stop', 'Twist-release mushroom emergency-stop operator with safety contacts.', '40 mm · 2 NC · anti-rotation collar · IP65', 1250, 'In stock'),
        product('STL-3B', 'STL-3B Modular Stack Light', 'Three-segment signal tower with selectable steady or flashing operation.', 'Red/amber/green · 24 VDC · buzzer · 50 mm', 4200),
      ]),
    ],
  },
  {
    id: 'automation-essentials',
    name: 'Automation Essentials',
    file: 'automation-essentials.xlsx',
    summary: 'Everyday commissioning, isolation and panel-building hardware for automation teams.',
    sheets: [
      sheet('signal-conditioning', 'Signal Conditioning', 'Clean field signals', 'Isolators and converters for dependable analog measurement loops.', [
        product('ISO-UI1', 'ISO-UI1 Universal Isolator', 'Configurable single-channel isolator for common process signals.', '0/4–20 mA · 0–10 V · 2.5 kV isolation', 4100, 'In stock'),
        product('SPL-420', 'SPL-420 Current Loop Splitter', 'One-input, two-output loop splitter with independent output isolation.', '1× 4–20 mA in · 2× 4–20 mA out', 6200),
        product('TCX-UNI', 'TCX-UNI Temperature Converter', 'Universal thermocouple and RTD converter with cold-junction compensation.', '10 sensor types · 4–20 mA · USB setup', 5400),
      ]),
      sheet('panel-relays', 'Interface Relays', 'Load isolation', 'Slim relays and solid-state interfaces between controls and field loads.', [
        product('RLY-6A', 'RLY-6A Slim Interface Relay', 'Plug-in interface relay with status LED and test lever.', '1 CO · 6 A · 24 VDC coil · 6.2 mm', 420, 'In stock'),
        product('SSR-25D', 'SSR-25D DC Solid-State Relay', 'Silent zero-wear switching for heaters and frequent-cycle loads.', '3–32 VDC input · 25 A / 480 VAC output', 1850, 'In stock'),
        product('RLY-4C', 'RLY-4C Relay Output Module', 'Four-channel relay interface with pluggable terminals and common supply.', '4× 2 CO · 6 A · 24 VDC · DIN rail', 3600),
      ]),
      sheet('commissioning-tools', 'Commissioning Tools', 'Faster diagnostics', 'Portable tools for troubleshooting industrial signals and networks.', [
        product('CAL-420', 'CAL-420 Loop Calibrator', 'Handheld source and measure tool for 4–20 mA commissioning.', '0.02% accuracy · loop power · ramp/step', 19800),
        product('NET-RS', 'NET-RS Serial Network Tester', 'Pocket diagnostic tool for RS232/RS485 traffic and Modbus polling.', 'RS232/RS485 · Modbus master/slave · USB-C', 12400),
        product('ETH-TAP', 'ETH-TAP Industrial Ethernet Tap', 'Passive full-duplex test access point for non-intrusive packet capture.', '10/100 Mbps · zero delay · dual monitor ports', 28600),
      ]),
    ],
  },
]

export const totalProductCount = workbooks.reduce(
  (total, workbook) => total + workbook.sheets.reduce((sheetTotal, item) => sheetTotal + item.products.length, 0),
  0,
)

export const totalSheetCount = workbooks.reduce((total, workbook) => total + workbook.sheets.length, 0)
