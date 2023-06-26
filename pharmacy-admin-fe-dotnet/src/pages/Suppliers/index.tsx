import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { SupplierAction } from '@/redux/reducers/supplier/supplier.actions';
import { ISupplier, ISupplierStatus, SupplierStatusDict } from '@/types/models/ISupplier';
import { formatPhonenumber } from '@/utils/helpers';
import { Badge, Button, Group, Select, Stack, Text, TextInput, Modal } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconEdit, IconPlus, IconSearch, IconStatusChange } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import ModalCreateSupplier from './components/ModalCreateSupplier';
import ModalUpdateSupplier from './components/ModalUpdateSupplier';
import usePagination from '@/hooks/use-pagination';

const Suppliers = () => {
  const dispatch = useAppDispatch();

  const { suppliers } = useAppSelector((state: RootState) => state.supplier);

  useEffect(() => {
    dispatch(SupplierAction.getAllSupplier());
  }, []);

  const [openedAddModal, { close: closeAddModal, open: openAddModal }] = useDisclosure();
  const [openedEditModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);

  const statusOptions = Object.values(ISupplierStatus).map((status) => ({
    value: status,
    label: SupplierStatusDict[status].label
  }));

  const [_record, setRecord] = useState(suppliers);
  const [_selectedRecord, setSelectedRecord] = useState<ISupplier | null>(null);

  const [_search, setSearch] = useState('');
  const [_debouncedSearch] = useDebouncedValue(_search, 150);

  const [_filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    setRecord(
      suppliers.filter(({ name, status }) => {
        if (_debouncedSearch !== '' && !name?.toLowerCase().includes(_debouncedSearch.trim().toLowerCase())) {
          return false;
        }

        if (_filterStatus && status !== _filterStatus) {
          return false;
        }
        return true;
      })
    );
  }, [_debouncedSearch, _filterStatus, suppliers]);

  const columns: DataTableColumn<ISupplier>[] = [
    { accessor: 'name', title: 'Tên Nhà Phân Phối' },
    { accessor: 'address', title: 'Địa Chỉ' },
    {
      accessor: 'phone',
      title: 'Số Điện Thoại',
      render: (record) => {
        return <Text>{formatPhonenumber(record.phone)}</Text>;
      }
    },
    {
      accessor: 'status',
      title: 'Trạng Thái',
      render: (record) => {
        return (
          <Badge color={record.status ? SupplierStatusDict[record.status].color : undefined}>
            {record.status ? SupplierStatusDict[record.status].label : ''}
          </Badge>
        );
      }
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage,
    changePageSize
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
              placeholder="Nhập tên nhà phân phối"
              value={_search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select w={200} placeholder="Lọc theo trạng thái" data={statusOptions} onChange={setFilterStatus} clearable />
          </Group>
          <Button onClick={openAddModal} leftIcon={<IconPlus size={16} />}>
            Thêm
          </Button>
        </Group>

        <Group></Group>

        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={records}
          totalRecords={_record.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
          rowContextMenu={{
            trigger: 'click',
            items: (record) => [
              {
                key: 'update',
                title: 'Chỉnh sửa thông tin nhà phân phối',
                color: 'blue',
                icon: <IconEdit size={16} />,
                onClick: () => {
                  setSelectedRecord(record);
                  openUpdateModal();
                }
              },
              {
                key: 'changeStatus',
                title: 'Thay đổi trạng thái',
                color: 'orange',
                icon: <IconStatusChange size={16} />,
                onClick: () => {
                  modals.openConfirmModal({
                    title: 'Xác Nhận Thay Đổi Trạng Thái',
                    centered: true,
                    children: <Text size={'sm'}>Bạn chắn chắn thay đổi trạng thái nhà phân phối này?</Text>,
                    confirmProps: { color: 'red' },
                    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                    onCancel: () => {},
                    onConfirm: () => {
                      if (!record.id) return;
                      dispatch(
                        SupplierAction.changeStatus(record.id, {
                          onSuccess: () => dispatch(SupplierAction.getAllSupplier())
                        })
                      );
                    }
                  });
                }
              }
            ]
          }}
        />
      </Stack>
      <Modal centered opened={openedAddModal} onClose={closeAddModal} title="Thêm Nhà Phân Phối">
        <ModalCreateSupplier close={closeAddModal} />
      </Modal>
      <Modal centered opened={openedEditModal} onClose={closeUpdateModal} title="Sửa Thông Tin Nhà Phân Phối">
        <ModalUpdateSupplier supplier={_selectedRecord} close={closeUpdateModal} />
      </Modal>
    </>
  );
};

export default Suppliers;
