import React, { useState } from 'react';

import Stage from './Stage';
import Consumer from './Consumer';
import { renderChild } from './renderChild';
import { useNavigation } from './useNavigation';
import type { WizzardType, WizzardChild } from '../../types';

const getStages = (children: WizzardChild<any> | WizzardChild<any>[]) => {
  if (!children) return [];

  return React.Children.toArray(children)
    .filter((c: WizzardChild<any>) => c?.type === Wizzard.Stage)
    .map((c: WizzardChild<any>) => (c.props['stage'] ?? null) as string)
    .filter(s => !!s);
};

const Wizzard: WizzardType = ({ children, state, onChange, defaultStage }) => {
  const stages = getStages(children);

  const [stage, setStage] = useState(defaultStage ?? stages[0]);
  const { goBack, goNext } = useNavigation(stages, stage, setStage);

  // doing this way, cause .toArray can't preserve type for TS
  const renderedChildren = React.Children.map(children, c => {
    const injectProps = {
      state,
      onChange,
      stage,
      setStage,
      goBack,
      goNext,
    };

    if (c?.type !== Wizzard.Stage) {
      return renderChild(c, injectProps);
    }

    if (!('stage' in c?.props)) return null;
    return c.props.stage === stage ? renderChild(c, injectProps) : null;
  }).filter(c => !!c);

  return <>{renderedChildren}</>;
};

Wizzard.Stage = Stage;
Wizzard.Consumer = Consumer;

export default Wizzard;
