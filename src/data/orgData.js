import Director from "../assets/images/DirectorProfile.png";
import ABD from "../assets/images/ABDProfile.png";
import ABBY from "../assets/images/Abby.JPG";
import DIVIE from "../assets/images/Divie.JPG";
import ROGER from "../assets/images/Roger.JPG";
import RUTSEN from "../assets/images/Rutsen.JPG";
import MAYZEL from "../assets/images/Mayzel.JPG";
import GERCY from "../assets/images/Gercy.JPG";
import FLOR from "../assets/images/Flor.JPG";
import LEA from "../assets/images/Lea.JPG";
import NADINE from "../assets/images/Nadine.JPG";
import RHENCY from "../assets/images/Rhency.JPG";
import HAROLD from "../assets/images/Harold.JPG";
import DADA from "../assets/images/Dada.JPG";

export const CLASSIFICATION_STYLES = {
  director: {
    bg: 'bg-amber-50/90 hover:bg-amber-100/90',
    border: 'border-amber-400 hover:border-amber-500 shadow-amber-500/10',
    tagBg: 'bg-amber-600',
    tagText: 'text-white',
    accent: 'from-amber-400 to-orange-500',
    titleText: 'text-amber-950 font-black',
    nameText: 'text-slate-700 font-semibold',
    label: 'Permanent',
    tag: 'PERM'
  },
  permanent: {
    bg: 'bg-amber-50/90 hover:bg-amber-100/90',
    border: 'border-amber-400 hover:border-amber-500 shadow-amber-500/10',
    tagBg: 'bg-amber-600',
    tagText: 'text-white',
    accent: 'from-amber-400 to-orange-500',
    titleText: 'text-amber-950 font-black',
    nameText: 'text-slate-700 font-semibold',
    label: 'Permanent',
    tag: 'PERM'
  },
  cos: {
    bg: 'bg-emerald-50/90 hover:bg-emerald-100/90',
    border: 'border-emerald-500 hover:border-emerald-600 shadow-emerald-500/10',
    tagBg: 'bg-emerald-700',
    tagText: 'text-white',
    accent: 'from-emerald-400 to-teal-500',
    titleText: 'text-emerald-950 font-black',
    nameText: 'text-slate-700 font-semibold',
    label: 'COS Staff',
    tag: 'COS'
  },
  contractual: {
    bg: 'bg-sky-50/90 hover:bg-sky-100/90',
    border: 'border-sky-500 hover:border-sky-600 shadow-sky-500/10',
    tagBg: 'bg-sky-700',
    tagText: 'text-white',
    accent: 'from-sky-400 to-blue-500',
    titleText: 'text-sky-950 font-black',
    nameText: 'text-slate-700 font-semibold',
    label: 'Contractual',
    tag: 'CONT'
  }
};

