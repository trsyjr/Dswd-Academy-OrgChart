//OBD
import Director from "../assets/obd/DirectorProfile.png";
import ABD from "../assets/obd/ABDProfile.png";
import ABBY from "../assets/obd/Abby.JPG";
import DIVIE from "../assets/obd/Divie.JPG";
import ROGER from "../assets/obd/Roger.JPG";
import RUTSEN from "../assets/obd/Rutsen.JPG";
import MAYZEL from "../assets/obd/Mayzel.JPG";
import GERCY from "../assets/obd/Gercy.JPG";
import FLOR from "../assets/obd/Flor.JPG";
import LEA from "../assets/obd/Lea.JPG";
import NADINE from "../assets/obd/Nadine.JPG";
import RHENCY from "../assets/obd/Rhency.JPG";
import HAROLD from "../assets/obd/Harold.JPG";
import DADA from "../assets/obd/Dada.JPG";

//KM
import ANGESSE from '../assets/kmd/Angesse.JPG';
import MAC from '../assets/kmd/Mac.JPG';
import ALMA from '../assets/kmd/Alma.JPG';
import DAN from '../assets/kmd/Dan.JPG';
import JANE from '../assets/kmd/Jane.JPG';
import INAH from '../assets/kmd/Inah.JPG';
import JAS from '../assets/kmd/Jas.JPG';
import NATE from '../assets/kmd/Nate.JPG';
import NOI from '../assets/kmd/Noi.JPG';
import TERE from '../assets/kmd/Tere.JPG';
import DALE from '../assets/kmd/Dale.JPG';
import DANA from '../assets/kmd/Dana.JPG';
import ELLA from '../assets/kmd/Ella.JPG';
import PIM from '../assets/kmd/Pim.jpg';
import MONICA from '../assets/kmd/Monica.JPG';
import AUDREY from '../assets/kmd/Audrey.JPG';
import TONY from '../assets/kmd/Tony.JPG'

