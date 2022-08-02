import React from 'react';

import { useStageLifecycle } from './useStageLifecycle';
import type { CompoziteWizzardStageType } from '../../types';

const Stage: CompoziteWizzardStageType = ({
  children,
  state,
  onChange,
  stage,
  setStage,
  onEnter,
  onLeave,
  goBack,
  goNext,
}) => {
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
