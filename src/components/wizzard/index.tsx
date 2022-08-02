import React, { useState } from 'react';

import Stage from './Stage';
import { useNavigation } from './useNavigation';
import type { WizzardType } from '../../types';

const Wizzard: WizzardType = ({ children, state, onChange, defaultStage }) => {
  const stages = React.Children.map(children, c => c.props.stage);

  const [stage, setStage] = useState(defaultStage ?? stages[0]);
  const { goBack, goNext } = useNavigation(stages, stage, setStage);

  // doing this way, cause .toArray can't preserve type for TS
  const currentStageComponent = React.Children.map(children, c =>
    c.props.stage === stage
      ? React.cloneElement(c, {
          state,
          onChange,
          stage,
          setStage,
          goBack,
          goNext,
        })
      : null
  ).find(c => !!c);

  return <>{currentStageComponent}</>;
};

Wizzard.Stage = Stage;

export default Wizzard;
