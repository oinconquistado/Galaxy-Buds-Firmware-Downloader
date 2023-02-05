import { batch, createEffect, onMount } from "solid-js";

const GenericSelect = (props) => {
  const { list, selected, setSelected, reset, placeholder } = props;

  const resetFunc = reset ? reset : () => {};
  let disabledOption;
  let selectRef;

  onMount(() => {
    disabledOption.disabled = true;
    selectRef.focus();
  });

  return (
    <div class='w-full mt-4'>
      <select
        ref={selectRef}
        value={selected}
        onChange={(e) => {
          batch(() => {
            resetFunc();
            setSelected(e.target.value);
          });
        }}
        class={`h-10 pl-2 border w-full cursor-pointer will-change-scroll`}
      >
        <option ref={disabledOption} value={0} selected>
          {placeholder}
        </option>
        {list.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};
export default GenericSelect;
