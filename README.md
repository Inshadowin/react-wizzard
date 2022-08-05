# react-wizzard-light

Lightweight React-Wizzard package

Serves purpose of control over stages and `onEnter` / `onLeave` events

Component is stateless, you need to provide state / onChange on your own

It's enough to have `[state, onChange] = useState({})` as there are no additional logic there

## Documenation

- `Wizzard` component. Core component that accepts children of `Wizzard.Stage` and `Wizzard.Consumer` type

`<Wizzard />` Props:

```js
//
// Types:
//

type WizzardChild<T> =
  | React.ReactElement<WizzardConsumerProps<T>>
  | React.ReactElement<WizzardStageProps<T>>;

type WizzardProps<T> = {
  defaultStage?: string,
  state: T,
  onChange: (newState: T) => void,
  children: WizzardChild<T> | WizzardChild<T>[],
};

type WizzardStageProps<T> = {
  stage: string,
  onEnter?: (state?: T, onChange?: (newState: T) => void) => void,
  onLeave?: (state?: T, onChange?: (newState: T) => void) => void,
  children:
    | React.ReactElement<WizzardStageChildrenProps<T>>
    | ((params: WizzardStageChildrenProps<T>) => JSX.Element),
} ;

type WizzardConsumerProps<T> = {
  children:
    | React.ReactElement<WizzardStageChildrenProps<T>>
    | ((params: WizzardStageChildrenProps<T>) => JSX.Element),
};

type WizzardStageChildrenProps<T> = {
  state?: T,
  onChange?: (newState: T) => void,
  stage?: string,
  setStage?: (newStage: string) => void,
  goBack?: (() => void) | null,
  goNext?: (() => void) | null,
};

//
// Props:
//
// Wizzard
{
  // Stage for Wizzard start. Defaults to first child stage
  defaultStage?: string,

  // object that has wizzard data
  state: T, // - any type you use

  // callback to track data change
  onChange: (newState: T) => void

  // Components that define stages
  children: <Wizzard.Stage /> || <Wizzard.Consumer /> // element
}

//  WizzardConsumer
{
  // Must contain element based on Component with WizzardStageChildrenProps consumption
  // or render function
  children:
    | React.ReactElement<WizzardStageChildrenProps<T>>
    | ((params: WizzardStageChildrenProps<T>) => JSX.Element)
}

// WizzardStage
{
  // Stage ID for Wizzard stage
  stage?: string,

  // Effect that takes place on stage enter.
  // Second argument allows to consume change function, and do on-enter data change
  onEnter?: (state?: T, onChange?: (newState: T) => void) => void,

  // Effect that takes place on stage leave.
  // Second argument allows to consume change function, and do on-leave data change
  onLeave?: (state?: T, onChange?: (newState: T) => void) => void,

  // Must contain element based on Component with WizzardStageChildrenProps consumption
  // or render function
  children:
    | React.ReactElement<WizzardStageChildrenProps<T>>
    | ((params: WizzardStageChildrenProps<T>) => JSX.Element)
}

// WizzardStageChildrenProps
{
  // Access to Wizzard state
  state?: T,

  // Function that allows to change state
  onChange?: (newState: T) => void

  // Stage ID passed
  stage?: string,

  // Function to enter any stage
  setStage?: (newStage: string) => void,

  // Function to move to the previous stage. is null if it's first stage
  goBack?: (() => void) | null,

  // Function to move to the next stage. is null if it's last stage
  goNext?: (() => void) | null,
}
```

## Examples:

We have three stages with side-effects. Stage2Component is an example of component that consumes all props

```tsx
type StateType = {
  text1: string;
  text2: string;
  text3: string;
};

const Stage2Component = ({
  state,
  onChange,
  stage,
  goNext,
  goBack,
}: StageChildrenProps<StateType>) => {
  return (
    <>
      Stage #{stage}
      <input
        value={state?.text2}
        onChange={e => onChange?.({ ...state, text2: e.target.value })}
      />
      {!!goBack && <button onClick={() => goBack?.()}>Back</button>}
      {!!goNext && <button onClick={() => goNext?.()}>Next</button>}
    </>
  );
};

const OurWizzardExample = () => {
  // component must use outer state
  const [state, setState] = useState<StateType>({
    text1: '',
    text2: '',
    text3: '',
  });

  return (
    <Wizzard state={state} onChange={setState} defaultStage="2">
      <Wizzard.Consumer>
        {params => <div>Stage from Consumer# {params.stage}</div>}
      </Wizzard.Consumer>
      <Wizzard.Stage stage="1" onEnter={() => alert('Entering Stage 1')}>
        <Stage1Component />
      </Wizzard.Stage>
      <Wizzard.Stage stage="2" onLeave={() => alert('Leaving Stage 2')}>
        <Stage2Component />
      </Wizzard.Stage>
      <Wizzard.Stage stage="3">
        <Stage3Component />
      </Wizzard.Stage>
      <Wizzard.Stage stage="4">
        {props => <div>Just a custom render</div>}
      </Wizzard.Stage>
    </Wizzard>
  );
};
```
