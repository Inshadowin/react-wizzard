import React, { useState } from 'react';

import { Wizzard } from '../src/components';
import type { WizzardStageChildrenProps } from '../src';

type StateType = {
  text1?: string;
  text2?: string;
  text3?: string;
};

const Stage1Component = ({
  state,
  onChange,
  stage,
  goNext,
  goBack,
}: WizzardStageChildrenProps<StateType>) => {
  return (
    <>
      Stage #{stage}
      <input
        value={state?.text1}
        onChange={e => onChange?.({ ...state, text1: e.target.value })}
      />
      {!!goBack && <button onClick={() => goBack?.()}>Back</button>}
      {!!goNext && <button onClick={() => goNext?.()}>Next</button>}
    </>
  );
};

const Stage2Component = ({
  state,
  onChange,
  stage,
  goNext,
  goBack,
}: WizzardStageChildrenProps<StateType>) => {
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

const Stage3Component = ({
  state,
  onChange,
  stage,
  goNext,
  goBack,
}: WizzardStageChildrenProps<StateType>) => {
  return (
    <>
      Stage #{stage}
      <input
        value={state?.text3}
        onChange={e => onChange?.({ ...state, text3: e.target.value })}
      />
      {!!goBack && <button onClick={() => goBack?.()}>Back</button>}
      {!!goNext && <button onClick={() => goNext?.()}>Next</button>}
    </>
  );
};

const Demo = () => {
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
      <Wizzard.Stage<StateType> stage="4">
        {props => <Stage3Component {...props} />}
      </Wizzard.Stage>
      <div>Can render this</div>
    </Wizzard>
  );
};

export default Demo;
