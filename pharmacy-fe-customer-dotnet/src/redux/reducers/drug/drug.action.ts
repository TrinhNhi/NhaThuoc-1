import { DrugActionType, DrugThunkAction } from './drug.type';
import { AppDispatch } from '@/redux/store';
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { Callback } from '@/types/others/callback';
import { NotiType, renderNotification } from '@/utils/notifications';
import { CreateDrugPayload, SearchPayload } from '@/configs/api/payload';

const getAllDrugs =
  (payload: SearchPayload, cb?: Callback): DrugThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: DrugActionType.DRUG_ACTION_PENDING });

    const { response, error } = await useCallApi({ ...API_URLS.Drugs.getAll(), payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: DrugActionType.GET_ALL_DRUGS_SUCCESS,
        payload: response.data
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: DrugActionType.DRUG_ACTION_FAILURE });
      renderNotification('Lấy dữ liệu kho hàng thất bại', NotiType.ERROR);
    }
  };

const createDrug =
  (payload: CreateDrugPayload, cb?: Callback): DrugThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: DrugActionType.DRUG_ACTION_PENDING });

    const api = API_URLS.Drugs.create();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: DrugActionType.CREATE_DRUG_SUCCESS
      });
      renderNotification('Thêm sản phẩm thành công', NotiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: DrugActionType.DRUG_ACTION_FAILURE });
      renderNotification('Thêm sản phẩm thất bại', NotiType.ERROR);
    }
  };

export const DrugActions = { getAllDrugs, createDrug };
