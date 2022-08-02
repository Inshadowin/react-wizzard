import { useEffect, useRef } from 'react';

import type { CompoziteWizzardStageProps } from '../../types';

export const useStageLifecycle = <T>({
  state,
  onChange,
  onEnter,
  onLeave,
}: Pick<
  CompoziteWizzardStageProps<T>,
  'state' | 'onChange' | 'onEnter' | 'onLeave'
>) => {
  const stateRef = useRef<{
    state: typeof state;
    onChange: typeof onChange;
  }>({ state, onChange });
  useEffect(() => {
    stateRef.current = { state, onChange };
  }, [state, onChange]);

  useEffect(() => {
    onEnter?.(stateRef.current.state, stateRef.current.onChange);

    return () => {
      onLeave?.(stateRef.current.state, stateRef.current.onChange);
    };
  }, []);
};
