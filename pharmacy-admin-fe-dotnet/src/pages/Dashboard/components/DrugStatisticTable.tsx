import usePagination from '@/hooks/use-pagination';
import { IDrug } from '@/types/models/IDrug';
import { Group, Stack, Text } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';

interface Props {
  drugOrder: IDrug[] | null;
}

const DrugStatisticTable = ({ drugOrder }: Props) => {
  if (!drugOrder) return null;
  const columns: DataTableColumn<IDrug>[] = [
    { accessor: 'id', title: 'Mã sản phẩm' },
    { accessor: 'name', title: 'Tên Sản Phẩm' },
    { accessor: 'qty', title: 'Số Lượng Còn Lại' },
    { accessor: 'sold', title: 'Số Lượng Bán Ra' }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: drugOrder,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });
  return (
    <Stack mt={20}>
      <Group>
        <Text fw={'bold'} fz={'lg'}>
          Thống kê doanh số của từng sản phẩm
        </Text>
      </Group>

      <DataTable
        minHeight={100}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        records={records}
        columns={columns}
        totalRecords={drugOrder.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
    </Stack>
  );
};

export default DrugStatisticTable;
