export const useNavigation = (
  stages: string[],
  currentStage: string,
  setStage: (newStage: string) => void
) => {
  const lastStageIndex = stages?.length - 1;
  const currStageIndex = (stages ?? []).indexOf(currentStage);

  const nextStage =
    currStageIndex !== lastStageIndex ? stages?.[currStageIndex + 1] : null;
  const prevStage = currStageIndex > 0 ? stages?.[currStageIndex - 1] : null;

  const handleGoNext = nextStage !== null ? () => setStage?.(nextStage) : null;
  const handleGoBack = prevStage !== null ? () => setStage?.(prevStage) : null;

  return {
    goNext: handleGoNext,
    goBack: handleGoBack,
  };
};
