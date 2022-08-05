import { useEffect, useRef } from 'react';

import type { WizzardProps, WizzardStageProps } from '../../types';

type UseStageLifecycleParams<T> = Pick<
  WizzardStageProps<T> & WizzardProps<T>,
  'state' | 'onChange' | 'onEnter' | 'onLeave'
>;

export const useStageLifecycle = <T>({
  state,
  onChange,
  onEnter,
  onLeave,
}: UseStageLifecycleParams<T>) => {
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
