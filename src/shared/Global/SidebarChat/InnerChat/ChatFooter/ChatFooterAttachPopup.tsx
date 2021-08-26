import s from "./ChatFooter.module.scss";
import {GlobalSvgSelector} from "../../../../../assets/icons/global/GlobalSvgSelector";
import {ClickOutside} from "./ClickOutside";
import React, {RefObject} from "react";

type Prop = {
    onClickOutside: () => void;
    onImageLoaded: (file: File) => void;
    onDocumentLoaded: (file: File) => void;
}

export function ChatFooterAttachPopup(prop: Prop) {
    const refImage = React.createRef() as RefObject<HTMLInputElement>;
    const refDoc = React.createRef() as RefObject<HTMLInputElement>;

    function onImageChangeHandler() {
        if (refImage.current?.files?.length) {
            prop.onImageLoaded(refImage.current.files[0]);
            refImage.current.value = '';
        }
    }

    function onDocumentChangeHandler() {
        if (refDoc.current?.files?.length) {
            prop.onDocumentLoaded(refDoc.current.files[0]);
            refDoc.current.value = '';
        }
    }

    return <ClickOutside onClickOutside={prop.onClickOutside}>
        <div>
            <div className={s.attach__popup}>
                <div className={s.attach__popup__media}>
                    <div className={s.popup__icon}>
                        <GlobalSvgSelector id="media"/>
                    </div>
                    <div className={s.popup__text}>фото или видео</div>
                    <input
                        accept=".png, .jpg, .jpeg, .webp, .mp4, .mov, .webm, .avi, .gif"
                        type="file"
                        className={s.popup__input}
                        onChange={onImageChangeHandler}
                        ref={refImage}
                    />
                </div>
                <div className={s.attach__popup__documents}>
                    <div className={s.popup__icon}>
                        <GlobalSvgSelector id="document"/>
                    </div>
                    <div className={s.popup__text}>документы</div>
                    <input
                        type="file"
                        className={s.popup__input}
                        ref={refDoc}
                        onChange={onDocumentChangeHandler}
                    />
                </div>
            </div>
        </div>
    </ClickOutside>
}
