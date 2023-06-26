import PlusButton from '@/components/common/PlusButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { DrugActions } from '@/redux/reducers/drug/drug.action';
import { SupplierAction } from '@/redux/reducers/supplier/supplier.actions';
import { DrugStatusDict, IDrug, IDrugStatus } from '@/types/models/IDrug';
import { Badge, Center, Group, Image, Modal, Stack, Text, TextInput } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect } from 'react';
import ModalAddDrug from './components/ModalAddDrug';

import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconEdit, IconSearch, IconStatusChange } from '@tabler/icons-react';
import { useState } from 'react';
import ModalUpdateDrug from './components/ModalUpdateDrug';
import usePagination from '@/hooks/use-pagination';
import dayjs from 'dayjs';

const Drugs = () => {
  const dispatch = useAppDispatch();

  const [openedAddModal, { close: closeAddModal, open: openAddModal }] = useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure();

  const [_selectedRecord, setSelectedRecord] = useState<IDrug | null>(null);

  const [_search, setSearch] = useState('');
  const [_debouncedSearch] = useDebouncedValue(_search, 150);
  const { drugs } = useAppSelector((state) => ({
    drugs: state.drug.drugs
  }));

  const [_record, setRecord] = useState(drugs);

  useLayoutEffect(() => {
    dispatch(DrugActions.getAllDrugs({ url: '' }));
    dispatch(SupplierAction.getAllSupplier());
  }, []);

  useEffect(() => {
    setRecord(
      drugs.filter(({ name }) => {
        if (_debouncedSearch !== '' && !name?.toLowerCase().includes(_debouncedSearch.trim().toLowerCase())) {
          return false;
        }
        return true;
      })
    );
  }, [_debouncedSearch, drugs]);

  const columns: DataTableColumn<IDrug>[] = [
    { accessor: 'id', title: 'Mã Sản Phẩm' },
    { accessor: 'name', title: 'Tên Sản Phẩm' },
    { accessor: 'supplier', title: 'Nhà Cung Cấp', render: (record) => <Text>{record.supplier.name}</Text> },
    { accessor: 'qty', title: 'Số Lượng Còn Lại' },
    { accessor: 'price', title: 'Giá Tiền' },
    { accessor: 'exp', title: 'Hạn Sử Dụng', render: (record) => <Text>{dayjs(record.exp).format('DD/MM/YYYY')}</Text> },
    {
      accessor: 'status',
      title: 'Trạng Thái',
      render: (record) => {
        if (!dayjs().isBefore(record.exp))
          return <Badge color={DrugStatusDict[IDrugStatus.EXPIRED].color}>{DrugStatusDict[IDrugStatus.EXPIRED].label}</Badge>;
        return (
          <Badge color={record.status ? DrugStatusDict[record.status].color : undefined}>
            {record.status ? DrugStatusDict[record.status].label : ''}
          </Badge>
        );
      }
    },
    {
      accessor: 'image',
      title: 'Hình Ảnh',
      render: (record) => (
        <Center>
          <Image src={record.image} width={80} height={80} />
        </Center>
      )
    }
  ];

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
          <TextInput
            w={500}
            icon={<IconSearch size={16} />}
            placeholder="Nhập tên sản phẩm"
            value={_search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <PlusButton onClick={openAddModal} />
        </Group>
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
                color: 'blue',
                title: 'Chỉnh sửa thông tin',
                icon: <IconEdit size={16} />,
                onClick: () => {
                  setSelectedRecord(record);
                  openEditModal();
                }
              },
              {
                key: 'changeStatus',
                title: 'Thay đổi trạng thái',
                color: 'orange',
                icon: <IconStatusChange size={16} />,
                onClick: () => {
                  modals.openConfirmModal({
                    title: 'Xác nhận thay đổi trạng thái',
                    centered: true,
                    children: <Text size={'sm'}>Bạn chắn chắn thay đổi trạng thái sản phẩm này?</Text>,
                    confirmProps: { color: 'red' },
                    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                    onCancel: () => {},
                    onConfirm: () => {
                      if (!record.id) return;
                      dispatch(
                        DrugActions.changeStatus(record.id, {
                          onSuccess: () => dispatch(DrugActions.getAllDrugs({ url: '' }))
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
      <Modal centered opened={openedAddModal} onClose={closeAddModal} title="Thêm Sản Phẩm">
        <ModalAddDrug close={closeAddModal} />
      </Modal>
      <Modal centered opened={openedEditModal} onClose={closeEditModal} title="Sửa Thông Tin Sản Phẩm">
        <ModalUpdateDrug close={closeEditModal} drug={_selectedRecord} />
      </Modal>
    </>
  );
};

export default Drugs;
