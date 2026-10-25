import { createArrayOfValues } from './createArrayOfValues';
import { removeConditionKeyFromData } from './removeConditionKeyFromData';

interface RecursiveRecordOfBooleans extends Record<string, boolean | RecursiveRecordOfBooleans> {}

interface CheckboxState {
  hasAllActionsSelected: boolean;
  hasSomeActionsSelected: boolean;
}

const getCheckboxState = (dataObj: RecursiveRecordOfBooleans): CheckboxState => {
  const dataWithoutCondition = removeConditionKeyFromData(dataObj);

  const arrayOfValues = createArrayOfValues(dataWithoutCondition);

  if (!arrayOfValues.length) {
    return { hasAllActionsSelected: false, hasSomeActionsSelected: false };
  }

  const hasAllActionsSelected = arrayOfValues.every((value) => Boolean(value));
  const hasAnyActionSelected = arrayOfValues.some((value) => Boolean(value));

  return {
    hasAllActionsSelected,
    // Indeterminate means some but not all: a fully selected row must not
    // report itself as partially selected.
    hasSomeActionsSelected: hasAnyActionSelected && !hasAllActionsSelected,
  };
};

export { getCheckboxState };
export type { RecursiveRecordOfBooleans };
