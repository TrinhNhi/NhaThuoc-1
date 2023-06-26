import { API_URLS } from '@/configs/api/endpoint';
import { AppDispatch } from '@/redux/store';
import { Callback } from '@/types/others/callback';
import { useCallApi } from '@/configs/api';
import { CreateSupplierPayload } from '@/configs/api/payload';
import { NotiType, renderNotification } from '@/utils/notifications';
import { SupplierActionType, SupplierThunkAction } from './supplier.types';

const getAllSupplier = (): SupplierThunkAction => async (dispatch: AppDispatch) => {
  dispatch({ type: SupplierActionType.SUPPLIER_ACTION_PENDING });

  const api = API_URLS.Suppliers.getAll();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response;
    dispatch({
      type: SupplierActionType.GET_ALL_SUPPLIER_SUCCESS,
      payload: data
    });
  } else {
    dispatch({ type: SupplierActionType.SUPPLIER_ACTION_FAILURE });
    renderNotification('Đã có lỗi xảy ra', NotiType.ERROR);
  }
};

const createSupplier =
  (payload?: CreateSupplierPayload, cb?: Callback): SupplierThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: SupplierActionType.SUPPLIER_ACTION_PENDING });

    const api = API_URLS.Suppliers.create();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: SupplierActionType.CREATE_SUPPLIER_SUCCESS
      });
      renderNotification('Thêm nhà phân phối thành công', NotiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: SupplierActionType.SUPPLIER_ACTION_FAILURE });
      renderNotification('Thêm nhà phân phối thất bại', NotiType.ERROR);
    }
  };

const updateSupplier =
  (payload?: CreateSupplierPayload, cb?: Callback, id?: number): SupplierThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: SupplierActionType.SUPPLIER_ACTION_PENDING });
    if (!id) return;

    const api = API_URLS.Suppliers.update(id);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status == 200) {
      dispatch({
        type: SupplierActionType.UPDATE_SUPPLIER_SUCCESS
      });
      renderNotification('Thay đổi thông tin thành công', NotiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: SupplierActionType.SUPPLIER_ACTION_FAILURE });
      renderNotification('Thay đổi thông tin thất bại', NotiType.ERROR);
    }
  };

const changeStatus =
  (id: number, cb?: Callback): SupplierThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: SupplierActionType.SUPPLIER_ACTION_PENDING
    });

    const api = API_URLS.Suppliers.changeStatus(id);

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status == 200) {
      dispatch({
        type: SupplierActionType.CHANGE_STATUS_SUPPLIER_SUCCESS
      });
      renderNotification('Thay đổi trạng thái thành công', NotiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: SupplierActionType.SUPPLIER_ACTION_FAILURE });
      renderNotification('Thay đổi trạng thái thất bại', NotiType.ERROR);
    }
  };

export const SupplierAction = { getAllSupplier, createSupplier, updateSupplier, changeStatus };
