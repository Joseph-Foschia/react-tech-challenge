export const checkMissingActions = (data, Actions) => {
  // Find actions that are present in the Stages array
  const existingActions = data.Stages.map((stage) => stage.action);

  // Find missing actions
  const missingActions = Actions.filter(
    (action) => !existingActions.includes(action)
  );

  // Add missing actions to the Stages array
  missingActions.forEach((action, index) => {
    const newId = data.Stages.length + 1 + index;
    const newStage = {
      id: newId,
      action: action,
      isStart: false,
      prevStage: null,
      nextStage: null,
    };
    data.Stages.push(newStage);
  });

  return data;
};