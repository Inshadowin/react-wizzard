import React from 'react';

export type StageChildrenProps<T> = {
  state?: T;
  onChange?: (newState: T) => void;
  stage?: string;
  setStage?: (newState: string) => void;
  goBack?: (() => void) | null;
  goNext?: (() => void) | null;
};

export type WizzardStageProps<T> = {
  stage: string;
  onEnter?: (state?: T, onChange?: (newState: T) => void) => void;
  onLeave?: (state?: T, onChange?: (newState: T) => void) => void;
  children: React.ReactElement<StageChildrenProps<T>>;
} & StageChildrenProps<T>;

export type WizzardStageType = <T>(props: WizzardStageProps<T>) => JSX.Element;

export type WizzardProps<T> = {
  defaultStage?: string;
  state: T;
  onChange: (newState: T) => void;
  children:
    | React.ReactElement<WizzardStageProps<T>>
    | React.ReactElement<WizzardStageProps<T>>[];
};

export type WizzardFunctionType = <T>(props: WizzardProps<T>) => JSX.Element;

export type WizzardType = WizzardFunctionType & {
  Stage: WizzardStageType;
};
