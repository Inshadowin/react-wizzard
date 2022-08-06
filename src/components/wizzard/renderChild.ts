import React from 'react';

import Wizzard from '.';
import type { WizzardStageChildrenProps } from '../../types';

export const renderChild = <T>(
  child: React.ReactNode | Function,
  props: WizzardStageChildrenProps<T>,
  stage?: string
): JSX.Element => {
  if (typeof child === 'function') {
    return child(props);
  }

  if (!React.isValidElement(child) || typeof child?.type === 'string') {
    return child as JSX.Element;
  }

  if (child.type === Wizzard.Consumer) {
    return React.cloneElement(child, props);
  }

  if (child.type === Wizzard.Stage) {
    const childStage = child.props['stage'];

    return childStage && childStage === stage
      ? React.cloneElement(child, props)
      : null;
  }

  return child;
};
