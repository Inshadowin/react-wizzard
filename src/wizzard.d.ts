declare type StageChildrenProps<T> = {
  state?: T;
  onChange?: (newState: T) => void;
  stage?: string;
  setStage?: (newState: string) => void;
  goBack?: (() => void) | null;
  goNext?: (() => void) | null;
};

declare type WizzardStageProps<T> = {
  stage: string;
  onEnter?: (state?: T, onChange?: (newState: T) => void) => void;
  onLeave?: (state?: T, onChange?: (newState: T) => void) => void;
  children: React.ReactElement<StageChildrenProps<T>>;
} & StageChildrenProps<T>;

declare type WizzardStageType = <T>(props: WizzardStageProps<T>) => JSX.Element;

declare type WizzardProps<T> = {
  defaultStage?: string;
  state: T;
  onChange: (newState: T) => void;
  children:
    | React.ReactElement<WizzardStageProps<T>>
    | React.ReactElement<WizzardStageProps<T>>[];
};

declare type WizzardFunctionType = <T>(props: WizzardProps<T>) => JSX.Element;

declare type WizzardType = WizzardFunctionType & {
  Stage: WizzardStageType;
};
