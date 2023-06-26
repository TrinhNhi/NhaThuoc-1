import { AppDispatch } from '@/redux/store';
import { PropertyActionType, PropertyThunkAction } from './property.type';
import { NotiType, renderNotification } from '@/utils/notifications';
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { Callback } from '@/types/others/callback';
import { CreatePropertyPayload, UpdatePropertyPayload } from '@/configs/api/payload';

const getAllProperties =
  (cb?: Callback): PropertyThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: PropertyActionType.PROPERTY_ACTION_PENDING });

    const { response, error } = await useCallApi(API_URLS.Properties.getAll());

    if (!error && response?.status === 200) {
      dispatch({
        type: PropertyActionType.GET_ALL_PROPERTIES_SUCCESS,
        payload: response.data
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: PropertyActionType.PROPERTY_ACTION_FAILURE });
      renderNotification('Lấy dữ liệu công thức thất bại', NotiType.ERROR);
    }
  };

const createProperty =
  (payload: CreatePropertyPayload, cb?: Callback): PropertyThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: PropertyActionType.PROPERTY_ACTION_PENDING });

    const api = API_URLS.Properties.create();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: PropertyActionType.CREATE_PROPERTY_SUCCESS
      });
      renderNotification('Thêm công thức thành công', NotiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: PropertyActionType.PROPERTY_ACTION_FAILURE });
      renderNotification('Thêm công thức thất bại', NotiType.ERROR);
    }
  };

const updateProperty =
  (payload: UpdatePropertyPayload, id: number, cb?: Callback): PropertyThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: PropertyActionType.PROPERTY_ACTION_PENDING });

    if (!id) return;

    const { response, error } = await useCallApi({ ...API_URLS.Properties.update(id), payload });
    if (!error && response?.status == 200) {
      dispatch({
        type: PropertyActionType.UPDATE_PROPERTY_SUCCESS
      });
      renderNotification('Thay đổi thông tin thành công', NotiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: PropertyActionType.PROPERTY_ACTION_FAILURE });
      renderNotification('Thay đổi thông tin thất bại', NotiType.ERROR);
    }
  };

export const PropertyActions = { getAllProperties, createProperty, updateProperty };
