import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TaskTemplate } from '../../../@types/entities/Task';
import { useDebounce } from '../../../hooks/useDebounce';
import closeIcon from './../../../assets/icons/closeRed.svg';

import s from './TemplateElement.module.scss';
interface Props {
  iconColor: string;
  taskType: TaskTemplate;
  onSelect(type: TaskTemplate): void;
  onDeleteTemplate: () => void;
  onChangeTemplateName(templateId: string, value: string): void;
}

export function TemplateElement({
  taskType,
  iconColor,
  onSelect,
  onDeleteTemplate,
  onChangeTemplateName,
}: Props) {
  const [value, setValue] = useState(taskType.templateName);

  const debouncedName = useDebounce(value, 1000);

  useEffect(() => {
    onChangeTemplateName(taskType.id, debouncedName);
  }, [debouncedName]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    if (
      inputRef?.current?.contains(e.target as Node) ||
      deleteButtonRef?.current?.contains(e.target as Node)
    ) return;
    onSelect(taskType);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div
      title="Название шаблона сохраняется автоматически"
      className={s.taskType}
      onClick={handleClick}
    >
      <div className={s.name}>
        <input
          className={s.input}
          value={value}
          onChange={onChange}
          ref={inputRef}
          placeholder="Введите название шаблона"
        />
        <button
          className={s.delete}
          title="удалить шаблон"
          ref={deleteButtonRef}
          onClick={onDeleteTemplate}
        >
          <img src={closeIcon} />
        </button>
      </div>
      <div className={s.content}>
        <div className={s.iconBg} style={{ backgroundColor: iconColor }}>
          <img className={s.icon} src={taskType.icon} />
        </div>
        <p>{taskType.title}</p>
      </div>
    </div>
  );
}
