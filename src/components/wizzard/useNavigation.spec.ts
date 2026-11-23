import { useNavigation } from './useNavigation';

describe('useNavigation happy path', () => {
  it('moves to the next and previous stage', () => {
    const setStage = jest.fn();
    const navigation = useNavigation(['one', 'two', 'three'], 'two', setStage);

    navigation.goNext!();
    expect(setStage).toHaveBeenCalledWith('three');

    navigation.goBack!();
    expect(setStage).toHaveBeenCalledWith('one');
  });

  it('disables navigation outside the stage range', () => {
    const setStage = jest.fn();

    expect(useNavigation(['one'], 'one', setStage).goNext).toBeNull();
    expect(useNavigation(['one'], 'one', setStage).goBack).toBeNull();
  });
});
