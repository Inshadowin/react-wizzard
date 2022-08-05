import React from 'react';

export const renderChild = (
  child: React.ReactNode | Function,
  props: any
): JSX.Element => {
  if (typeof child === 'function') {
    return child(props);
  }

  if (React.isValidElement(child) && typeof child?.type !== 'string') {
    return React.cloneElement(child, props);
  }

  return null;
};
