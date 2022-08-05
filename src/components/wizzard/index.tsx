import React, { useState } from 'react';

import Stage from './Stage';
import Consumer from './Consumer';
import { renderChild } from './renderChild';
import { useNavigation } from './useNavigation';
import type { WizzardType } from '../../types';

const Wizzard: WizzardType = ({ children, state, onChange, defaultStage }) => {
  const stages = React.Children.map(
    children,
    c => (c?.props?.['stage'] ?? null) as string
  ).filter(s => !!s);

  const [stage, setStage] = useState(defaultStage ?? stages[0]);
  const { goBack, goNext } = useNavigation(stages, stage, setStage);

  // doing this way, cause .toArray can't preserve type for TS
  const renderedChildren = React.Children.map(children, c => {
    if (!c?.type) return null;

    const injectProps = {
      state,
      onChange,
      stage,
      setStage,
      goBack,
      goNext,
    };

    if (c.type === Wizzard.Stage) {
      if (!('stage' in c?.props)) return null;

      return c.props.stage === stage ? renderChild(c, injectProps) : null;
    }

    return renderChild(c, injectProps);
  }).filter(c => !!c);

  return <>{renderedChildren}</>;
};

Wizzard.Stage = Stage;
Wizzard.Consumer = Consumer;

export default Wizzard;
