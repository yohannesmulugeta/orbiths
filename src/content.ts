export type Service = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  image: string;
  alt: string;
  objectPosition?: string;
};

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`;

export const images = {
  hero: asset('scanner'),
  microscope: asset('microscope'),
  laboratoryTeam: asset('lab-team'),
  radiology: asset('scanner'),
  operatingRoom: asset('operating-room'),
  companyTraining: asset('training'),
  mobileClinic: asset('mobile-clinic'),
  ventilator: asset('operating-room'),
  medicalGas: asset('medical-gas'),
  coldChain: asset('cold-chain'),
  infectionControl: asset('infection-control'),
  consumables: asset('consumables'),
};

export const solutions: Service[] = [
  { id:'critical-care',number:'01',title:'ICU & Operating Room Equipment',short:'Critical care & surgery',description:'Equipment solutions to support intensive care and surgical environments.',image:images.ventilator,alt:'Operating room with surgical lighting, patient monitors and a clinical team' },
  { id:'laboratory',number:'02',title:'Laboratory Equipment',short:'Laboratory & research',description:'Scientific, research and medical laboratory equipment for diagnostics and day-to-day operations.',image:images.microscope,alt:'Precision microscope in a medical laboratory' },
  { id:'radiology',number:'03',title:'Advanced Radiology Systems',short:'Imaging & radiology',description:'Medical imaging systems selected for the specific requirements of each facility.',image:images.radiology,alt:'Modern medical scanner in a diagnostic suite' },
  { id:'cold-chain',number:'04',title:'Cold Chain & Blood Chain Management',short:'Temperature-sensitive care',description:'Solutions for temperature-controlled storage and blood chain management.',image:images.coldChain,alt:'Medical cold-chain equipment' },
  { id:'medical-gas',number:'05',title:'Medical Gas',short:'Medical gas infrastructure',description:'Planning and supply support for essential medical gas systems.',image:images.medicalGas,alt:'Medical gas system equipment' },
  { id:'infection-control',number:'06',title:'Waste Management & Infection Control',short:'Safer clinical environments',description:'Healthcare waste and infection-control equipment for clinical settings.',image:images.infectionControl,alt:'Healthcare waste treatment equipment' },
  { id:'consumables',number:'07',title:'Medical Consumables',short:'Everyday clinical needs',description:'Medical consumables supporting care delivery and routine clinical work.',image:images.consumables,alt:'Medical patient breathing circuit consumable' },
  { id:'mobile-clinics',number:'08',title:'Custom-Built Mobile Clinics',short:'Healthcare that moves',description:'Mobile medical clinic solutions for providing care beyond permanent facilities.',image:images.mobileClinic,alt:'Mobile healthcare clinic vehicle' },
];

export const approach = [
  { number:'01',title:'Understand the need',copy:'Project identification, facility assessment and planning.' },
  { number:'02',title:'Find the right solution',copy:'Equipment supply and coordinated project management.' },
  { number:'03',title:'Make it operational',copy:'Installation, commissioning and implementation support.' },
  { number:'04',title:'Support what follows',copy:'Equipment training and ongoing technical assistance.' },
];

export const capabilities = [
  'Project identification & conceptualization','Project management','Supply of equipment',
  'Installation & commissioning','Training','Technical support'
];


export const services = [
  {title:'Project Identification & Conceptualization',copy:'Define the needs of a healthcare facility and develop a practical project concept and plan.'},
  {title:'Project Management',copy:'Coordinate the steps of delivery so that healthcare projects are tailored to local needs.'},
  {title:'Supply of Equipment',copy:'Select and supply technically compliant medical equipment and products for each project.'},
  {title:'Installation & Commissioning',copy:'Bring equipment into service through installation and commissioning.'},
  {title:'Training',copy:'Help healthcare and technical teams understand the equipment they use.'},
  {title:'Technical Support',copy:'Provide technical assistance after installation to support continued equipment use.'},
];