export const orgData = {
  dir4: {
    id: 'dir4',
    title: 'Director IV',
    type: 'permanent',
    name: 'Justin Caesar Anthony D. Batocabe',
    nickname: 'Justin',
    image: Director,
    phone: '+639178830769',
    email: 'jcadbatocabe@dswd.gov.ph',
    profession: 'Attorney',
    tasks: []
  },
  dir3: {
    id: 'dir3',
    title: 'Director III',
    type: 'permanent',
    name: 'Precilia A Docuyanan',
    nickname: 'N/A',
    image: ABD,
    phone: 'N/A',
    email: 'padocuyanan@dswd.gov.ph',
    profession: 'N/A',
    tasks: []
  },
  obd: {
    id: 'obd',
    title: 'OFFICE OF THE BUREAU DIRECTOR',
    cols: [
      [
        {
          title: 'ADAS III',
          type: 'permanent',
          name: 'Mary Abegail J. Fandagani',
          nickname: 'N/A',
          image: ABBY,
          phone: 'N/A',
          email: 'majfandagani@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'ADAS I',
          type: 'permanent',
          name: 'Rosalie R. Lee',
          nickname: 'N/A',
          image: LEA,
          phone: 'N/A',
          email: 'rrlee@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'ADAS I',
          type: 'permanent',
          name: 'Divie D. Medina',
          nickname: 'N/A',
          image: DIVIE,
          phone: 'N/A',
          email: 'ddmedina@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'PDO V',
          type: 'cos',
          name: 'Rogelio Tomas L. Gutierrez',
          nickname: 'N/A',
          image: ROGER,
          phone: 'N/A',
          email: 'rtlgutierrez@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'AO IV',
          type: 'cos',
          name: 'Rutsen R. Natulla',
          nickname: 'N/A',
          image: RUTSEN,
          phone: 'N/A',
          email: 'rrnatulla@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        }
      ],
      [
        {
          title: 'AO IV',
          type: 'cos',
          name: 'Mayzel C. Guerrero',
          nickname: 'N/A',
          image: MAYZEL,
          phone: 'N/A',
          email: 'mcguerrero@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'PLO II',
          type: 'permanent',
          name: 'Gercy C. Virtucio',
          nickname: 'N/A',
          image: GERCY,
          phone: 'N/A',
          email: 'gvirtucio@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'AO V',
          type: 'permanent',
          name: 'Ruby Anna R. Tolentino',
          nickname: 'N/A',
          image: null,
          phone: 'N/A',
          email: 'rartolentino@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'AO IV',
          type: 'cos',
          name: 'Rosario G. Mayrina',
          nickname: 'N/A',
          image: FLOR,
          phone: 'N/A',
          email: 'rgmayrina@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        }
      ],
      [
        {
          title: 'ADAS V',
          type: 'cos',
          name: 'Rhency P. Chua',
          nickname: 'N/A',
          image: RHENCY,
          phone: 'N/A',
          email: 'rpchua@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'AA I',
          type: 'permanent',
          name: 'Harold M. Aguilar',
          nickname: 'N/A',
          image: HAROLD,
          phone: 'N/A',
          email: 'hmaguilar@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'AAIDE VI',
          type: 'permanent',
          name: 'Editha S Uriarte',
          nickname: 'N/A',
          image: DADA,
          phone: 'N/A',
          email: 'esuriarte@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'AVEO VI',
          type: 'cos',
          name: 'VACANT',
          nickname: 'N/A',
          image: null,
          phone: 'N/A',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'ADAS III',
          type: 'cos',
          name: 'Loisse Nadine Q. Madrid',
          nickname: 'Nadine',
          image: NADINE,
          phone: 'N/A',
          email: 'lnqmadrid@dswd.gov.ph',
          profession: 'N/A',
          tasks: ['N/A']
        }
      ]
    ]
  },
  divisions: [
    {
      id: 'kmd',
      title: 'KNOWLEDGE MANAGEMENT DIVISION',
      leads: [
        {
          title: 'SWO V',
          type: 'cos',
          name: 'N/A',
          nickname: 'N/A',
          image: null,
          phone: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'TS IV',
          type: 'permanent',
          name: 'N/A',
          nickname: 'N/A',
          image: null,
          phone: 'N/A',
          tasks: ['N/A']
        }
      ],
      sections: [
        {
          id: 'kpss',
          title: 'Knowledge Products & Services Section',
          pairs: [
            [
              { title: 'PDO IV', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'AO IV', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'ITO II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'LIB II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'PDO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ]
          ],
          bottomNode: { title: 'AA II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
        },
        {
          id: 'oms',
          title: 'Operations and Marketing Section',
          pairs: [
            [
              { title: 'SWO III', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'PDO III', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'AO V', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'MDO II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'HHA III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS I', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'HHA III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS I', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'HHA III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ]
          ],
          bottomNode: { title: 'HHA III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
        }
      ]
    },
    {
      id: 'cbd',
      title: 'CAPABILITY BUILDING DIVISION',
      leads: [
        {
          title: 'SWO V',
          type: 'cos',
          name: 'N/A',
          nickname: 'N/A',
          image: null,
          phone: 'N/A',
          tasks: ['N/A']
        }
      ],
      sections: [
        {
          id: 'plds',
          title: 'Professional Learning & Development Section',
          pairs: [
            [
              { title: 'TS IV', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'PDO II', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'PDO IV', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS IV', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS IV', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'PDO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'PDO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'TS II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'PDO II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'ISA I', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'ADAS II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ],
            [
              { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
              { title: 'AAIDE VI', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
            ]
          ]
        },
        {
          id: 'taaorss',
          title: 'TAAORSS Section',
          stack: [
            { title: 'TS III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'PDO IV', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'PDO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'PDO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'STAT III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'PDO II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'TS II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'AA II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
          ]
        }
      ]
    },
    {
      id: 'lndd',
      title: 'LEARNING NETWORK DEVELOPMENT DIVISION',
      leads: [
        {
          title: 'TS IV - OIC',
          type: 'cos',
          name: 'N/A',
          nickname: 'N/A',
          image: null,
          phone: 'N/A',
          tasks: ['N/A']
        }
      ],
      sections: [
        {
          id: 'acas',
          title: 'Assessment Certification & Accreditation Section',
          stack: [
            { title: 'PDO IV', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'PDO III', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'TS III', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'AO IV', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
          ]
        },
        {
          id: 'aqas',
          title: 'Accreditation & Quality Assurance Section',
          stack: [
            { title: 'PDO V', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'PDO III', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'permanent', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'SWO III', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'PDO II', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] },
            { title: 'AO IV', type: 'cos', name: 'N/A', nickname: 'N/A', image: null, phone: 'N/A', tasks: ['N/A'] }
          ]
        }
      ]
    }
  ]
};