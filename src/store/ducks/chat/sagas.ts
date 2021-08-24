import {call, put, takeLatest} from "redux-saga/effects";
import DialogService from "../../../services/ChatService";
import {setCurrentDialog, setDialogs} from "./actionCreators";
import {ChatActionsType, FetchDialogActionInterface, FetchDialogsActionInterface} from "./contracts/actionTypes";

export function* fetchDialogs({}: FetchDialogsActionInterface): any {
    try {
    const {data, status} = yield call(DialogService.getAll);
        if(status === 200) {
            yield put(setDialogs(data));
        }
    } catch (e) {
        yield put(setDialogs([]))
    }
}

export function* fetchDialog({payload: { id } }: FetchDialogActionInterface): any {
    const {data} = yield call(DialogService.getDialog, id);
    yield put(setCurrentDialog(data));
}

export function* chatSaga(): any {
    yield takeLatest(ChatActionsType.FETCH_DIALOGS, fetchDialogs);
    yield takeLatest(ChatActionsType.FETCH_DIALOG, fetchDialog);
}
