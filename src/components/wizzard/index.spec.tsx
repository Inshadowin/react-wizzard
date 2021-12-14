import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Wizzard from ".";

Enzyme.configure({ adapter: new Adapter() });

// Dummy component to emulate Wizzard stage component
const Reciever: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

describe("Wizzard stage tests", () => {
  it("should default to first stage", () => {
    const wrapper = mount(
      <Wizzard state={{}} onChange={() => {}}>
        <Wizzard.Stage stage="1">
          <Reciever>FIRST</Reciever>
        </Wizzard.Stage>
        <Wizzard.Stage stage="2">
          <Reciever>SECOND</Reciever>
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(wrapper.text()).toBe("FIRST");
  });

  it("should use defaultStage", () => {
    const wrapper = mount(
      <Wizzard defaultStage="2" state={{}} onChange={() => {}}>
        <Wizzard.Stage stage="1">
          <Reciever>FIRST</Reciever>
        </Wizzard.Stage>
        <Wizzard.Stage stage="2">
          <Reciever>SECOND</Reciever>
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(wrapper.text()).toBe("SECOND");
  });
});

describe("Wizzard stage tests", () => {
  it("should trigger onEnter", () => {
    const mockStage1Function = jest.fn();
    const mockStage2Function = jest.fn();

    mount(
      <Wizzard state={{}} onChange={() => {}}>
        <Wizzard.Stage stage="1" onEnter={mockStage1Function}>
          <Reciever />
        </Wizzard.Stage>
        <Wizzard.Stage stage="2" onEnter={mockStage2Function}>
          <Reciever />
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(mockStage1Function).toHaveBeenCalledTimes(1);
    expect(mockStage2Function).toHaveBeenCalledTimes(0);
  });
});

describe("Wizzard must pass stage control to children", () => {
  it("should pass props", () => {
    const wrapper = mount(
      <Wizzard state={{ test: 1 }} onChange={() => {}}>
        <Wizzard.Stage stage="1">
          <Reciever />
        </Wizzard.Stage>
        <Wizzard.Stage stage="2">
          <Reciever />
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(wrapper.find(Reciever).prop("setStage")).toBeDefined();
    expect(wrapper.find(Reciever).prop("onChange")).toBeDefined();
    expect(wrapper.find(Reciever).prop("state")).toEqual({ test: 1 });
  });
});

describe("Wizzard must navigate", () => {
  it("Wizzard must have no back option for first", () => {
    const wrapper = mount(
      <Wizzard state={{ test: 1 }} onChange={() => {}}>
        <Wizzard.Stage stage="1">
          <Reciever>FIRST</Reciever>
        </Wizzard.Stage>
        <Wizzard.Stage stage="2">
          <Reciever>SECOND</Reciever>
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(wrapper.find(Reciever).prop("goBack")).toBe(null);
  });

  it("Wizzard must have goNext prop", () => {
    const wrapper = mount(
      <Wizzard state={{ test: 1 }} onChange={() => {}}>
        <Wizzard.Stage stage="1">
          <Reciever>FIRST</Reciever>
        </Wizzard.Stage>
        <Wizzard.Stage stage="2">
          <Reciever>SECOND</Reciever>
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(wrapper.find(Reciever).prop("goNext")).toBeDefined();
  });

  it("Wizzard must have no next option for last", () => {
    const wrapper = mount(
      <Wizzard state={{ test: 1 }} onChange={() => {}} defaultStage="2">
        <Wizzard.Stage stage="1">
          <Reciever>FIRST</Reciever>
        </Wizzard.Stage>
        <Wizzard.Stage stage="2">
          <Reciever>SECOND</Reciever>
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(wrapper.find(Reciever).prop("goNext")).toBe(null);
  });

  it("Wizzard must have back option for last", () => {
    const wrapper = mount(
      <Wizzard state={{ test: 1 }} onChange={() => {}} defaultStage="2">
        <Wizzard.Stage stage="1">
          <Reciever>FIRST</Reciever>
        </Wizzard.Stage>
        <Wizzard.Stage stage="2">
          <Reciever>SECOND</Reciever>
        </Wizzard.Stage>
      </Wizzard>
    );

    expect(wrapper.find(Reciever).prop("goBack")).toBeDefined();
  });
});
