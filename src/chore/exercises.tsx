/**
 * DO NOT UPDATE
 * This is the exercise objets that will be used to create the exercises.
 */

// Exercice 1
import TS_1 from '../exercices/1';
import { ReactComponent as TS_1_MD } from '../exercices/1.md';
import TS_1_S_1 from '../solutions/1-1';
import TS_1_S_2 from '../solutions/1-2';
import TS_1_S_3 from '../solutions/1-3';

// Exercise 2
import TS_2 from '../exercices/2';
import { ReactComponent as TS_2_MD } from '../exercices/2.md';
import TS_2_S_1 from '../solutions/2-1';
import TS_2_S_2 from '../solutions/2-2';
import TS_2_S_3 from '../solutions/2-3';

// Exercice 3
import TS_3 from '../exercices/3';
import { ReactComponent as TS_3_MD } from '../exercices/3.md';
import TS_3_S_1 from '../solutions/3-1';
import TS_3_S_2 from '../solutions/3-2';

// Exercice 5
import TS_4 from '../exercices/4';
import { ReactComponent as TS_4_MD } from '../exercices/4.md';
import TS_4_S_1 from '../solutions/4-1';
import TS_4_S_2 from '../solutions/4-2';
import TS_4_S_3 from '../solutions/4-3';

export const EXERCISES = [
  {
    name: '1-components-ts',
    parts: {
      exercises: [<TS_1 key={1} />],
      md: <TS_1_MD />,
      solutions: [<TS_1_S_1 key={0} />, <TS_1_S_2 key={1} />, <TS_1_S_3 key={2} />],
    },
  },
  {
    name: '2-hooks-ts',
    parts: {
      exercises: [<TS_2 key={1} />],
      md: <TS_2_MD />,
      solutions: [<TS_2_S_1 key={0} />, <TS_2_S_2 key={1} />, <TS_2_S_3 key={2} />],
    },
  },
  {
    name: '3-types-ts',
    parts: {
      exercises: [<TS_3 key={1} />],
      md: <TS_3_MD />,
      solutions: [<TS_3_S_1 key={0} />, <TS_3_S_2 key={1} />],
    },
  },
  {
    name: '4-context-ts',
    parts: {
      exercises: [<TS_4 key={1} />],
      md: <TS_4_MD />,
      solutions: [<TS_4_S_1 key={0} />, <TS_4_S_2 key={1} />, <TS_4_S_3 key={2} />],
    },
  },
];
