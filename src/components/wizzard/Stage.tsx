import React from 'react';

import { useStageLifecycle } from './useStageLifecycle';
import type { WizzardStageProps, WizzardStageChildrenProps } from '../../types';

type StageProps<T> = WizzardStageProps<T> & WizzardStageChildrenProps<T>;

const Stage = <T,>({
  children,
  state,
  onChange,
  stage,
  setStage,
  onEnter,
  onLeave,
  goBack,
  goNext,
}: StageProps<T>) => {
  useStageLifecycle({
    state,
    onChange,
    onEnter,
    onLeave,
  });

  if (!React.isValidElement(children)) return <></>;

  return React.cloneElement(children, {
    state,
    onChange,
    stage,
    setStage,
    goBack,
    goNext,
  });
};

export default Stage;
