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
    return newStage;
  });
};

// Checks how many truthy elements there are in an array
export const checkListLength = (arrayList) => {
  let listLength = arrayList.length;
  arrayList.map((element) => {
    if (!element){
      listLength --;
    }
  })
  return listLength;
}