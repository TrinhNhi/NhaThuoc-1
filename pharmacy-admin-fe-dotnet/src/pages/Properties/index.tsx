import PlusButton from '@/components/common/PlusButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { PropertyActions } from '@/redux/reducers/property/property.action';
import { IProperty } from '@/types/models/IProperty';
import { Group, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useLayoutEffect, useState } from 'react';
import ModalAddProperty from './components/ModalAddProperty';
import ModalEditProperty from './components/ModalEditProperty';
import usePagination from '@/hooks/use-pagination';

const Properties = () => {
  const dispatch = useAppDispatch();

  const { properties } = useAppSelector((state) => state.property);

  const [openedAddModal, { close: closeAddModal, open: openAddModal }] = useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure();

  const [selectedRecord, setSelectedRecord] = useState<IProperty>();

  const columns: DataTableColumn<IProperty>[] = [
    { accessor: 'bottlesPerBin', title: 'Số chai trong 1 thùng' },
    { accessor: 'boxesPerBin', title: 'Số hộp trong 1 thùng' },
    { accessor: 'packsPerBox', title: 'Số vỉ trong 1 hộp' },
    { accessor: 'pillsPerPack', title: 'Số viên trong 1 vỉ' }
  ];

  useLayoutEffect(() => {
    dispatch(PropertyActions.getAllProperties());
  }, []);

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: properties,
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });

  return (
    <>
      <Stack>
        <Group position="right">
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
          totalRecords={properties.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
          rowContextMenu={{
            trigger: 'click',
            items: (record) => [
              {
                key: 'update',
                title: 'Chỉnh sửa công thức',
                color: 'blue',
                icon: <IconEdit size={16} />,
                onClick: () => {
                  setSelectedRecord(record);
                  openEditModal();
                }
              }
            ]
          }}
        />
      </Stack>
      <Modal centered opened={openedAddModal} onClose={closeAddModal} title="Thêm Công Thức">
        <ModalAddProperty close={closeAddModal} />
      </Modal>
      <Modal centered opened={openedEditModal} onClose={closeEditModal} title="Sửa Công Thức">
        <ModalEditProperty property={selectedRecord} close={closeEditModal} />
      </Modal>
    </>
  );
};

export default Properties;
