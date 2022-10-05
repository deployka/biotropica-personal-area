import { ClipboardEvent, FormEvent, KeyboardEvent } from 'react';

const getInputNumbersValue = function (input: HTMLInputElement) {
  return input.value.replace(/\D/g, '');
};

export const onPhonePaste = function (e: ClipboardEvent<HTMLInputElement>) {
  const input = e.target as HTMLInputElement;
  const inputNumbersValue = getInputNumbersValue(input);
  const pasted = e.clipboardData;
  if (pasted) {
    const pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      input.value = inputNumbersValue;
    }
  }
};

export const onPhoneInput = function (e: FormEvent<HTMLInputElement>) {
  const input = e.target as HTMLInputElement;
  const inputNumbersValue = getInputNumbersValue(input);
  console.log('inputNumbersValue :', inputNumbersValue);
  const selectionStart = input.selectionStart;
  console.log('selectionStart :', selectionStart);
  let formattedInputValue = '';

  if (!inputNumbersValue) {
    return (input.value = '');
  }

  if (input.value.length !== selectionStart) {
    if (e.target && /\D/g.test(input.value)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  formattedInputValue = '+' + inputNumbersValue.substring(0, 15);
  input.value = formattedInputValue;
};
export const onPhoneKeyDown = function (e: KeyboardEvent<HTMLInputElement>) {
  const inputValue = (e.target as HTMLInputElement).value.replace(/\D/g, '');
  if (e.key === '8' && inputValue.length === 1) {
    (e.target as HTMLInputElement).value = '';
  }
};
