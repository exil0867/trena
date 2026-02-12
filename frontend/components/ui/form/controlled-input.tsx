import { Control, Controller, FieldValues, Path } from "react-hook-form";
import InputError from "./input-error";
import { JSX } from "react";

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  render: (field: any) => JSX.Element
}

export function ControlledInput<T extends FieldValues>({control, name, render}: Props<T>) {
  return <>
    <Controller control={control} name={name} render={({field, fieldState}) => {
      return <>
        {render(field)}
        {fieldState.isTouched && (
          <InputError error={fieldState.error}/>
        )}
      </>
    }} />
  </>
}
