import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { OrderAction } from '@/redux/reducers/order/order.action';
import { IOrder } from '@/types/models/IOrder';
import { Button, Group, Modal, Stack, TextInput, Text, Select } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconDetails, IconInfoCircle, IconSearch } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import ModalDetails from './components/ModalDetails';
import { ModalCreateOrder } from './components/ModalCreateOrder';

export const Order = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(OrderAction.getAllOrder());
  }, []);

  const [openedDetailsModal, { close: close, open }] = useDisclosure();
  const [openedCreateModal, { close: closeCreateModal, open: openCreateModal }] = useDisclosure();

  const { orders } = useAppSelector((state: RootState) => state.order);

  const [_record, setRecord] = useState(orders);
  const [_selectedRecord, setSelectedRecord] = useState<IOrder | null>(null);

  const [_search, setSearch] = useState('');
  const [_debouncedSearch] = useDebouncedValue(_search, 150);

  const [filter, setFilter] = useState<'Tất cả' | 'Chưa đóng hàng' | 'Đã đóng hàng'>('Tất cả');

  const columns: DataTableColumn<IOrder>[] = [
    { accessor: 'id', title: 'Mã Đơn' },
    { accessor: 'customer.name', title: 'Tên khách hàng' },
    { accessor: 'customer.phone', title: 'Số điện thoại' },
    { accessor: 'packer', title: 'Nhân viên đóng gói', render: ({ packer }) => <Text>{!packer ? 'Đơn hàng chưa được đóng gói' : packer}</Text> },
    {
      accessor: 'details',
      title: '',
      width: '300px',
      render: (record) => (
        <Group position="center">
          <Button
            onClick={() => {
              setSelectedRecord(record);
              open();
            }}
          >
            Chi tiết
          </Button>
          {!record.isPack ? (
            <Button
              onClick={() => {
                dispatch(
                  OrderAction.packOrder(record.id, {
                    onSuccess: () => {
                      dispatch(OrderAction.getAllOrder());
                    }
                  })
                );
              }}
            >
              Đóng hàng
            </Button>
          ) : null}
        </Group>
      )
    }
  ];

  useEffect(() => {
    setRecord(
      orders.filter(({ customer, isPack }) => {
        if (_debouncedSearch !== '' && !customer.name.toLowerCase().includes(_debouncedSearch.trim().toLowerCase())) {
          return false;
        }
        if ((filter === 'Đã đóng hàng' && !isPack) || (filter === 'Chưa đóng hàng' && isPack)) {
          return false;
        }

        return true;
      })
    );
  }, [_debouncedSearch, orders, filter]);

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _record,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });
  return (
    <>
      <Stack>
        <Group position="apart">
          <Group>
            <TextInput
              w={500}
              icon={<IconSearch size={16} />}
              placeholder="Nhập tên khách hàng"
              value={_search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
              data={[
                { value: 'Tất cả', label: 'Tất cả' },
                { value: 'Chưa đóng hàng', label: 'Chưa đóng hàng' },
                { value: 'Đã đóng hàng', label: 'Đã đóng hàng' }
              ]}
              value={filter}
              onChange={(value: 'Tất cả' | 'Chưa đóng hàng' | 'Đã đóng hàng') => setFilter(value)}
              placeholder="Lọc theo trạng thái"
            />
          </Group>
          <Button onClick={openCreateModal}>Tạo đơn hàng</Button>
        </Group>

        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={records}
          totalRecords={orders.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
      <Modal centered opened={openedDetailsModal} onClose={close} title="Chi tiết đơn hàng" size={'lg'}>
        <ModalDetails close={close} order={_selectedRecord} />
      </Modal>

      <Modal centered opened={openedCreateModal} onClose={closeCreateModal} title="Tạo đơn hàng" size={'lg'}>
        <ModalCreateOrder close={closeCreateModal} />
      </Modal>
    </>
  );
};