//CBD
import DC from '../assets/cbd/DC.JPG';


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
          type: 'permanent',
          name: 'Marigrace D. Mateum',
          nickname: 'Angesse',
          image: ANGESSE,
          email: 'mdmateum@dswd.gov.ph',
          phone: 'N/A',
          profession: 'N/A',
          tasks: ['N/A']
        },
        {
          title: 'TS IV',
          type: 'permanent',
          name: 'VACANT',
          nickname: 'N/A',
          image: null,
          email: '',
          phone: 'N/A',
          profession: 'N/A',
          tasks: ['N/A']
        }
      ],
      sections: [
        {
          id: 'kpss',
          title: 'Knowledge Products & Services Section',
          pairs: [
            [
              { 
                title: 'PDO IV',
                type: 'cos',
                name: 'Mac Quay P. Labasano',
                nickname: 'Mac',
                image: MAC,
                email: 'mqplabasano@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A',
                tasks: ['N/A']
              },
              { title: 'AO IV',
                type: 'cos',
                name: 'Iana Sherrence O. Rivera',
                nickname: 'IANA',
                image: null,
                email: 'isorivera@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A',
                tasks: ['N/A']
              }
            ],
            [
              { 
                title: 'SWO III', 
                type: 'permanent', 
                name: 'Alma M. David', 
                nickname: 'Alma', 
                image: ALMA, 
                email: 'amdavid@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A',
                tasks: ['N/A']
              },
              { 
                title: 'TS III', 
                type: 'permanent', 
                name: 'Daniel D. Alejandre', 
                nickname: 'Dan', 
                image: DAN, 
                email: 'ddalejandre@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'ITO II', 
                type: 'cos', 
                name: 'VACANT', 
                nickname: 'N/A', 
                image: null,
                email: '', 
                phone: 'N/A',
                profession: 'N/A',
                tasks: ['N/A']
              },
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'N/A', 
                nickname: 'N/A', 
                image: null,
                email: '', 
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'Permanent', 
                name: 'Jane A. Baldino', 
                nickname: 'Jane', 
                image: JANE,
                email: 'jabaldino@dswd.gov.ph', 
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Jessica Inah C. Pangan', 
                nickname: 'Inah', 
                image: INAH,
                email: 'jicpangan@dswd.gov.ph', 
                phone: 'N/A',
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Jake Remphsy P. Dy', 
                nickname: 'Jake', 
                image: null, 
                email: 'jrpdy@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS II', 
                type: 'cos', 
                name: 'N/A', 
                nickname: 'N/A', 
                image: null, 
                email: '',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'contractual', 
                name: 'Jasmine E. Nacabuan', 
                nickname: 'Jas', 
                image: JAS, 
                email: 'jenacabuan@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'LIB II', 
                type: 'permanent', 
                name: 'Jonathan P. Futalan', 
                nickname: 'Nate', 
                image: NATE, 
                email: 'jpfutalan@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Noivel C. Badillo', 
                nickname: 'Noi', 
                image: NOI, 
                email: 'ncbadillo@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A', 
                tasks: ['N/A'] 
              },
              { 
                title: 'PDO III', 
                type: 'cos', 
                name: 'Maria Theresa M. Reyes', 
                nickname: 'Tere', 
                image: TERE, 
                email: 'mtmreyes@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Allendale M. De Luna', 
                nickname: 'Dale', 
                image: DALE, 
                email: 'amdeluna@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A', 
                tasks: ['N/A'] 
              },
              { 
                title: 'SWO III', 
                type: 'cos', 
                name: 'Danallyn R. Misanes', 
                nickname: 'Dana', 
                image: DANA, 
                email: 'drmisanes@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A', 
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'N/A', 
                nickname: 'N/A', 
                image: null, 
                email: '',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'SWO III', 
                type: 'cos', 
                name: 'Kristine C. Peralta',
                nickname: 'N/A', 
                image: null, 
                email: 'kcperalta@dswd.gov.ph',
                phone: 'N/A',
                profession: 'N/A', 
                tasks: ['N/A'] }
            ]
          ],
          bottomNode: { 
            title: 'AA II', 
            type: 'cos', 
            name: 'John Ronald Bascon', 
            nickname: 'N/A', 
            image: null,
            email: 'jrbascon@dswd.gov.ph', 
            phone: 'N/A', 
            tasks: ['N/A'] }
        },
        {
          id: 'oms',
          title: 'Operations and Marketing Section',
          pairs: [
            [
              { 
                title: 'SWO III', 
                type: 'permanent', 
                name: 'Elladonna M. Agor', 
                nickname: 'Ella', 
                image: ELLA, 
                email: 'emagor@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'PDO III', 
                type: 'cos', 
                name: 'Efricor B. Sakilayan', 
                nickname: 'Pim', 
                image: PIM, 
                email: 'ebsakilayan@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'N/A', 
                nickname: 'N/A', 
                image: null, 
                phone: 'N/A', 
                tasks: ['N/A'] 
              },
              { 
                title: 'SWO III', 
                type: 'cos', 
                name: 'Monica S. Solesta', 
                nickname: 'Monica', 
                image: MONICA, 
                email: 'mssolesta@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'AO V', 
                type: 'cos', 
                name: 'Virginia W Setias', 
                nickname: 'Che', 
                image: null, 
                email: 'vwsetias@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'SWO III', 
                type: 'cos', 
                name: 'Audrey Mae B. Ayap', 
                nickname: 'Audrey', 
                image: AUDREY, 
                email: 'ambayap@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'MDO II', 
                type: 'permanent', 
                name: 'Anthony Z. Contreras', 
                nickname: 'Tony', 
                image: TONY, 
                email: 'azcontreras@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { title: 'HHA III', 
                type: 'cos', 
                name: 'Jelly D. Orcales', 
                nickname: 'N/A', 
                image: null,
                email: 'jdorcales@dswd.gov.ph', 
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS I', 
                type: 'cos', 
                name: 'VACANT', 
                nickname: 'N/A', 
                image: null, 
                phone: 'N/A', 
                tasks: ['N/A'] 
              },
              { 
                title: 'HHA III', 
                type: 'cos', 
                name: 'Jhon Leo A. Toledo', 
                nickname: 'Leo', 
                image: null,
                email: 'jlatoledo@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS I', 
                type: 'cos', 
                name: 'VACANT', 
                nickname: 'N/A', 
                image: null, 
                phone: 'N/A', 
                tasks: ['N/A'] 
              },
              { 
                title: 'HHA III', 
                type: 'cos', 
                name: 'Lowegie S. Saliendres', 
                nickname: 'Lowe', 
                image: null, 
                email: 'lssaliendres@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ]
          ],
          bottomNode: { 
            title: 'HHA III', 
            type: 'cos', 
            name: 'Glenn M. Lozano', 
            nickname: 'Glenn', 
            image: null, 
            email: 'gmlozano@dswd.gov.ph',
            phone: 'N/A', 
            profession: 'N/A',
            tasks: ['N/A'] 
          }
        }
      ]
    },
    {
      id: 'cbd',
      title: 'CAPABILITY BUILDING DIVISION',
      leads: [
        {
          title: 'SWO V',
          type: 'permanent',
          name: 'Efleda Joyce S. Consulta',
          nickname: 'Joesa',
          image: DC,
          email: 'ejsconsulta@dswd.gov.ph',
          phone: 'N/A',
          profession: 'N/A',
          tasks: ['N/A']
        }
      ],
      sections: [
        {
          id: 'plds',
          title: 'Professional Learning & Development Section',
          pairs: [
            [
              { 
                title: 'TS IV', 
                type: 'cos', 
                name: 'Jesica S. Mencias', 
                nickname: 'Jes', 
                image: null,
                email: 'jsmencias@dswd.gov.ph', 
                phone: 'N/A',
                profession: 'N/A', 
                tasks: ['N/A'] 
              },
              { 
                title: 'PDO II', 
                type: 'permanent', 
                name: 'Louie Jane R. Francisco', 
                nickname: 'LJ', 
                image: null,
                email: 'ljrfrancisco@dswd.gov.ph', 
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'PDO IV', 
                type: 'cos', 
                name: 'Jan Paolo M. Leyva', 
                nickname: 'Pao', 
                image: null, 
                email: 'jpmleyva@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS II', 
                type: 'permanent', 
                name: 'Orchid S. Bibit', 
                nickname: 'Ms. O', 
                image: null, 
                email: 'osbibit@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'permanent', 
                name: 'Althea Muriel L. Pineda', 
                nickname: 'Thea', 
                image: null, 
                email: 'amlpineda@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS IV', 
                type: 'cos', 
                name: 'Carmina A. Llanto', 
                nickname: 'Mina', 
                image: null, 
                email: 'callanto@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Ma. Erica Ruby F. Fernandez', 
                nickname: 'Ruby', 
                image: null, 
                email: 'merffernandez@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS IV', 
                type: 'contractual', 
                name: 'Marry Ann Dealo', 
                nickname: 'Meann', 
                image: null, 
                email: 'matdealo@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'PDO III', 
                type: 'cos', 
                name: 'Tonghie R. Sy Jr.', 
                nickname: 'CJ', 
                image: null, 
                email: 'trsyjr@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'Web Developer',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Jovie D. Cabais', 
                nickname: 'Jovie', 
                image: null,
                email: 'jdcabais@dswd.gov.ph', 
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'PDO III', 
                type: 'cos', 
                name: 'Eddniel Patrick I. Papa', 
                nickname: 'Edd', 
                image: null, 
                email: 'epipapa@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Merielle O. Palacio', 
                nickname: 'Merl', 
                image: null, 
                email: 'mopalacio@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Kent B. Gaspar', 
                nickname: 'Kent', 
                image: null, 
                email: 'kbgaspar@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS III', 
                type: 'permanent', 
                name: 'Nancy E. Fortes', 
                nickname: 'Nancy', 
                image: null, 
                email: 'nefortes@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A']
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Mark Angel Malapira', 
                nickname: 'Angel', 
                image: null, 
                email: 'mamalapira@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'mamalapira@dswd.gov.ph',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS II', 
                type: 'contractual', 
                name: 'Maria Clarissa D. Raquinel', 
                nickname: 'Cla', 
                image: null,
                email: 'mcdraquinel@dswd.gov.ph', 
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Klenarchi Mae E. Flores', 
                nickname: 'Kleng', 
                image: null, 
                email: 'kmeflores@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Nikkita Lyka Gracia L. Ermino', 
                nickname: 'Lyka', 
                image: null, 
                email: 'nlglermino@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              }
            ],
            [
              { 
                title: 'TS III', 
                type: 'cos', 
                name: 'Jocelyn M. Edillo', 
                nickname: 'Jo', 
                image: null, 
                email: 'jmedillo@dswd.gov.ph',
                phone: 'N/A', 
                profession: 'N/A',
                tasks: ['N/A'] 
              },
              { 
                title: 'PDO II', 
                type: 'cos', 
                name: 'VACANT', 
                nickname: 'N/A', 
                image: null, 
                phone: 'N/A', 
                tasks: ['N/A'] 
              }
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