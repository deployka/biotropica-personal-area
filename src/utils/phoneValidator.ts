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
  let inputNumbersValue = getInputNumbersValue(input);
  const selectionStart = input.selectionStart;
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

  if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
    if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
    const firstSymbols = '+7';
    formattedInputValue = input.value = firstSymbols + ' ';
    if (inputNumbersValue.length > 1) {
      formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
    }
  } else {
    formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
  }
  input.value = formattedInputValue;
};
export const onPhoneKeyDown = function (e: KeyboardEvent<HTMLInputElement>) {
  const inputValue = (e.target as HTMLInputElement).value.replace(/\D/g, '');
  if (e.key === '8' && inputValue.length === 1) {
    (e.target as HTMLInputElement).value = '';
  }
};
