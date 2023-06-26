import CustomLoader from '@/components/custom/CustomLoader';
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { DrugActions } from '@/redux/reducers/drug/drug.action';
import { SupplierAction } from '@/redux/reducers/supplier/supplier.actions';
import { IStatistic } from '@/types/models/IStatistic';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Card, Col, Grid, Group, RingProgress, Text } from '@mantine/core';
import { useEffect, useLayoutEffect, useState } from 'react';

import DrugStatisticTable from './components/DrugStatisticTable';
import useStyles from './styles';
import { IDrug } from '@/types/models/IDrug';
import { IUserRole } from '@/types/models/IUser';
import { Navigate } from 'react-router-dom';
import { ROUTER } from '@/configs/router';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('authUser') || '');
  if (user.role === IUserRole.STAFF) {
    return <Navigate to={ROUTER.DRUGS} />;
  }

  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();

  const { drugs, suppliers } = useAppSelector((state: RootState) => ({
    drugs: state.drug.drugs,
    suppliers: state.supplier.suppliers
  }));

  const totalDrugs = drugs.length;
  const totalSuppliers = suppliers.length;

  const [_isLoading, setIsLoading] = useState(false);
  const [_statistics, setStatistics] = useState<IStatistic>();

  const getStatistics = async () => {
    setIsLoading(true);

    const { response, error } = await useCallApi(API_URLS.Statistics.get());
    if (!error && response?.status === 200) {
      const { data } = response;
      setIsLoading(false);
      setStatistics(data);
    } else {
      setIsLoading(false);
      renderNotification('Đã có lỗi khi lấy dữ liệu thống kê', NotiType.ERROR);
    }
  };

  useLayoutEffect(() => {
    dispatch(DrugActions.getAllDrugs({ url: '' }));
    dispatch(SupplierAction.getAllSupplier());
    getStatistics();
  }, []);

  const [drugWithHighestSales, setDrugWithHighestSales] = useState<IDrug>();

  useEffect(() => {
    if (_statistics && _statistics.drugOrder) {
      const drug = _statistics.drugOrder.reduce((prev, current) => {
        const prevSold = prev.sold || 0; // Default to 0 if prev.sold is undefined
        const currentSold = current.sold || 0; // Default to 0 if current.sold is undefined

        return currentSold > prevSold ? current : prev;
      }, _statistics.drugOrder[0]);

      setDrugWithHighestSales(drug);
    }
  }, [_statistics]);

  return _isLoading || !_statistics ? (
    <CustomLoader />
  ) : (
    <>
      <Group mt="md" spacing="xl" position="center"></Group>

      <Grid>
        <Col span={6}>
          <Card withBorder p="xl" radius="md" className={cx(classes.card)}>
            <div className={classes.inner}>
              <div>
                <Text fz="xl" className={classes.label}>
                  Đơn hàng
                </Text>
                <div>
                  <Text className={classes.lead} mt={30}>
                    {_statistics.totalOrder}
                  </Text>
                  <Text fz="xs" color="dimmed">
                    Tổng số đơn hàng
                  </Text>
                  <Text className={classes.lead} mt={30}>
                    {_statistics.totalPack}
                  </Text>
                  <Text fz="xs" color="dimmed">
                    Đơn hàng chưa đóng gói
                  </Text>
                </div>
              </div>
              <div className={classes.ring}>
                <RingProgress
                  roundCaps
                  thickness={6}
                  size={150}
                  sections={[{ value: 100 * (_statistics.totalPack / _statistics.totalOrder), color: 'green' }]}
                  label={
                    <div>
                      <Text ta="center" fz="lg" className={classes.label}>
                        {((_statistics.totalPack / _statistics.totalOrder) * 100).toFixed(0)}%
                      </Text>
                      <Text ta="center" fz="xs" c="dimmed">
                        Chưa đóng gói
                      </Text>
                    </div>
                  }
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card withBorder p="xl" radius="md" className={classes.card}>
            <div className={classes.inner}>
              <div>
                <Text fz="xl" className={classes.label}>
                  Sản phẩm
                </Text>
                <div>
                  <Text className={classes.lead} mt={30}>
                    {totalDrugs}
                  </Text>
                  <Text fz="xs" color="dimmed">
                    Tổng sản phẩm
                  </Text>
                </div>
                <Group mt="lg">
                  <div>
                    <Text className={classes.label}>{_statistics.drug.total}</Text>
                    <Text size="xs" color="dimmed">
                      Có sẵn
                    </Text>
                  </div>
                </Group>
              </div>

              <div className={classes.ring}>
                <RingProgress
                  roundCaps
                  thickness={6}
                  size={150}
                  sections={[{ value: 100 * (_statistics.drug.total / totalDrugs), color: 'blue' }]}
                  label={
                    <div>
                      <Text ta="center" fz="lg" className={classes.label}>
                        {((_statistics.drug.total / totalDrugs) * 100).toFixed(0)}%
                      </Text>
                      <Text ta="center" fz="xs" c="dimmed">
                        Có sẵn
                      </Text>
                    </div>
                  }
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col span={6}>
          {drugWithHighestSales && (
            <Card withBorder p="xl" radius="md" className={classes.card}>
              <div className={classes.inner}>
                <div>
                  <Text fz="xl" className={classes.label}>
                    Đặt hàng nhiều nhất
                  </Text>
                  <div>
                    <Text className={classes.lead} mt={30}>
                      {drugWithHighestSales.sold}
                    </Text>
                    <Text fz="xs" color="dimmed">
                      Số lượng
                    </Text>
                  </div>
                  <Group mt="lg">
                    <div>
                      <Text className={classes.label}>{drugWithHighestSales.name}</Text>
                      <Text size="xs" color="dimmed">
                        Tên sản phẩm
                      </Text>
                    </div>
                  </Group>
                </div>
              </div>
            </Card>
          )}
        </Col>
        <Col span={6}>
          <Card withBorder p="xl" radius="md" className={cx(classes.card)}>
            <div className={classes.inner}>
              <div>
                <Text fz="xl" className={classes.label}>
                  Nhà phân phối
                </Text>
                <div>
                  <Text className={classes.lead} mt={30}>
                    {totalSuppliers}
                  </Text>
                  <Text fz="xs" color="dimmed">
                    Tổng số nhà phân phối
                  </Text>
                </div>
                <Group mt="lg">
                  <div>
                    <Text className={classes.label}>{_statistics.supplier.total}</Text>
                    <Text size="xs" color="dimmed">
                      Đang hoạt động
                    </Text>
                  </div>
                </Group>
              </div>
              <div className={classes.ring}>
                <RingProgress
                  roundCaps
                  thickness={6}
                  size={150}
                  sections={[{ value: 100 * (_statistics.supplier.total / totalSuppliers), color: 'orange' }]}
                  label={
                    <div>
                      <Text ta="center" fz="lg" className={classes.label}>
                        {((_statistics.supplier.total / totalSuppliers) * 100).toFixed(0)}%
                      </Text>
                      <Text ta="center" fz="xs" c="dimmed">
                        Đang hoạt động
                      </Text>
                    </div>
                  }
                />
              </div>
            </div>
          </Card>
        </Col>
      </Grid>
      <DrugStatisticTable drugOrder={_statistics.drugOrder} />
    </>
  );
};

export default Dashboard;
