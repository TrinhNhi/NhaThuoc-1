import { AppDispatch } from '@/redux/store';
import { OrderActionType, OrderThunkAction } from './order.types';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import { CreateOrderPayload } from '@/configs/api/payload';

const getAllOrder = (): OrderThunkAction => async (dispatch: AppDispatch) => {
  dispatch({
    type: OrderActionType.ORDER_ACTION_PENDING
  });

  const api = API_URLS.Order.getAll();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response;
    dispatch({
      type: OrderActionType.GET_ALL_ORDER_SUCCESS,
      payload: data
    });
  } else {
    dispatch({ type: OrderActionType.ORDER_ACTION_FAILURE });
    renderNotification('Lấy thông tin các đơn hàng thất bại', NotiType.ERROR);
  }
};

const createOrder =
  (payload: CreateOrderPayload, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: OrderActionType.ORDER_ACTION_PENDING
    });

    const { response, error } = await useCallApi({ ...API_URLS.Order.create(), payload });
    if (!error && response?.status === 200) {
      renderNotification('Tạo đơn hàng thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: OrderActionType.ORDER_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi tạo đơn hàng', NotiType.ERROR);
    }
  };

const packOrder =
  (id: number | undefined, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    if (!id) return;
    dispatch({
      type: OrderActionType.ORDER_ACTION_PENDING
    });

    const api = API_URLS.Order.pack(id);

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      renderNotification('Đóng gói  đơn hàng thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: OrderActionType.ORDER_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi đóng gói đơn hàng', NotiType.ERROR);
    }
  };
export const OrderAction = { getAllOrder, createOrder, packOrder };
