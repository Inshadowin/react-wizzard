import { renderChild } from './renderChild';
import type {
  WizzardConsumerProps,
  WizzardStageChildrenProps,
} from '../../types';

type ConsumerProps<T> = WizzardConsumerProps<T> & WizzardStageChildrenProps<T>;

const Consumer = <T,>({
  children,
  state,
  onChange,
  stage,
  setStage,
  goBack,
  goNext,
}: ConsumerProps<T>) => {
  return renderChild(children, {
    state,
    onChange,
    stage,
    setStage,
    goBack,
    goNext,
  });
};

export default Consumer;
