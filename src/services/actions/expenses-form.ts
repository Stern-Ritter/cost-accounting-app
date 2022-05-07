export const TRANSACTION_FORM_SET_VALUE = "RANSACTION_FORM_SET_VALUE";
export const TRANSACTION_FORM_CLEAR_STATE = "TRANSACTION_FORM_CLEAR_STATE";

export const setTrasnactionFormValue = ({
  field,
  value,
}: {
  field: string;
  value: string | string[];
}) =>
  ({
    type: TRANSACTION_FORM_SET_VALUE,
    payload: { field, value },
  } as const);

export type ITRANSACTION_FORM_SET_VALUE = ReturnType<
  typeof setTrasnactionFormValue
>;
