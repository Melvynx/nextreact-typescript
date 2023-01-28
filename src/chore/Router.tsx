/**
 * DO NOT UPDATE THIS FILE
 *
 * This file is created to make the exercises friendly. Any update can break the exercises.
 */

import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { ExerciseProse } from './ExerciseProse.js';
import { EXERCISES } from './exercises';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {EXERCISES.map((exercise) => (
        <React.Fragment key={exercise.name}>
          <Route
            key={exercise.name}
            path={`/${exercise.name}`}
            element={<ExerciseRoutes data={exercise} />}
          />

          {exercise.parts.exercises.length === 1 ? (
            <Route
              key={exercise.name}
              path={`/${exercise.name}/exercise`}
              element={
                <ExerciseProse markdownElement={exercise.parts.md}>
                  {exercise.parts.exercises[0]}
                </ExerciseProse>
              }
            />
          ) : (
            exercise.parts.exercises.map((exercisePart, i) => (
              <Route
                key={`${exercise.name}-${i}`}
                path={`/${exercise.name}/exercise/${i + 1}`}
                element={
                  <ExerciseProse markdownElement={exercise.parts.md}>
                    {exercisePart}
                  </ExerciseProse>
                }
              />
            ))
          )}

          {exercise.parts.solutions.map((solution, i) => (
            <Route
              key={`${exercise.name}-${i}`}
              path={`/${exercise.name}/solution/${i + 1}`}
              element={solution}
            />
          ))}

          <Route
            path={`/${exercise.name}/*`}
            element={<Navigate to={`/${exercise.name}`} replace={true} />}
          />
        </React.Fragment>
      ))}
    </Routes>
  );
};

const ExerciseRoutes = ({ data }: { data: typeof EXERCISES[0] }) => {
  return (
    <div className="navigation-page">
      <h1 className="work-sans">{data.name}</h1>
      <div className="nav-list">
        {data.parts.exercises.length === 1 ? (
          <Link className="router-exercise" to={`/${data.name}/exercise`}>
            Exercise
          </Link>
        ) : (
          data.parts.exercises.map((exercisePart, i) => (
            <Link
              className="router-exercise"
              key={i}
              to={`/${data.name}/exercise/${i + 1}`}
            >
              Exercise {i + 1}
            </Link>
          ))
        )}
        {data.parts.solutions.map((_, i) => (
          <Link key={i} to={`/${data.name}/solution/${i + 1}`}>
            Solution {i + 1}
          </Link>
        ))}
        <Link style={{ marginTop: 64 }} to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="navigation-page">
      <h1 className="work-sans">BeginReact - Les hooks</h1>
      <div className="nav-list">
        {EXERCISES.map((exercise, i) => (
          <Link key={i} to={`/${exercise.name}`}>
            {exercise.name}
          </Link>
        ))}
      </div>
      <p>
        Les liens te permettent de te repérer dans les exercises.
        <br />
        Si tu es perdu ou tu as des problèmes, rejoins le discord et n'hésite pas à
        demander de l'aide.
      </p>
    </div>
  );
};
