import React from 'react';

export type ConsumerChildType<T> =
  | React.ReactNode
  | React.ReactElement<WizzardStageChildrenProps<T>>
  | ((params: WizzardStageChildrenProps<T>) => JSX.Element);
export type WizzardStageChildType<T> =
  | React.ReactElement<WizzardStageChildrenProps<T>>
  | ((params: WizzardStageChildrenProps<T>) => JSX.Element);

export type WizzardStageChildrenProps<T> = {
  state?: T;
  onChange?: (newState: T) => void;
  stage?: string;
  setStage?: (newStage: string) => void;
  goBack?: (() => void) | null;
  goNext?: (() => void) | null;
};

export type WizzardConsumerProps<T> = {
  children: ConsumerChildType<T>;
};
export type WizzardStageProps<T> = {
  stage: string;
  onEnter?: (state?: T, onChange?: (newState: T) => void) => void;
  onLeave?: (state?: T, onChange?: (newState: T) => void) => void;
  children: WizzardStageChildType<T>;
};

export type WizzardStageType = <T>(props: WizzardStageProps<T>) => JSX.Element;
export type WizzardConsumerType = <T>(
  props: WizzardConsumerProps<T>
) => JSX.Element;

export type WizzardChild<T> =
  | React.ReactElement<WizzardConsumerProps<T>>
  | React.ReactElement<WizzardStageProps<T>>;

export type WizzardProps<T> = {
  defaultStage?: string;
  state: T;
  onChange: (newState: T) => void;
  children: WizzardChild<T> | WizzardChild<T>[];
};
export type WizzardFunctionType = <T>(props: WizzardProps<T>) => JSX.Element;
export type WizzardType = WizzardFunctionType & {
  Stage: WizzardStageType;
  Consumer: WizzardConsumerType;
};
